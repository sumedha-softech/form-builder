import { ChevronDown, ChevronUp } from "lucide-react";
import { useContext, useState } from "react";
import { FbDataContext } from "../context/FbContext";

const CopyBtn = ({ copyMode, setCopyMode, handleFormCopy }) => {
  
  const {mode} = useContext(FbDataContext);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleChange = (option) => {
    setCopyMode(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className={`dropdown-btn ${mode==="light" ? 'dropdown-btn-light' : 'dropdown-btn-dark'}`}>

        <button 
          onClick={handleFormCopy}
          className={`left-dropdown ${mode==='light' ? 'left-dropdown-light' : 'left-dropdown-dark'}`} 
        >
          copy {copyMode}
        </button>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`right-dropdown ${mode==='light' ? 'right-dropdown-light' : 'right-dropdown-dark'}`}
        >
          { isOpen ? <ChevronUp /> : <ChevronDown /> }
        </button>
      </div>

      {
        isOpen 
        && 
        (
          <div className="dropdown-menu">
            <div
              onClick={() => handleChange("html")}
              className={`dropdown-item ${copyMode==="html" && "active"}`}
            >
              Copy HTML
            </div>

            <div
              onClick={() => handleChange("json")}
              className={`dropdown-item ${copyMode === "json" && "active"}`}
            >
              Copy JSON
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CopyBtn;