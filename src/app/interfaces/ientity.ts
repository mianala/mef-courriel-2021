export interface IEntity {
  id: number;
  id_text: string;
  long: string;
  short: string;
  numero: number;
  sent_count: number;
  received_count: number;
  active: boolean;
  short_header: string;
  long_header: string;
  labels: string;
  sub_entities_count: number;
  level: number;
  parent_entity_id: number;
}
