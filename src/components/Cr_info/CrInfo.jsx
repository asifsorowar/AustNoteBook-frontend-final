import React, { Component } from "react";
import { SemipolarLoading } from "react-loadingg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import Button from "../common/Button";
import { getCrs, deleteCr } from "./../../service/crService";
import Pagination from "./../common/Pagination";
import { paginate } from "./../utils/paginate";
import { alert } from "./../utils/alert";
import { getCurrentUser } from "./../../service/authService";
import CrTable from "./CrTable";
import "./crInfo.css";

class CrInfo extends Component {
  state = {
    allCrs: [],
    filteredCrs: [],
    pageSize: 8,
    currentPage: 1,
    sortColumn: {},
    loading: Boolean,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { batchId } = this.props.match.params;
    let {
      data: { data: allCrs },
    } = await getCrs();

    const filteredCrs = allCrs.filter((cr) => cr.batch._id === batchId);

    this.setState({ allCrs, filteredCrs, loading: false });
  }

  // componentDidUpdate(prevProps) {
  //   const { courseId } = this.props.match.params;

  //   if (prevProps !== this.props) {
  //     const allNotes = [...this.state.allNotes];
  //     const filteredNotes = allNotes.filter(
  //       (note) => note.course._id === courseId
  //     );
  //     this.setState({ filteredNotes });
  //   }
  // }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTableSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleCrDelete = async (cr) => {
    const originalCrs = this.state.filteredCrs;

    const filteredCrs = originalCrs.filter((c) => c._id !== cr._id);

    const { value } = await alert("Are you sure?", "warning");
    if (value) {
      this.setState({ filteredCrs });
      try {
        await deleteCr(cr._id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("This cr has already been deleted.");
          this.setState({ filteredCrs: originalCrs });
        }
      }
    }
  };

  render() {
    const { filteredCrs, pageSize, currentPage, sortColumn } = this.state;
    const { batchId } = this.props.match.params;

    const sorted = _.orderBy(
      filteredCrs,
      [sortColumn.path],
      [sortColumn.order]
    );
    const crs = paginate(sorted, pageSize, currentPage);

    if (this.state.loading) return <SemipolarLoading />;

    return (
      <div className="row justify-content-center align-content-center h-100 w-100">
        <div className="col-12 p-0 m-0">
          <CrTable
            crs={crs}
            onDelete={this.handleCrDelete}
            onSort={this.handleTableSort}
            sortColumn={sortColumn}
            batchId={batchId}
          />
        </div>
        {(getCurrentUser().batch === batchId || getCurrentUser().isAdmin) && (
          <div className="col-9 row justify-content-between align-items-center">
            <p className="text-white">
              Total Cr's information: {filteredCrs.length}
            </p>
            <Button color="primary">
              <Link
                to={`/aust-note-book/${batchId}/cr/add-cr`}
                className="text-decoration-none text-white"
              >
                Add Cr
              </Link>
            </Button>
          </div>
        )}
        <div className="col-12 mt-2 d-flex justify-content-center">
          <Pagination
            itemCounts={filteredCrs.length}
            pageOnChange={this.handlePageChange}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default CrInfo;
