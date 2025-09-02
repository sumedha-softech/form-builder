import { useSortable } from "@dnd-kit/sortable";
import { X, Trash2, GripVertical } from "lucide-react";

function SortableField({ field, selectedField, onSelectField, onDeleteField, sectionField, children }) {
  const { setNodeRef, attributes, listeners } = useSortable({ id: field.id });
  const isSelected = selectedField?.id === field.id;
  return (
    <div ref={setNodeRef} className={field.width + " " + field.alignment + " mb-3"}>
      <div
        className={`form-field position-relative p-3 border border-2 rounded cursor-pointer ${isSelected ? "border-success" : "border-transparent"}`}
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          onSelectField(field);
        }}
      >
        {isSelected && (
          <div className="action-buttons d-flex position-absolute top-0 end-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteField(field.id, sectionField.id);
              }}
              className="btn btn-sm btn-outline-danger me-1 py-1 pb-2 px-2 lh-1"
            >
              <Trash2 size={12} />
            </button>
            <button type="button" className="btn btn-sm btn-outline-info py-1 pb-2 px-2 lh-1" {...attributes} {...listeners}>
              <GripVertical size={16} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default SortableField;