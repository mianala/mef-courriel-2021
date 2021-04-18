import { Component, Input, OnInit } from '@angular/core';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { FlowService } from 'src/app/app/flow/flow.service';
import { UserService } from 'src/app/app/users/user.service';
import { Flow } from 'src/app/classes/flow';

@Component({
  selector: 'search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() query: string = ""

  results: Flow[] = [];
  constructor(private flowService: FlowService, private entityService: EntityService, private userService: UserService) {



  }

  ngOnInit(): void {
  }

  searchFlow() {
    const searchFlowVariable = {
      owner_id: { _eq: 10 },
      content: { _eq: "" },
    }
    this.flowService.search(searchFlowVariable)
  }



}
