import { Icon } from "@rsuite/icons";
import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Modal, Panel, Uploader } from "rsuite";
import NavBar from "../components/NavBar";
import { FaCameraRetro } from "react-icons/fa";
import { useResume } from "../context/context.resume";
import { addToCache } from "../misc/Helper";

const BasicProfile = () => {
  const initdata = {
    fname: "",
    lname: "",
    photo: "",
    email: "",
    dob: "",
    city: "",
    state: "",
    pincode: "",
    techs: "",
    hobbies: "",
    summary: "",
    phno: "",
  };

  const [formData, setFormData] = useState(null);

  const { resume, setResume } = useResume();

  const centerFlex = { display: "flex", justifyContent: "center" };
  const [isOpen, setIsOpen] = useState(false);

  const [fileInfo, setFileInfo] = useState(null);

  const styles = {
    height: 150,
    borderRadius: "50%",
    width: 150,
  };

  function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };

    reader.addEventListener("load", () => {
      setFormData({ ...formData, photo: reader.result });
    });

    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (JSON.stringify(resume) !== "{}") {
      setFormData(resume["basic"]);
      setFileInfo(resume["basic"]["photo"]);
    }
  }, [resume]);
  return (
    <div>
      <NavBar />
      <div className="text-center pd2em">
        <h3>Basic Information</h3>
        <p style={{ fontSize: "1rem" }}>
          Fill out every details so that you are recognized easily and your name
          reflects your resume !
        </p>
      </div>
      <div style={centerFlex}>
        <Panel bordered className="form-basic">
          <div style={centerFlex}>
            <Uploader
              fileListVisible={false}
              action="/create"
              listType="picture"
              onUpload={(file) => {
                previewFile(file.blobFile, (value) => {
                  setFileInfo(value);
                });
              }}
            >
              <button style={styles}>
                {fileInfo ? (
                  <img src={fileInfo} width="100%" height="100%" alt="" />
                ) : (
                  <Icon as={FaCameraRetro} size="2em" />
                )}
              </button>
            </Uploader>
          </div>
          <hr />
          <Form
            fluid
            onChange={(val) => {
              setFormData({ ...val });
            }}
            formValue={formData}
          >
            <Form.Group style={{ display: "flex" }}>
              <Form.Control
                name="fname"
                autoComplete="off"
                placeholder="First Name"
              />
              &nbsp;
              <Form.Control
                name="lname"
                autoComplete="off"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group controlId="">
              <Form.Control
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Email"
              />
              &nbsp; &nbsp;
              <Form.Group style={{ display: "flex" }}>
                <Form.Control
                  name="phno"
                  type="text"
                  autoComplete="off"
                  placeholder="Phone Number"
                />
                &nbsp;&nbsp;
                <Form.Control name="dob" type="date" />
              </Form.Group>
            </Form.Group>
            <Form.Group style={{ display: "flex" }}>
              <Form.Control name="city" autoComplete="off" placeholder="City" />
              &nbsp; &nbsp;
              <Form.Control
                name="state"
                autoComplete="off"
                placeholder="State"
              />
              &nbsp; &nbsp;
              <Form.Control
                name="pincode"
                autoComplete="off"
                placeholder="Pincode"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="hobbies"
                autoComplete="off"
                type="text"
                placeholder="Hobbies"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="techs"
                autoComplete="off"
                type="text"
                placeholder="Technical Competencies"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                name="summary"
                autoComplete="off"
                type="text"
                placeholder="Professional Summary"
              />
            </Form.Group>

            <ButtonToolbar style={centerFlex}>
              <Button
                appearance="primary"
                color="red"
                onClick={() => {
                  const n = { ...resume, basic: formData };
                  setResume(n);
                  setIsOpen(true);
                }}
              >
                Save Details
              </Button>
              <Button
                appearance="primary"
                color="blue"
                onClick={() => {
                  setFormData(initdata);
                  setFileInfo(null);
                }}
              >
                Reset
              </Button>
            </ButtonToolbar>
          </Form>
        </Panel>
      </div>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Modal.Body>Save basic profile to localstorage?</Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              appearance="subtle"
              onClick={() => {
                const n = { ...resume, basic: formData };
                setResume(n);
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

export default BasicProfile;
