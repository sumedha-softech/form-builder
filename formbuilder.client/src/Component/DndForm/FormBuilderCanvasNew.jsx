import React from "react";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import "./dnd-style.css";

import SortableSection from "./SortableSection";
import SortableField from "./SortableField";

function formatPhone(value) {
  const cleaned = value.replace(/\D/g, "");
  let formatted = cleaned;

  if (cleaned.length > 3 && cleaned.length <= 6) {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else if (cleaned.length > 6) {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }

  return formatted;
}

const FormBuilderCanvasNew = ({
  formFields,
  selectedField,
  onSelectField,
  onDeleteField,
  selectedSection,
  onSelectSection,
  onDropHandler,
  fieldRefs,
}) => {
  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <input id={field.id} name={field.name} readOnly={field.isReadOnly} type="text" className="form-control" placeholder={field.placeholder} />
          </>
        );

      case "textarea":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <textarea
              id={field.id}
              name={field.name}
              readOnly={field.isReadOnly}
              className="form-control"
              rows={4}
              placeholder={field.placeholder}
            ></textarea>
          </>
        );

      case "number":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <input
              id={field.id}
              name={field.name}
              readOnly={field.isReadOnly}
              className="form-control"
              rows={4}
              type="number"
              placeholder={field.placeholder}
            ></input>
          </>
        );

      case "email":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <input
              id={field.id}
              name={field.name}
              readOnly={field.isReadOnly}
              type="email"
              className="form-control"
              placeholder={field.placeholder}
            />
          </>
        );

      case "tel":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <input
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                field.value = formatted;
                e.target.value = formatted;
              }}
              id={field.id}
              name={field.name}
              readOnly={field.isReadOnly}
              className="form-control"
              type="tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              placeholder={field.placeholder}
            />
          </>
        );

      case "date":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <input id={field.id} name={field.name} type="date" className="form-control" disabled={field.isReadOnly} />
          </>
        );

      case "time":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <input id={field.id} name={field.name} type="time" className="form-control" disabled={field.isReadOnly} />
          </>
        );

      case "radio":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium">
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <div>
              {(field.options || ["Option 1", "Option 2", "Option 3"]).map((opt, idx) => (
                <div className="form-check" key={idx}>
                  <input className="form-check-input" type="radio" name={field.name} id={`${field.id}_opt${idx}`} disabled={field.isReadOnly} />
                  <label className="form-check-label" htmlFor={`${field.id}_opt${idx}`}>
                    {opt}
                  </label>
                </div>
              ))}
            </div>
          </>
        );

      case "select":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <select id={field.id} name={field.name} className="form-select" disabled={field.isReadOnly}>
              {(field.options || ["Option 1", "Option 2", "Option 3"]).map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </>
        );

      case "checkbox":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium">
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <div>
              {field?.options?.map((opt, idx) => (
                <div className="form-check" key={idx}>
                  <input
                    type={field.singleSelect ? "radio" : "checkbox"}
                    className="form-check-input"
                    name={field.singleSelect ? field.id : `${field.id}_${idx}`}
                    id={`${field.id}_${idx}`}
                  />
                  <label className="form-check-label" htmlFor={`${field.id}_opt${idx}`}>
                    {opt}
                  </label>
                </div>
              ))}
            </div>
          </>
        );

      case "rating":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium">
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}

            {/* Add style for rating */}

            <div className="rating-group" aria-disabled={field.isReadOnly ? "true" : "false"}>
              {[...(field.options || [1, 2, 3, 4, 5])].reverse().map((opt, idx) => {
                const val = typeof opt === "number" ? opt : idx + 1;
                const inputId = `${field.id}_star_${val}`;
                return (
                  <React.Fragment key={val}>
                    <input className="rating-input" type="radio" name={field.name} id={inputId} disabled={field.isReadOnly} />
                    <label className="rating-star" htmlFor={inputId} aria-label={`${val} star${val > 1 ? "s" : ""}`} title={`${val}`} />
                  </React.Fragment>
                );
              })}
            </div>
          </>
        );

      case "address":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium">
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}

            <div className="row g-2">
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Street No." name={`${field.name}_streetNo`} readOnly={field.isReadOnly} />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Plot / Apt No." name={`${field.name}_plotNo`} readOnly={field.isReadOnly} />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Street Name" name={`${field.name}_streetName`} readOnly={field.isReadOnly} />
              </div>

              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="City" name={`${field.name}_city`} readOnly={field.isReadOnly} />
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" placeholder="State" name={`${field.name}_state`} readOnly={field.isReadOnly} />
              </div>

              <div className="col-md-3">
                <input type="text" className="form-control" placeholder="Zip Code" name={`${field.name}_zip`} readOnly={field.isReadOnly} />
              </div>

              <div className="col-md-12">
                <input type="text" className="form-control" placeholder="Country" name={`${field.name}_country`} readOnly={field.isReadOnly} />
              </div>
            </div>
          </>
        );

      case "file":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <input
              id={field.id}
              name={field.name}
              type="file"
              className="form-control"
              disabled={field.isReadOnly}
              multiple={field.allowMultiple || false}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
              }}
            />
          </>
        );

      case "image":
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}

            <input
              id={field.id}
              name={field.name}
              type="file"
              accept="image/*"
              className="form-control mb-2"
              disabled={field.isReadOnly}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    field.previewUrl = ev.target?.result;
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />

            {field.previewUrl && (
              <div className="mt-2">
                <img src={field.previewUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px" }} />
              </div>
            )}
          </>
        );

      case "divider":
        return <hr className="border-top border-2 w-100" />;

      default:
        return (
          <>
            {field.isShowLabel && (
              <label className="form-label fw-medium" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
            )}
            <input id={field.id} name={field.name} readOnly={field.isReadOnly} type="text" className="form-control" placeholder={field.placeholder} />
          </>
        );
    }
  };

  return (
    <div className="form-preview flex-grow-1 overflow-auto p-4">
      <div className="container" onDrop={(e) => onDropHandler(e)} onDragOver={(e) => e.preventDefault()}>
        <form onSubmit={(e) => e.preventDefault()} className="row">
          <>
            <SortableContext items={formFields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              {formFields
                .filter((field) => field.type === "section")
                .map((section) => (
                  <SortableSection
                    key={section.id}
                    section={section}
                    onDeleteField={onDeleteField}
                    selectedSection={selectedSection}
                    onSelectSection={onSelectSection}
                  >
                    <div
                      className="sortable-section row"
                      onClick={(e) => {
                        e.stopPropagation();
                        const isInsideField = section.fields.some((f) => fieldRefs.current[f.id] && fieldRefs.current[f.id].contains(e.target));
                        if (!isInsideField) {
                          onSelectSection(section);
                        }
                      }}
                      onDrop={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDropHandler(e, section.id);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <SortableContext items={section.fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                        {/* dynamic fields */}
                        {section.fields
                          .filter((field) => field.type !== "section")
                          .map((field) => (
                            <div className={field.width} ref={(el) => (fieldRefs.current[field.id] = el)}>
                              <SortableField
                                key={field.id}
                                field={field}
                                sectionField={section}
                                selectedField={selectedField}
                                onSelectField={onSelectField}
                                onDeleteField={onDeleteField}
                              >
                                {renderField(field)}
                              </SortableField>
                            </div>
                          ))}
                      </SortableContext>
                    </div>
                  </SortableSection>
                ))}
            </SortableContext>
            {formFields.length === 0 ? (
              <div className="card text-center mb-4 p-4 col-12">
                <div className="card-body">
                  <h4 className="m-0">Drop Section</h4>
                </div>
              </div>
            ) : null}
          </>
        </form>
      </div>
    </div>
  );
};

export default FormBuilderCanvasNew;
