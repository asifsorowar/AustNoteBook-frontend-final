import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { alert } from "../utils/alert";
import * as Yup from "yup";

import { Input, SubmitButton, AppForm } from "../common/Form";
import { getCurrentUser } from "../../service/authService";
import { saveQuestion, getQuestionById } from "../../service/questionService";
import "./questionForm.css";

class QuestionForm extends Component {
  state = {
    question: {
      _id: "",
      name: "",
      semester: "",
      url: "",
    },
  };

  validateSchema = Yup.object().shape({
    name: Yup.string().min(3).required().label("Name"),
    semester: Yup.string()
      .min(3)
      .required()
      .matches(
        /^(spring|fall)(-)(20)(\d\d)$/i,
        'Format have to "spring-xxxx" or "fall-xxxx"'
      )
      .label("Semester"),
    url: Yup.string().required().label("Url"),
  });

  async componentDidMount() {
    try {
      const { questionPath } = this.props.match.params;

      if (questionPath === "add-question") return;
      const { data: question } = await getQuestionById(questionPath);
      this.setState({ question: this.mapToViewModel(question) });
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 400)
      )
        this.props.history.replace("/aust-note-book/not-found");
    }
  }

  mapToViewModel = (question) => ({
    _id: question._id,
    name: question.name,
    semester: question.semester,
    url: question.url,
  });

  handleSubmit = async (
    { _id, name, semester, url },
    { setErrors, resetForm }
  ) => {
    try {
      const { value } = await alert("Are you confirm?", "warning");
      if (value) {
        const courseId = this.props.match.params.courseId;
        await saveQuestion(_id, name, semester, url, courseId);
        resetForm({ values: "" });
        this.props.history.goBack();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data } = error.response;
        setErrors({ name: data });
      }
    }
  };

  render() {
    if (
      getCurrentUser().batch === this.props.match.params.batchId ||
      getCurrentUser().isAdmin
    )
      return (
        <>
          <div className="row h-100 w-100 justify-content-center align-items-center p-0 m-0">
            <div className="col-8 row  p-0 m-0 justify-content-center align-items-center">
              <div className="questionContainer">
                <div className="questionHeader">
                  <h3 className="m-0 p-0">Add Question</h3>
                </div>
                <div className="p-5">
                  <AppForm
                    initialValues={this.state.question}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.validateSchema}
                    enableReinitialize
                  >
                    <form noValidate autoComplete="off" className="mt-1">
                      <Input
                        name="name"
                        label="Question Name"
                        color="primary"
                      />
                      <Input name="semester" label="Semester" color="primary" />
                      <Input
                        name="url"
                        label="File Url"
                        placeholder="https://drive.google.com/....."
                        color="primary"
                      />
                      <SubmitButton
                        color="primary"
                        className="mt-4 w-100"
                        label="Add Question"
                      />
                    </form>
                  </AppForm>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    else return <Redirect to="/" />;
  }
}

export default QuestionForm;
