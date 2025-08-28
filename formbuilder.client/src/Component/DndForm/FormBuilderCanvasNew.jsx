import React from "react";
import { X, Trash2, GripVertical } from "lucide-react";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableSection({ section, children }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>{section.title}</span>
        <button type="button" className="btn btn-sm btn-light cursor-grab" {...attributes} {...listeners}>
          <GripVertical size={16} />
        </button>
      </div>

      <div className="card-body">{children}</div>
    </div>
  );
}

function SortableField({ field, children }) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} className={field.width + " mb-3"}>
      <div className="card p-2 h-100">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">{children}</div>
          <button type="button" className="btn btn-sm btn-light cursor-grab ms-2" {...attributes} {...listeners}>
            <GripVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  );
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
  const renderField = (field, sectionField) => {
    const isSelected = selectedField?.id === field.id;

    const fieldWrapper = (content) => (
      <div
        className={`position-relative p-2 border border-2 rounded cursor-pointer ${isSelected ? "border-success" : "border-transparent"}`}
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          onSelectField(field);
        }}
      >
        {content}
        {isSelected && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteField(field.id, sectionField.id);
              }}
              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-0 py-1 pb-2 px-2 lh-1"
            >
              <Trash2 size={12} />
            </button>
          </>
        )}
      </div>
    );

    switch (field.type) {
      case "text":
        return fieldWrapper(
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
        return fieldWrapper(
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

      case "email":
        return fieldWrapper(
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

      default:
        return fieldWrapper(
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
                  <SortableSection key={section.id} section={section}>
                    <div key={section.id} className={`${section.width} mb-4 p-0`}>
                      <div
                        id={section.id}
                        className={`cursor-pointer card h-100 ${selectedSection?.id === section.id ? " border-primary" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          const isInsideField = section.fields.some((f) => fieldRefs.current[f.id] && fieldRefs.current[f.id].contains(e.target));
                          if (!isInsideField) {
                            onSelectSection(section);
                          }
                        }}
                        onDrop={(e) => onDropHandler(e, section.id)}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-4">
                            <div className={section.alignment}>
                              {section.isShowTitle && <h5 className="card-title mb-1">{section.title}</h5>}
                              {section.isShowDescription && <p className="text-muted small mb-0">{section.description}</p>}
                            </div>
                            <button
                              className="btn btn-link text-muted p-1"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                onDeleteField(section.id, null);
                              }}
                            >
                              <X size={16} />
                            </button>
                          </div>

                          {/* dynamic fields */}
                          <div className="row">
                            <SortableContext items={section.fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                              {section.fields
                                .filter((field) => field.type !== "section")
                                .map((field) => (
                                  <SortableField key={field.id} field={field}>
                                    <div
                                      ref={(el) => (fieldRefs.current[field.id] = el)}
                                      className={field.width + " " + field.alignment + " " + field.align + " mb-3"}
                                    >
                                      {renderField(field, section)}
                                    </div>
                                  </SortableField>
                                ))}
                            </SortableContext> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </SortableSection>
                ))}
            </SortableContext>

            <div className="card text-center mb-4 p-4 col-12">
              <div className="card-body">
                <h4 className="m-0">Drop Section</h4>
              </div>
            </div>
          </>
        </form>
      </div>
    </div>
  );
};

export default FormBuilderCanvasNew;
