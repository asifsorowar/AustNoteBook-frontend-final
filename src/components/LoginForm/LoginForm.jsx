import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";

import { Input, SubmitButton, AppForm } from "../common/Form";
import { login } from "../../service/authService";
import Navbar from "../Navbar";
import { getCurrentUser } from "../../service/authService";
import "./login.css";
import { toast } from "react-toastify";

class LoginForm extends Component {
  validateSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
  });

  handleSubmit = async ({ email, password }, { setErrors, resetForm }) => {
    try {
      await login(email, password);
      toast.success("Signed in successfully.");
      resetForm({ values: "" });
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data } = error.response;
        setErrors({ email: data });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <>
        <Navbar />
        <div className="row h-100 w-100 justify-content-center align-items-center p-0 m-0">
          <div className="col-8 row  p-0 m-0 justify-content-center align-items-center">
            <div className="loginContainer">
              <div className="loginHeader">
                <h1>Login</h1>
              </div>
              <div className="p-5">
                <AppForm
                  initialValues={{ email: "", password: "" }}
                  onSubmit={this.handleSubmit}
                  validationSchema={this.validateSchema}
                >
                  <form noValidate autoComplete="off" className="mt-3">
                    <Input name="email" label="Email" color="primary" />
                    <Input
                      name="password"
                      label="Password"
                      className="my-2"
                      color="primary"
                      type="password"
                    />
                    <SubmitButton
                      color="primary"
                      className="mt-5 w-100"
                      label="Login"
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

export default LoginForm;
