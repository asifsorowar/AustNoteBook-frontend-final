import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteButton = ({ handleClick, ...otherProps }) => {
  return (
    <IconButton
      aria-label="delete"
      size="small"
      onClick={handleClick}
      {...otherProps}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteButton;
