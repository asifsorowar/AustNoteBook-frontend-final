import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./errorMessage";

const Input = ({ name, ...otherProps }) => {
  const {
    setFieldValue,
    errors,
    setFieldTouched,
    touched,
  } = useFormikContext();

  return (
    <>
      <input
        name={name}
        onChange={(e) => {
          setFieldValue("file", e.target.files[0]);
        }}
        onBlur={() => setFieldTouched(name)}
        accept="image/*"
        type="file"
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default Input;
