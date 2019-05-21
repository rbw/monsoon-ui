import { getList } from 'containers/Backends/Monsoon/actions';
import { LOAD_REQUESTED, LOAD_RESOLVED, LOAD_REJECTED } from './constants';

export function getConfig() {
  return getList({
    path: '/config',
    onStart: LOAD_REQUESTED,
    onSuccess: LOAD_RESOLVED,
    onError: LOAD_REJECTED,
  });
}
