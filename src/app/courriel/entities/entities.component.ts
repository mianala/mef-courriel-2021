import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/classes/entity';
import { Link } from 'src/app/classes/link';
import { EntityService } from './service/entity.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
})
export class EntitiesComponent implements OnInit {
  Link = Link;
  constructor(public entityService: EntityService) {}

  ngOnInit(): void {}
}
