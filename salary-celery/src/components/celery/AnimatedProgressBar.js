import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import { prettyNumber } from "../../lib/utils";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  initRatingLabel: {
    opacity: 0.5,
    color: "inherit !important",
    fontSize: "inherit !important"
  },
  activeRatingLabel: {
    opacity: 1,
    fontSize: "17pt"
  },
  rottenLabelColor: { color: "rgb(225, 235, 169)" },
  notBadLabelColor: { color: "rgb(196, 222, 159)" },
  greatLabelColor: { color: "rgb(122, 187, 147)" },
  rottenBackground: {
    width: "25%",
    backgroundColor: "rgb(225, 235, 169)"
  },
  notBadBackground: {
    width: "50%",
    backgroundColor: "rgb(196, 222, 159)"
  },
  greatBackground: {
    width: "100%",
    backgroundColor: "rgb(122, 187, 147)"
  },
  progress: {
    margin: "0 auto",
    backgroundColor: "#7b7b7b1a"
  },
  progressBar: {
    height: 16,
    transition: "0.4s ease-in-out",
    transitionProperty: "width, background-color"
  },
  initProgressBarColor: {
    backgroundColor: "transparent"
  },
  ratingLabelsContainer: {
    transition: "0.4s linear",
    transitionProperty: "opacity, font-size",
    textAlign: "center",
    height: 55
  },
  ratingLabels: {
    transition: "0.2s ease-in-out",
    transitionProperty: "opacity, font-size"
  },
  minMaxCounter: {
    color: "#848383",
    fontWeight: "bold"
  }
});

class AnimatedProgressBar extends Component {
  state = {
    currentRating: "",
    barWidth: 0,
    barColor: 0
  };

  componentDidMount = () => {
    this.updateUI();
  };

  componentDidUpdate = prevProps => {
    if (this.props.celery.salary !== prevProps.celery.salary) {
      this.updateUI();
    }
  };

  updateUI = () => {
    const { salary, ratingMax, ratingLabels } = this.props.celery;
    const { classes } = this.props;

    let barWidth = ratingMax > 0 ? (salary / ratingMax) * 100 : 0;
    let barColor = classes.initProgressBarColor;
    let current = "";

    if (barWidth > 50) {
      barColor = classes.greatBackground;
      current = ratingLabels[2];
    } else if (barWidth > 25) {
      barColor = classes.notBadBackground;
      current = ratingLabels[1];
    } else if (barWidth > 0) {
      barColor = classes.rottenBackground;
      current = ratingLabels[0];
    }

    this.setState({
      currentRating: current,
      barWidth: barWidth,
      barColor: barColor
    });
  };

  ratingCssClassCheck = (thisRating, currentRating, classes) => {
    return thisRating === currentRating
      ? classes.activeRatingLabel
      : classes.initRatingLabel;
  };

  render() {
    const { classes } = this.props;
    const { ratingLabels, ratingMax, ratingMin } = this.props.celery;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            justify="center"
            className={classes.ratingLabelsContainer}
          >
            <Grid item xs={3}>
              <Typography
                className={cx(
                  classes.ratingLabels,
                  classes.rottenLabelColor,
                  this.ratingCssClassCheck(
                    ratingLabels[0],
                    this.state.currentRating,
                    classes
                  )
                )}
                variant="h6"
              >
                {ratingLabels[0]}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                className={cx(
                  classes.ratingLabels,
                  classes.notBadLabelColor,
                  this.ratingCssClassCheck(
                    ratingLabels[1],
                    this.state.currentRating,
                    classes
                  )
                )}
                variant="h6"
              >
                {ratingLabels[1]}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                className={cx(
                  classes.ratingLabels,
                  classes.greatLabelColor,
                  this.ratingCssClassCheck(
                    ratingLabels[2],
                    this.state.currentRating,
                    classes
                  )
                )}
                variant="h6"
              >
                {ratingLabels[2]}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.progress}>
            <div
              className={cx(classes.progressBar, this.state.barColor)}
              style={{ maxWidth: this.state.barWidth + "%" }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <span className={classes.minMaxCounter}>
            {ratingMin > 0 ? prettyNumber(ratingMin) : ""}
          </span>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <span className={classes.minMaxCounter}>
            {ratingMax > 0 ? prettyNumber(ratingMax) : ""}
          </span>
        </Grid>
      </Grid>
    );
  }
}

AnimatedProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
  celery: PropTypes.object.isRequired
};

export default withStyles(styles)(AnimatedProgressBar);
