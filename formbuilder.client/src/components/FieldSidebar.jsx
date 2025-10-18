import { useContext, useState } from "react";
import { fieldTypes } from "../FormElements";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FbDataContext } from "../context/FbContext";

const FieldSidebar = () => {
  const [showFields, setShowFields] = useState(false);
  const { mode } = useContext(FbDataContext);

  return (
    <div className="field-sidebar-outer-container">
      <div className="field-sidebar-outer-wrapper">
        <span
          className={`field-sidebar-heading ${
            mode === "light"
              ? "field-sidebar-heading-light"
              : "field-sidebar-heading-dark"
          }`}
          onClick={() => setShowFields(!showFields)}
        >
          <h2>
            Field Types
          </h2>
          
          {
            showFields 
            ? 
            (
              <ChevronUp className="field-sidebar-chevron-btn" />
            ) 
            : 
            (
              <ChevronDown
                className={`field-sidebar-chevron-btn ${
                  mode === "light"
                    ? "field-sidebar-chevron-btn-light"
                    : "field-sidebar-chevron-btn-dark"
                  }
                `}
              />
            )
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
                    className={`field-sidebar-inner-wrapper ${
                      mode === "light"
                        ? "field-sidebar-inner-wrapper-light"
                        : "field-sidebar-inner-wrapper-dark"
                    }`}
                  >
                    <h4
                      className={`field-sidebar-title ${
                        mode === "light"
                          ? "field-sidebar-title-light"
                          : "field-sidebar-title-dark"
                      }`}
                    >
                      { f?.title }
                    </h4>

                    <div className="field-container">
                    {
                      f?.fields?.map(field => (
                        <button
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("type", field?.type);
                          }}
                          key={field.type}
                          className={`field-btn ${
                            mode === "light" ? "field-btn-light" : "field-btn-dark"
                          }`}
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
        )}
      </div>
    </div>
  );
};

export default FieldSidebar;