import React from "react";
import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";
import { Table, TableContainer, Paper } from "@material-ui/core";

const MyTable = ({ sortColumn, columns, onSort, data }) => {
  return (
    <TableContainer component={Paper} className="mt-5">
      <Table aria-label="simple table">
        <TableHeader
          sortColumn={sortColumn}
          columns={columns}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </Table>
    </TableContainer>
  );
};

export default MyTable;
