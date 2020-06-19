import React, { Component } from "react";
import FadeIn from "react-fade-in";
import { toast } from "react-toastify";
import _ from "lodash";

import { getCourses, deleteCourse } from "./../../service/courseService";
import ListItems from "./../common/list";
import "./course.css";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { alert } from "./../utils/alert";
import { getCurrentUser } from "./../../service/authService";

class Course extends Component {
  state = {
    filteredCourses: [],
    selectedCourse: {},
    path: "",
  };

  async componentDidMount() {
    const { match } = this.props;
    const {
      data: { data: allCourses },
    } = await getCourses();

    const filteredCourses = allCourses.filter(
      (course) => _.get(course, "batch._id") === match.params.batchId
    );

    const path = match.params.path;
    this.setState({ filteredCourses, path });
  }

  handleLinkTo = (course) => {
    const path = this.state.path;
    const { batchId } = this.props.match.params;
    return `/aust-note-book/${batchId}/${course._id}/${path}`;
  };

  handleDelete = async (course) => {
    const originalCourses = this.state.filteredCourses;
    const filteredCourses = originalCourses.filter((c) => c._id !== course._id);

    const { value } = await alert("Are you sure?", "warning");

    if (value) {
      this.setState({ filteredCourses });
      try {
        await deleteCourse(course._id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("This course has already been deleted.");
          this.setState({ filteredCourses: originalCourses });
        }
      }
    }
  };

  render() {
    const { batchId } = this.props.match.params;

    return (
      <div className="row h-100 w-100 justify-content-center align-content-center">
        {(getCurrentUser().batch === batchId || getCurrentUser().isAdmin) && (
          <div className="col-10 row justify-content-start">
            <Button color="primary">
              <Link
                to={`/aust-note-book/${batchId}/add-course`}
                className="text-decoration-none text-white"
              >
                Add Course
              </Link>
            </Button>
          </div>
        )}
        <FadeIn className="col-10 courseContaier">
          <ListItems
            items={this.state.filteredCourses}
            textProperty="courseTitle"
            secondTextProperty="courseNo"
            selectedItem={this.state.selectedCourse}
            handleSelect={(course) => this.setState({ selectedCourse: course })}
            linkTo={this.handleLinkTo}
            deleteButton={
              (getCurrentUser().role === "co-admin" &&
                getCurrentUser().batch === batchId) ||
              getCurrentUser().isAdmin
            }
            onDelete={this.handleDelete}
          />
        </FadeIn>
      </div>
    );
  }
}

export default Course;
