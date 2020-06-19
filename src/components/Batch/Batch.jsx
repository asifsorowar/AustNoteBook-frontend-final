import React, { Component } from "react";
import _ from "lodash";
import Card from "../common/Card";
class Batch extends Component {
  state = {
    batches: [],
  };

  componentDidMount() {
    const allBatches = this.props.batches;
    const batches = allBatches.filter(
      (batch) =>
        _.get(batch, "department._id") === this.props.match.params.departmentId
    );

    this.setState({ batches });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const allBatches = this.props.batches;
      const batches = allBatches.filter(
        (batch) => batch.department._id === this.props.match.params.departmentId
      );
      this.setState({ batches });
    }
  }

  render() {
    const { batches } = this.state;
    return (
      <Card
        items={batches}
        linkTo={(batch) => `/aust-note-book/${batch._id}/features`}
        subtitle1="department.name"
        subtitble2="Click for Notes, Questions and many more"
        customStyle="col-xl-3 col-lg-3 col-md-5 col-sm-5"
      />
    );
  }
}

export default Batch;
