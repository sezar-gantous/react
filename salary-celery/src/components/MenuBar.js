import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import logoSmall from "../img/logo-small.png";
import {
  MENU_LABEL_HOME,
  MENU_LABEL_ABOUT,
  MENU_LABEL_SIGNIN
} from "../lib/strings";

const styles = theme => ({
  navContainer: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  navLinks: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold"
  },
  logoSmall: {
    width: 35,
    verticalAlign: "middle"
  },
  activeMenuItem: {
    "&>*": { borderBottom: "4px solid #7ABB93" }
  },
  hide: {
    visibility: "hidden"
  },
  grow: {
    flexGrow: 1
  }
});

const MenuBar = props => {
  const { classes } = props;

  return (
    <Grid container spacing={16} className={classes.navContainer}>
      <Grid container spacing={16}>
        <Grid item className={classes.grow}>
          <NavLink
            exact
            activeClassName={classes.hide}
            to="/"
            className={classes.navLinks}
          >
            <Typography variant="h6" color="inherit">
              {MENU_LABEL_HOME}
              <img
                src={logoSmall}
                className={classes.logoSmall}
                alt={logoSmall != null ? logoSmall : MENU_LABEL_HOME}
              />
            </Typography>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink
            exact
            activeClassName={classes.activeMenuItem}
            to="/about"
            className={classes.navLinks}
          >
            <Typography variant="h6" color="inherit">
              {MENU_LABEL_ABOUT}
            </Typography>
          </NavLink>
        </Grid>

        <Grid item>
          <NavLink
            exact
            activeClassName={classes.activeMenuItem}
            to="/login"
            className={classes.navLinks}
          >
            <Typography color="inherit" variant="h6">
              {MENU_LABEL_SIGNIN}
            </Typography>
          </NavLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuBar);
