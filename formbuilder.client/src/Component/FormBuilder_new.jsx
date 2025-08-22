import React, { useEffect, useRef, useState } from "react";
import PropertiesPanel from "./PropertiesPanel";
import FormBuilderCanvas from "./FormBuilderCanvas";
import FieldTypesSidebar from "./FieldTypesSidebar";
import Header from "./Header";
import { fieldTypes } from "../Utils/FormElements";

const FormBuilder_new = () => {
    const fieldRefs = useRef({});
    const propertyPanelRef = useRef({});
    const [selectedField, setSelectedField] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [formFields, setFormFields] = useState([]);

    useEffect(() => {
        function handleClickOutside(event) {
            console.log("handleClickOutside called", selectedField, fieldRefs.current[selectedField], event.target);
            if (
                selectedField &&
                fieldRefs.current[selectedField.id] &&
                !fieldRefs.current[selectedField.id].contains(event.target) &&
                !propertyPanelRef.current.contains(event.target)
            ) {
                setSelectedField(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedField]);

    const handleFieldDrop = (e, targetSectionFieldId) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("controlType");
        if (type) {
            const fieldType = fieldTypes
                .map((fieldGroup) => fieldGroup.fields)
                .flat()
                .find((control) => control.type === type);
            if (fieldType) {
                if (targetSectionFieldId) {
                    const section = formFields.find((field) => field.id === targetSectionFieldId);
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
                        setFormFields(formFields.map((field) => (field.id === targetSectionFieldId ? section : field)));
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
                    };
                    setFormFields((prev) => [...prev, newSection]);
                }
            }
        }
    };

    const updateField = (updatedField) => {
        setFormFields(
            formFields.map((field) =>
                field.id === updatedField.sectionId
                    ? { ...field, fields: field.fields.map((f) => (f.id === updatedField.id ? updatedField : f)) }
                    : field
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

    return (
        <div className="form-builder-container d-flex flex-column">
            {/* Header spanning all three sections */}
            <Header />

            <div className="d-flex flex-grow-1 overflow-hidden">
                {/* Left Sidebar - Field Types */}
                <FieldTypesSidebar />

                {/* Center - Form Preview */}
                <FormBuilderCanvas
                    formFields={formFields}
                    selectedField={selectedField}
                    onSelectField={setSelectedField}
                    onDeleteField={deleteField}
                    setFormFields={setFormFields}
                    onDropHandler={handleFieldDrop}
                    selectedSection={selectedSection}
                    onSelectSection={setSelectedSection}
                    fieldRefs={fieldRefs}
                />

                {/* Right Sidebar - Properties */}
                <PropertiesPanel
                    selectedField={selectedField}
                    onUpdateField={updateField}
                    selectedSection={selectedSection}
                    onUpdateSection={updateSection}
                    propertyPanelRef={propertyPanelRef}
                />
            </div>
        </div>
    );
};

export default FormBuilder_new;
