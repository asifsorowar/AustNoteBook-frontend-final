import React from "react";
import {
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { useFormikContext } from "formik";
// import ErrorMessage from "./errorMessage";

const MySelect = ({ name, label, selectedItem, items, ...otherProps }) => {
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
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        onChange={handleChange(name)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        error={isError(errors[name], touched[name])}
        {...otherProps}
      >
        {selectedItem &&
          items.map((item) => (
            <MenuItem
              key={item._id || item}
              value={item._id || item}
              onClick={() => selectedItem(item._id || item)}
            >
              {item.name || item}
            </MenuItem>
          ))}

        {!selectedItem &&
          items.map((item) => (
            <MenuItem key={item._id || item} value={item._id || item}>
              {item.name || item}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{errors[name]}</FormHelperText>
      {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </FormControl>
  );
};

export default MySelect;
