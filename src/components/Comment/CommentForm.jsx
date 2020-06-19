import React from "react";
import { Input, SubmitButton, AppForm } from "../common/Form";
import * as Yup from "yup";

const CommentForm = ({ handleCommentSubmit }) => {
  const validateSchema = Yup.object().shape({
    comment: Yup.string().required().label("Comment"),
  });

  return (
    <div className="p-5 bg-white" style={{ borderRadius: "5px" }}>
      <AppForm
        initialValues={{ comment: "" }}
        onSubmit={handleCommentSubmit}
        validationSchema={validateSchema}
      >
        <form noValidate autoComplete="off" className="d-flex mt-3">
          <Input
            name="comment"
            label="Comment"
            multiline
            rows={3}
            placeholder="Give a comment..."
            color="primary"
          />
          <SubmitButton
            color="primary"
            className=" align-self-end ml-2"
            label="comment"
          />
        </form>
      </AppForm>
    </div>
  );
};

export default CommentForm;
