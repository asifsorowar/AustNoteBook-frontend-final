import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import _ from "lodash";

import {
  Input,
  ImageSubmitButton,
  SubmitButton,
  AppForm,
  ImageFileInput,
} from "../common/Form";
import { addProfilePicture } from "../../service/userService";
import { toast } from "react-toastify";
import { getCurrentUser } from "./../../service/authService";

class Profile extends Component {
  validateSchema = Yup.object().shape({
    file: Yup.mixed().required("A image is required."),
  });

  handleSubmit = async ({ file }, { setErrors }) => {
    try {
      await addProfilePicture(file);
      toast.success("Image uploaded successfully.");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data } = error.response;
        setErrors({ file: data });
      }
    }
  };

  getPhoto = () => {
    try {
      return (
        process.env.REACT_APP_PROFILE_PICTURE_URL +
        "/" +
        _.get(this.props.user, "photo")
      );
    } catch (error) {
      return null;
    }
  };

  render() {
    if (!getCurrentUser()) return <Redirect to="/login" />;

    const { user } = this.props;

    return (
      <>
        {user && (
          <div className="row h-100 w-100 justify-content-center align-items-center p-0 m-0">
            <div className="col-lg-8 col-12 row  p-0 m-0 justify-content-center align-items-center">
              <div className="registrationContainer">
                <div>
                  <img
                    src={this.getPhoto()}
                    className="rounded mx-auto d-block rounded-circle w-25 h-25"
                    alt="..."
                  ></img>
                  <label htmlFor="icon-button-file">
                    <ImageSubmitButton
                      className=""
                      htmlFor="icon-button-file"
                    />
                  </label>
                </div>
                <div className="px-5 pb-5">
                  <AppForm
                    initialValues={{
                      file: {},
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.validateSchema}
                  >
                    <form noValidate autoComplete="off">
                      <div className="d-flex justify-content-end">
                        <ImageFileInput
                          name="file"
                          className="d-none"
                          id="icon-button-file"
                        />

                        <SubmitButton
                          variant="outlined"
                          size="small"
                          color="primary"
                          className=""
                          label="Upload"
                        />
                      </div>
                    </form>

                    <div className="d-flex mt-2">
                      <Input
                        value={user.firstName}
                        name="fistName"
                        color="primary"
                        className="flex-1 mr-3"
                        disabled
                      />
                      <Input
                        value={user.lastName}
                        name="lastName"
                        color="primary"
                        className="flex-1"
                        disabled
                      />
                    </div>
                    <Input
                      value={user.varsityId}
                      name="varsityId"
                      color="primary"
                      className="mt-2"
                      disabled
                    />
                    <Input
                      value={user.email}
                      name="email"
                      color="primary"
                      className="mt-2"
                      disabled
                    />
                    <div className="d-flex mt-2">
                      <Input
                        value={_.get(user, "department.name")}
                        name="department"
                        color="primary"
                        className="flex-1 mr-3"
                        disabled
                      />
                      <Input
                        value={_.get(user, "batch.name")}
                        name="batch"
                        color="primary"
                        className="flex-1"
                        disabled
                      />
                    </div>
                  </AppForm>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Profile;
