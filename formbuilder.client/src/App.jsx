import { FbDataContext } from "./context/FbContext";
import FormCanvas from "./components/FormCanvas";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import "./style.css";

function App() {
  const { 
    setFormFields, 
    setSelectedField, 
    mode 
  } = useContext(FbDataContext);

  const updateField = (updatedField) => {
    setFormFields(prev => {
      return prev?.map(section => (
        {
          ...section, 
          fields:section?.fields?.map(field => (field?.id === updatedField?.id) ? updatedField : field)
        }
      ))
    });
    setSelectedField(updatedField);
  };

  const updateSection = (updatedField) => {
    setFormFields(prev => {
      return prev?.map(field => (field?.id === updatedField?.id) ? updatedField : field)
    });
    setSelectedField(updatedField);
  };

  return (
    <div className={`main ${mode === "light" ? "light-mode" : "dark-mode"}`}>
      <Navbar />
      <div className="form-builder-container">
        <FormCanvas />
        <Sidebar 
          onUpdateField={updateField} 
          onUpdateSection={updateSection} 
        />
      </div>
    </div>
  );
}
export default App;