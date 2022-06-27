import React, { createContext, useState, useContext } from "react";

const ResumeContext = createContext();

const newResume = {
  basic: {},
  education: [],
  experiences: [],
  achievements: [],
};

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(newResume);

  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
