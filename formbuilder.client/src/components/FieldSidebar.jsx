import { ChevronDown, ChevronUp } from "lucide-react";
import { FbDataContext } from "../context/FbContext";
import { useContext, useState } from "react";
import { fieldTypes } from "../FormElements";

const FieldSidebar = () => {
  
  const { mode } = useContext(FbDataContext);
  const [showFields, setShowFields] = useState(false);

  return (
    <div className="field-sidebar-outer-container">
      
      <div className={`field-sidebar-outer-wrapper ${mode==='light' ? 'field-sidebar-outer-wrapper-light' : 'field-sidebar-outer-wrapper-dark'}`}>
        
        <span
          onClick={() => setShowFields(!showFields)}
          className={`field-sidebar-heading ${mode === "light" ? "field-sidebar-heading-light" : "field-sidebar-heading-dark"}`}
        >
          <h2>Field Types</h2>
          
          {
            showFields 
            ? 
            ( <ChevronUp className="field-sidebar-chevron-btn"/> ) 
            : 
            ( <ChevronDown className={`field-sidebar-chevron-btn ${mode === "light" ? "field-sidebar-chevron-btn-light" : "field-sidebar-chevron-btn-dark"}`}/> )
          }
        </span>
        
        {
          showFields 
          && 
          (
            <div className="field-sidebar-inner-container">
              {
                fieldTypes?.map(f => (
                  <div
                    key={f.title}
                    className={`field-sidebar-inner-wrapper ${mode === "light" ? "field-sidebar-inner-wrapper-light" : "field-sidebar-inner-wrapper-dark"}`}
                  >
                    <h4 className={`field-sidebar-title ${mode === "light" ? "field-sidebar-title-light" : "field-sidebar-title-dark"}`}>
                      { f?.title }
                    </h4>

                    <div className="field-container">
                      {
                        f?.fields?.map(field => (
                          <button
                            draggable
                            key={field.type}
                            onDragStart={e => {e.dataTransfer.setData("type", field?.type)}}
                            className={`field-btn ${mode === "light" ? "field-btn-light" : "field-btn-dark"}`}
                          >
                            <field.icon />
                            {field?.label}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default FieldSidebar;