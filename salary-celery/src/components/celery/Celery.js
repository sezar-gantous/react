import React, { Component } from "react";
import PropTypes from "prop-types";
import RatingSelector from "./RatingSelector";
import NumberFormat from "react-number-format";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
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
  INPUT_PLACEHOLDER_JOBTITLE
} from "../../lib/strings";

const styles = theme => ({
  textField: {
    marginRight: theme.spacing.unit
  },
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  }
});

const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({ target: { value: values.value } });
      }}
      allowNegative={false}
      decimalScale={1}
    />
  );
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

class Celery extends Component {
  state = {
    celery: {
      jobTitle: "",
      yearsOfExperience: "",
      location: "",
      ratingLabels: [LABEL_ROTTEN, LABEL_NOTBAD, LABEL_GREAT],
      selectedRating: "",
      ratingMin: "",
      ratingMax: ""
    }
  };

  handleInputChange = name => e => {
    let celery = Object.assign({}, this.state.celery);
    celery[name] = e.target.value;
    this.setState({ celery }, () => {
      name === INPUT_NAME_JOBTITLE && this.setRating();
    });
  };

  setRating = () => {
    let min = 0,
      max = 0;
    if (this.state.celery.jobTitle.length > 0) {
      min = 30;
      max = 120;
    }

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
            value={this.state.jobTitle}
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
            value={this.state.yearsOfExperience}
            margin="none"
            fullWidth
            variant="outlined"
            onChange={this.handleInputChange(INPUT_NAME_YEARSOFEXPERIENCE)}
            InputProps={{ inputComponent: NumberFormatCustom }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="input-location"
            label={INPUT_LABEL_LOCATION}
            name={INPUT_NAME_LOCATION}
            className={classes.textField}
            value={this.state.location}
            margin="none"
            fullWidth
            variant="outlined"
            onChange={this.handleInputChange(INPUT_NAME_LOCATION)}
          />
        </Grid>
        <Grid item xs={12}>
          <br />
          <RatingSelector celery={this.state.celery} />
        </Grid>
      </Grid>
    );
  }
}
Celery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Celery);
