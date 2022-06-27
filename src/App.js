import Home from "./components/Home";
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import { Route, Routes } from "react-router";
import EducationDetails from "./pages/EducationDetails";
import WorkExperience from "./pages/WorkExperience";
import Achievements from "./pages/Achievements";

import BasicProfile from "./pages/BasicProfile";
import { ResumeProvider } from "./context/context.resume";
import Resume from "./pages/Resume";

function App() {
  return (
    <div className="App">
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<BasicProfile />} />
          <Route path="/result" element={<Resume />} />
          <Route path="/education" element={<EducationDetails />} />
          <Route path="/works" element={<WorkExperience />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </ResumeProvider>
    </div>
  );
}

export default App;
