import React from "react";
import { fieldTypes } from "../Utils/FormElements";

const FieldTypesSidebar = () => {
    return (
        <div className="sidebar p-3 overflow-auto">
            <h6 className="fw-bold mb-3 text-uppercase small text-muted">
                Field Types
            </h6>
            {fieldTypes.map((category) => (
                <div key={category.title} className="mb-4">
                    <h6 className="fw-medium mb-2 small">{category.title}</h6>
                    <div className="d-grid gap-2">
                        {category.fields.map((field) => {
                            const IconComponent = field.icon;
                            return (
                                <button
                                    key={field.type}
                                    className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-start field-item"                                    
                                    draggable
                                    onDragStart={(e) =>
                                        e.dataTransfer.setData(
                                            "controlType",
                                            field.type
                                        )
                                    }
                                >
                                    <IconComponent size={16} className="me-2" />
                                    {field.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FieldTypesSidebar;
