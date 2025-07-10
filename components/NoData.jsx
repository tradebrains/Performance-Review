import React from "react";
// import nodataImg from "../assets/images/noDataImg.png";
function NoData({ errorText = null }) {
  return (
    <div className="w-100 h-100 d-flex flex-col justify-content-center align-items-center">
      <img
        style={{ width: "60px", height: "50px" }}
        // src={nodataImg}
        alt="no_data"
      />
      <p
        style={{ color: "#545E78" }}
        className="ff-poppins fs-s-14 fw-600 my-10 "
      >
        {errorText ? errorText : "No Data Available"}
      </p>
    </div>
  );
}

export default NoData;
