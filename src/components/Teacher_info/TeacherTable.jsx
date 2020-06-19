import React, { Component } from "react";
import FadeIn from "react-fade-in";
import MyTable from "./../common/Table";
import DeleteButton from "../common/DeleteButton";
import { getCurrentUser } from "./../../service/authService";
import { Link } from "react-router-dom";

class TeacherTable extends Component {
  state = {};
  columns = [
    {
      label: "Name",
      path: "name",
      content: (teacher) => {
        if (
          (getCurrentUser().role === "co-admin" &&
            getCurrentUser().batch === this.props.batchId) ||
          getCurrentUser().isAdmin
        )
          return (
            <Link
              to={`/aust-note-book/${this.props.batchId}/teacher/${teacher._id}`}
              className="font-weight-bold"
            >
              {teacher.name}
            </Link>
          );
        else return <span className="font-weight-bold">{teacher.name}</span>;
      },
    },
    { label: "Course Title", path: "courseTitle" },
    { label: "Course No", path: "courseNo" },
    { label: "Email", path: "email" },
    { label: "Phone Number", path: "phoneNumber" },
  ];

  deleteColumn = {
    key: "delete",
    content: (teacher) => (
      <DeleteButton
        handleClick={() => this.props.onDelete(teacher)}
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
    const { teachers, onSort, sortColumn } = this.props;

    return (
      <FadeIn className="container m-2">
        <MyTable
          onSort={onSort}
          data={teachers}
          sortColumn={sortColumn}
          columns={this.columns}
        />
      </FadeIn>
    );
  }
}

export default TeacherTable;
