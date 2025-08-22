import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";

const FormBuilderCanvas = ({
    formFields,
    selectedField,
    onSelectField,
    onDeleteField,
    selectedSection,
    onSelectSection,
    setFormFields,
    onDropHandler,
    fieldRefs,
}) => {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragOver = (e, index) => {
        console.log("handleDragOver called");
        e.preventDefault();
        if (index === draggedIndex) return;

        const updatedControls = [...formFields];
        const draggedItem = updatedControls.splice(draggedIndex, 1)[0];
        updatedControls.splice(index, 0, draggedItem);

        setDraggedIndex(index); // update dragged index
        setFormFields(updatedControls);
    };

    const renderField = (field, sectionField) => {
        const isSelected = selectedField?.id === field.id;

        const fieldWrapper = (content) => (
            <div
                className={`position-relative p-2 border border-2 rounded cursor-pointer ${
                    isSelected ? "border-success" : "border-transparent"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => onSelectField(field)}
            >
                {content}
                {isSelected && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteField(field.id, sectionField.id);
                        }}
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-0 py-1 pb-2 px-2 lh-1"
                    >
                        <Trash2 size={12} />
                    </button>
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
                        <input
                            id={field.id}
                            name={field.name}
                            readOnly={field.isReadOnly}
                            type="text"
                            className="form-control"
                            placeholder={field.placeholder}
                        />
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
                        <input
                            id={field.id}
                            name={field.name}
                            readOnly={field.isReadOnly}
                            type="text"
                            className="form-control"
                            placeholder={field.placeholder}
                        />
                    </>
                );
        }
    };

    return (
        <div className="form-preview flex-grow-1 overflow-auto p-4">
            <div className="container" onDrop={(e) => onDropHandler(e)} onDragOver={(e) => e.preventDefault()}>
                <form onSubmit={(e) => e.preventDefault()} className="row">
                    {/* Dynamic Form Section */}
                    <>
                        {formFields
                            .filter((field) => field.type === "section")
                            .map((section, indexSection) => (
                                <div key={section.id} className={`${section.width} mb-4 p-0`}>
                                    <div
                                        className={`cursor-pointer card h-100  ${
                                            selectedSection?.id === section.id ? " border-primary" : ""
                                        }`}
                                        draggable
                                        onDragStart={() => setDraggedIndex(indexSection)}
                                        onDragOver={(e) => handleDragOver(e, indexSection)}
                                        onDragEnd={() => setDraggedIndex(null)}
                                        onDrop={(e) => onDropHandler(e, section.id)}
                                        onClick={() => onSelectSection(section)}
                                    >
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-4">
                                                <div className={section.alignment}>
                                                    {section.isShowTitle && (
                                                        <h5 className="card-title mb-1">{section.title}</h5>
                                                    )}
                                                    {section.isShowDescription && (
                                                        <p className="text-muted small mb-0">{section.description}</p>
                                                    )}
                                                </div>
                                                <button
                                                    className="btn btn-link text-muted p-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDeleteField(section.id, null);
                                                    }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            {/* dynamic fields */}
                                            <div className="row">
                                                {section.fields
                                                    .filter((field) => field.type !== "section")
                                                    .map((field, index) => (
                                                        <div
                                                            ref={(el) => (fieldRefs.current[field.id] = el)}
                                                            key={field.id}
                                                            className={field.width + " " + field.alignment + " mb-3"}
                                                            draggable
                                                            onDragStart={() => setDraggedIndex(index)}
                                                            onDragOver={(e) => handleDragOver(e, index)}
                                                            onDragEnd={() => setDraggedIndex(null)}
                                                        >
                                                            {renderField(field, section)}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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

export default FormBuilderCanvas;
