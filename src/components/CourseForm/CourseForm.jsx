import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { alert } from "../utils/alert";
import * as Yup from "yup";

import { Input, SubmitButton, AppForm } from "../common/Form";
import { getCurrentUser } from "../../service/authService";
import { addCourse } from "../../service/courseService";
import "./courseForm.css";

class CourseForm extends Component {
  validateSchema = Yup.object().shape({
    courseTitle: Yup.string().min(3).required().label("Course Title"),
    courseNo: Yup.string().min(3).required().label("Course No"),
  });

  handleSubmit = async ({ courseTitle, courseNo }, { setErrors }) => {
    try {
      const { value } = await alert("Are you confirm?", "warning");
      if (value) {
        const batchId = this.props.match.params.batchId;

        await addCourse(courseTitle, courseNo, batchId);
        this.props.history.goBack();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data } = error.response;
        setErrors({ courseTitle: data });
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
            <div className="col-lg-8 col-12 row  p-0 m-0 justify-content-center align-items-center">
              <div className="courseContainer">
                <div className="courseHeader">
                  <h3 className="m-0 p-0">Add Course</h3>
                </div>
                <div className="p-5">
                  <AppForm
                    initialValues={{
                      courseTitle: "",
                      courseNo: "",
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.validateSchema}
                  >
                    <form noValidate autoComplete="off" className="mt-1">
                      <Input
                        name="courseTitle"
                        label="Course Title"
                        color="primary"
                      />
                      <Input
                        name="courseNo"
                        label="Course No"
                        color="primary"
                      />
                      <SubmitButton
                        color="primary"
                        className="mt-4 w-100"
                        label="Add Course"
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

export default CourseForm;
