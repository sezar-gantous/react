import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

export const DecimalNumberInput = props => {
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

DecimalNumberInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
