import React, { Component } from "react";
import Card from "./../common/Card";

class Features extends Component {
  state = { data: [], batch: {} };

  componentDidMount() {
    const { batches, match } = this.props;
    const batch = batches.find((batch) => batch._id === match.params.batchId);
    const data = [
      { name: "Class Notes", id: 1 },
      { name: "Question Bank", id: 2 },
      { name: "Teacher's Information", id: 3 },
      { name: "Cr's Information", id: 4 },
    ];
    this.setState({ data, batch });
  }

  handleLink = (item) => {
    const { batch } = this.state;
    if (item.id === 1) return `/aust-note-book/${batch._id}/courses/notes`;
    if (item.id === 2) return `/aust-note-book/${batch._id}/courses/questions`;
    if (item.id === 3) return `/aust-note-book/${batch._id}/teacher_infos`;
    if (item.id === 4) return `/aust-note-book/${batch._id}/cr_infos`;
  };

  getItems = () => {
    let { data, batch } = this.state;
    data = data.map((item) => ({ ...item, batch: batch }));
    return data;
  };

  render() {
    return (
      <React.Fragment>
        <Card
          items={this.getItems()}
          subtitle1="batch.name"
          subtitble2=""
          customStyle="col-lg-5 col-xl-5 col-md-5 col-sm-6"
          linkTo={this.handleLink}
        />
      </React.Fragment>
    );
  }
}

export default Features;
