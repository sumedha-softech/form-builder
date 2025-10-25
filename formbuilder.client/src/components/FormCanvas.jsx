import { useContext, useEffect, useRef } from "react";
import { FbDataContext } from "../context/FbContext";
import { fieldTypes } from "../FormElements";
import { TrashIcon } from "lucide-react";

const FormCanvas = () => {
  const { 
    setSelectedField, 
    selectedField, 
    setFormFields, 
    formFields, 
    mode
  } = useContext(FbDataContext);
  const canvasRef = useRef(null);

  // Clear selectedField when clicking outside the canvas
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (canvasRef.current && !canvasRef.current.contains(e.target)) setSelectedField(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSelectedField, selectedField]);

  // Delete field inside a section
  const handleDeleteField = (fieldId) => {
    setFormFields(prev =>
      prev.map(section => {
        if (section.type === "section") {
          return {...section, fields: section.fields.filter(f => f.id !== fieldId)}
        } 
        return section;
      })
    );

    // Clear selection if the deleted field was selected
    if (selectedField?.id === fieldId) setSelectedField(null);
  };

  // Delete entire section
  const handleDeleteSection = (sectionId) => {
    setFormFields(prev => { return prev.filter(section => section.id !== sectionId) });

    if ( selectedField && formFields.some(sec => sec.id===sectionId && sec.fields.some(f => f.id===selectedField?.id)) ) setSelectedField(null);
  };

  // render fields accordingly
  const renderField = (field) => { 
    let isSelected = selectedField?.id === field?.id;

    switch (field?.type) {
      case "text":
        return (
          <div
            className="form-field-wrapper"
            style={{
              border: isSelected ? "1px solid red" : "",
              textAlign: field?.fieldAlign,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedField(field);
            }}
          >
            {
              field?.isShowLabel 
              && 
              (
                <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}
                >
                  { field?.label }
                </label>
              )
            }
            <input
              type="text"
              placeholder={field?.placeholder}
              className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
              readOnly={field?.isReadonly}
            />
            {
              isSelected 
              && 
              (
                <button
                  type="button"
                  className="form-field-delete-btn"
                  onClick={() => handleDeleteField(field?.id)}
                >
                  <TrashIcon size={17} />
                </button>
              )
            }
          </div>
        );
      case "email":
        return (
          <div
            className="form-field-wrapper"
            style={{
              border: isSelected ? "1px solid red" : "",
              textAlign: field?.fieldAlign,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedField(field);
            }}
          >
            {
              field?.isShowLabel 
              && 
              (
                <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}
                >
                  {field?.label}
                </label>
              )
            }
            <input
              type="email"
              placeholder={field?.placeholder}
              className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
              readOnly={field?.isReadonly}
            />
            {
              isSelected 
              && 
              (
                <button
                  type="button"
                  className="form-field-delete-btn"
                  onClick={() => handleDeleteField(field?.id)}
                >
                  <TrashIcon size={17} />
                </button>
              )
            }
          </div>
        );
      case "phone":
        return (
          <div
            className="form-field-wrapper"
            style={{
              border: isSelected ? "1px solid red" : "",
              textAlign: field?.fieldAlign,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedField(field);
            }}
          >
            {
              field?.isShowLabel 
              && 
              (
                <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}
                >
                  {field?.label}
                </label>
              )
            }
            <input
              type="number"
              placeholder={field?.placeholder}
              className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
              readOnly={field?.isReadonly}
            />
            {
              isSelected 
              && 
              (
                <button
                  type="button"
                  className="form-field-delete-btn"
                  onClick={() => handleDeleteField(field?.id)}
                >
                  <TrashIcon size={17} />
                </button>
              )
            }
          </div>
        );
      case "number":
        return (
          <div
            className="form-field-wrapper"
            style={{
              border: isSelected ? "1px solid red" : "",
              textAlign: field?.fieldAlign,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedField(field);
            }}
          >
            {
              field?.isShowLabel 
              && 
              (
                <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}
                >
                  {field?.label}
                </label>
              )
            }
            <input
              type="number"
              placeholder={field?.placeholder}
              className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
              readOnly={field?.isReadonly}
            />
            {
              isSelected 
              && 
              (
                <button
                  type="button"
                  className="form-field-delete-btn"
                  onClick={() => handleDeleteField(field?.id)}
                >
                  <TrashIcon size={17} />
                </button>
              )
            }
          </div>
        );
      case "textarea":
        return (
          <div
            className="form-field-wrapper"
            style={{
              border: isSelected ? "1px solid red" : "",
              textAlign: field?.fieldAlign,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedField(field);
            }}
          >
            {
              field?.isShowLabel 
              && 
              (
                <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}
                >
                  {field?.label}
                </label>
              )
            }
            <textarea
              placeholder={field?.placeholder}
              className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
              readOnly={field?.isReadonly}
              rows={3}
            />
            {
              isSelected 
              && 
              (
                <button
                  type="button"
                  className="form-field-delete-btn"
                  onClick={() => handleDeleteField(field?.id)}
                >
                  <TrashIcon size={17} />
                </button>
              )
            }
          </div>
        );
      case "checkbox":
        return (
          <div
            className="form-field-wrapper"
            style={{
              border: isSelected ? "1px solid red" : "",
              textAlign: field?.fieldAlign,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedField(field);
            }}
          >
            {
              field?.isShowLabel 
              && 
              (
                <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}
                >
                  {field?.label}
                </label>
              )
            }
            <div className="form-field-checkbox-wrapper">
              <input 
                type="checkbox" 
                className="form-field-checkbox" 
              />
              <label className={`form-field-checkbox-label ${mode === "light" ? "form-field-checkbox-label-light" : "form-field-checkbox-label-dark"}`}>
                Checkbox
              </label>
            </div>
            {
              isSelected 
              && 
              (
                <button
                  type="button"
                  className="form-field-delete-btn"
                  onClick={() => handleDeleteField(field?.id)}
                >
                  <TrashIcon size={17} />
                </button>
              )
            }
          </div>
        );
      case "radio":
        return (
          <div
            className="form-field-wrapper"
            style={{
              border: isSelected ? "1px solid red" : "",
              textAlign: field?.fieldAlign,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedField(field);
            }}
          >
            {
              field?.isShowLabel 
              && 
              (
                <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}
                >
                  {field?.label}
                </label>
              )
            }
            <div className="form-field-radio-wrapper">
              <input 
                type="radio" 
                className="form-field-radio" 
              />
              <label className={`form-field-radio-label ${mode === "light" ? "form-field-radio-label-light" : "form-field-radio-label-dark"}`}
              >
                Radio Option
              </label>
            </div>
            {
              isSelected 
              && 
              (
                <button
                  type="button"
                  className="form-field-delete-btn"
                  onClick={() => handleDeleteField(field?.id)}
                >
                  <TrashIcon size={17} />
                </button>
              )
            }
          </div>
        );
      case "select":
        return (
          <div
            className="form-field-wrapper"
            style={{
              border: isSelected ? "1px solid red" : "",
              textAlign: field?.fieldAlign,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedField(field);
            }}
          >
            {
              field?.isShowLabel 
              && 
              (
                <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}
                >
                  {field?.label}
                </label>
              )
            }
            <select className="form-field-input" defaultValue="">
              <option value="" disabled>
                Select an option
              </option>
              <option>
                Option 1
              </option>
              <option>
                Option 2
              </option>
            </select>
            {
              isSelected 
              && 
              (
                <button
                  type="button"
                  className="form-field-delete-btn"
                  onClick={() => handleDeleteField(field?.id)}
                >
                  <TrashIcon size={17} />
                </button>
              )
            }
          </div>
        );
      default:
        return (
          <div
            className="form-field-wrapper"
            style={{
              border: isSelected ? "1px solid red" : "",
              textAlign: field?.fieldAlign,
            }}
            onClick={e => {
              e.stopPropagation();
              setSelectedField(field);
            }}
          >
            {
              field?.isShowLabel 
              && 
              (
                <label className={`form-field-label ${mode === "light" ? "form-field-label-light" : "form-field-label-dark"}`}
                >
                  {field?.label}
                </label>
              )
            }
            <input
              type="text"
              placeholder={field?.placeholder}
              className={`form-field-default-input ${mode === "light" ? "form-field-default-input-light" : "form-field-default-input-dark"}`}
              readOnly={field?.isReadonly}
            />
            {
              isSelected 
              && 
              (
                <button
                  type="button"
                  className="form-field-delete-btn"
                  onClick={() => handleDeleteField(field?.id)}
                >
                  <TrashIcon size={17} />
                </button>
              )
            }
          </div>
        );
    }
  };

  // dragstart handler for dragging the fields
  const handleDragStart = (e, field, fromSection) => {
    e.dataTransfer.setData("field", field?.id);
    e.dataTransfer.setData("fromSection", fromSection?.id);
  };

  // drop handler for dragging field from sidebar
  const handleDragOver = (e, targetSectionId=null) => {
    e.preventDefault();

    const type = e.dataTransfer.getData("type");
    if (!type) return;
    const fieldType = fieldTypes
      .map(f => f?.fields)
      .flat()
      .find(control => control?.type===type);

    if (
      !targetSectionId &&
      fieldType &&
      fieldType?.type?.toLowerCase() === "section"
    ) {
      const newSectionData = {
        id: Date.now(),
        type: "section",
        title: "SECTION TITLE",
        description: "It describes more about the section",
        isShowTitle: true,
        isShowDescription: true,
        sectionWidth: "100%",
        sectionAlign: "left",
        fields: []
      };
      setFormFields(prev => { return [...prev, newSectionData] });
    } else if (
      targetSectionId &&
      fieldType &&
      fieldType?.type?.toLowerCase() !== "section"
    ) {
      const newFieldData = {
        id: Date.now(),
        type: fieldType?.type?.toLowerCase(),
        label: `${fieldType?.type?.toUpperCase()}`,
        placeholder: `Enter ${fieldType?.type?.toUpperCase()}`,
        isRequired: false,
        isShowLabel: true,
        isReadonly: false,
        fieldWidth: "50%",
        fieldAlign: "left"
      };

      const updatedFieldData = formFields.map(section => {
        if (section?.id === targetSectionId) {
          return {...section, fields: [...(section.fields || []), newFieldData]};
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
        if (
          section?.id?.toString() === targetSection?.id?.toString() 
          &&
          draggedField
        ) {
          const newFields = [...section?.fields];

          if (targetFieldId) {
            // reorder relative to targetField
            const targetIndex = newFields.findIndex(f => f?.id?.toString() === targetFieldId?.toString());
            newFields.splice(targetIndex, 0, draggedField); // drop/add before targetField
          } else {
            // if dropped in empty area(at last)
            newFields.push(draggedField);
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

  return (
    <div
      className={`form-canvas ${mode === "light" ? "form-canvas-light" : "form-canvas-dark"}`}
      onClick={() => setSelectedField(null)}
    >
      {/* canvas drop zone */}
      <div
        draggable
        onDragOver={e => e.preventDefault()}
        onDrop={handleDragOver}
        className="form-canvas-container"
      >
        <form className="form" onSubmit={e => e.preventDefault()}>
          {
            formFields 
            &&
            formFields
            ?.filter(f => f?.type?.toLowerCase() === "section")
            ?.map(sec => (
              // section area
              <div
                key={sec?.id}
                className={`form-section-container ${mode === "light" ? "form-section-container-light" : "form-section-container-dark"}`}
                style={{
                  width: sec?.sectionWidth,
                  border: selectedField?.id === sec?.id ? "1px solid red" : "",
                }}
                onClick={e => {
                  e.stopPropagation(); 
                  setSelectedField(sec);
                }}
                draggable
                onDragStart={e => handleSectionDragStart(e, sec?.id)}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
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
                  selectedField?.id === sec?.id 
                  && 
                  (
                    <button 
                      type="button" 
                      className="form-section-delete-btn" 
                      onClick={() => handleDeleteSection(sec?.id)}
                    >
                      <TrashIcon size={20} />
                    </button>
                  )
                }

                <div className="form-section-head" style={{ textAlign: sec?.sectionAlign }}>
                  {
                    sec?.isShowTitle 
                    && 
                    (
                      <h3 className={`form-section-head-heading ${mode === "light" ? "form-section-head-heading-light" : "form-section-head-heading-dark"}`}
                      >
                        { sec?.title }
                      </h3>
                    )
                  }
                    
                  {
                    sec?.isShowDescription 
                    && 
                    (
                      <p>
                        { sec?.description }
                      </p>
                    )
                  }
                </div>

                <div className="form-section-body">
                  {/* field area */}
                  {
                    sec?.fields?.length>0 
                    ? 
                    (
                      sec?.fields?.map(field => (
                        <div
                          key={field?.id}
                          className="form-fields-container"
                          style={{ width: field?.fieldWidth }}
                          draggable
                          onDragStart={e => handleDragStart(e, field, sec)}
                          onDragOver={e => handleDragOver(e, field?.id)}
                          onDrop={e => handleInternalDrop(e, sec, field?.id)}
                        >
                          { renderField(field) }
                        </div>
                      ))
                    ) 
                    : 
                    (
                      // empty section without any field
                      <div className="empty-section-container">
                        <h2 className={`empty-section-text ${mode === "light" ? "empty-section-text-light" : "empty-section-text-dark"}`}>
                          Drop a Field here...
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
        <div className={`form-empty-drop-section ${mode === "light" ? "form-empty-drop-section-light" : "form-empty-drop-section-dark"}`}>
          <h2 className={`form-empty-drop-section-heading ${mode === "light" ? "form-empty-drop-section-heading-light" : "form-empty-drop-section-heading-dark"}`}>
            Drop a Section
          </h2>
        </div>
        
      </div>
    </div>
  );
};

export default FormCanvas;