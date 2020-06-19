import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";

import { Input, SubmitButton, AppForm } from "../common/Form";
import { registration } from "./../../service/userService";
import Select from "../common/Form/Select";
import { getDepartments } from "../../service/departmentService";
import { getBatchById } from "../../service/batchService";
import { getCurrentUser } from "../../service/authService";
import "./registration.css";
import Navbar from "../Navbar";

class RegistrationForm extends Component {
  state = {
    departments: [],
    batches: [],
  };

  async componentDidMount() {
    const {
      data: { data: departments },
    } = await getDepartments();

    this.setState({ departments });
  }

  handleDepartmentSelection = async (departmentId) => {
    const {
      data: { data: batches },
    } = await getBatchById(departmentId);
    this.setState({ batches });
  };

  validateSchema = Yup.object().shape({
    firstName: Yup.string().min(3).required().label("First Name"),
    lastName: Yup.string().min(3).required().label("Last Name"),
    varsityId: Yup.string()
      .min(9)
      .max(9)
      .required()
      .matches(/^[0-9]+$/, "Please give your valid varsity id")
      .label("Varsity Id"),
    departmentId: Yup.string().required().label("Department"),
    batchId: Yup.string().required().label("Batch"),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Password confirm is required."),
  });

  handleSubmit = async (values, { setErrors, resetForm }) => {
    try {
      await registration(values);
      resetForm({ values: "" });
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data } = error.response;
        setErrors({ varsityId: data });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;

    return (
      <>
        <div className="row h-100 w-100 justify-content-center align-items-center p-0 m-0">
          <div className="col-lg-8 col-12 row  p-0 m-0 justify-content-center align-items-center">
            <div className="registrationContainer">
              <div className="registrationHeader">
                <h3 className="m-0 p-0">Registration</h3>
              </div>
              <div className="p-5">
                <AppForm
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    varsityId: "",
                    batchId: "",
                    departmentId: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={this.handleSubmit}
                  validationSchema={this.validateSchema}
                >
                  <form noValidate autoComplete="off" className="mt-1">
                    <div className="d-flex">
                      <Input
                        name="firstName"
                        label="First Name"
                        color="primary"
                        className="flex-1 mr-3"
                      />
                      <Input
                        name="lastName"
                        label="Last Name"
                        color="primary"
                        className="flex-1"
                      />
                    </div>
                    <div className="d-flex">
                      <Select
                        name="departmentId"
                        label="Department"
                        className="flex-1 mr-3"
                        items={this.state.departments}
                        selectedItem={this.handleDepartmentSelection}
                      />
                      <Select
                        name="batchId"
                        className="flex-1"
                        label="Batch"
                        items={this.state.batches}
                      />
                    </div>
                    <Input
                      name="varsityId"
                      label="Varsity Id"
                      color="primary"
                    />
                    <Input name="email" label="Email" color="primary" />
                    <Input
                      name="password"
                      label="Password"
                      color="primary"
                      type="password"
                    />
                    <Input
                      name="confirmPassword"
                      label="Confirm Password"
                      color="primary"
                      type="password"
                    />
                    <SubmitButton
                      color="primary"
                      className="mt-4 w-100"
                      label="Register"
                    />
                  </form>
                </AppForm>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RegistrationForm;
