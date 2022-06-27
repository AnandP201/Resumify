import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Modal, Panel } from "rsuite";
import { useResume } from "../context/context.resume";
import { addToCache } from "../misc/Helper.js";
const AchievementItem = ({ itemNo, data, fnc, state }) => {
  const { resume, setResume } = useResume();
  const [isopen, setisOpen] = useState(false);
  const [editedValue, setEditedValue] = useState();
  const [desc, setDesc] = useState();

  useEffect(() => {
    addToCache(resume);
  }, [resume]);

  return (
    <div style={{ textAlign: "left" }}>
      <Panel shaded>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100em" }}>
            <h3>{data.title}</h3>
            <p>
              <i>{data.date}</i>
            </p>
            <p>{data.ach_desc}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <Button
              appearance="default"
              block
              onClick={() => {
                const filteredState = state.filter(
                  (_, index) => index !== itemNo
                );
                fnc(filteredState);

                setResume({ ...resume, achievements: filteredState });
              }}
            >
              DELETE
            </Button>
            <Button
              appearance="default"
              block
              onClick={() => {
                setEditedValue(state[itemNo]);
                setDesc(state[itemNo].ach_desc);

                setisOpen(true);
              }}
            >
              EDIT
            </Button>
          </div>
        </div>
      </Panel>
      <Modal
        open={isopen}
        onClose={() => {
          setisOpen(false);
        }}
      >
        <Modal.Header>EDIT ACHIEVEMENT</Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={(val) => {
              setEditedValue({ ...val });
            }}
            formValue={editedValue}
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
                defaultValue={desc}
                rows={5}
                placeholder="Enter work description"
                onInput={(event) => {
                  setEditedValue({
                    ...editedValue,
                    ach_desc: event.target.value,
                  });
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
                const filteredState = state.filter(
                  (_, index) => index !== itemNo
                );

                filteredState.push(editedValue);

                setResume({ ...resume, achievements: filteredState });

                setisOpen(false);
              }}
            >
              Save
            </Button>
            <Button
              appearance="ghost"
              onClick={() => {
                setisOpen(false);
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

export default AchievementItem;
