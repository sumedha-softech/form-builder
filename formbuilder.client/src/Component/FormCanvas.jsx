import React, { useState } from "react";
import { saveForm, updateForm } from "../Api/formApi";
import { useNavigate } from 'react-router-dom';
import EditControl from "./EditControl";
//import { v4 as uuid} from 'uuid'

const FormCanvas = ({ formId, formData, setFormData, isTemplate }) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({});
    const [editingCtrlId, setEditingCtrlId] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [errors, setErrors] = useState({});
    const [visibleChildren, setVisibleChildren] = useState({});

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

        let res = {};
        if (!formId || (formId && isTemplate === true)) {
            res = await saveForm({
                name: formData.name,
                description: formData.description,
                fields: JSON.stringify(formData.controls)
            })
        } else {
            res = await updateForm(formId, {
                name: formData.name,
                description: formData.description,
                fields: JSON.stringify(formData.controls)
            })
        }

        if (res.errors) {
            setErrors(res.errors);
            alert(res.title);
            console.log(res);
            return;
        }

        else if (!res.isSuccess) {
            alert(res.message)
            return
        }

        console.log("Form saved:", formData);
        navigate('/');
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

    //<select
    //    className="form-select mb-2"
    //    name={ctrl.name}
    //    value={formValues[ctrl.name] || ""}
    //    required={ctrl.isRequired}
    //    onChange={(e) => updateValue(ctrl.name, e.target.value)}
    //>
    //    {(ctrl.options || []).map((opt) => (
    //        opt.childrens ? (
    //            <optgroup key={opt.value} label={opt.label}>
    //                <option value={opt.value}>{opt.label}</option>
    //                {opt.childrens.map(child => (
    //                    <option key={child.value} value={child.value}>↳ {child.label}</option>
    //                ))}
    //            </optgroup>
    //        ) : (
    //            <option key={opt.value} value={opt.value}>{opt.label}</option>
    //        )
    //    ))}
    //</select>

    const renderInput = (ctrl) => {
        const commonProps = {
            name: ctrl.name,
            placeholder: ctrl.placeholder,
            required: ctrl.isRequired,
            value: formValues[ctrl.name] || "",
            id: ctrl.id,
            onChange: (e) => updateValue(ctrl.name, e.target.value, ctrl.type),
        };

        switch (ctrl.type) {
            case "textarea":
                return <textarea {...commonProps} className="form-control" cols={ctrl.cols || 10} rows={ctrl.rows || 10} />;
            default:
                return <input {...commonProps} type={ctrl.type} className="form-control" accept={ctrl.type === "file" ? ctrl.accept : undefined} />;
        }
    };

    const renderOptions = (ctrl) => {
        if (ctrl.type === "dropdown") {
            return (
                <>
                    <select
                        className="form-select mb-2"
                        name={ctrl.name}
                        value={formValues[ctrl.name] || ""}
                        required={ctrl.isRequired}
                        onChange={(e) => updateValue(ctrl.name, e.target.value)}
                    >
                        {(ctrl.options || []).flatMap((opt) => {
                            return [
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>,
                                opt.childrens?.map((child, ci) => (
                                    <option key={`${opt.value}-${child.value}`} value={child.value}>
                                        &nbsp;&nbsp;&nbsp; {child.label}
                                    </option>
                                ))];
                        })}

                    </select>
                </>
            );
        }

        // For checkbox or radio with children
        return ctrl.options?.map((opt, i) => (
            <div key={i} className=" align-items-center  mb-2">
                <div className="d-flex gap-2">
                    <input
                        className="form-check-input"
                        type={ctrl.type}
                        name={ctrl.name}
                        value={opt.value}
                        required={ctrl.type === "checkbox" && (formValues[ctrl.name] || []).length > 0 ? false : ctrl.isRequired}
                        checked={
                            ctrl.type === "checkbox"
                                ? (formValues[ctrl.name] || []).includes(opt.value)
                                : formValues[ctrl.name] === opt.value
                        }
                        onChange={(e) => {
                            updateValue(ctrl.name, opt.value, ctrl.type, e.target.checked);
                            if (opt.childrens) {
                                setVisibleChildren(prev => ({
                                    ...prev,
                                    [ctrl.name]: opt.value  // Track selected parent
                                }));
                            } else {
                                // Remove children visibility when selecting a non-parent option
                                setVisibleChildren(prev => ({
                                    ...prev,
                                    [ctrl.name]: null
                                }));
                            }
                        }}
                    />
                    <label className="form-check-label">{opt.label}</label>
                </div>

                {opt?.childrens && visibleChildren[ctrl.name] === opt.value && (
                    opt.childrens.map((childOpt, childI) => (
                        <div key={childI} className="d-flex align-items-center gap-2 mb-2 ms-4">
                            <input
                                className="form-check-input"
                                type={ctrl.type}
                                name={ctrl.name}
                                value={childOpt.value}
                                required={ctrl.type === "checkbox" && (formValues[ctrl.name] || []).length > 0 ? false : ctrl.isRequired}
                                checked={ctrl.type === "checkbox"
                                    ? (formValues[ctrl.name] || []).includes(childOpt.value)
                                    : formValues[ctrl.name] === childOpt.value}
                                onChange={(e) => updateValue(ctrl.name, childOpt.value, ctrl.type, e.target.checked)}
                            />
                            <label className="form-check-label">{childOpt.label}</label>
                        </div>
                    ))
                )}
            </div>
        ));
    };

    //const renderOptions = (ctrl) => {
    //    if (ctrl.type === "dropdown") {
    //        return (
    //            <select
    //                className="form-select mb-2"
    //                name={ctrl.name}
    //                value={formValues[ctrl.name] || ""}
    //                required={ctrl.isRequired}
    //                onChange={(e) => updateValue(ctrl.name, e.target.value)}
    //            >
    //                {(ctrl.options || []).map((opt, i) => (
    //                    <option key={i} value={opt.value}>{opt.label}</option>
    //                ))}
    //            </select>
    //        );
    //    }

    //    return ctrl.options?.map((opt, i) => (
    //        <div key={i} className=" align-items-center  mb-2">
    //            <div className="d-flex gap-2">
    //                <input
    //                    className="form-check-input"
    //                    type={ctrl.type}
    //                    name={ctrl.name}
    //                    value={opt.value}
    //                    required={ctrl.type === "checkbox" && (formValues[ctrl.name] || []).length > 0 ? false : ctrl.isRequired}
    //                    checked={
    //                        ctrl.type === "checkbox"
    //                            ? (formValues[ctrl.name] || []).includes(opt.value)
    //                            : formValues[ctrl.name] === opt.value
    //                    }
    //                    onChange={(e) => updateValue(ctrl.name, opt.value, ctrl.type, e.target.checked)}
    //                />
    //                <label className="form-check-label">{opt.label}</label>
    //            </div>

    //            {
    //                opt?.childrens && opt?.childrens.map((childOpt, childI) => (

    //                    <div key={childI} className="d-flex align-items-center gap-2 mb-2 ms-4">
    //                        <input
    //                            className="form-check-input"
    //                            type={ctrl.type}
    //                            name={ctrl.name}
    //                            value={childOpt.value}
    //                            required={ctrl.type === "checkbox" && (formValues[ctrl.name] || []).length > 0 ? false : ctrl.isRequired}
    //                            checked={
    //                                ctrl.type === "checkbox"
    //                                    ? (formValues[ctrl.name] || []).includes(childOpt.value)
    //                                    : formValues[ctrl.name] === childOpt.value
    //                            }
    //                            onChange={(e) => updateValue(ctrl.name, childOpt.value, ctrl.type, e.target.checked)}
    //                        />
    //                        <label className="form-check-label">{childOpt.label}</label>
    //                    </div>
    //                ))
    //            }
    //        </div>
    //    ));
    //};

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
                        className={`mb-3 position-relative border rounded p-2 form-group`}>

                        {/* Control's action */}
                        <div className="position-absolute top-0 end-0 d-flex d-none actions-btn">
                            <button type="button" className="btn" onClick={() => setFormData({ ...formData, controls: formData.controls.filter(c => c.id !== ctrl.id) })}>
                                <i className="bi bi-trash"></i>
                            </button>
                            <button type="button" className="btn" onClick={() => setEditingCtrlId(ctrl.id)}>
                                <i className="bi bi-pencil"></i>
                            </button>
                        </div>

                        {/* Control */}
                        <label className="form-label fw-bold" > {ctrl.label} </label>
                        {["text", "number", "email", "file", "textarea", "date", "datetime-local", "password"].includes(ctrl.type)
                            ? renderInput(ctrl)
                            : renderOptions(ctrl)}
                    </div>
                ))}

                {/* Form Submit Button and Form Save Button */}
                {formData && formData?.controls?.length > 0 &&
                    <>
                        <button type="submit" className="btn btn-primary mb-3" >Submit</button>
                        <div className="d-flex gap-5">
                            <button type="button" className="btn btn-primary" style={{ width: '90%' }} onClick={() => setFormData({
                                name: "Untitled",
                                controls: []
                            })}>Clear</button>
                            <button type="button" className="btn btn-primary" style={{ width: '90%' }} onClick={(e) => handleSaveForm(e)}>Save Form</button>
                        </div>
                    </>
                }

                {/* Velidation errors */}
                {errors &&
                    <ul className="mt-5">
                        {errors.Name && <li className="text-danger fs-5">{errors.Name[0]}</li>}
                        {errors.Description && <li className="text-danger fs-5">{errors.Description[0]}</li>}
                        {errors.Fields && <li className="text-danger fs-5">{errors.Fields[0]}</li>}
                    </ul>
                }

            </form>

            {editingCtrlId && <EditControl controlId={editingCtrlId} setEditingCtrlId={setEditingCtrlId} formData={formData} setFormData={setFormData} />}
        </>
    );
};

export default FormCanvas;
