import React, { Component } from "react";
import { paginate } from "./../utils/paginate";
import Pagination from "./../common/Pagination";
import ShowComments from "./ShowComments";
import { getCurrentUser } from "./../../service/authService";
import "./comment.css";
import CommentForm from "./CommentForm";

class Comment extends Component {
  state = {
    comments: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const comments = this.props.comments;
    this.setState({ comments });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const comments = this.props.comments;
      this.setState({ comments });
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { comments, pageSize, currentPage } = this.state;

    const filteredComments = paginate(comments, pageSize, currentPage);

    return (
      <>
        <div className="row h-100 w-100">
          <div className="col-12 p-0 m-0">
            <ShowComments
              comments={filteredComments}
              deleteButton={(comment) =>
                comment.user._id === getCurrentUser()._id ||
                getCurrentUser().isAdmin
              }
              handleDelete={(comment) =>
                this.props.handleCommentDelete(comment)
              }
            />
          </div>
          <div className="col-12 mt-2 d-flex justify-content-center">
            <Pagination
              itemCounts={comments.length}
              pageOnChange={this.handlePageChange}
              pageSize={pageSize}
            />
          </div>
          <div className="col-12 m-0 p-0 mt-5">
            <CommentForm handleCommentSubmit={this.props.handleCommentSubmit} />
          </div>
        </div>
      </>
    );
  }
}

export default Comment;
