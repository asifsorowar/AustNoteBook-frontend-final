import React from "react";
import { Button } from "@material-ui/core";

const MyButton = ({ children, ...otherProps }) => {
  return (
    <Button className="m-2" variant="contained" {...otherProps}>
      {children}
    </Button>
  );
};

export default MyButton;
