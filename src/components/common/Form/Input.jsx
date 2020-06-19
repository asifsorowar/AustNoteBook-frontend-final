import React from "react";
import { TextField, FormControl } from "@material-ui/core";
import { useFormikContext } from "formik";
// import ErrorMessage from "./errorMessage";

const Input = ({ name, ...otherProps }) => {
  const {
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
  } = useFormikContext();

  const isError = (error, visible) => {
    if (!visible || !error) return false;
    return true;
  };

  return (
    <FormControl fullWidth>
      <TextField
        onChange={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        error={isError(errors[name], touched[name])}
        helperText={errors[name]}
        {...otherProps}
      />
      {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </FormControl>
  );
};

export default Input;
