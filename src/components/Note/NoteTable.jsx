import React, { Component } from "react";
import FadeIn from "react-fade-in";
import MyTable from "../common/Table";
import DeleteButton from "../common/DeleteButton";
import { getCurrentUser } from "./../../service/authService";
import { Link } from "react-router-dom";

class NoteTable extends Component {
  state = {};

  columns = [
    {
      label: "Name",
      path: "name",
      content: (note) => {
        if (note.user._id === getCurrentUser()._id || getCurrentUser().isAdmin)
          return (
            <Link
              to={`/aust-note-book/${this.props.batchId}/${this.props.courseId}/note/${note._id}`}
              className="font-weight-bold"
            >
              {note.name}
            </Link>
          );
        else return <span className="">{note.name}</span>;
      },
    },
    { label: "Semester", path: "semester" },
    { label: "Added By", path: "user.varsityId" },
    { label: "Date Upload", path: "datePublished" },
    {
      label: "File",
      key: "file",
      content: (note) => (
        <a href={`${note.url}`} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (note) =>
      (note.user._id === getCurrentUser()._id || getCurrentUser().isAdmin) && (
        <DeleteButton
          handleClick={() => this.props.onDelete(note)}
          className="deleteButton"
        />
      ),
  };

  constructor() {
    super();
    this.columns.push(this.deleteColumn);
  }

  render() {
    const { notes, onSort, sortColumn } = this.props;

    return (
      <FadeIn className="container m-2">
        <MyTable
          onSort={onSort}
          data={notes}
          sortColumn={sortColumn}
          columns={this.columns}
        />
      </FadeIn>
    );
  }
}

export default NoteTable;
