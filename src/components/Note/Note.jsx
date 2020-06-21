import React, { Component } from "react";
import { SemipolarLoading } from "react-loadingg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import Button from "../common/Button";
import { getNotes, deleteNote } from "./../../service/noteService";
import { alert } from "../utils/alert";

import Pagination from "./../common/Pagination";
import { paginate } from "./../utils/paginate";
import NoteTable from "./NoteTable";
import { Comment } from "../index";
import { getCurrentUser } from "./../../service/authService";
import {
  getCommentsByCourse,
  deleteComment,
  postComment,
} from "./../../service/commentService";
import "./note.css";

class Note extends Component {
  state = {
    allNotes: [],
    filteredNotes: [],
    comments: [],
    pageSize: 5,
    currentPage: 1,
    sortColumn: {},
    loading: Boolean,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      await this.populateNotes();
      await this.populateComments();
      this.setState({ loading: false });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  populateNotes = async () => {
    const { courseId } = this.props.match.params;
    let {
      data: { data: allNotes },
    } = await getNotes();

    allNotes = allNotes.map((note) => ({
      ...note,
      datePublished: new Date(note.datePublished).toLocaleString(),
    }));

    const filteredNotes = allNotes.filter(
      (note) => note.course._id === courseId
    );
    this.setState({ allNotes, filteredNotes });
  };

  populateComments = async () => {
    const { courseId } = this.props.match.params;
    const {
      data: { data: comments },
    } = await getCommentsByCourse(courseId, "notes");

    this.setState({ comments });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTableSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleNoteDelete = async (note) => {
    const originalNotes = this.state.filteredNotes;

    const filteredNotes = originalNotes.filter((n) => n._id !== note._id);
    const { value } = await alert("Are you sure?", "warning");
    if (value) {
      this.setState({ filteredNotes });
      try {
        await deleteNote(note._id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("This note has already been deleted.");

          this.setState({ filteredNotes: originalNotes });
        }
      }
    }
  };

  handleCommentSubmit = async ({ comment }, { resetForm }) => {
    const { courseId } = this.props.match.params;
    const originalComments = this.state.comments;
    try {
      // const currentUser = getCurrentUser();
      // const comments = [
      //   {
      //     _id: comment,
      //     user: {
      //       firstName: currentUser.firstName,
      //       lastName: currentUser.lastName,
      //       photo: currentUser.photo,
      //     },
      //     comment: comment,
      //   },
      //   ...originalComments,
      // ];
      // this.setState({ comments });
      const { data } = await postComment(courseId, comment, "notes");
      const comments = [{ ...data }, ...originalComments];

      this.setState({ comments });

      resetForm({ values: "" });
    } catch (error) {
      this.setState({ comments: originalComments });
      toast.error("Something went wrong. comment not posted");
    }
  };

  handleCommentDelete = async (comment) => {
    const { courseId } = this.props.match.params;
    const originalComments = this.state.comments;
    try {
      const { value } = await alert("Are you confirm?", "warning");
      if (value) {
        const comments = originalComments.filter((c) => c._id !== comment._id);
        this.setState({ comments });
        await deleteComment(courseId, comment._id);
      }
    } catch (error) {
      this.setState({ comments: originalComments });
      toast.error("Comment already deleted");
    }
  };

  render() {
    const {
      filteredNotes,
      pageSize,
      currentPage,
      sortColumn,
      comments,
    } = this.state;
    const { batchId, courseId } = this.props.match.params;

    const sorted = _.orderBy(
      filteredNotes,
      [sortColumn.path],
      [sortColumn.order]
    );
    const notes = paginate(sorted, pageSize, currentPage);

    if (this.state.loading) return <SemipolarLoading />;

    return (
      <div className="row justify-content-center h-100 w-100">
        <div className="col-11 p-0 m-0 text-left">
          <NoteTable
            notes={notes}
            onSort={this.handleTableSort}
            onDelete={this.handleNoteDelete}
            sortColumn={sortColumn}
            courseId={courseId}
            batchId={batchId}
          />
        </div>
        {(getCurrentUser().batch === batchId || getCurrentUser().isAdmin) && (
          <div className="col-9 row justify-content-between align-items-center">
            <p className="text-white">Total Notes: {filteredNotes.length}</p>
            <Button color="primary">
              <Link
                to={`/aust-note-book/${batchId}/${courseId}/note/add-note`}
                className="text-decoration-none text-white"
              >
                Add Note
              </Link>
            </Button>
          </div>
        )}
        <div className="col-12 mt-2 d-flex justify-content-center">
          <Pagination
            itemCounts={filteredNotes.length}
            pageOnChange={this.handlePageChange}
            pageSize={pageSize}
          />
        </div>
        {(getCurrentUser().batch === batchId || getCurrentUser().isAdmin) && (
          <div className="col-lg-11 col-12 m-0 mt-3 p-5 text-left">
            <p className="text-white">Total Comments: {comments.length}</p>
            <Comment
              comments={comments}
              courseId={courseId}
              path="notes"
              handleCommentSubmit={this.handleCommentSubmit}
              handleCommentDelete={this.handleCommentDelete}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Note;
