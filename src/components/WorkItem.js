import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Modal, Panel } from "rsuite";
import { useResume } from "../context/context.resume";
import { addToCache } from "../misc/Helper";

const WorkItem = ({ itemNo, data, fnc, state }) => {
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
            <h3>{data.role}</h3>
            <p>
              <i>{data.cname}</i>
            </p>
            <h6>{`${data.sdate} - ${data.edate}`}</h6>
            <p>{data.work_desc}</p>
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

                setResume({ ...resume, experiences: filteredState });
              }}
            >
              DELETE
            </Button>
            <Button
              appearance="default"
              block
              onClick={() => {
                setEditedValue(state[itemNo]);
                setDesc(state[itemNo].work_desc);
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
        <Modal.Header>EDIT WORK EXPERIENCE</Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={(val) => {
              setEditedValue({ ...val });
            }}
            formValue={editedValue}
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
                rows={6}
                defaultValue={desc}
                placeholder="Enter work description"
                onInput={(event) => {
                  setEditedValue({
                    ...editedValue,
                    work_desc: event.target.value,
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

                setResume({ ...resume, experiences: filteredState });
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

export default WorkItem;
