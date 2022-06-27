import React, { useEffect } from "react";
import image from "../main.jpg";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Panel,
  Col,
  Row,
  useToaster,
  Message,
} from "rsuite";
import { useResume } from "../context/context.resume";
const newResume = {
  basic: {},
  education: [],
  experiences: [],
  achievements: [],
};

const Home = () => {
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

      localStorage.setItem("current", text);

      toaster.push(<Message>File imported successfully !</Message>);
    } else if (fileHandle.kind === "directory") {
      window.alert("Folders cannot be a data! Choose a json file");
    }
  }

  useEffect(() => {
    const res = localStorage.getItem("current");

    if (res !== null) {
      const obj = JSON.parse(res);
      setResume({ ...obj });
      navigate("/create");
    }
  }, [resume, setResume, navigate]);

  const navigateToMain = () => {
    localStorage.setItem("current", JSON.stringify(newResume));

    navigate("/create");
  };

  return (
    <Container className="open-page">
      <Grid>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <div>
                  <img src={image} alt="logo" height={100} width={100} />
                </div>
                <h2>Welcome to Resumify</h2>
                <p>Build your resume online using the perfect online tool</p>
              </div>

              <div className="mt-3">
                <Button
                  block
                  appearance="primary"
                  color="green"
                  onClick={navigateToMain}
                >
                  Create a new resume
                </Button>
                <Button
                  block
                  appearance="primary"
                  color="blue"
                  onClick={() => {
                    getFile();
                  }}
                >
                  Import resume (*.json)
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Home;
