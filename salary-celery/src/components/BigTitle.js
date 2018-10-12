import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  bigGreenTitle: {
    fontWeight: "bold",
    marginTop: theme.spacing.uni,
    marginBottom: theme.spacing.uni
  },
  logoSmall: {
    width: 58,
    verticalAlign: "middle"
  }
});

const BigTitle = props => {
  const { classes, title, imgSrc, titleColor, imgAlt } = props;

  return (
    <Typography className={cx(classes.bigGreenTitle, titleColor)} variant="h3">
      {title}
      <img
        src={imgSrc}
        className={classes.logoSmall}
        alt={imgAlt != null ? imgAlt : title}
      />
    </Typography>
  );
};

BigTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  imgAlt: PropTypes.string
};
export default withStyles(styles)(BigTitle);
