import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import AnimatedProgressBar from "./AnimatedProgressBar";
import { DollarPrefixedInput, DecimalNumberInput } from "../customInputs";
import { API_getSalary } from "../../lib/service";
import {
  LABEL_ROTTEN,
  LABEL_NOTBAD,
  LABEL_GREAT,
  INPUT_NAME_JOBTITLE,
  INPUT_NAME_YEARSOFEXPERIENCE,
  INPUT_NAME_LOCATION,
  INPUT_LABEL_JOBTITLE,
  INPUT_LABEL_YEARSOFEXPERIENCE,
  INPUT_LABEL_LOCATION,
  INPUT_PLACEHOLDER_JOBTITLE,
  INPUT_LABEL_SALARY,
  INPUT_NAME_SALARY,
  INPUT_PLACEHOLDER_SALARY
} from "../../lib/strings";

const styles = theme => ({
  textField: {
    marginRight: theme.spacing.unit
  },
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  colorPrimary: {
    backgroundColor: "#DFF6EB"
  },
  barColorPrimary: {
    backgroundColor: "#7ABB93"
  }
});

class Celery extends Component {
  state = {
    celery: {
      jobTitle: "",
      salary: "",
      yearsOfExperience: "",
      location: "",
      ratingLabels: [LABEL_ROTTEN, LABEL_NOTBAD, LABEL_GREAT],
      selectedRating: "",
      ratingMin: "",
      ratingMax: ""
    },
    errorMsg: "",
    showLoading: false
  };

  handleInputChange = name => e => {
    let celery = Object.assign({}, this.state.celery);
    celery[name] = e.target.value;
    this.setState({ celery }, () => {
      name === INPUT_NAME_JOBTITLE && this.updateRating();
    });
  };

  updateRating = () => {
    this.setState({ showLoading: false });

    let job = this.state.celery.jobTitle.toLowerCase().trim();
    if (job.length > 0) {
      this.setState({ showLoading: true });
      API_getSalary(job)
        .then(res => {
          let min = 0,
            max = 0;
          if (res.length > 0) {
            this.setState({ showLoading: false });
            min = res[0].ratingMin;
            max = res[0].ratingMax;
          }
          this.setRating(min, max);
        })
        .catch(err => {
          this.setState({ showLoading: false });
          ///TODO
          ///show err to user
          console.log(err);
        });
    } else {
      this.setRating(0, 0);
    }
  };

  setRating = (min, max) => {
    let celery = Object.assign({}, this.state.celery);
    celery.ratingMin = min;
    celery.ratingMax = max;
    this.setState({ celery });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={16} className={classes.root}>
        <Grid item xs={12}>
          <TextField
            id="input-jobTitle"
            label={INPUT_LABEL_JOBTITLE}
            name={INPUT_NAME_JOBTITLE}
            placeholder={INPUT_PLACEHOLDER_JOBTITLE}
            value={this.state.celery.jobTitle}
            className={classes.textField}
            fullWidth
            margin="none"
            variant="outlined"
            onChange={this.handleInputChange(INPUT_NAME_JOBTITLE)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="input-yearsOfExperience"
            label={INPUT_LABEL_YEARSOFEXPERIENCE}
            name={INPUT_NAME_YEARSOFEXPERIENCE}
            className={classes.textField}
            value={this.state.celery.yearsOfExperience}
            margin="none"
            fullWidth
            variant="outlined"
            onChange={this.handleInputChange(INPUT_NAME_YEARSOFEXPERIENCE)}
            InputProps={{ inputComponent: DecimalNumberInput }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="input-location"
            label={INPUT_LABEL_LOCATION}
            name={INPUT_NAME_LOCATION}
            className={classes.textField}
            value={this.state.celery.location}
            margin="none"
            fullWidth
            variant="outlined"
            onChange={this.handleInputChange(INPUT_NAME_LOCATION)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="input-salary"
            label={INPUT_LABEL_SALARY}
            name={INPUT_NAME_SALARY}
            placeholder={INPUT_PLACEHOLDER_SALARY}
            value={this.state.celery.salary}
            className={classes.textField}
            fullWidth
            margin="none"
            variant="outlined"
            onChange={this.handleInputChange(INPUT_NAME_SALARY)}
            InputProps={{ inputComponent: DollarPrefixedInput }}
          />
        </Grid>

        <Grid item xs={12}>
          <br />
          <AnimatedProgressBar
            celery={this.state.celery}
            style={
              this.state.showLoading
                ? { display: "none" }
                : { display: "block" }
            }
          />
          {this.state.showLoading ? (
            <LinearProgress
              classes={{
                colorPrimary: classes.colorPrimary,
                barColorPrimary: classes.barColorPrimary
              }}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    );
  }
}
Celery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Celery);
