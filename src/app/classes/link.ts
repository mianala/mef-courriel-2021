export class Link {
  static NOT_FOUND = '/404'; // Link.NOT_FOUND

  // ADMIN
  static ADMIN_ROOT = '/admin'; // Link.ADMIN_ROOT
  static ENTITIES_STRING = `entities`; // Link.ENTITIES
  static ENTITIES = `${Link.ADMIN_ROOT}/${Link.ENTITIES_STRING}`; // Link.ENTITIES
  static ENTITIES_ADD = `${Link.ENTITIES}/add`; // Link.ENTITIES
  static ENTITIES_INACTIVE = `${Link.ENTITIES}/inactive`; // Link.ENTITIES
  static USERS_STRING = `users`; // Link.USERS
  static USERS = `${Link.ADMIN_ROOT}/${Link.USERS_STRING}`; // Link.USERS
  static USERS_UNVERIFIED = `${Link.USERS}/unverified`; // Link.USERS
  static USERS_INACTIVE = `${Link.USERS}/inactive`; // Link.USERS

  // APPS
  static APPS_ROOT = '/apps'; // Link.APPS_ROOT

  // AUTH
  static AUTH_STRING = 'auth'; // Link.AUTH_ROOT
  static AUTH_ROOT = `/${Link.AUTH_STRING}`; // Link.AUTH_ROOT
  static AUTH_LOGIN = `${Link.AUTH_ROOT}/login`; // Link.AUTH_LOGIN
  static AUTH_SIGNUP = `${Link.AUTH_ROOT}/signup`; // Link.AUTH_SIGNUP

  // COURRIEL
  static FLOW_BASE_STRING = 'courriel';
  static FLOW_ROOT = `/${Link.FLOW_BASE_STRING}`; // Link.FLOW

  static FLOW_STRING = 'flow';
  static FLOW_APP = `${Link.FLOW_ROOT}/${Link.FLOW_STRING}`; // Link.FLOW
  static FLOWS_INBOX = `${Link.FLOW_APP}/inbox`; // Link.FLOWS
  static FLOWS_ASSIGNED = `${Link.FLOW_APP}/assigned`; // Link.FLOWS

  static FLOWS_SENT = `${Link.FLOW_APP}/sent`; // Link.FLOWS
  static FLOW_PAGE = `${Link.FLOW_APP}/project`; // Link.FLOW_PAGE
  static FLOW_ASSIGN = `${Link.FLOW_APP}/assign`; // Link.FLOW_ASSIGN
  static FLOW_SAVE = `${Link.FLOW_APP}/save`; // Link.FLOW_SAVE
  static FLOW_REPLY = `${Link.FLOW_APP}/reply`; // Link.FLOW_REPLY
  static FLOW_ROUTE = `${Link.FLOW_APP}/route`; // Link.FLOW_ROUTE
  static FLOW_SEND = `${Link.FLOW_APP}/send`; // Link.FLOW_SEND
  static FLOW_SIGN = `${Link.FLOW_APP}/sign`; // Link.FLOW_SEND

  // USER
  static USER_WORD = `user`; // Link.USER
  static USER = `${Link.FLOW_ROOT}/user`; // Link.USER

  // ENTITY
  static ENTITY = `${Link.FLOW_ROOT}/entity`; // Link.ENTITY

  // SETTINGS
  static SETTINGS = `${Link.FLOW_ROOT}/settings`; // Link.SETTINGS

  // DASHBOARD
  static DASHBOARD_STRING = `dashboard`; // Link.DASHBOARD_ROOT
  static DASHBOARD_ROOT = `/${Link.DASHBOARD_STRING}`; // Link.DASHBOARD_ROOT
  static DASHBOARD_APP = `${Link.FLOW_ROOT}/dashboard`; // Link.DASHBOARD_APP

  // CHAT APP
  static CHAT_STRING = `chat`; // Link.CHAT_APP
  static CHAT_APP = `${Link.FLOW_ROOT}/${Link.CHAT_STRING}`; // Link.CHAT_APP

  // SEARCH
  static SEARCH_STRING = 'search'; // Link.SEARCH_ROOT
  static SEARCH_ROOT = `/${Link.SEARCH_STRING}`; // Link.SEARCH_ROOT
  static SEARCH_APP = Link.SEARCH_ROOT; // Link.SEARCH_APP
  static SEARCH_SAVE = `${Link.SEARCH_APP}/save`; // Link.SEARCH_SAVE

  // file icons assets folder URL
  static FILE_ICON_ASSETS_URL = '/assets/file-icons/'; // Link.FILE_ICON_ASSETS_URL
}
