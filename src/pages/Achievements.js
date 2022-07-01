import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Modal, Panel } from "rsuite";
import AchievementItem from "../components/AchievementItem";
import NavBar from "../components/NavBar";
import { useResume } from "../context/context.resume";
import { addToCache } from "../misc/Helper";

const Achievements = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { resume } = useResume();
  const [data, setData] = useState();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (resume["achievements"] !== undefined) {
      const arr = resume["achievements"];
      setAchievements(arr);
      addToCache(resume);
    }
  }, [resume]);

  const addAchievement = (a) => {
    achievements.push(a);
  };

  return (
    <div>
      <NavBar />
      <div className="text-center pd2em">
        <h3>Achievements</h3>
        <p style={{ fontSize: "1rem" }}>
          This section defines what you achieved till date and what's something
          which is symbol of your hardwork and patience! You can add
          certifications too.
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Panel bordered style={{ width: "80rem", marginTop: "1em" }}>
          <Panel bordered>
            <div style={{ textAlign: "center" }}>
              {achievements.length > 0 ? (
                achievements.map((item, index) => {
                  return (
                    <AchievementItem
                      key={index}
                      itemNo={index}
                      data={item}
                      state={achievements}
                      fnc={setAchievements}
                    />
                  );
                })
              ) : (
                <i>Your work experiences will appear here.....</i>
              )}
            </div>
          </Panel>
          <div style={{ textAlign: "center", marginTop: "1em" }}>
            <Button
              appearance="primary"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Add new achievement
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
        <Modal.Header>ADD NEW ACHIEVEMENT</Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={(val) => {
              setData(val);
            }}
          >
            <Form.Group>
              <Form.ControlLabel>Title</Form.ControlLabel>
              <Form.Control
                type="text"
                name="title"
                autoComplete="off"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Date</Form.ControlLabel>
              <Form.Control
                type="date"
                name="date"
                autoComplete="off"
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
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
                  setData({ ...data, ach_desc: event.target.value });
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
                addAchievement(data);

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

export default Achievements;
