import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/styles';

import classNames from 'classnames';
import moment from 'moment';

import { openHostModal } from 'containers/Modal/actions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { styles } from './styles';

export class Hosts extends React.PureComponent {
  state = {
    session: new WebSocket('ws://localhost:5000/api/monsoon/hosts'),
    hosts: [],
  };

  componentWillMount() {
    this.state.session.onmessage = evt => {
      const data = JSON.parse(evt.data);
      this.setState({ hosts: data });
    };
  }

  componentWillUnmount() {
    this.state.session.close();
  }

  renderHost = host => {
    const { classes } = this.props;

    const {
      num_services: svcsTotal,
      num_services_crit: svcsCrit,
      num_services_warn: svcsWarn,
      num_services_pending: svcsPend,
      num_services_ok: svcsOk,
      last_check: lastCheck,
      name,
      alias,
      address,
      groups,
    } = host;

    const lastChecked = moment(lastCheck * 1000).fromNow();
    let statusClass = '#000000';

    if (svcsCrit > 0) {
      statusClass = classes.cellStatusCritical;
    } else if (svcsWarn > 0) {
      statusClass = classes.cellStatusWarning;
    } else if (svcsPend > 0) {
      statusClass = classes.cellStatusPending;
    } else if (svcsOk === svcsTotal) {
      statusClass = classes.cellStatusHealthy;
    } else {
      statusClass = classes.cellStatusUnknown;
    }

    const statusClasses = classNames(classes.cellStatus, statusClass);

    return (
      <TableRow hover key={name} onClick={() => this.props.showHost(name)}>
        <TableCell className={statusClasses} style={{ border: 0 }} />
        <TableCell align="left">{alias}</TableCell>
        <TableCell align="left">{address}</TableCell>
        <TableCell align="left">{groups.join(', ') || 'None'}</TableCell>
        <TableCell align="left">{lastChecked}</TableCell>
      </TableRow>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cellStatus}> </TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Groups</TableCell>
              <TableCell align="left">Last check</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.state.hosts.map(this.renderHost)}</TableBody>
        </Table>
      </Paper>
    );
  }
}

Hosts.propTypes = {
  classes: PropTypes.object.isRequired,
  showHost: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    showHost: name => {
      dispatch(
        openHostModal(
          {
            cancelButtonText: 'Close ',
            width: 950,
          },
          {
            name,
          },
        ),
      );
    },
  };
}

export function mapStateToProps(state) {
  return {};
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Hosts);
