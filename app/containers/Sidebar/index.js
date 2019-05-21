import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { HashLink } from 'react-router-hash-link';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import ListSubheader from '@material-ui/core/ListSubheader';
import Icon from '@material-ui/core/Icon';

import { styles } from './styles';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: ['100', '200'],
    };
  }

  renderIcon = icon => (
    <ListItemIcon className={this.props.classes.menuIcon}>
      <Icon style={{ fontSize: 20 }}>{icon}</Icon>
    </ListItemIcon>
  );

  renderItemText = (item, onClick = null) => {
    const { classes } = this.props;
    const level = Number(item.id.charAt(0));
    const indentClass = `indentLevel${level}`;

    return (
      <ListItem
        button
        className={classnames(classes.listItem, classes[indentClass])}
        onClick={onClick}
        key={item.id}
      >
        {this.renderIcon(item.icon)}
        <ListItemText
          id={item.id}
          primary={item.label}
          disableTypography
          className={classes.itemText}
        />
      </ListItem>
    );
  };

  renderLeaf = item => {
    const { classes } = this.props;

    if ('link' in item) {
      return (
        <HashLink to={item.link} key={item.id} className={classes.navLink}>
          {this.renderItemText(item)}
        </HashLink>
      );
    }

    return this.renderItemText(item);
  };

  toggleExpanded = e => {
    const clicked = e.target.id;

    if (this.state.expanded.includes(clicked)) {
      this.setState(state => ({
        expanded: state.expanded.filter(item => item !== clicked),
      }));
    } else {
      this.setState(state => state.expanded.push(clicked));
    }
  };

  renderBranch = item => {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div key={item.id}>
        {this.renderItemText(item, this.toggleExpanded)}
        <Collapse
          timeout="auto"
          in={expanded.includes(item.id)}
          unmountOnExit
          className={classes.nested}
        >
          {item.items.map(this.renderItem)}
        </Collapse>
      </div>
    );
  };

  renderItem = item =>
    item.items ? this.renderBranch(item) : this.renderLeaf(item);

  render() {
    const { classes } = this.props;

    const sidebar = [
      {
        id: '100',
        label: 'monitoring',
        icon: 'perm_scan_wifi',
        items: [
          {
            id: '200',
            label: 'hosts',
            link: '/',
            icon: 'web_asset',
          },
          {
            id: '201',
            label: 'services',
            link: '/',
            icon: 'list_alt',
          },
        ],
      },
      {
        id: '101',
        label: 'configure',
        modal: 'settings',
        dialog: 'settings',
        icon: 'settings',
      },
    ];

    return (
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.title}>
            <span>MONSOON</span>
            <span className={classes.version}> POC</span>
          </ListSubheader>
        }
        className={classes.root}
      >
        {sidebar.map(this.renderItem)}
        <a
          className={classes.githubLink}
          href="http://github.com/rbw/monsoon-demo"
          target="_blank"
        >
        </a>
      </List>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(Sidebar);
