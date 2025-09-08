import { useEffect, useRef, useState } from "react";
import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, DragOverlay, useDroppable } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import FieldTypesSidebarNew from "./FieldTypesSidebarNew";
import Header from "../Header";
import PropertiesPanel from "./PropertiesPanelNew";
import FormBuilderCanvasNew from "./FormBuilderCanvasNew";

const DndFormBuilder = () => {
  const fieldRefs = useRef({});
  const propertyPanelRef = useRef(null);
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
        !propertyPanelRef.current?.contains(event.target)
      ) {
        setSelectedField(null);
      }
      if (
        selectedSection &&
        !document.getElementById(selectedSection.id)?.contains(event.target) &&
        !propertyPanelRef.current?.contains(event.target)
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

    const dragged = active.data.current;
    const overData = over.data.current;

    if (dragged?.type === "section" && overData?.type === "section" && active.id !== over.id) {
      setFormFields((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === active.id);
        const newIndex = prev.findIndex((s) => s.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      return;
    }

    if (dragged?.type === "field" && overData?.type === "field" && dragged.sectionId === overData.sectionId) {
      setFormFields((prev) =>
        prev.map((sec) => {
          if (sec.id !== dragged.sectionId) return sec;
          const oldIndex = sec.fields.findIndex((f) => f.id === dragged.id);
          const newIndex = sec.fields.findIndex((f) => f.id === over.id);
          return {
            ...sec,
            fields: arrayMove(sec.fields, oldIndex, newIndex),
          };
        })
      );
      return;
    }

    if (dragged?.type === "field") {
      setFormFields((prev) => {
        let movedField = null;

        let updated = prev.map((sec) => {
          if (sec.id === dragged.sectionId) {
            const filtered = sec.fields.filter((f) => {
              if (f.id === dragged.id) {
                movedField = f;
                return false;
              }
              return true;
            });
            return { ...sec, fields: filtered };
          }
          return sec;
        });

        if (!movedField) return updated;

        updated = updated.map((sec) => {

          if (overData?.type === "field" && sec.id === overData.sectionId) {
            const overIndex = sec.fields.findIndex((f) => f.id === over.id);
            const newFields = [...sec.fields.slice(0, overIndex), { ...movedField, sectionId: sec.id }, ...sec.fields.slice(overIndex)];
            return { ...sec, fields: newFields };
          }

          if (overData?.type === "section" && sec.id === overData.id) {
            return { ...sec, fields: [...sec.fields, { ...movedField, sectionId: sec.id }] };
          }

          return sec;
        });

        return updated;
      });
    }

    if (dragged?.type === "field" && overData?.type === "section" && dragged.sectionId !== overData.id) {
      setFormFields((prev) => {
        let movedField = null;

        const updated = prev.map((sec) => {
          if (sec.id === dragged.sectionId) {
            const filtered = sec.fields.filter((f) => {
              if (f.id === dragged.id) {
                movedField = f;
                return false;
              }
              return true;
            });
            return { ...sec, fields: filtered };
          }
          return sec;
        });

        return updated.map((sec) => {
          if (sec.id === overData.id && movedField) {
            return { ...sec, fields: [...sec.fields, { ...movedField, sectionId: overData.id }] };
          }
          return sec;
        });
      });
      return;
    }

    if (active.id !== over.id && formFields.some((s) => s.id === active.id)) {
      setFormFields((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === active.id);
        const newIndex = prev.findIndex((s) => s.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      return;
    }

    setFormFields((prev) =>
      prev.map((sec) => {
        if (!sec.fields.some((f) => f.id === active.id)) return sec;
        const oldIndex = sec.fields.findIndex((f) => f.id === active.id);
        const newIndex = sec.fields.findIndex((f) => f.id === over.id);
        if (newIndex === -1) return sec;
        return {
          ...sec,
          fields: arrayMove(sec.fields, oldIndex, newIndex),
        };
      })
    );

    if (dragged?.origin === "sidebar" && dragged.type === "section") {
      setFormFields((prev) => {
        const newSection = {
          id: `${dragged.type}_${Date.now()}`,
          type: dragged.type,
          label: dragged.label,
          fields: [],
          width: "col-md-12",
        };

        if (over.id === "canvas") {
          return [...prev, newSection];
        }

        const overIndex = prev.findIndex((s) => s.id === over.id);
        if (overIndex === -1) return [...prev, newSection];

        return [...prev.slice(0, overIndex), newSection, ...prev.slice(overIndex)];
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
          <div ref={propertyPanelRef}>
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
        </div>
        {/* Overlay */}
        <DragOverlay>
          {activeDragItem ? (
            <div
              className="btn  btn-sm drag-overlay d-flex align-items-center"
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
