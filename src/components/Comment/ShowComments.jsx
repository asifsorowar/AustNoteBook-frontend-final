import React from "react";
import Avatar from "@material-ui/core/Avatar";
import DeleteButton from "../common/DeleteButton";
import _ from "lodash";

const ShowComments = ({ comments, deleteButton, handleDelete }) => {
  const getPhoto = (comment) => {
    try {
      return (
        process.env.REACT_APP_PROFILE_PICTURE_URL +
        "/" +
        _.get(comment, "user.photo")
      );
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      {comments.map((comment) => (
        <div className="comment" key={comment._id}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Avatar alt="Remy Sharp" src={getPhoto(comment)} />
              <p className="text-muted">{_.get(comment, "user.varsityId")}</p>
            </div>
            <div>
              {deleteButton(comment) && (
                <DeleteButton
                  className="deleteButton"
                  handleClick={() => handleDelete(comment)}
                />
              )}
            </div>
          </div>
          <div className="d-flex bg-white message">
            <p className="text-justify">{comment.comment}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowComments;
