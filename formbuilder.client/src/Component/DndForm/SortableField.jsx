import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

export const SortableField = ({ field, sectionId, renderField, onSelectField, selectedField, onDeleteField }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: field.id,
    data: {
      ...field,
      sectionId,
      origin: "canvas",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`p-2 rounded position-relative mt-3 ${selectedField?.id === field.id ? "border border-primary" : "border"} ${
        field.width || "col-md-12"
      } ${field.align || "text-start"}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelectField({ ...field, sectionId });
      }}
    >
      {renderField(field)}

      {selectedField?.id === field.id && (
        <div className="position-absolute top-0 end-0 d-flex gap-1 m-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteField(field.id, sectionId);
            }}
            className="btn btn-sm btn-outline-danger py-1 px-2 lh-1"
          >
            <Trash2 size={12} />
          </button>
          <button type="button" className="btn btn-sm btn-outline-info py-1 px-2 lh-1" onClick={(e) => e.stopPropagation()} {...listeners}>
            <GripVertical size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
