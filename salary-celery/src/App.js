import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Main from "./components/main";
import MenuBar from "./components/MenuBar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={cx(App, classes.root)} justify="center">
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={16} justify="center">
            <Grid item xs={12}>
              <MenuBar />
            </Grid>
            <Grid item xs={12}>
              <Main />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
