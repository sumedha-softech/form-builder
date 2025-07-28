import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FormCanvas from "./FormCanvas";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormBuilderTempletes from "./FormBuilderTempletes";
import FormControls from "./FormControls";
import { fetchForms } from "../Api/formApi";

const controlTemplates = {
    text: {
        type: "text",
        label: "TextBox",
        name: "textField",
        isRequired: true,
        placeholder: "Enter text",
    },
    file: {
        type: "file",
        label: "File",
        name: "fileField",
        isRequired: true,
        accept: "*/*",
        placeholder: "Choose file",
    },
    email: {
        type: "email",
        label: "Email",
        name: "emailField",
        isRequired: true,
        placeholder: "Enter email",
    },
    number: {
        type: "number",
        label: "Number",
        name: "numberField",
        isRequired: true,
        placeholder: "Enter number",
    },
    password: {
        type: "password",
        label: "Password",
        name: "password",
        isRequired: false,
        placeholder: "Enter Password",
    },
    date: {
        type: "date",
        label: "Date",
        name: "date",
        isRequired: true,
        placeholder: "Choose date",
    },
    datetime: {
        type: "datetime-local",
        label: "Date Time",
        name: "dateTime",
        isRequired: true,
        placeholder: "Choose date time",
    },
    textarea: {
        type: "textarea",
        label: "Text Area",
        name: "textArea",
        isRequired: true,
        placeholder: "Enter text",
        cols: 10,
        rows: 10
    },
    radio: {
        type: "radio",
        label: "Radio Options",
        name: "radioGroup",
        isRequired: true,
        options: ["Option 1", "Option 2"],
    },
    checkbox: {
        type: "checkbox",
        label: "Checkbox Options",
        name: "checkboxGroup",
        isRequired: true,
        options: ["checkbox 1", "checkbox 2"],
    },
    dropdown: {
        type: "dropdown",
        label: "Dropdown",
        isRequired: true,
        name: "dropdownField",
        options: ["Option 1", "Option 2"],
    },
};

const FormBuilder = () => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        (async () => {
            var res = await fetchForms(true);
            if (res.isSuccess) {
                var updated = res.data[0];
                const formData = JSON.parse(updated.formJson);

                setFormData({ ...formData });
            } else {
                alert(res.message);
            }
        })();
    }, [])

    const handleDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("controlType");
        if (type) {

            const newControl = {
                id: uuidv4(),
                ...controlTemplates[type],
                name: `${type}_${Date.now()}`,
            };
            setFormData((prev) => ({
                ...prev,
                controls: [...prev.controls, newControl],
            }));
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleFormNameChange = (e) => {
        setFormData(
            {
                ...formData,
                formName: e.target.value?.trim() ? e.target.value : formData.formName,
                templeteName: e.target.value?.trim() ? e.target.value : formData.templeteName
            });
    };

    return (
        <div className="container-fluid p-4 border">
            <div className="row">
                {/* Left Sidebar */}
                <FormBuilderTempletes />

                {/* Canvas */}
                <div className="col-8 border-end">
                    <div
                        className="bg-white border rounded p-3 mb-3"
                        style={{ minHeight: "300px", maxHeight: "900px", overflowY: 'auto' }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {/* Form Name */}
                        <input
                            type="text"
                            className="form-control mb-3 text-center fw-bold"
                            value={formData.formName}
                            onChange={handleFormNameChange}
                            placeholder="Enter form name"
                        />

                        {/* Canvas UI */}
                        {formData && <FormCanvas formData={formData} setFormData={setFormData} />}
                    </div>
                </div>
                {/* Toolbox */}
                <FormControls controls={controlTemplates} />
            </div>
        </div>
    );
};

export default FormBuilder;
