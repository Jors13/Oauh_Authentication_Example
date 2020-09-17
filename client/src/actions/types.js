/**
 * Types used for each action to be dispatched
 *
 * Naming convention (Not mandatory but highly recommended)
 * "(Reducer type)_(Action to be used)_(Description)"
 * "TODOS_GET_TODOS"
 *
 * Actions:
 * GET: Gets and replace some information
 * UPDATE: Update some information that's already in the reducer
 * DELETE: Delete some information in the reducer
 * ...More to be added if necessary
 */

export const PROCESS_LOGIN_USER = "PROCESS_LOGIN_USER";
export const PROCESS_LOGIN_TOKEN = "PROCESS_LOGIN_TOKEN";
export const USER_GET = "USER_GET";
export const USER_LOGOUT = "USER_LOGOUT";
