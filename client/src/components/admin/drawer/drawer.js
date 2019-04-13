import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PollIcon from "@material-ui/icons/Poll";
import AddIcon from "@material-ui/icons/AddBox";

import { navigate } from "../../../__actions/adminActions";

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class SideNav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {[{ name: "manage" }, { name: "create" }].map((value, index) => (
            <ListItem
              button
              key={value.name}
              onClick={() => this.props.navigate({ page: value.name })}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <PollIcon /> : <AddIcon />}
              </ListItemIcon>
              <ListItemText primary={value.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    );
  }
}

SideNav.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { navigate }
  )(SideNav)
);
