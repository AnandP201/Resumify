import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Modal, Panel, PanelGroup } from "rsuite";
import NavBar from "../components/NavBar";
import { useResume } from "../context/context.resume";
import { addToCache } from "../misc/Helper";

const EducationDetails = () => {
  const init10 = {
    name10: "",
    board10: "",
    yearstart10: "",
    yearend10: "",
    city10: "",
    per10: "",
  };

  const init12 = {
    name12: "",
    board: "",
    yearstart12: "",
    yearend12: "",
    city12: "",
    per12: "",
  };

  const initg = {
    nameuniv: "",
    degree: "",
    yearstartg: "",
    yearendg: "",
    cityg: "",
    perg: "",
  };

  const { resume, setResume } = useResume();

  const [data_10, setData10] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data_12, setData12] = useState(null);
  const [grad, setGrad] = useState(null);

  const centerFlex = {
    display: "flex",
    justifyContent: "center",
  };

  useEffect(() => {
    if (data_10 === null || data_12 === null || grad === null) {
      setData10(resume["education"][0]);
      setData12(resume["education"][1]);
      setGrad(resume["education"][2]);
    }
  }, [data_10, data_12, grad, resume]);

  const resetForms = () => {
    setData10(init10);
    setData12(init12);
    setGrad(initg);
  };
  return (
    <div>
      <NavBar />
      <div className="text-center pd2em">
        <h3>Educational Background</h3>
        <p style={{ fontSize: "1rem" }}>
          This section is all about your education and academic details . Fill
          these details out to let others know about your academic status !
        </p>
      </div>
      <div style={{ ...centerFlex, marginTop: "0.2em" }}>
        <Panel style={centerFlex}>
          <PanelGroup accordion bordered style={{ width: "50rem" }}>
            <Panel bordered header="Intermediate (10th) " defaultExpanded>
              <Form
                fluid
                onChange={(val) => {
                  setData10(val);
                }}
                formValue={data_10}
              >
                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    name="name10"
                    autoComplete="off"
                    placeholder="Institute / School Name"
                  />
                  &nbsp;
                  <Form.Control
                    name="board10"
                    autoComplete="off"
                    placeholder="Enter school board"
                  />
                </Form.Group>

                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder="Start Date"
                    name="yearstart10"
                    autoComplete="off"
                  />
                  &nbsp;
                  <Form.Control
                    type="text"
                    placeholder="End date"
                    name="yearend10"
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    name="city10"
                    autoComplete="off"
                    placeholder="City/State"
                  />
                  &nbsp;
                  <Form.Control
                    name="per10"
                    autoComplete="off"
                    placeholder="Percentage/CGPA"
                  />
                  &nbsp;
                </Form.Group>
              </Form>
            </Panel>

            <Panel bordered header="Matriculation (12th)">
              <Form
                fluid
                onChange={(val) => {
                  setData12(val);
                }}
                formValue={data_12}
              >
                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    name="name12"
                    autoComplete="off"
                    placeholder="School Name"
                  />
                  &nbsp;
                  <Form.Control
                    name="board12"
                    autoComplete="off"
                    placeholder="Enter School board"
                  />
                </Form.Group>
                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    name="yearstart12"
                    autoComplete="off"
                    placeholder="Start date"
                  />
                  &nbsp;
                  <Form.Control
                    type="text"
                    name="yearend12"
                    autoComplete="off"
                    placeholder="End date"
                  />
                </Form.Group>
                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    name="city12"
                    autoComplete="off"
                    placeholder="City/State"
                  />
                  &nbsp;
                  <Form.Control
                    name="per12"
                    type="number"
                    autoComplete="off"
                    placeholder="Percentage/CGPA"
                  />
                </Form.Group>
              </Form>
            </Panel>

            <Panel bordered header="Graduation">
              <Form
                fluid
                onChange={(val) => {
                  setGrad(val);
                }}
                formValue={grad}
              >
                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    name="nameuniv"
                    autoComplete="off"
                    placeholder="University Name"
                  />
                  &nbsp;
                  <Form.Control
                    name="degree"
                    autoComplete="off"
                    placeholder="Enter Program/Course"
                  />
                </Form.Group>
                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder="Start date"
                    name="yearstartg"
                    autoComplete="off"
                  />
                  &nbsp;&nbsp;
                  <Form.Control
                    type="text"
                    placeholder="End date"
                    name="yearendg"
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group style={{ display: "flex" }}>
                  <Form.Control
                    name="cityg"
                    autoComplete="off"
                    placeholder="City/State"
                  />
                  &nbsp;
                  <Form.Control
                    name="perg"
                    type="number"
                    autoComplete="off"
                    placeholder="Percentage/CGPA"
                  />
                </Form.Group>
              </Form>
            </Panel>
          </PanelGroup>
          <ButtonToolbar style={{ ...centerFlex, marginTop: "0.5em" }}>
            <Button
              appearance="primary"
              color="red"
              onClick={() => {
                const arr = [data_10, data_12, grad];
                setResume({ ...resume, education: [...arr] });
                setIsOpen(true);
              }}
            >
              Save Details
            </Button>
            <Button
              appearance="primary"
              color="blue"
              onClick={() => {
                resetForms();
              }}
            >
              Reset
            </Button>
          </ButtonToolbar>
        </Panel>
      </div>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Modal.Body>Save education details to localstorage ?</Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              appearance="subtle"
              onClick={() => {
                const arr = [data_10, data_12, grad];
                setResume({ ...resume, education: [...arr] });
                addToCache(resume);
                setIsOpen(false);
              }}
            >
              YES
            </Button>
            <Button
              appearance="primary"
              color="red"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              NO
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EducationDetails;
