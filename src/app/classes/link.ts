export class Link {
  static NOT_FOUND = '/404'; // Link.NOT_FOUND

  // AUTH
  static AUTH_ROOT = '/auth'; // Link.AUTH_ROOT
  static AUTH_LOGIN = `${Link.AUTH_ROOT}/login`; // Link.AUTH_LOGIN
  static AUTH_SIGNUP = `${Link.AUTH_ROOT}/signup`; // Link.AUTH_SIGNUP

  // COURRIEL
  static FLOW_ROOT = '/courriel'; // Link.FLOW
  static FLOW_APP = `${Link.FLOW_ROOT}/flow`; // Link.FLOW
  static FLOWS_INBOX = `${Link.FLOW_APP}/inbox`; // Link.FLOWS
  static FLOWS_SENT = `${Link.FLOW_APP}/sent`; // Link.FLOWS
  static FLOW_PAGE = `${Link.FLOW_APP}/project`; // Link.FLOW_PAGE
  static FLOW_ASSIGN = `${Link.FLOW_APP}/assign`; // Link.FLOW_ASSIGN
  static FLOW_REPLY = `${Link.FLOW_APP}/reply`; // Link.FLOW_REPLY
  static FLOW_ROUTE = `${Link.FLOW_APP}/route`; // Link.FLOW_ROUTE
  static FLOW_SEND = `${Link.FLOW_APP}/send`; // Link.FLOW_SEND

  // USER
  static USERS = `${Link.FLOW_ROOT}/users`; // Link.USERS
  static USER = `${Link.FLOW_ROOT}/user`; // Link.USER

  // ENTITY
  static ENTITIES = `${Link.FLOW_ROOT}/entities`; // Link.ENTITIES
  static ENTITY = `${Link.FLOW_ROOT}/entity`; // Link.ENTITY

  // SETTINGS
  static SETTINGS = `${Link.FLOW_ROOT}/settings`; // Link.SETTINGS

  // DASHBOARD
  static DASHBOARD_APP = `${Link.FLOW_ROOT}/dashboard`; // Link.DASHBOARD_APP

  // CHAT APP
  static CHAT_APP = `${Link.FLOW_ROOT}/chat`; // Link.CHAT_APP

  // SEARCH
  static SEARCH_ROOT = '/search'; // Link.SEARCH_ROOT
  static SEARCH_APP = Link.SEARCH_ROOT; // Link.SEARCH_APP
  static SEARCH_SAVE = `${Link.SEARCH_APP}/save`; // Link.SEARCH_SAVE
}