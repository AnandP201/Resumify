import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Modal, Panel } from "rsuite";
import NavBar from "../components/NavBar";
import WorkItem from "../components/WorkItem";
import { useResume } from "../context/context.resume";
import { addToCache } from "../misc/Helper";
const WorkExperience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resume } = useResume();
  const [experiences, setExperiences] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    const arr = resume["experiences"];
    setExperiences(arr);

    addToCache(resume);
  }, [resume]);

  const addWork = (d) => {
    experiences.push(d);
  };

  return (
    <div>
      <NavBar />
      <div className="text-center pd2em">
        <h3>Trainings and Experiences</h3>
        <p style={{ fontSize: "1rem" }}>
          This section takes information about all your trainings and work
          experiences you had in your past. Add them in your resume to make it
          more stronger !
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Panel bordered style={{ width: "80em", marginTop: "1em" }}>
          <Panel bordered>
            <div style={{ textAlign: "center" }}>
              {experiences.length > 0 ? (
                experiences.map((item, index) => {
                  return (
                    <WorkItem
                      key={index}
                      itemNo={index}
                      data={item}
                      state={experiences}
                      fnc={setExperiences}
                    />
                  );
                })
              ) : (
                <i>Your work experiences will appear here.....</i>
              )}
            </div>
          </Panel>
          <div
            style={{
              justifyContent: "center",
              display: "flex",

              marginTop: "1em",
              width: "100%",
            }}
          >
            <Button
              appearance="ghost"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Add new work experience
            </Button>
          </div>
        </Panel>
      </div>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Modal.Header>ADD NEW WORK EXPERIENCE</Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={(val) => {
              setData(val);
            }}
          >
            <Form.Group>
              <Form.ControlLabel>Institute / Company Name</Form.ControlLabel>
              <Form.Control
                type="text"
                name="cname"
                autoComplete="off"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Role</Form.ControlLabel>
              <Form.Control
                type="text"
                name="role"
                autoComplete="off"
              ></Form.Control>
            </Form.Group>
            <Form.Group style={{ display: "flex" }}>
              <Form.Control
                type="text"
                name="sdate"
                autoComplete="off"
                placeholder="Start date"
              ></Form.Control>
              &nbsp;
              <Form.Control
                type="text"
                placeholder="End date"
                autoComplete="off"
                name="edate"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <textarea
                style={{
                  width: "100%",
                  border: "1px solid #e5e5ea",
                  padding: "0.4em",
                  color: "#575757",
                }}
                rows={5}
                placeholder="Enter work description"
                onInput={(event) => {
                  setData({ ...data, work_desc: event.target.value });
                }}
              ></textarea>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar style={{ textAlign: "left" }}>
            <Button
              appearance="primary"
              color="blue"
              onClick={() => {
                addWork(data);
                addToCache(resume);
                setIsOpen(false);
              }}
            >
              Save
            </Button>
            <Button
              appearance="ghost"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkExperience;
