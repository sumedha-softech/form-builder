import { useContext, useEffect, useRef } from "react";
import { FbDataContext } from "../context/FbContext";
import { fieldTypes } from "../FormElements";
import { TrashIcon } from "lucide-react";

const FormCanvas = () => {
  
  const canvasRef = useRef(null);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const urlRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/;

  const {setSelectedField, selectedField, setFormFields, formFields, mode} = useContext(FbDataContext);

  // Delete field inside a section
  const handleDeleteField = (fieldId) => {
    setFormFields(prev =>
      prev.map(section => {
        if (section.type === "section") {
          return {
            ...section, 
            fields: section.fields.filter(f => f.id !== fieldId)
          }
        } 
        return section;
      })
    );
    setSelectedField(null);
  };

  // Delete entire section
  const handleDeleteSection = (sectionId) => {
    setFormFields(prev => { 
      return prev.filter(section => section.id !== sectionId) 
    });

    setSelectedField(null);
  };

  // render fields accordingly
  const renderField = (field, sectionId) => { 
    let isSelected = selectedField?.id === field?.id;

    const validateField = (field, value) => {
      // check for valid email
      if (field?.emailCheck && !emailRegex.test(value)) {
        return "**Please enter a valid email";
      }
      // check for valid password
      if (field?.passwordCheck && !passwordRegex.test(value)) {
        return "**Password must contains 8 digits with 1 lowercase, 1 uppercase, 1 number and 1 special character.";
      }
      // check if username is empty or not
      if (field?.isUsernameEmpty && (!value || value==="")) {
        return "**Please provide a username.";
      }
      // check for valid phone number
      if (field?.phoneNumberCheck && !phoneRegex.test(value)) {
        return "**Please enter a valid phone number.";
      }
      // check for valid url
      if (field?.urlCheck && !urlRegex.test(value)) {
        return "**Please enter a valid url.";
      }
      // check for range between 1-10
      if (field?.rangeCheck && (value<1 || value>10)) {
        return "**Please select range between 1 to 10";
      }
      // check for required checkbox
      if (field?.type==="checkbox" && field?.isFieldRequired && (!value || value==="")) {
        return "**You must select the checkbox";
      }
      // check for required radio button
      if (field?.type==="radio" && field?.isFieldRequired && (!value || value==="")) {
        return "**You must select atleast one option";
      }
      // check for past date
      if (field?.type==="date" && field?.checkForPastDate && value) {
        const inputDate = new Date(value);
        const today = new Date();
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (inputDate > today) {
          return "**Please enter valid past date.";
        }
      }
      // check for future date
      if (field?.type==="date" && field?.checkForFutureDate && value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const chosenDate = new Date(value);
        chosenDate.setHours(0, 0, 0, 0);
        if (chosenDate < today) {
          return "**Please enter valid future date.";
        }
      }

      return "";
    };
    
    // function to handle change
    const handleChange = (id, value) => {
      setFormFields(prev =>
        prev.map(section => {
          if (section.id!==sectionId) return section;

          const updatedFields = section.fields.map(field =>
            field?.id===id
            ? 
            { ...field, value, error:validateField(field, value) }
            : 
            field
          );

          return { ...section, fields:updatedFields };
        })
      );      
    }

    // Rendering the Fields
    if (field?.type==="textarea") {
      return (
        <div
          onClick={e => {
            e.stopPropagation();
            setSelectedField(field);
          }}
          className="form-field-wrapper"
          style={{textAlign: field?.fieldAlign, border: isSelected && "1px solid red"}}
        >
          {
            field?.isShowLabel 
            && 
            (
              <label className={`form-field-label ${mode==="light" ? "form-field-label-light" : "form-field-label-dark"}`}>
                { field?.isFieldRequired ? `**${field?.label}` : field?.label }
              </label>
            )
          }
          <textarea
            rows={3}
            value={field?.value}
            readOnly={field?.isReadonly}
            placeholder={field?.placeholder}
            disabled={field?.isFieldDisabled}
            required={field?.isFieldRequired}
            maxLength={field?.limit ? 30 : "any"}
            onChange={(e) => handleChange(field?.id, e.target.value)}
            className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
          />
          
          {field?.error && <p className="field-error">{field?.error}</p>}
          
          { 
            isSelected 
            && 
            <FieldDeleteBtn fieldId={field?.id} handleDeleteField={handleDeleteField}/> 
          }
        </div>
      )
    } else if (field?.type === "select") {
      return (
        <div
          className="form-field-wrapper"
          style={{border: isSelected && "1px solid red", textAlign: field?.fieldAlign}}
          onClick={e => {
            e.stopPropagation();
            setSelectedField(field);
          }}
        >
          {
            field?.isShowLabel 
            && 
            (
              <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}>
                { field?.isFieldRequired ? `**${field?.label}` : field?.label }
              </label>
            )
          }

          <select className="form-field-input" disabled={field?.isFieldDisabled} defaultValue="">
            <option>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
          
          {field?.error && <p className="field-error">{field?.error}</p>}
          
          {
            isSelected 
            && 
            <FieldDeleteBtn fieldId={field?.id} handleDeleteField={handleDeleteField}/>
          }
        </div>
      );
    } else if (field?.type === "radio") {
      return (
        <div
          className="form-field-wrapper"
          style={{border: isSelected && "1px solid red", textAlign: field?.fieldAlign}}
          onClick={e => {
            e.stopPropagation();
            setSelectedField(field);
          }}
        >
          {
            field?.isShowLabel 
            && 
            (
              <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}>
                {field?.isFieldRequired ? `**${field?.label}` : field?.label}
              </label>
            )
          }

          <div className="form-field-radio-wrapper">
            <input 
              type="radio" 
              value={field?.value}
              className="form-field-radio" 
              required={field?.isFieldRequired}
              disabled={field?.isFieldDisabled}
              onChange={(e) => handleChange(field?.id, e.target.value)}
            />
            <label className={`form-field-radio-label ${mode === "light" ? "form-field-radio-label-light" : "form-field-radio-label-dark"}`}>
              Radio Option
            </label>
          </div>

          { field?.error && <p className="field-error">{field?.error}</p> }

          {
            isSelected 
            && 
            <FieldDeleteBtn fieldId={field?.id} handleDeleteField={handleDeleteField}/>
          }
        </div>
      );
    } else if (field?.type === "checkbox") {
      return (
        <div
          className="form-field-wrapper"
          style={{textAlign: field?.fieldAlign, border: isSelected && "1px solid red"}}
          onClick={e => {
            e.stopPropagation();
            setSelectedField(field);
          }}
        >
          {
            field?.isShowLabel 
            && 
            (
              <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}>
                { field?.isFieldRequired ? `**${field?.label}` : field?.label }
              </label>
            )
          }

          <div className="form-field-checkbox-wrapper">
            <input 
              type="checkbox"
              value={field?.value}
              className="form-field-checkbox" 
              required={field?.isFieldRequired}
              disabled={field?.isFieldDisabled}
              onChange={(e) => handleChange(field?.id, e.target.value)} 
            />
            <label className={`form-field-checkbox-label ${mode === "light" ? "form-field-checkbox-label-light" : "form-field-checkbox-label-dark"}`}>
              Checkbox
            </label>
          </div>
          
          { field?.error && <p className="field-error">{field?.error}</p> }

          {
            isSelected 
            && 
            <FieldDeleteBtn fieldId={field?.id} handleDeleteField={handleDeleteField}/>
          }
        </div>
      );
    } else if (field?.type === "range") {
      return (
        <div
          className="form-field-wrapper"
          style={{border: isSelected && "1px solid red", textAlign: field?.fieldAlign}}
          onClick={e => {
            e.stopPropagation();
            setSelectedField(field);
          }}
        >
          {
            field?.isShowLabel 
            && 
            (
              <label htmlFor={field?.id} className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}>
                { field?.isFieldRequired ? `**${field?.label}` : field?.label }
              </label>
            )
          }
          <input
            id={field?.id}
            type="range"
            min={field?.rangeCheck ? 1 : "any"}
            max={field?.rangeCheck ? 10 : "any"}
            value={field?.value}
            readOnly={field?.isReadonly}
            placeholder={field?.placeholder}
            required={field?.isFieldRequired}
            disabled={field?.isFieldDisabled}
            onChange={(e) => handleChange(field?.id, e.target.value)}
            className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
          />
          
          { field?.error && <p className="field-error">{field?.error}</p> }

          {
            isSelected 
            && 
            <FieldDeleteBtn fieldId={field?.id} handleDeleteField={handleDeleteField}/>
          }
        </div>
      );
    } else {
      return (
        <div
          className="form-field-wrapper"
          style={{border: isSelected && "1px solid red", textAlign: field?.fieldAlign}}
          onClick={e => {
            e.stopPropagation();
            setSelectedField(field);
          }}
        >
          {
            field?.isShowLabel 
            && 
            (
              <label htmlFor={field?.id} className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}>
                { field?.isFieldRequired ? `**${field?.label}` : field?.label }
              </label>
            )
          }
          <input
            id={field?.id}
            type={field?.type}
            value={field?.value}
            readOnly={field?.isReadonly}
            placeholder={field?.placeholder}
            required={field?.isFieldRequired}
            disabled={field?.isFieldDisabled}
            maxLength={field?.limit ? 25 : "any"}
            onChange={(e) => handleChange(field?.id, e.target.value)}
            className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
          />
          
          { field?.error && <p className="field-error">{field?.error}</p> }

          {
            isSelected 
            && 
            <FieldDeleteBtn fieldId={field?.id} handleDeleteField={handleDeleteField}/>
          }
        </div>
      )
    }
  };

  // drag-start handler for dragging the fields
  const handleDragStart = (e, field, fromSection) => {
    e.dataTransfer.setData("field", field?.id);
    e.dataTransfer.setData("fromSection", fromSection?.id);
  };

  // drop handler for dragging/dropping field from sidebar
  const handleDragOver = (e, targetSectionId=null) => {
    e.preventDefault();

    const type = e.dataTransfer.getData("type");
    if (!type) return;
    
    const fieldType = fieldTypes.map(f => f?.fields).flat().find(control => control?.type===type);

    if (
      !targetSectionId &&
      fieldType &&
      fieldType?.type?.toLowerCase() === "section"
    ){
      const newSectionData = {
        fields: [],
        id: Date.now(),
        type: "section",
        isShowTitle: true,
        sectionAlign: "left",
        sectionWidth: "100%",
        title: "SECTION TITLE",
        isShowDescription: true,
        description: "It describes more about the section",
      };
      setFormFields(prev => { return [...prev, newSectionData] });
    } else if (
      targetSectionId &&
      fieldType &&
      fieldType?.type?.toLowerCase() !== "section"
    ){
      const newFieldData = {
        id: Date.now(),
        value: "",
        error: "",
        limit: false,
        urlCheck: false,
        isShowLabel: true,
        isReadonly: false,
        emailCheck: false,
        rangeCheck: false,
        fieldWidth: "50%",
        fieldAlign: "left",
        passwordCheck: false,
        isFieldRequired: false,
        isFieldDisabled: false,
        isUsernameEmpty: false,
        phoneNumberCheck: false,
        checkForPastDate: false,
        checkForFutureDate: false,
        type: fieldType?.type?.toLowerCase(),
        label: `${fieldType?.type?.toUpperCase()}`,
        placeholder: `Enter ${fieldType?.type?.toUpperCase()}`,
      };

      const updatedFieldData = formFields.map(section => {
        if (section?.id === targetSectionId) {
          return {
            ...section, 
            fields: [...(section.fields || []), newFieldData]
          };
        }
        return section;
      });
      setFormFields(updatedFieldData);
    } else {
      return;
    }
  };

  // drop handler for dragging/dropping field among sections
  const handleInternalDrop = (e, targetSection, targetFieldId=null) => {
    e.preventDefault();

    const fieldId = e.dataTransfer.getData("field");
    const fromSectionId = e.dataTransfer.getData("fromSection");
    if (!fieldId || !fromSectionId) return;

    setFormFields(prev => {
      let draggedField = null;

      // Remove field from source/dragged section
      let updatedFields = prev.map(section => {
        if (section.id.toString() === fromSectionId.toString()) {
          draggedField = section.fields.find(f => f.id.toString() === fieldId.toString());
          return {
            ...section,
            fields: section.fields.filter(f => f.id.toString()!==fieldId.toString())
          };
        }
        return section;
      });

      // Add field to target/dropped section (with reordering)
      return updatedFields.map(section => {
        if ( draggedField && section?.id?.toString() === targetSection?.id?.toString() ){
          const newFields = [...section?.fields];

          if (targetFieldId) {
            // reorder relative to targetField
            const targetIndex = newFields.findIndex(f => f?.id?.toString() === targetFieldId?.toString());
            newFields.splice(targetIndex, 0, draggedField); // drop/add before targetField
          } else {
            newFields.push(draggedField);   // if dropped in empty area(at last)
          }
          return { ...section, fields: newFields };
        }
        return section;
      });
    });
  };

  // dragstart handler for dragging the section
  const handleSectionDragStart = (e, sectionId) => {
    e.dataTransfer.setData("sectionId", sectionId);
  };

  // drop handler for reordering among sections
  const handleSectionDrop = (e, targetSectionId) => {
    e.preventDefault();

    const draggedSectionId = e.dataTransfer.getData("sectionId");
    if (!draggedSectionId) return;

    setFormFields(prev => {
      const draggedIndex = prev.findIndex(sec => sec?.id?.toString() === draggedSectionId?.toString());
      const targetIndex = prev.findIndex(sec => sec?.id?.toString() === targetSectionId?.toString());

      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const updatedSections = [...prev];
      const [draggedSection] = updatedSections.splice(draggedIndex, 1);

      // insert before targetIndex
      updatedSections.splice(targetIndex, 0, draggedSection);

      return updatedSections;
    });
  };

  // Clear selectedField when clicking outside the canvas
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(canvasRef.current && !canvasRef.current.contains(e.target)) {
        setSelectedField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [selectedField]);

  // clear selected field after deleting a field or a section
  useEffect(() => {
    if (!selectedField) return;

    const exists = formFields.some(section => {
      if (section.id === selectedField.id) return true;
      if (section.fields?.some?.(f => f.id === selectedField.id)) return true;
      return false;
    });

    if (!exists) setSelectedField(null);
  }, [formFields, selectedField]);

  return (
    <div
      onClick={()=>setSelectedField(null)}
      className={`form-canvas ${mode === "light" ? "form-canvas-light" : "form-canvas-dark"}`}
    >
      
      {/* canvas drop zone */}
      <div draggable onDrop={handleDragOver} className="form-canvas-container" onDragOver={(e)=>e.preventDefault()}>
        <form className="form" onSubmit={(e)=>e.preventDefault()}>
          {
            formFields 
            &&
            formFields
            ?.filter(f => f?.type?.toLowerCase()==="section")
            ?.map(sec => (
              // section area
              <div
                key={sec?.id}
                className={`form-section-container ${mode === "light" ? "form-section-container-light" : "form-section-container-dark"}`}
                style={{
                  width: sec?.sectionWidth,
                  border: selectedField?.id===sec?.id && "1px solid red",
                }}
                onClick={(e)=>{
                  e.stopPropagation(); 
                  setSelectedField(sec);
                }}
                draggable
                onDragStart={(e)=>handleSectionDragStart(e, sec?.id)}
                onDragOver={(e)=>e.preventDefault()}
                onDrop={(e)=>{
                  if (e.dataTransfer.getData("field")) {
                    handleInternalDrop(e, sec); // if field is dragged from one section to another
                  } else if (e.dataTransfer.getData("sectionId")) {
                    handleSectionDrop(e, sec?.id); // for reordering of section itself
                  } else {
                    handleDragOver(e, sec?.id); // if field is dragged from sidebar
                  }
                }}
              >
                {/* Delete button for section */}
                {
                  selectedField?.id===sec?.id 
                  && 
                  <button type="button" className="form-section-delete-btn" onClick={()=>handleDeleteSection(sec?.id)}>
                    <TrashIcon size={20} />
                  </button>
                }

                {/* section-title/description */}
                <div className="form-section-head" style={{textAlign: sec?.sectionAlign}}>
                  {
                    sec?.isShowTitle 
                    && 
                    <h3 className={`form-section-head-heading ${mode === "light" ? "form-section-head-heading-light" : "form-section-head-heading-dark"}`}>
                      {sec?.title}
                    </h3>
                  }
                    
                  {sec?.isShowDescription && <p>{sec?.description}</p>}
                </div>

                {/* field area */}
                <div className="form-section-body">
                  {
                    sec?.fields?.length > 0 
                    ? 
                    (
                      sec?.fields?.map(field => (
                        <div
                          draggable
                          key={field?.id}
                          className="form-fields-container"
                          style={{width: field?.fieldWidth}}
                          onDragOver={(e)=>handleDragOver(e, field?.id)}
                          onDragStart={(e)=>handleDragStart(e, field, sec)}
                          onDrop={(e)=>handleInternalDrop(e, sec, field?.id)}
                        >
                          {renderField(field, sec?.id)}
                        </div>
                      ))
                    ) 
                    : 
                    (
                      // empty section without any field
                      <div className="empty-section-container">
                        <h2 className={`empty-section-text ${mode === "light" ? "empty-section-text-light" : "empty-section-text-dark"}`}>
                          Drop a field here...
                        </h2>
                      </div>
                    )
                  }
                </div>
              </div>
            ))
          }
        </form>

        {/* empty drop area */}
        <div className="form-empty-drop-section">
          <h2 className={`form-empty-drop-section-heading ${mode === "light" ? "form-empty-drop-section-heading-light" : "form-empty-drop-section-heading-dark"}`}>
            Drop a section here...
          </h2>
        </div>
      </div>
    </div>
  );
};

const FieldDeleteBtn = ({fieldId, handleDeleteField}) => {
  return (
    <button type="button" className="form-field-delete-btn" onClick={() => handleDeleteField(fieldId)}>
      <TrashIcon size={17} />
    </button>
  )
}

export default FormCanvas;