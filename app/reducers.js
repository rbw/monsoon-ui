/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';

import globalReducer from 'containers/App/reducer';
import modalReducer from 'containers/Modal/reducer';

import history from 'utils/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    modal: modalReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
