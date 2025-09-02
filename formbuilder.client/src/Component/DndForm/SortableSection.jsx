import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, Trash2, GripVertical } from "lucide-react";

function SortableSection({ section, children, onDeleteField, selectedSection, onSelectSection }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={`${section.width} mb-2 p-0`}>
      <div
        className={`form-section card cursor-pointer h-100 ${selectedSection?.id === section.id ? " border-primary" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSection(section);
        }}
      >
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-start">
            <div className={section.alignment}>
              {section.isShowTitle && <h5 className="card-title mb-1">{section.title}</h5>}
              {section.isShowDescription && <p className="text-muted small mb-0">{section.description}</p>}
            </div>
            <button
              type="button"
              className="btn btn-link text-muted p-1"
              onMouseDown={(e) => {
                e.stopPropagation();
                onDeleteField(section.id, null);
              }}
            >
              <X size={16} />
            </button>
            <button type="button" className="btn btn-link text-muted p-1 cursor-grab" {...attributes} {...listeners}>
              <GripVertical size={16} />
            </button>
          </div>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}

export default SortableSection;
