import React, { Component } from "react";
import FadeIn from "react-fade-in";
import MyTable from "./../common/Table";
import DeleteButton from "../common/DeleteButton";
import { getCurrentUser } from "./../../service/authService";
import { Link } from "react-router-dom";

class CrTable extends Component {
  state = {};
  columns = [
    {
      label: "Name",
      path: "name",
      content: (cr) => {
        if (
          (getCurrentUser().role === "co-admin" &&
            getCurrentUser().batch === this.props.batchId) ||
          getCurrentUser().isAdmin
        )
          return (
            <Link
              to={`/aust-note-book/${this.props.batchId}/cr/${cr._id}`}
              className="font-weight-bold"
            >
              {cr.name}
            </Link>
          );
        else return <span className="font-weight-bold">{cr.name}</span>;
      },
    },
    { label: "Section", path: "section" },
    { label: "Group", path: "group" },
    { label: "Varsity Id", path: "varsityId" },
    { label: "Phone Number", path: "phoneNumber" },
  ];

  deleteColumn = {
    key: "delete",
    content: (cr) => (
      <DeleteButton
        handleClick={() => this.props.onDelete(cr)}
        className="deleteButton"
      />
    ),
  };

  constructor(props) {
    super(props);
    if (
      getCurrentUser().isAdmin ||
      (getCurrentUser().role === "co-admin" &&
        getCurrentUser().batch === this.props.batchId)
    )
      this.columns.push(this.deleteColumn);
  }

  render() {
    const { crs, onSort, sortColumn } = this.props;

    return (
      <FadeIn className="container m-2">
        <MyTable
          onSort={onSort}
          data={crs}
          sortColumn={sortColumn}
          columns={this.columns}
        />
      </FadeIn>
    );
  }
}

export default CrTable;
