import React, { useEffect, useRef, useState } from "react";
import { DndContext, closestCorners, PointerSensor, KeyboardSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import PropertiesPanel from "../PropertiesPanel";
import FormBuilderCanvasNew from "./FormBuilderCanvasNew";
import FieldTypesSidebarNew from "./FieldTypesSidebarNew";
import Header from "../Header";
import { fieldTypes } from "../../Utils/FormElements";

const DndFormBuilder = () => {
  const fieldRefs = useRef({});
  const propertyPanelRef = useRef({});
  const [selectedField, setSelectedField] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
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

  function findContainer(id) {
    if (!id) return null;
    if (formFields.some((section) => section.id === id)) {
      return id;
    }
    return formFields.find((section) => section.fields.some((f) => f.id === id))?.id || null;
  }

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over || !over.id) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) return;

    if (activeContainer !== overContainer) {
      setFormFields((prev) => {
        const newState = [...prev];
        const activeSection = newState.find((s) => s.id === activeContainer);
        const overSection = newState.find((s) => s.id === overContainer);

        if (!activeSection || !overSection) return newState;

        const activeIndex = activeSection?.fields?.findIndex((f) => f.id === active.id);
        if (activeIndex === undefined || activeIndex === -1) return newState;

        const overIndex = overSection.fields.findIndex((f) => f.id === over.id);

        if (activeIndex === -1) return newState;

        const [movedItem] = activeSection.fields.splice(activeIndex, 1);
        if (overIndex === -1) {
          overSection.fields.push(movedItem);
        } else {
          overSection.fields.splice(overIndex + 1, 0, movedItem);
        }

        return newState;
      });
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || !over.id) return;

    const activeId = active.id;
    const overId = over.id;

    if (!activeId || !overId) return;

    if (formFields.some((s) => s.id === activeId) && formFields.some((s) => s.id === overId)) {
      setFormFields((prev) =>
        arrayMove(
          prev,
          prev.findIndex((s) => s.id === activeId),
          prev.findIndex((s) => s.id === overId)
        )
      );
      return;
    }

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      activeContainer &&
      overContainer &&
      activeContainer === overContainer &&
      formFields.some((s) => s.id === activeContainer) &&
      !formFields.some((s) => s.id === activeId)
    ) {
      setFormFields((prev) => {
        return prev.map((section) =>
          section.id === activeContainer
            ? {
                ...section,
                fields: arrayMove(
                  section.fields,
                  section.fields.findIndex((f) => f.id === activeId),
                  section.fields.findIndex((f) => f.id === overId)
                ),
              }
            : section
        );
      });
    }
  }

  const handleFieldDrop = (e, targetSectionFieldId) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("controlType");

    if (!type) return;

    const fieldType = fieldTypes.flatMap((fg) => fg.fields).find((c) => c.type === type);
    if (!fieldType) return;

    if (targetSectionFieldId) {
      const section = formFields.find((f) => f.id === targetSectionFieldId);
      if (section && section.type === "section") {
        const newField = {
          id: `${type}_${Date.now()}`,
          name: `${type}_${Date.now()}`,
          type: fieldType.type,
          label: `New ${fieldType.label}`,
          required: false,
          placeholder: `Enter ${fieldType.label}`,
          sectionId: targetSectionFieldId,
          isShowLabel: true,
          isReadOnly: false,
          width: "col-md-6",
          alignment: "text-start",
        };
        section.fields.push(newField);
        setFormFields(formFields.map((f) => (f.id === targetSectionFieldId ? section : f)));
      }
    } else {
      const newSection = {
        id: `section_${Date.now()}`,
        type: fieldType.type,
        fields: [],
        title: `New ${fieldType.label} Title`,
        description: `New ${fieldType.label} Description`,
        isShowTitle: true,
        isShowDescription: true,
        width: "col-12",
        alignment: "w-100 text-start",
        isReadOnly: fieldType.type !== "number",
        ...(type === "select" && { options: ["Option 1", "Option 2", "Option 3"] }),
        ...(type === "checkbox" && { options: ["Option 1", "Option 2", "Option 3"] }),
        ...(type === "radio" && { options: ["Option 1", "Option 2", "Option 3"] }),
        ...(type === "rating" && { options: [1, 2, 3, 4, 5] }),
        ...(type === "file" && { allowMultiple: true }),
        ...(type === "image" && { previewUrl: "" }),
      };
      setFormFields((prev) => [...prev, newSection]);
    }
  };

  const updateField = (updatedField) => {
    setFormFields(
      formFields.map((field) =>
        field.id === updatedField.sectionId ? { ...field, fields: field.fields.map((f) => (f.id === updatedField.id ? updatedField : f)) } : field
      )
    );
    setSelectedField(updatedField);
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

  const updateSection = (updatedField) => {
    setFormFields(formFields.map((field) => (field.id === updatedField.id ? updatedField : field)));
    setSelectedSection(updatedField);
  };

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  return (
    <div className="form-builder-container d-flex flex-column">
      <Header />
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className="d-flex flex-grow-1 overflow-hidden">
          <FieldTypesSidebarNew />
          <FormBuilderCanvasNew
            formFields={formFields}
            selectedField={selectedField}
            selectedSection={selectedSection}
            onSelectField={setSelectedField}
            onSelectSection={setSelectedSection}
            onDeleteField={deleteField}
            fieldRefs={fieldRefs}
            onDropHandler={handleFieldDrop}
          />
          <PropertiesPanel
            selectedField={selectedField}
            onUpdateField={updateField}
            selectedSection={selectedSection}
            onUpdateSection={updateSection}
            propertyPanelRef={propertyPanelRef}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default DndFormBuilder;
