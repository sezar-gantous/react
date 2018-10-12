import React from "react";
import { Celery } from "../components/celery";
import BigTitle from "../components/BigTitle";
import logoSmall from "../img/logo-small.png";
import PropTypes from "prop-types";
import { LABEL_TITLE } from "../lib/strings";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  greenColor: {
    color: "rgb(122, 187, 147)"
  },
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  }
});

const SalaryCelery = props => {
  const { classes } = props;
  return (
    <Grid container spacing={16} justify="center" className={classes.root}>
      <Grid item xs={12}>
        <BigTitle
          title={LABEL_TITLE}
          imgSrc={logoSmall}
          titleColor={classes.greenColor}
        />
      </Grid>
      <Celery />
    </Grid>
  );
};

SalaryCelery.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SalaryCelery);
