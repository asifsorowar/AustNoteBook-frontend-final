import React, { useState } from "react";
import ListItems from "../common/list";

const Department = ({ departments }) => {
  const [seletedDepartment, setSeletedDepartment] = useState({});

  return (
    <React.Fragment>
      <ListItems
        items={departments}
        selectedItem={seletedDepartment}
        linkTo={(department) => `/aust-note-book/${department._id}/batches`}
        handleSelect={(department) => setSeletedDepartment(department)}
      />
    </React.Fragment>
  );
};

export default Department;
