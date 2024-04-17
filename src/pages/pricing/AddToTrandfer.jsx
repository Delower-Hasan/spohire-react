import React from "react";
import OptionDropdown from "./OptionDropdown";

const AddToTrandfer = () => {
  return (
    <div className="range_header d-flex flex-wrap align-items-center w-100 justify-content-center gap-4">
      <h6>ADD</h6>
      <OptionDropdown
        title="HANDBALL"
        subtitle={["HANDBALL","Football", "basketball", "volleyball"]}
      />
      <OptionDropdown title="Player" subtitle={["Player","Coach"]} />
      <h6>TO Transfer Market LIST</h6>
    </div>
  );
};

export default AddToTrandfer;
