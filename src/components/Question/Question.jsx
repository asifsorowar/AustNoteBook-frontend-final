import React, { Component } from "react";
import { SemipolarLoading } from "react-loadingg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import Button from "../common/Button";
import Pagination from "./../common/Pagination";
import { paginate } from "./../utils/paginate";
import { alert } from "./../utils/alert";

import { Comment } from "../index";
import {
  getCommentsByCourse,
  deleteComment,
  postComment,
} from "./../../service/commentService";
import { getQuestions, deleteQuestion } from "../../service/questionService";
import { getCurrentUser } from "./../../service/authService";
import QuestionTable from "./QuestionTable";

class Question extends Component {
  state = {
    allQuestions: [],
    filteredQuestions: [],
    comments: [],
    pageSize: 5,
    currentPage: 1,
    sortColumn: {},
    loading: Boolean,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      await this.populateQuestions();
      await this.populateComments();
      this.setState({ loading: false });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  populateQuestions = async () => {
    const { courseId } = this.props.match.params;
    let {
      data: { data: allQuestions },
    } = await getQuestions();

    allQuestions = allQuestions.map((question) => ({
      ...question,
      datePublished: new Date(question.datePublished).toLocaleString(),
    }));

    const filteredQuestions = allQuestions.filter(
      (question) => question.course._id === courseId
    );
    this.setState({ allQuestions, filteredQuestions });
  };

  populateComments = async () => {
    const { courseId } = this.props.match.params;
    const {
      data: { data: comments },
    } = await getCommentsByCourse(courseId, "questions");

    this.setState({ comments });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTableSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleQuestionDelete = async (question) => {
    const originalQuestions = this.state.filteredQuestions;

    const filteredQuestions = originalQuestions.filter(
      (q) => q._id !== question._id
    );

    const { value } = await alert("Are you sure?", "warning");
    if (value) {
      this.setState({ filteredQuestions });
      try {
        await deleteQuestion(question._id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("This question has already been deleted.");
          this.setState({ filteredQuestions: originalQuestions });
        }
      }
    }
  };

  handleCommentSubmit = async ({ comment }, { resetForm }) => {
    const { courseId } = this.props.match.params;
    const originalComments = this.state.comments;
    try {
      const currentUser = getCurrentUser();
      const comments = [
        {
          _id: comment,
          user: {
            varsityId: currentUser.varsityId,
            photo: currentUser.photo,
          },
          comment: comment,
        },
        ...originalComments,
      ];
      this.setState({ comments });
      await postComment(courseId, comment, "questions");
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
      filteredQuestions,
      pageSize,
      currentPage,
      sortColumn,
      comments,
    } = this.state;
    const { batchId, courseId } = this.props.match.params;

    const sorted = _.orderBy(
      filteredQuestions,
      [sortColumn.path],
      [sortColumn.order]
    );
    const questions = paginate(sorted, pageSize, currentPage);

    if (this.state.loading) return <SemipolarLoading />;

    return (
      <div className="row justify-content-center h-100 w-100">
        <div className="col-12 p-0 m-0">
          <QuestionTable
            questions={questions}
            onDelete={this.handleQuestionDelete}
            onSort={this.handleTableSort}
            sortColumn={sortColumn}
            courseId={courseId}
            batchId={batchId}
          />
        </div>
        {(getCurrentUser().batch === batchId || getCurrentUser().isAdmin) && (
          <div className="col-9 row justify-content-between align-items-center">
            <p className="text-white">
              Total Questions: {filteredQuestions.length}
            </p>
            <Button color="primary">
              <Link
                to={`/aust-note-book/${batchId}/${courseId}/question/add-question`}
                className="text-decoration-none text-white"
              >
                Add Question
              </Link>
            </Button>
          </div>
        )}
        <div className="col-12 mt-2 d-flex justify-content-center">
          <Pagination
            itemCounts={filteredQuestions.length}
            pageOnChange={this.handlePageChange}
            pageSize={pageSize}
          />
        </div>
        {(getCurrentUser().batch === batchId || getCurrentUser().isAdmin) && (
          <div className="col-lg-11 col-12 m-0 mt-3 p-lg-5 p-2 text-left">
            <p className="text-white">Total Comments: {comments.length}</p>
            <Comment
              comments={comments}
              courseId={courseId}
              path="questions"
              handleCommentSubmit={this.handleCommentSubmit}
              handleCommentDelete={this.handleCommentDelete}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Question;
