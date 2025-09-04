import { useEffect, useRef, useState } from "react";
import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, DragOverlay, useDroppable } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import FieldTypesSidebarNew from "./FieldTypesSidebarNew";
import Header from "../Header";
import PropertiesPanel from "./PropertiesPanelNew";
import FormBuilderCanvasNew from "./FormBuilderCanvasNew";

const DndFormBuilder = () => {
  const fieldRefs = useRef({});
  const propertyPanelRef = useRef({});
  const [selectedField, setSelectedField] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [activeDragItem, setActiveDragItem] = useState(null);
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        selectedField &&
        fieldRefs.current[selectedField.id] &&
        !fieldRefs.current[selectedField.id].contains(event.target) &&
        !propertyPanelRef.current.contains(event.target)
      ) {
        setSelectedField(null);
      }
      if (
        selectedSection &&
        !document.getElementById(selectedSection.id)?.contains(event.target) &&
        !propertyPanelRef.current.contains(event.target)
      ) {
        setSelectedSection(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedField, selectedSection]);

  const handleUpdateField = (sectionId, fieldId, updatedProps) => {
    setFormFields((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) => (field.id === fieldId ? { ...field, ...updatedProps } : field)),
            }
          : section
      )
    );
  };

  const deleteField = (fieldId, sectionId) => {
    if (sectionId) {
      const section = formFields.find((field) => field.id === sectionId);
      if (section) {
        section.fields = section.fields.filter((f) => f.id !== fieldId);
        setFormFields(formFields.map((field) => (field.id === sectionId ? section : field)));
        if (selectedField?.id === fieldId) {
          setSelectedField(null);
        }
      }
    } else {
      setFormFields(formFields.filter((field) => field.id !== fieldId));
      if (selectedSection?.id === fieldId) {
        setSelectedSection(null);
        setSelectedField(null);
      }
    }
  };

  const handleDragEnd = (event) => {
    setActiveDragItem(null);
    const { active, over } = event;
    if (!over) return;

    const dragged = event.active.data.current;

    if (active.id !== over.id && formFields.some((s) => s.id === active.id)) {
      setFormFields((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === active.id);
        const newIndex = prev.findIndex((s) => s.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      return;
    }

    if (event.over?.id === "canvas" && dragged?.origin === "sidebar" && dragged.type === "section") {
      setFormFields((prev) => [
        ...prev,
        {
          id: `${dragged.type}_${Date.now()}`,
          type: dragged.type,
          label: dragged.label,
          fields: [],
          width: "col-md-12",
        },
      ]);
      return;
    }

    if (dragged?.origin === "sidebar" && dragged.type !== "section" && formFields.some((sec) => sec.id === over.id)) {
      setFormFields((prev) =>
        prev.map((sec) =>
          sec.id === over.id
            ? {
                ...sec,
                fields: [
                  ...sec.fields,
                  {
                    id: `${dragged.type}_${Date.now()}`,
                    type: dragged.type,
                    label: dragged.label || dragged.type,
                    name: `${dragged.type}_${Date.now()}`,
                    isShowLabel: true,
                    isReadOnly: false,
                    required: false,
                    placeholder: `Enter ${dragged.label || dragged.type}`,
                    options: dragged.type === "radio" || dragged.type === "select" || dragged.type === "checkbox" ? ["Option 1", "Option 2"] : [],
                    width: "col-md-12",
                  },
                ],
              }
            : sec
        )
      );
    }
  };

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  return (
    <div className="form-builder-container d-flex flex-column">
      <Header />
      <DndContext sensors={sensors} onDragStart={(event) => setActiveDragItem(event.active.data.current)} onDragEnd={(event) => handleDragEnd(event)}>
        <div className="d-flex flex-grow-1 overflow-hidden">
          {/* Sidebar */}
          <FieldTypesSidebarNew />
          {/* Canvas */}
          <FormBuilderCanvasNew
            id="canvas"
            formFields={formFields}
            selectedField={selectedField}
            selectedSection={selectedSection}
            onUpdateField={handleUpdateField}
            onSelectField={(field) => {
              setSelectedField(field);
              setSelectedSection(null);
            }}
            onSelectSection={(section) => {
              setSelectedSection(section);
              setSelectedField(null);
            }}
            onDeleteField={deleteField}
            onDeleteSection={(sectionId) => {
              setFormFields((prev) => prev.filter((s) => s.id !== sectionId));
              if (selectedSection?.id === sectionId) {
                setSelectedSection(null);
                setSelectedField(null);
              }
            }}
          />

          <PropertiesPanel
            selectedField={selectedField}
            onUpdateField={(updated) => {
              setFormFields((prev) =>
                prev.map((sec) =>
                  sec.id === selectedField.sectionId
                    ? {
                        ...sec,
                        fields: sec.fields.map((f) => (f.id === updated.id ? updated : f)),
                      }
                    : sec
                )
              );
              setSelectedField(updated);
            }}
            selectedSection={selectedSection}
            onUpdateSection={(updated) => {
              setFormFields((prev) => prev.map((sec) => (sec.id === updated.id ? updated : sec)));
              setSelectedSection(updated);
            }}
          />
        </div>
        {/* Overlay */}
        <DragOverlay>
          {activeDragItem ? (
            <div
              className="btn btn-outline-secondary btn-sm drag-overlay d-flex align-items-center"
              style={{
                cursor: "grabbing",
                pointerEvents: "none",
              }}
            >
              {activeDragItem.icon && <activeDragItem.icon size={16} className="me-2" />}
              {activeDragItem.label}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DndFormBuilder;
