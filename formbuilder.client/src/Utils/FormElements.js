export const controlTemplates = {
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