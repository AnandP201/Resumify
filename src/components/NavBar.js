import React from "react";
import image from "../main.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { saveFile } from "../misc/Helper.js";

import { Stack, Divider, Button, useToaster, Message } from "rsuite";
import { useResume } from "../context/context.resume";

const NavBar = () => {
  const { resume, setResume } = useResume();

  const navigate = useNavigate();

  const toaster = useToaster();

  async function getFile() {
    // open file picker
    let fileHandle;

    [fileHandle] = await window.showOpenFilePicker();

    if (fileHandle.kind === "file") {
      const data = await fileHandle.getFile();
      const text = await data.text();

      setResume(JSON.parse(text));

      toaster.push(<Message>File imported successfully !</Message>);
    } else if (fileHandle.kind === "directory") {
      window.alert("Folders cannot be a data! Choose a json file");
    }
  }

  return (
    <div className="nav-bar">
      <div className="logo-nav">
        <img src={image} height={40} width={40} alt="logo" />
        <div>Resumify</div>
      </div>
      <div className="links">
        <NavLink
          to="/create"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          Basic
        </NavLink>
        <NavLink
          to="/education"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          Education
        </NavLink>
        <NavLink
          to="/works"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          Experiences
        </NavLink>
        <NavLink
          to="/achievements"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          Achievements
        </NavLink>
      </div>
      <div className="buttons-nav">
        <Stack divider={<Divider vertical />}>
          <Button
            appearance="primary"
            color="blue"
            onClick={() => {
              getFile();
            }}
          >
            IMPORT
          </Button>
          <Button
            appearance="primary"
            color="red"
            onClick={() => {
              saveFile(resume);
            }}
          >
            EXPORT
          </Button>
          <Button
            appearance="default"
            onClick={() => {
              localStorage.removeItem("current");
              setResume({});
              navigate("/");
            }}
          >
            START OVER
          </Button>
          <Button
            appearance="ghost"
            onClick={() => {
              navigate("/result");
            }}
          >
            SHOW MY RESUME
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default NavBar;
