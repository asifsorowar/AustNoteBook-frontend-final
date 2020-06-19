import React from "react";

const ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;

  return (
    <div severity="error" className="text-danger">
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;
