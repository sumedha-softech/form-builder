import React, { useEffect, useState } from "react";
import EditControl from "./EditControl";
import { saveForm } from "../Api/formApi";

const FormCanvas = ({ formData, setFormData }) => {
    const [formValues, setFormValues] = useState({});
    const [editingCtrlId, setEditingCtrlId] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const updateValue = (name, value, type, isChecked) => {
        if (type === "checkbox") {
            setFormValues((prev) => {
                const values = new Set(prev[name] || []);
                isChecked ? values.add(value) : values.delete(value);
                return { ...prev, [name]: Array.from(values) };
            });
        } else {
            setFormValues((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formValues);
        alert("Form submitted. Check console for data.");
    };

    const handleSaveForm = async (e) => {
        e.preventDefault();
        const res = await saveForm({
            formName: formData.formName,
            isTemplate: formData.isTemplate,
            templateName: formData.templateName,
            formJson: JSON.stringify(formData)
        })
        if (!res.isSuccess) {
            alert(res.message)
        }
        console.log("Form saved:", formData);
        alert("Form saved. Check console for data.");
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (index === draggedIndex) return;

        const updatedControls = [...formData.controls];
        const draggedItem = updatedControls.splice(draggedIndex, 1)[0];
        updatedControls.splice(index, 0, draggedItem);

        setDraggedIndex(index); // update dragged index
        setFormData({ ...formData, controls: updatedControls });
    };

    const handleControlSetId = (id)=>{
        setEditingCtrlId(id);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                {formData.controls && formData.controls.map((ctrl, index) => (
                    <div
                        key={ctrl.id}
                        draggable
                        onDragStart={() => setDraggedIndex(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={() => setDraggedIndex(null)}
                        className={`mb-3 position-relative border rounded p-2`}>
                        
                        {/* Action buttons */}
                        <div className=" position-absolute top-0 end-0">
                            <div className="d-flex">
                                <button type="button" className="btn" onClick={() => setFormData({ ...formData, controls: formData.controls.filter((c) => c.id !== ctrl.id) })}>
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button type="button" className="btn" onClick={() => handleControlSetId(ctrl.id)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                            </div>
                        </div>

                        <label className="form-label fw-bold" > {ctrl.label} </label>

                        {/* Render Inputs */}
                        {["text", "number", "email", "file", "textarea", "date", "datetime-local","password"].includes(ctrl.type) &&
                            (ctrl.type === "textarea" ? (
                                <textarea 
                                className="form-control"
                                name={ctrl.name}
                                placeholder={ctrl.placeholder}
                                value={formValues[ctrl.name] || ""}
                                onChange={(e) => updateValue(ctrl.name, e.target.value)}
                                required={ctrl.isRequired}
                                cols={ctrl.cols || 10}
                                rows={ctrl.rows || 10}
                                />
                            ) : (
                                <input
                                    type={ctrl.type}
                                    className="form-control"
                                    name={ctrl.name}
                                    placeholder={ctrl.placeholder}
                                    value={formValues[ctrl.name] || ""}
                                    accept={ctrl.type === "file" ? ctrl.accept : ""}
                                    onChange={(e) => updateValue(ctrl.name, e.target.value)}
                                    required={ctrl.isRequired}
                                />
                            ))}

                        {/* Render Radio/Checkbox/Dropdown Options */}
                        {["radio", "checkbox", "dropdown"].includes(ctrl.type) && (
                            <div>
                                {ctrl.type === "dropdown" ? (
                                    <select
                                        className="form-select mb-2"
                                        name={ctrl.name}
                                        value={formValues[ctrl.name] || ""}
                                        required={ctrl.isRequired}
                                        onChange={(e) => updateValue(ctrl.name, e.target.value)}
                                    >
                                        {(ctrl.options || []).map((opt, i) => (
                                            <option key={i} value={opt}> {opt}</option>
                                        ))}
                                    </select>
                                ) : null}

                                {ctrl.type != "dropdown" && ctrl.options ?
                                    ctrl.options.map((opt, i) => (
                                        <div key={i} className="d-flex align-items-center gap-2 mb-2">
                                            {ctrl.type === "radio" || ctrl.type === "checkbox" ? (
                                                <>
                                                    <input
                                                        className="form-check-input"
                                                        type={ctrl.type}
                                                        name={ctrl.name}
                                                        value={opt}
                                                        required={ctrl.type === "checkbox" && (formValues[ctrl.name] || []).length > 0 ? false : ctrl.isRequired}
                                                        checked={
                                                            ctrl.type === "checkbox"
                                                                ? (formValues[ctrl.name] || []).includes(opt)
                                                                : formValues[ctrl.name] === opt
                                                        }
                                                        onChange={(e) =>
                                                            updateValue(
                                                                ctrl.name,
                                                                opt,
                                                                ctrl.type,
                                                                ctrl.type === "checkbox" ? e.target.checked : undefined
                                                            )
                                                        }
                                                    />
                                                </>
                                            ) : null}

                                            <label className={`form-check-label`} > {opt} </label>
                                        </div>
                                    )) : null}
                            </div>
                        )}
                    </div>
                ))}

                {/* Form Submit Button and Form Save Button */}
                {formData && formData?.controls?.length > 0 &&
                    <div className="d-flex gap-5 mt-5">
                        <button type="submit" className="btn btn-primary" style={{ width:'90%'}}>Submit</button>
                        <button type="button" className="btn btn-primary" style={{ width: '90%' }} onClick={(e) => handleSaveForm(e)}>Save Form</button>
                    </div>}
            </form>
              
            {editingCtrlId && <EditControl controlId={editingCtrlId} setEditingCtrlId={setEditingCtrlId} formData={formData} setFormData={setFormData} />}
        </>
    );
};

export default FormCanvas;
