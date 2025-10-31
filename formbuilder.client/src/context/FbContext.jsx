import { createContext, useState } from "react";

export const FbDataContext = createContext();

const FbContext = ({ children }) => {

  // current-device-theme
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const [formData, setFormData] = useState({}); // complete form-data(sections&fields)
  const [formFields, setFormFields] = useState([]); // form-data
  const [selectedField, setSelectedField] = useState(null); // selected field/section
  const [formTitle, setFormTitle] = useState("untitled"); // form-title
  const [mode, setMode] = useState(systemTheme.matches?"dark":"light");  // theme
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  
  const value = {
    setShowPropertiesPanel,
    showPropertiesPanel, 
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