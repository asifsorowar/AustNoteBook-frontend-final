import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { alert } from "../utils/alert";
import * as Yup from "yup";
import { Input, SubmitButton, AppForm } from "../common/Form";
import { getCurrentUser } from "../../service/authService";
import { addTeacher, getTeacherById } from "../../service/teacherService";
import "./teacherForm.css";

class TeacherForm extends Component {
  state = {
    teacher: {
      _id: "",
      name: "",
      courseTitle: "",
      courseNo: "",
      email: "",
      phoneNumber: "",
    },
  };

  validateSchema = Yup.object().shape({
    name: Yup.string().min(3).required().label("Name"),
    courseTitle: Yup.string().required().label("courseTitle"),
    courseNo: Yup.string().required().label("courseNo"),
    email: Yup.string().email().required().label("Email"),
    phoneNumber: Yup.string().min(11).max(12).required().label("Phone No"),
  });

  async componentDidMount() {
    try {
      const { teacherPath } = this.props.match.params;

      if (teacherPath === "add-teacher") return;
      const { data: teacher } = await getTeacherById(teacherPath);
      this.setState({ teacher: this.mapToViewModel(teacher) });
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 400)
      )
        this.props.history.replace("/aust-note-book/not-found");
    }
  }

  mapToViewModel = (teacher) => ({
    _id: teacher._id,
    name: teacher.name,
    courseTitle: teacher.courseTitle,
    courseNo: teacher.courseNo,
    email: teacher.email,
    phoneNumber: teacher.phoneNumber,
  });

  handleSubmit = async (
    { _id, name, courseTitle, courseNo, email, phoneNumber },
    { setErrors, resetForm }
  ) => {
    try {
      const { value } = await alert("Are you confirm?", "warning");
      if (value) {
        const batchId = this.props.match.params.batchId;
        await addTeacher(
          _id,
          name.toUpperCase(),
          courseTitle.toUpperCase(),
          courseNo.toUpperCase(),
          email,
          phoneNumber,
          batchId
        );
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
            <div className="col-lg-8 col-12 row  p-0 m-0 justify-content-center align-items-center">
              <div className="courseContainer">
                <div className="courseHeader">
                  <h3 className="m-0 p-0">Add Teacher</h3>
                </div>
                <div className="p-5">
                  <AppForm
                    initialValues={this.state.teacher}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.validateSchema}
                    enableReinitialize
                  >
                    <form noValidate autoComplete="off" className="mt-1">
                      <Input
                        name="name"
                        label="Name"
                        className="text-capitalize"
                        color="primary"
                      />
                      <div className="d-flex">
                        <Input
                          name="courseTitle"
                          label="Course Title"
                          className="flex-1 mr-3"
                          color="primary"
                        />
                        <Input
                          name="courseNo"
                          label="Course No"
                          className="flex-1"
                          color="primary"
                        />
                      </div>
                      <Input name="email" label="Email" color="primary" />
                      <Input
                        name="phoneNumber"
                        label="Phone Number"
                        color="primary"
                      />
                      <SubmitButton
                        color="primary"
                        className="mt-4 w-100"
                        label="Add Teacher"
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

export default TeacherForm;
