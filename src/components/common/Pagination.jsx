import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const MyPagination = ({ itemCounts, pageSize, pageOnChange }) => {
  const pageCounts = Math.ceil(itemCounts / pageSize);
  if (pageCounts === 1) return null;

  return (
    <Pagination
      count={pageCounts}
      onChange={(e, value) => pageOnChange(value)}
      color="primary"
    />
  );
};

export default MyPagination;
