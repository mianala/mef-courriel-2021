import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/classes/entity';
import { File } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'send-flow-form',
  templateUrl: './send-flow-form.component.html',
  styleUrls: ['./send-flow-form.component.scss']
})
export class SendFlowFormComponent implements OnInit {

  files: File[] = []
  labels: string[] = []
  receivers: Entity[] = []
  flow = {
    content: '',
    note: '',
  }

  constructor(private flowService: FlowService) { }

  ngOnInit(): void {
  }

  submit() {
    const flowsVariable: Flow[] = []
    this.receivers.forEach(entity => {
      const flow = {

        content: this.flow.content,
        note: this.flow.note,
        labels: this.labels.join(','),
        files: this.files,
      }

      flowsVariable.push(flow)
    })



    // this.flowService.send(flowsVariable)

  }

  valid() {
    return this.receivers.length && this.flow.content.length
  }

}
