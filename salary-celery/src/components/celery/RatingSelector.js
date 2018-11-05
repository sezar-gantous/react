import React, { Component } from "react";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

const styles = theme => ({
  ratingRotten: {
    background: "rgb(225, 235, 169)",
    width: "100%",
    border: 0,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    height: 7,
    cursor: "pointer"
  },
  rottenBackground: {
    color: "rgb(145, 182, 122)",
    background: "rgb(225, 235, 169)",
    fontSize: 15
    /* transform: " translate3d(0px, 15px, 0px) !important" */
  },
  notBadBackground: {
    color: "rgb(145, 180, 117)",
    background: "rgb(196, 222, 159)",
    fontSize: 15
    /* transform: " translate3d(0px, 15px, 0px) !important" */
  },
  greatBackground: {
    color: "rgb(211, 243, 223)",
    background: "rgb(122, 187, 147)",
    fontSize: 15
    /* transform: " translate3d(0px, 15px, 0px) !important" */
  },
  ratingNotBad: {
    background: "rgb(196, 222, 159)",
    width: "100%",
    border: 0,
    height: 7,
    cursor: "pointer"
  },
  ratingGreat: {
    background: "rgb(122, 187, 147)",
    width: "100%",
    border: 0,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    height: 7,
    cursor: "pointer"
  },
  initRating: {
    width: 55,
    background: "rgb(122, 187, 147)",
    height: 7,
    border: 0,
    borderRadius: 2
  },
  minMaxCounter: {
    lineHeight: 4,
    position: "absolute",
    color: "#848383",
    fontWeight: "bold"
  },
  maxCounter: {
    right: 52
  },

  arrowPopper: {
    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${
          theme.palette.grey[700]
        } transparent`
      }
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${
          theme.palette.grey[700]
        } transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${
          theme.palette.grey[700]
        } transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${
          theme.palette.grey[700]
        }`
      }
    }
  },
  arrowArrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  }
});

class RatingSelector extends Component {
  printSelector = classes => {
    const { jobTitle, yearsOfExperience, ratingLabels } = this.props.celery;

    //console.log(jobTitle);
    if (jobTitle.length > 0 && yearsOfExperience.length > 0) {
      return (
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Tooltip
              disableFocusListener
              title={ratingLabels[0]}
              classes={{ tooltip: classes.rottenBackground }}
            >
              <button className={classes.ratingRotten} />
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip
              disableFocusListener
              title={ratingLabels[1]}
              classes={{ tooltip: classes.notBadBackground }}
            >
              <button className={classes.ratingNotBad} />
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip
              disableFocusListener
              title={ratingLabels[2]}
              classes={{ tooltip: classes.greatBackground }}
            >
              <button className={classes.ratingGreat} />
            </Tooltip>
          </Grid>
        </Grid>
      );
    } else if (jobTitle.length > 0 && yearsOfExperience.length == 0) {
      return <button className={classes.ratingGreat} />;
    } else {
      return <hr className={classes.initRating} />;
    }
  };

  render() {
    const { classes } = this.props;
    const { ratingMax, ratingMin } = this.props.celery;

    return (
      <Grid container justify="center" style={{ position: "relative" }}>
        <Grid item>
          <span className={classes.minMaxCounter}>
            {ratingMin > 0 ? ratingMin + "k" : ""}
          </span>
        </Grid>
        <Grid item>
          <span className={cx(classes.minMaxCounter, classes.maxCounter)}>
            {ratingMax > 0 ? ratingMax + "k" : ""}
          </span>
        </Grid>
        <Grid item xs={10}>
          {this.printSelector(classes)}
        </Grid>
      </Grid>
    );
  }
}

RatingSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  celery: PropTypes.object.isRequired
};

export default withStyles(styles)(RatingSelector);
