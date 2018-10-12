import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  navContainer: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  navLinks: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold"
  }
});

const MenuBar = props => {
  const { classes } = props;
  return (
    <Grid
      container
      justify="flex-end"
      spacing={16}
      className={classes.navContainer}
    >
      <Grid item>
        <Link to="/about" className={classes.navLinks}>
          <Typography variant="h6" color="inherit">
            About
          </Typography>
        </Link>
      </Grid>

      <Grid item>
        <Link to="#" className={classes.navLinks}>
          <Typography color="inherit" variant="h6">
            Sign In
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuBar);
