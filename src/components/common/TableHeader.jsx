import React, { Component } from "react";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortColumn = (column) => {
    if (column.path !== this.props.sortColumn.path) return null;

    if (this.props.sortColumn.order === "asc")
      return (
        <span>
          <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
        </span>
      );

    return (
      <span>
        <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
      </span>
    );
  };

  render() {
    return (
      <TableHead className="bg-primary">
        <TableRow style={{ cursor: "pointer" }}>
          {this.props.columns.map((column) => (
            <TableCell
              className="text-white"
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key}
            >
              {column.label} {column.path && this.renderSortColumn(column)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
