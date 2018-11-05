import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

export const DollarPrefixedInput = props => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      allowNegative={false}
      onValueChange={values => {
        onChange({ target: { value: values.value } });
      }}
      thousandSeparator
      prefix="$"
    />
  );
};

DollarPrefixedInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
