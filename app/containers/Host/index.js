import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { hideModal } from 'containers/Modal/actions';

import moment from 'moment';

import Modal from 'components/Modal';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import classNames from 'classnames';

import styles from './styles';

class Host extends React.PureComponent {
  state = {
    session: '',
    services: [],
  };

  saveSettings = () => {
    this.props.hide();
  };

  componentDidMount() {
    const URL = `ws://localhost:5000/api/monsoon/services?host_name=${
      this.props.extraProps.name
    }`;

    this.session = new WebSocket(URL);
    this.session.onmessage = evt => {
      const data = JSON.parse(evt.data);
      this.setState({ services: data });
    };
  }

  componentWillUnmount() {
    this.session.close();
  }

  renderService = svc => {
    const {
      last_check: lastCheck,
      display_name: displayName,
      plugin_output: pluginOutput,
    } = svc;

    const { classes } = this.props;
    const lastChecked = moment(lastCheck * 1000).fromNow();

    let statusClass;
    let statusText;

    switch (svc.state) {
      case 0:
        statusText = 'OK';
        statusClass = classes.cellStatusHealthy;
        break;
      case 1:
        statusText = 'Warning';
        statusClass = classes.cellStatusWarning;
        break;
      case 2:
        statusText = 'Critical';
        statusClass = classes.cellStatusCritical;
        break;
      default:
        statusText = 'Unknown';
        statusClass = classes.cellStatusUnknown;
        break;
    }

    const statusClasses = classNames(classes.cellStatus, statusClass);

    return (
      <TableRow hover key={displayName}>
        <TableCell className={statusClasses} style={{ border: 0 }} />
        <TableCell align="left">{displayName}</TableCell>
        <TableCell align="left">{statusText}</TableCell>
        <TableCell align="left">{pluginOutput}</TableCell>
        <TableCell align="left">{lastChecked}</TableCell>
      </TableRow>
    );
  };

  render() {
    const { classes, modalProps, hide } = this.props;

    return (
      <Modal onCancel={hide} onConfirm={this.saveSettings} {...modalProps}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellStatus}> </TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">State</TableCell>
                <TableCell align="left">Output</TableCell>
                <TableCell align="left">Last check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.state.services.map(this.renderService)}</TableBody>
          </Table>
        </Paper>
      </Modal>
    );
  }
}

Host.propTypes = {
  hide: PropTypes.func.isRequired,
  modalProps: PropTypes.object.isRequired,
  extraProps: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    hide: () => {
      dispatch(hideModal());
    },
  };
}

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(Host);
