import React from "react";

const Experience = ({ index, value }) => {
  return (
    <div key={index} style={{ marginTop: "0.5em" }}>
      <div>
        <b>{value.role}</b>
      </div>
      <div>
        {value.cname} | &nbsp;
        {`${value.sdate} - ${value.edate}`}
      </div>
      <div style={{ fontSize: "0.8em", fontStyle: "italic" }}>
        {value.work_desc}
      </div>
    </div>
  );
};

export default Experience;
