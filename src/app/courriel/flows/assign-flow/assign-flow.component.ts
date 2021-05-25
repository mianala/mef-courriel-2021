import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { Flow } from 'src/app/classes/flow';
import { User } from 'src/app/classes/user';
import { EntityService } from 'src/app/services/entity.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { FlowService } from '../flow.service';

@Component({
  selector: 'assign-flow',
  templateUrl: './assign-flow.component.html',
  styleUrls: ['./assign-flow.component.scss'],
})
export class AssignFlowComponent implements OnInit {
  sendFlowForm: FormGroup;
  parentFlow: Flow = new Flow();
  activeUser = this.userService._activeUser;
  queryParams$ = this.route.queryParams;
  userEntity$ = this.entityService.userEntity$;
  userEntity = this.entityService._userEntity;
  activeUser$ = this.userService.activeUser$;
  flowId$ = this.queryParams$.pipe(map((params) => parseInt(params.flow_id)));
  parentFlow$ = this.flowId$.pipe(
    switchMap((id: number) => {
      return this.flowService.getFlow(id);
    }),
    map((flows: Flow[]) => flows[0])
  );

  constructor(
    private route: ActivatedRoute,
    private flowService: FlowService,
    private userService: UserService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private entityService: EntityService
  ) {
    this.parentFlow$.subscribe((data) => {
      this.parentFlow = new Flow(data);
    });

    this.sendFlowForm = this.fb.group({
      labels: [],
      content: ['', Validators.compose([Validators.required])],
      note: [],
      urgent: [],
      users: [[], Validators.compose([Validators.required])],
      files: [],
    });
  }

  ngOnInit(): void {}

  submit() {
    const form = this.sendFlowForm.value;
    const flows: any[] = [];

    if (!this.userEntity || !this.activeUser) return;

    console.log(form);

    form.users.forEach((user: User) => {
      let flow = {
        user_id: this.activeUser!.id,
        initiator_id: this.userEntity!.id,
        action: 2,
        root_id: this.parentFlow.rootId(),
        parent_id: this.parentFlow.id,
        content: form.content,
        note: form.note,
        labels: form.labels ? form.labels.join(',') : null,
        files: form.files,
        status: form.urgent ? 1 : null,
        assignee_id: user.id,
        owner_text: user.firstname + ' ' + user.lastname + ' ' + user.im,
      };

      flows.push(flow);
    });

    this.entityService.incrementEntitySentCount();
    this.flowService.insertFlows(flows).subscribe((data) => {
      console.log(data);
      this.notification.notify('Envoyé');
    });
  }
}
