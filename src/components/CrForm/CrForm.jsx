import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { alert } from "../utils/alert";
import * as Yup from "yup";
import Select from "../common/Form/Select";
import { Input, SubmitButton, AppForm } from "../common/Form";
import { getCurrentUser } from "../../service/authService";
import { addCr, getCrById } from "../../service/crService";
import "./crForm.css";

class CrForm extends Component {
  state = {
    allGroup: [
      { A: ["A-1", "A-2"] },
      { B: ["B-1", "B-2"] },
      { C: ["C-1", "C-2"] },
      { D: ["D-1", "D-2"] },
    ],

    cr: {
      _id: "",
      name: "",
      section: "",
      group: "",
      varsityId: "",
      phoneNumber: "",
    },

    selectedGroup: [],
  };

  validateSchema = Yup.object().shape({
    name: Yup.string().min(3).required().label("Name"),
    section: Yup.string().required().label("Section"),
    group: Yup.string().required().label("Group"),
    varsityId: Yup.string()
      .min(9)
      .max(9)
      .required()
      .matches(/^[0-9]+$/, "Please give your valid varsity id")
      .label("Varsity Id"),
    phoneNumber: Yup.string().min(11).max(12).required().label("Phone No"),
  });

  async componentDidMount() {
    try {
      const { crPath } = this.props.match.params;
      if (crPath === "add-cr") return;

      const { data: cr } = await getCrById(crPath);
      const selectedGroup = this.state.allGroup.find(
        (section) => section[cr.section]
      );

      this.setState({
        cr: this.mapToViewModel(cr),
        selectedGroup: selectedGroup[cr.section],
      });
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 400)
      )
        this.props.history.replace("/aust-note-book/not-found");
    }
  }

  mapToViewModel = (cr) => ({
    _id: cr._id,
    name: cr.name,
    section: cr.section,
    group: cr.group,
    varsityId: cr.varsityId,
    phoneNumber: cr.phoneNumber,
  });

  handleSubmit = async (
    { _id, name, section, group, varsityId, phoneNumber },
    { setErrors, resetForm }
  ) => {
    try {
      const { value } = await alert("Are you confirm?", "warning");
      if (value) {
        const batchId = this.props.match.params.batchId;
        await addCr(
          _id,
          name.toUpperCase(),
          section,
          group,
          varsityId,
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

  handleSection = (sec) => {
    const { allGroup } = this.state;
    const selectedGroup = allGroup.find((section) => section[sec]);

    this.setState({ selectedGroup: selectedGroup[sec] });
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
              <div className="courseContainer">
                <div className="courseHeader">
                  <h3 className="m-0 p-0">Add Cr</h3>
                </div>
                <div className="p-5">
                  <AppForm
                    initialValues={this.state.cr}
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
                        <Select
                          name="section"
                          label="Section"
                          className="flex-1 mr-3"
                          items={["A", "B", "C", "D"]}
                          selectedItem={this.handleSection}
                        />
                        <Select
                          name="group"
                          className="flex-1"
                          label="Group"
                          items={this.state.selectedGroup}
                        />
                      </div>
                      <Input
                        name="varsityId"
                        label="Varsity Id"
                        color="primary"
                        disabled={this.state.cr.varsityId}
                      />
                      <Input
                        name="phoneNumber"
                        label="Phone Number"
                        color="primary"
                      />
                      <SubmitButton
                        color="primary"
                        className="mt-4 w-100"
                        label="Add Cr"
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

export default CrForm;
