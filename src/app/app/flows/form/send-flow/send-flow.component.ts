import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { UserService } from 'src/app/services/user.service';
import { Entity } from 'src/app/classes/entity';
import { AppFile } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { FlowService } from '../../flow.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'send-flow-form',
  templateUrl: './send-flow.component.html',
  styleUrls: ['./send-flow.component.scss'],
})
export class SendFlowFormComponent implements OnInit {
  sendFlowForm: FormGroup;
  parentFlow: Flow = new Flow();

  queryParams$ = this.route.queryParams;
  activeEntity$ = this.entityService.activeEntity$;
  activeUser$ = this.userService.activeUser$;
  flowId$ = this.queryParams$.pipe(map((params) => parseInt(params.flow_id)));
  parentFlow$ = this.flowId$.pipe(
    switchMap((id: number) => {
      return this.flowService.getFlow(id);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private flowService: FlowService,
    private userService: UserService,
    private fb: FormBuilder,
    private entityService: EntityService
  ) {
    this.parentFlow$.subscribe((data) => {
      this.parentFlow = new Flow(data);
    });

    this.sendFlowForm = this.fb.group({
      labels: [[]],
      content: ['', Validators.compose([Validators.required])],
      note: [],
      urgent: [],
      receivers: [[], Validators.compose([Validators.required])],
      files: [],
    });
  }

  ngOnInit(): void {}

  submit() {
    const form = this.sendFlowForm.value;
    const flows: any[] = [];

    const activeEntity = this.activeEntity$.value;
    const activeUser = this.activeUser$.value;

    if (!activeEntity || !activeUser) return;

    form.receivers.forEach((entity: Entity) => {
      let flow = {
        user_id: activeUser?.id,
        initiator_id: activeEntity?.id,
        action: 2,
        root_id: this.parentFlow.rootId(),
        parent_id: this.parentFlow.id,
        content: form.content,
        note: form.note,
        labels: form.labels ? form.labels.join(',') : null,
        files: form.files,
        status: form.urgent ? 1 : null,
      };

      flow = entity.id
        ? { ...flow, ...{ owner_id: entity.id, owner_text: entity.short } }
        : { ...flow, ...{ owner_text: entity.short } };

      flows.push(flow);
    });

    console.log(flows);

    // this.entityService.incrementEntitySentCount();
    // this.flowService.insertFlows(flows);
  }
}
