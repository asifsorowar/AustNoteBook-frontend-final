import React, { Component } from "react";
import _ from "lodash";
import FadeIn from "react-fade-in";
import MyTable from "../common/Table";
import DeleteButton from "../common/DeleteButton";
import { getCurrentUser } from "./../../service/authService";
import { Link } from "react-router-dom";

class QuestionTable extends Component {
  columns = [
    {
      label: "Name",
      path: "name",
      content: (question) => {
        if (
          _.get(question, "user._id") === getCurrentUser()._id ||
          getCurrentUser().isAdmin
        )
          return (
            <Link
              to={`/aust-note-book/${this.props.batchId}/${this.props.courseId}/question/${question._id}`}
              className="font-weight-bold"
            >
              {question.name}
            </Link>
          );
        else return <span className="">{question.name}</span>;
      },
    },
    { label: "Semester", path: "semester" },
    { label: "Added By", path: "user.varsityId" },
    { label: "Date Upload", path: "datePublished" },
    {
      label: "File",
      key: "file",
      content: (question) => (
        <a href={`${question.url}`} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (question) =>
      (_.get(question, "user._id") === getCurrentUser()._id ||
        getCurrentUser().isAdmin) && (
        <DeleteButton
          handleClick={() => this.props.onDelete(question)}
          className="deleteButton"
        />
      ),
  };

  constructor() {
    super();
    this.columns.push(this.deleteColumn);
  }

  render() {
    const { questions, onSort, sortColumn } = this.props;

    return (
      <FadeIn className="container m-2">
        <MyTable
          onSort={onSort}
          data={questions}
          sortColumn={sortColumn}
          columns={this.columns}
        />
      </FadeIn>
    );
  }
}

export default QuestionTable;
