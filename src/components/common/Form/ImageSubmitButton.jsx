import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const ImageSubmitButton = ({ label, htmlFor, ...otherProps }) => {
  return (
    <label htmlFor={htmlFor}>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        {...otherProps}
      >
        <PhotoCamera />
      </IconButton>
    </label>
  );
};

export default ImageSubmitButton;
