import gql from 'graphql-tag';
import { Entity } from '../classes/entity';
import { Flow } from '../classes/flow';

const FlowQueries = {
  FLOW: gql`
    ${Flow.ITEM_FLOW_FIELDS}

    query get_flow($id: Int!) {
      flow(where: { id: { _eq: $id } }) {
        ...ItemFlowFields
        children {
          ...CoreFlowFields
        }
        flows {
          ...CoreFlowFields
        }
      }
    }
  `,

  FLOW_ROUTE: gql`
    ${Flow.ITEM_FLOW_FIELDS}

    query get_flow($id: Int!) {
      flow(where: { id: { _eq: $id } }) {
        ...ItemFlowFields
        root {
          ...ItemFlowFields

          flows {
            ...ItemFlowFields
          }
        }
      }
    }
  `,

  INBOX: gql`
    ${Flow.ITEM_FLOW_FIELDS}
    query get_inbox_flows($entity_id: Int!) {
      flow(where: { owner_id: { _eq: $entity_id } }, order_by: { id: desc }) {
        ...ItemFlowFields
      }
    }
  `,

  SENT: gql`
    ${Flow.ITEM_FLOW_FIELDS}

    query get_sent_flows($entity_id: Int!) {
      flow(
        where: { initiator_id: { _eq: $entity_id } }
        order_by: { id: desc }
      ) {
        ...ItemFlowFields
      }
    }
  `,

  UPDATE: gql`
    mutation update_flow_mutation(
      $flow_id: Int!
      $_set: flow_set_input = {}
      $_inc: flow_inc_input = {}
    ) {
      update_flow(where: { id: { _eq: $flow_id } }, _set: $_set, _inc: $_inc) {
        affected_rows
        returning {
          id
        }
      }
    }
  `,

  SEARCH: gql`
    ${Entity.CORE_ENTITY_FIELDS}
    ${Flow.CORE_FLOW_FIELDS}
    query searchFlows($where: flow_bool_exp = {}) {
      flow(where: $where, order_by: { id: desc }) {
        ...CoreFlowFields
        initiator {
          ...CoreEntityFields
        }
        parent {
          ...CoreFlowFields
        }
        root {
          ...CoreFlowFields
        }
        owner {
          ...CoreEntityFields
        }
      }
    }
  `,

  ADD: gql`
    mutation send_project($objects: [flow_insert_input!]!) {
      insert_flow(objects: $objects) {
        affected_rows
        returning {
          id
          content
          title
          numero
          files {
            id
          }
        }
      }
    }
  `,
  DELETE: gql`
    mutation delete_flow_mutation($flow_id: Int!) {
      delete_flow(where: { id: { _eq: $flow_id } }) {
        affected_rows
        returning {
          id
        }
      }
    }
  `,
};

export default FlowQueries;
