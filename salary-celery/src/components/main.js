import React from "react";
import { Switch, Route } from "react-router-dom";
import { SalaryCelery, About } from "../pages";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  }
});

const Main = props => {
  const { classes } = props;

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12}>
        <Switch>
          <Route exact path="/" component={SalaryCelery} />
          <Route path="/about" component={About} />
        </Switch>
      </Grid>
    </Grid>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Main);
