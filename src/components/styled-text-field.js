import React from "react";
import { TextField } from "final-form-material-ui";
import { Field } from "react-final-form";

export const StyledTextField = props => {
  let {
    name,
    label,
    type,
    parse,
    disabled,
    required,
    InputProps,
    autoComplete
  } = props;

  if (type === undefined) type = "text";         //по умолчанию type = "text"
  if (required === undefined) required = "true"; //по умолчанию required = "true"

  return (
    <Field
      component={TextField}
      fullWidth
      type={type}
      name={name}
      label={label}
      parse={parse}
      disabled={disabled}
      required={required}
      InputProps={InputProps}
      autoComplete={autoComplete}
      style={{ minHeight: "70px" }}
    />
  );
};
