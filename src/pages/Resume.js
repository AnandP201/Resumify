import React from "react";
import { Panel } from "rsuite";
import Achievement from "../components/resumeItems/Achievement";
import Experience from "../components/resumeItems/Experience";

import { useResume } from "../context/context.resume";

const Resume = () => {
  const { resume } = useResume();

  const basic = resume["basic"];
  const education = resume["education"];
  const experience = resume["experiences"];
  const achievements = resume["achievements"];
  const ruleStyle = {
    height: "3px",
    backgroundColor: "#ccc",
  };

  const hStyle = { marginTop: "0.5em", padding: "0.2em", color: "blue" };
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Your Resume</h3>
      <hr />

      <div
        style={{
          display: "flex",
          padding: "0.5em",
          justifyContent: "center",
        }}
      >
        <Panel bordered shaded>
          <Panel>
            <div style={{ display: "flex", fontSize: "0.9em" }}>
              <div style={{ padding: "1em" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    disabled
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: "50%",
                      overflow: "hidden",
                      boxShadow: "2px 5px 5 px rgba(0,0,0,0.15)",
                    }}
                  >
                    <img
                      src={basic["photo"]}
                      width="100%"
                      height="100%"
                      alt=""
                    />
                  </button>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "blue",
                    fontSize: "2.4em",
                    padding: "0.2em",
                    marginTop: "0.2em",
                  }}
                >
                  {(basic["fname"] + " " + basic["lname"]).toUpperCase()}
                </div>

                <hr style={ruleStyle} />
                <table>
                  <tbody>
                    <tr>
                      <td style={{ padding: "0.2em" }}>Address</td>
                      <td style={{ padding: "0em 1.2em " }}>
                        {basic["city"] +
                          " , " +
                          basic["state"] +
                          " , " +
                          basic["pincode"]}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.2em" }}>Email</td>
                      <td style={{ padding: "0em 1.2em " }}>
                        {basic["email"]}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.2em" }}>D.O.B</td>
                      <td style={{ padding: "0em 1.2em " }}>{basic["dob"]}</td>
                    </tr>
                  </tbody>
                </table>
                <h6 style={hStyle}>PROFESSIONAL SUMMARY</h6>
                <hr style={ruleStyle} />
                <div style={{ width: "20em", padding: "0.2em" }}>
                  {basic["summary"]}
                </div>
                <h6 style={hStyle}>TECHNICAL COMPETENCIES</h6>
                <hr style={ruleStyle} />
                <div style={{ width: "20em", padding: "0.2em" }}>
                  {basic["techs"]}
                </div>
                <h6 style={hStyle}>INTEREST & HOBBIES</h6>
                <hr style={ruleStyle} />
                <div style={{ width: "20em", padding: "0.2em" }}>
                  {basic["hobbies"]}
                </div>
              </div>

              <div style={{ borderLeft: "2px solid #ccc", padding: "1em" }}>
                <h6 style={hStyle}>EDUCATION</h6>
                <hr style={ruleStyle} />

                <div style={{ width: "30em" }}>
                  <div>
                    <div>
                      <i>{education[2]["degree"]}</i>&nbsp;&nbsp;
                      <span style={{ borderLeft: "2px solid #ccc" }}>
                        &nbsp;&nbsp; {education[2]["cityg"]}
                      </span>
                    </div>
                    <div>
                      Session :
                      {`${education[2]["yearstartg"]}-${education[2]["yearendg"]}`}
                      &nbsp;&nbsp;
                      <span style={{ borderLeft: "2px solid #ccc" }}>
                        &nbsp;&nbsp;Score : <b>{education[2]["perg"]} %</b>
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginTop: "1em" }}>
                      <i>Intermediate ({`${education[0]["board10"]}`}) </i>
                      &nbsp;&nbsp;
                      <span style={{ borderLeft: "2px solid #ccc" }}>
                        &nbsp;&nbsp;{education[0]["name10"]} ,{" "}
                        {education[0]["city10"]}&nbsp;&nbsp;{" "}
                        <div>
                          Session : &nbsp;
                          {`${education[0]["yearstart10"]} - ${education[0]["yearend10"]}`}
                          &nbsp;&nbsp;
                          <span style={{ borderLeft: "2px solid #ccc" }}>
                            &nbsp;&nbsp; Percentage :{" "}
                            <b>{education[0]["per10"]} %</b>
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginTop: "1em" }}>
                      <i>Matriculation ({`${education[1]["board12"]}`}) </i>
                      &nbsp;&nbsp;
                      <span style={{ borderLeft: "2px solid #ccc" }}>
                        &nbsp;&nbsp;{education[1]["name12"]} ,
                        {education[1]["city12"]}&nbsp;&nbsp;
                        <div>
                          Session : &nbsp;
                          {`${education[1]["yearstart12"]} - ${education[1]["yearend12"]}`}
                          &nbsp;&nbsp;
                          <span style={{ borderLeft: "2px solid #ccc" }}>
                            &nbsp;&nbsp; Percentage :{" "}
                            <b>{education[1]["per12"]} %</b>
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>

                <h6 style={hStyle}>EXPERIENCES</h6>
                <hr style={ruleStyle} />
                <div style={{ width: "30em" }}>
                  <div>
                    {experience.map((value, index) => {
                      return (
                        <Experience key={index} index={index} value={value} />
                      );
                    })}
                  </div>
                </div>

                <h6 style={hStyle}>ACHIEVEMENTS</h6>
                <hr style={ruleStyle} />
                <div style={{ width: "30em" }}>
                  <div>
                    {achievements.map((value, index) => {
                      return (
                        <Achievement key={index} index={index} value={value} />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </Panel>
      </div>
    </div>
  );
};

export default Resume;
