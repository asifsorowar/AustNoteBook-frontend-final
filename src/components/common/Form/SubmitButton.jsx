import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const SubmitButtom = ({ label, ...otherProps }) => {
  const { isValid, handleSubmit } = useFormikContext();

  return (
    <Button
      className="m-2"
      variant="contained"
      type="submit"
      disabled={!isValid}
      onClick={handleSubmit}
      {...otherProps}
    >
      {label}
    </Button>
  );
};

export default SubmitButtom;
