import React from "react";
import Mendatory from "./Mendatory";

const Description = ({ data }) => {
  return (
    <div className="description_outline bg-white">
      {/* <Mendatory /> */}
      <div className="description mb-5">
        <h5>Summary</h5>
        <div>{data?.short_description}</div>
      </div>
      <div className="description">
        <h5>Description of requirements</h5>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Description;
