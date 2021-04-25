import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { UserService } from 'src/app/app/users/user.service';
import { Entity } from 'src/app/classes/entity';
import { AppFile } from 'src/app/classes/file.class.class';
import { Flow } from 'src/app/classes/flow';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'send-flow-form',
  templateUrl: './send-flow.component.html',
  styleUrls: ['./send-flow.component.scss'],
})
export class SendFlowFormComponent implements OnInit {
  files: AppFile[] = [];
  labels: string[] = [];
  receivers: Entity[] = [];
  parent_flow: Flow = new Flow();
  flow = {
    content: 'Obs',
    note: 'Note',
    urgent: false,
  };

  constructor(
    private route: ActivatedRoute,
    private flowService: FlowService,
    private userService: UserService,
    private entityService: EntityService
  ) {
    this.route.queryParams.subscribe((data) => {
      const flow_id = parseInt(data.flow_id);

      this.flowService
        .getFlow(flow_id)
        .subscribe((data) => (this.parent_flow = data));
    });
  }

  ngOnInit(): void {}

  submit() {
    const flowsVariable: any[] = [];
    const active_entity = this.entityService.activeEntity$.value;
    const user = this.userService.activeUser$.value;

    this.receivers.forEach((entity) => {
      let flow = {
        user_id: user.id,
        initiator_id: active_entity.id,
        action: 2,
        root_id: this.parent_flow.rootId(),
        parent_id: this.parent_flow.id,
        content: this.flow.content,
        note: this.flow.note,
        labels: this.labels.join(','),
        files: this.files,
        status: this.flow.urgent ? 1 : null,
      };

      flow = entity.id
        ? { ...flow, ...{ owner_id: entity.id } }
        : { ...flow, ...{ receiver_text: entity.short } };

      flowsVariable.push(flow);
    });

    this.entityService.incrementEntitySentCount();
    this.flowService.insertFlows(flowsVariable);
  }

  valid() {
    return this.receivers.length && this.flow.content.length;
  }
}