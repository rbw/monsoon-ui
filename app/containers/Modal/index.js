import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import HostModal from 'containers/Host';
import { MODAL_HOST } from './constants';

const MODAL_COMPONENTS = {
  [MODAL_HOST]: HostModal,
};

class ModalContainer extends React.PureComponent {
  render() {
    const { type, props } = this.props;
    if (!type) {
      return null;
    }

    const ModalComponent = MODAL_COMPONENTS[type];
    return <ModalComponent {...props} />;
  }
}

ModalContainer.propTypes = {
  type: PropTypes.string,
  props: PropTypes.object,
};

export default connect(state => state.modal.toJS())(ModalContainer);

/*export function mapStateToProps(state) {
  return {};
}

export default compose(
  connect(
    mapStateToProps,
    null,
  ),
)(ModalContainer);*/
