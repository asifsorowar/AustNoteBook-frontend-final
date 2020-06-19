import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { alert } from "../utils/alert";
import * as Yup from "yup";

import { Input, SubmitButton, AppForm } from "../common/Form";
import { getCurrentUser } from "../../service/authService";
import { saveNote, getNoteById } from "../../service/noteService";
import "./noteForm.css";

class NoteForm extends Component {
  state = {
    note: {
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
      const { notePath } = this.props.match.params;

      if (notePath === "add-note") return;
      const { data: note } = await getNoteById(notePath);

      this.setState({ note: this.mapToViewModel(note) });
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 400)
      )
        this.props.history.replace("/aust-note-book/not-found");
    }
  }

  mapToViewModel = (note) => ({
    _id: note._id,
    name: note.name,
    semester: note.semester,
    url: note.url,
  });

  handleSubmit = async (
    { _id, name, semester, url },
    { setErrors, resetForm }
  ) => {
    try {
      const { value } = await alert("Are you confirm?", "warning");
      if (value) {
        const courseId = this.props.match.params.courseId;
        await saveNote(_id, name, semester, url, courseId);
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
              <div className="noteContainer">
                <div className="noteHeader">
                  <h3 className="m-0 p-0">Add Note</h3>
                </div>
                <div className="p-5">
                  <AppForm
                    initialValues={this.state.note}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.validateSchema}
                    enableReinitialize
                  >
                    <form noValidate autoComplete="off" className="mt-1">
                      <Input name="name" label="Note Name" color="primary" />
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
                        label="Add Note"
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

export default NoteForm;
