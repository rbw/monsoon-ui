import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';

import saga from 'containers/Backends/Monsoon/sagas';

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Hosts from 'containers/Hosts/Loadable';
import ModalContainer from 'containers/Modal';
import Sidebar from '../Sidebar';
import { styles } from './styles';

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  transitions: {
    create: () => 'none',
  },
  typography: {
    fontFamily: ['Roboto'],
    fontSize: 14,
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    background: {
      default: '#d8ddd4',
      paper: '#ffffff',
    },
    primary: {
      light: '#00adb5',
      main: '#53354a',
      contrastText: '#7a7a7a',
    },
    secondary: {
      light: '#0066ff',
      main: '#414D59',
      contrastText: '#3a3a3a',
    },
  },
});

class Root extends React.PureComponent {
  componentWillMount() {
    console.log('component mount');
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container className={classes.root} direction="row">
          <CssBaseline />
          <Grid item>
            <Sidebar />
          </Grid>
          <Grid item className={classes.contentContainer}>
            <Switch>
              <Route exact path="/" component={Hosts} />
              <Route component={NotFoundPage} />
            </Switch>
          </Grid>
        </Grid>
        <ModalContainer />
      </MuiThemeProvider>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  injectSaga({ key: 'backend_crud', saga }),
  withStyles(styles),
)(Root);
