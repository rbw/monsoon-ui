import { MODAL_SHOW, MODAL_HIDE, MODAL_HOST } from './constants';

function showDefaultModal(modalType, modalProps, extraProps) {
  return {
    type: MODAL_SHOW,
    extraProps,
    modalType,
    modalProps,
  };
}

export function hideModal() {
  return {
    type: MODAL_HIDE,
  };
}

export function openHostModal(modalProps, extraProps) {
  return showDefaultModal(MODAL_HOST, modalProps, extraProps);
}
