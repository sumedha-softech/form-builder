import React, { useEffect, useState } from "react";
import FormCanvas from "./FormCanvas";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormBuilderTempletes from "./FormBuilderTempletes";
import FormControls from "./FormControls";
import { fetchFormById } from "../Api/formApi";
import { useParams } from 'react-router-dom';
import { fetchTemplateById } from "../Api/templateApi";

const controlTemplates = {
    text: {
        type: "text",
        label: "TextBox",
        isRequired: true,
        placeholder: "Enter text",
    },
    file: {
        type: "file",
        label: "File",
        isRequired: true,
        accept: "*/*",
        placeholder: "Choose file",
    },
    email: {
        type: "email",
        label: "Email",
        isRequired: true,
        placeholder: "Enter email",
    },
    number: {
        type: "number",
        label: "Number",
        isRequired: true,
        placeholder: "Enter number",
    },
    password: {
        type: "password",
        label: "Password",
        isRequired: false,
        placeholder: "Enter Password",
    },
    date: {
        type: "date",
        label: "Date",
        isRequired: true,
        placeholder: "Choose date",
    },
    datetime: {
        type: "datetime-local",
        label: "Date Time",
        isRequired: true,
        placeholder: "Choose date time",
    },
    textarea: {
        type: "textarea",
        label: "Text Area",
        isRequired: true,
        placeholder: "Enter text",
        cols: 10,
        rows: 10
    },
    radio: {
        type: "radio",
        label: "Radio Options",
        isRequired: true,
        options: [{ label: "option 1", value: "Option1" }, { label: "option 2", value: "Option2" }],
    },
    checkbox: {
        type: "checkbox",
        label: "Checkbox Options",
        isRequired: true,
        options: [{ label: "checkbox 1", value: "checkbox1" }, { label: "checkbox 2", value: "checkbox2" }],
    },
    dropdown: {
        type: "dropdown",
        label: "Dropdown",
        isRequired: true,
        options: [{ label: "option 1", value: "Option1" }, { label: "option 2", value: "Option2" }],
    },
};

const FormBuilder = () => {
    const [formData, setFormData] = useState({});
    const [formDataText, setFormDataText] = useState({});

    const params = useParams();

    const id = parseInt(params.id, 10);
    const isTemplate = params.isTemplate === "true";

    useEffect(() => {
        (async () => {
            setFormData({
                name: "Untitled",
                description: "",
                controls: []
            })

            if (id) {
                var res = {};

                if (isTemplate === false) {
                    res = await fetchFormById(id);
                } else {
                    res = await fetchTemplateById(id);
                }

                if (res.isSuccess) {
                    var updated = res.data;
                    const controls = JSON.parse(updated.fields);
                    setFormData({ ...res.data, controls: controls });
                } else {
                    alert(res.message);
                }
            } else {
                setFormData({
                    name: "Untitled",
                    description: "",
                    controls: []
                })
            }
        })();
    }, [id])

    const handleDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("controlType");
        if (type) {
            const newControl = {
                ...controlTemplates[type],
                name: `${type}_${Date.now()}`,
                id: `${type}_${Date.now()}`,
            };
            setFormData((prev) => ({
                ...prev,
                controls: [...prev.controls, newControl],
            }));
        }
    };

    useEffect(() => {
        if (formData?.controls && formData?.controls?.length > 0) {
            setFormDataText({
                ...formData,
                fields: formData?.controls
            });
        }
    }, [formData, setFormData])
    return (
        <>

            <div className="container-fluid p-4 border h-100">
                <div className="row">

                    {/* Left Sidebar */}
                    <FormBuilderTempletes />

                    {/* Canvas */}
                    <div className="col-12 col-md-6 col-lg-8 border-end position-relative mb-3">
                        <div
                            className="bg-white border rounded p-3"
                            style={{ minHeight: "300px", maxHeight: "600px", overflowY: 'auto', marginBottom: "44px !important" }}
                            onDrop={handleDrop}
                        >
                            {/* Form Name */}
                            <input
                                type="text"
                                className="form-control mb-3 text-center fw-bold"
                                value={formData.name || "Enter form name"}
                                onChange={(e) => setFormData((prev) => (
                                    {
                                        ...prev,
                                        name: e.target.value
                                    }))}
                                placeholder="Enter form name"
                            />

                            <textarea
                                className="form-control mb-3 fw-bold"
                                value={formData.description}
                                onChange={(e) => setFormData((prev) => (
                                    {
                                        ...prev,
                                        description: e.target.value
                                    }))}
                                placeholder="Enter form description"
                            ></textarea>

                            {/* Canvas UI */}
                            {formData && <FormCanvas formId={id} formData={formData} setFormData={setFormData} isTemplate={isTemplate} />}
                        </div>

                    </div>

                    {/* Toolbox */}
                    <FormControls controls={controlTemplates} />
                </div>

                <div
                    className="border position-relative"
                    style={{ height: "250px", width: "100%", paddingTop: "40px" }} // padding top for space under the button
                >
                    <button
                        className="btn position-absolute end-0 top-0"
                        style={{ zIndex: 1, margin: '5px' }}
                        onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(formDataText, null, 2))
                        }}
                    >
                        <i className="bi bi-copy"></i>
                    </button>
                    {/* Scrollable content */}
                    <div style={{ height: "100%", overflowY: "auto", padding: "10px" }}>
                        <pre>{
                            JSON.stringify(
                                (() => {
                                    // eslint-disable-next-line no-unused-vars
                                    const {id, createdAt, updatedAt, isDeleted,controls, ...rest } = formDataText;
                                    return rest;
                                })(),
                                null,
                                2
                            )
                        }</pre>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormBuilder;
