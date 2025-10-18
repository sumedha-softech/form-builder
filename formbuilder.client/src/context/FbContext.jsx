import { createContext, useState } from "react";

export const FbDataContext = createContext();

const FbContext = ({ children }) => {
  const [formData, setFormData] = useState({}); // state to store final form data with all fields & sections
  const [formFields, setFormFields] = useState([]); // state to store form data
  const [selectedField, setSelectedField] = useState(null); // state to store selected field/section
  const [formTitle, setFormTitle] = useState("untitled"); // state to store form-title
  const [mode, setMode] = useState("light");  // state to store light/dark mode
  
  const value = {
    setSelectedField,
    selectedField,
    setFormFields,
    setFormTitle,
    setFormData,
    formFields,
    formTitle,
    formData,
    setMode,
    mode
  };

  return (
    <>
      <FbDataContext.Provider value={value}>
        { children }
      </FbDataContext.Provider>
    </>
  );
};

export default FbContext;