import gql from 'graphql-tag';
import { EntityService } from '../services/entity.service';

export class Entity {
  id = 0;
  id_text = '';
  long = '';
  short = '';
  numero = 0;
  sent_count = 0;
  level = 0;
  received_count = 0;
  active = true;
  short_header = '';
  long_header = '';
  labels = '';
  letter_texts = '';
  type_texts = '';
  observations = '';
  sub_entities_count = 0;
  parent: Entity | undefined;
  children: Entity[] = [];
  parent_id = 0;
  users = [];

  constructor(_entity: Partial<{}> = {}) {
    Object.assign(this, _entity);
  }

  desactivate() {}
  activate() {}
  delete() {}

  labelsArray() {
    return this.labels.split(',');
  }
  observationsArray() {
    return this.observations.split(',');
  }
  letterTextsAray() {
    return this.letter_texts.split(',');
  }

  static DEFAULT_LETTER_TEXTS = [
    'Lecture',
    'Signature',
    'Originale',
    'Media',
    'Copie',
    'Confidentiel',
    'Enveloppe',
  ];

  static CORE_ENTITY_FIELDS = gql`
    fragment CoreEntityFields on entity {
      id
      id_text
      long
      short
      numero
      sent_count
      received_count
      active
      level
      parent_id
      short_header
      long_header
      sub_entities_count
    }
  `;
}
