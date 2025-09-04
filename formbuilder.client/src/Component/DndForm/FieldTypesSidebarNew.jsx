import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { fieldTypes } from "../../Utils/FormElements";

const DraggableField = ({ field }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `sidebar-${field.type}`,
    data: {
      type: field.type,
      label: field.label,
      origin: "sidebar"
    },
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "manipulation",
  };

  const IconComponent = field.icon;

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-start field-item"
      style={style}
      type="button"
    >
      <IconComponent size={16} className="me-2" />
      {field.label}
    </button>
  );
};

const FieldTypesSidebarNew = () => {
  return (
    <div className="sidebar p-3 overflow-auto">
      <h6 className="fw-bold mb-3 text-uppercase small text-muted">Field Types</h6>
      {fieldTypes.map((category) => (
        <div key={category.title} className="mb-4">
          <h6 className="fw-medium mb-2 small">{category.title}</h6>
          <div className="d-grid gap-2">
            {category.fields.map((field) => (
              <DraggableField key={field.type} field={field} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FieldTypesSidebarNew;
