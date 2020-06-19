import React, { Component } from "react";
import { SemipolarLoading } from "react-loadingg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import Button from "../common/Button";
import { getTeachers, deleteTeacher } from "./../../service/teacherService";
import Pagination from "./../common/Pagination";
import { paginate } from "./../utils/paginate";
import { alert } from "./../utils/alert";
import { getCurrentUser } from "./../../service/authService";
import TeacherTable from "./TeacherTable";
import "./teacherInfo.css";

class TeacherInfo extends Component {
  state = {
    allTeachers: [],
    filteredTeachers: [],
    pageSize: 8,
    currentPage: 1,
    sortColumn: {},
    loading: Boolean,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { batchId } = this.props.match.params;
    let {
      data: { data: allTeachers },
    } = await getTeachers();

    const filteredTeachers = allTeachers.filter(
      (teacher) => teacher.batch._id === batchId
    );

    this.setState({ allTeachers, filteredTeachers, loading: false });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTableSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleTeacherDelete = async (teacher) => {
    const originalTeachers = this.state.filteredTeachers;

    const filteredTeachers = originalTeachers.filter(
      (t) => t._id !== teacher._id
    );

    const { value } = await alert("Are you sure?", "warning");
    if (value) {
      this.setState({ filteredTeachers });
      try {
        await deleteTeacher(teacher._id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("This teacher has already been deleted.");
          this.setState({ filteredTeachers: originalTeachers });
        }
      }
    }
  };

  render() {
    const { filteredTeachers, pageSize, currentPage, sortColumn } = this.state;
    const { batchId } = this.props.match.params;

    const sorted = _.orderBy(
      filteredTeachers,
      [sortColumn.path],
      [sortColumn.order]
    );
    const Teachers = paginate(sorted, pageSize, currentPage);

    if (this.state.loading) return <SemipolarLoading />;

    return (
      <div className="row justify-content-center align-content-center h-100 w-100">
        <div className="col-12 p-0 m-0">
          <TeacherTable
            teachers={Teachers}
            onDelete={this.handleTeacherDelete}
            onSort={this.handleTableSort}
            sortColumn={sortColumn}
            batchId={batchId}
          />
        </div>
        {(getCurrentUser().batch === batchId || getCurrentUser().isAdmin) && (
          <div className="col-9 row justify-content-between align-items-center">
            <p className="text-white">
              Total Teacher's information: {filteredTeachers.length}
            </p>
            <Button color="primary">
              <Link
                to={`/aust-note-book/${batchId}/teacher/add-teacher`}
                className="text-decoration-none text-white"
              >
                Add Teacher
              </Link>
            </Button>
          </div>
        )}
        <div className="col-12 mt-2 d-flex justify-content-center">
          <Pagination
            itemCounts={filteredTeachers.length}
            pageOnChange={this.handlePageChange}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default TeacherInfo;
