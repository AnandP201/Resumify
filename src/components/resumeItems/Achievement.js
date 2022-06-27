import React from "react";

const Achievement = ({ index, value }) => {
  return (
    <div key={index} style={{ marginTop: "0.5em" }}>
      <div>
        <b>{value.title}</b> | {value.date}
      </div>
      <div style={{ fontSize: "0.8em", fontStyle: "italic" }}>
        {value.ach_desc}
      </div>
    </div>
  );
};

export default Achievement;
