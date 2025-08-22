import {
    Type,
    Mail,
    Phone,
    Calendar,
    Clock,
    CheckSquare,
    Circle,
    List,
    Hash,
    FileText,
    Link,
    Star,
    MapPin,
    DollarSign,
    Image,
    Upload,
    UnfoldVertical,
    LayoutTemplate
} from "lucide-react";
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
        rows: 10,
    },
    radio: {
        type: "radio",
        label: "Radio Options",
        isRequired: true,
        options: [
            { label: "option 1", value: "Option1" },
            { label: "option 2", value: "Option2" },
        ],
    },
    checkbox: {
        type: "checkbox",
        label: "Checkbox Options",
        isRequired: true,
        options: [
            { label: "checkbox 1", value: "checkbox1" },
            { label: "checkbox 2", value: "checkbox2" },
        ],
    },
    dropdown: {
        type: "dropdown",
        label: "Dropdown",
        isRequired: true,
        options: [
            { label: "option 1", value: "Option1" },
            { label: "option 2", value: "Option2" },
        ],
    },
};

export const fieldTypes = [
    {
        title: "Sections",
        fields: [
            { type: "section", label: "Section", icon: LayoutTemplate },
            { type: "divider", label: "Divider", icon: UnfoldVertical },
        ],
    },
    {
        title: "Text",
        fields: [
            { type: "text", label: "Text", icon: Type },
            { type: "textarea", label: "Textarea", icon: FileText },
            { type: "number", label: "Number", icon: Hash },
        ],
    },
    {
        title: "Contact",
        fields: [
            { type: "email", label: "Email", icon: Mail },
            { type: "phone", label: "Phone", icon: Phone },
            { type: "url", label: "Website URL", icon: Link },
        ],
    },
    {
        title: "Date & Time",
        fields: [
            { type: "date", label: "Date", icon: Calendar },
            { type: "time", label: "Time", icon: Clock },
        ],
    },
    {
        title: "Selection",
        fields: [
            { type: "select", label: "Dropdown", icon: List },
            { type: "radio", label: "Multiple Choice", icon: Circle },
            { type: "checkbox", label: "Checkboxes", icon: CheckSquare },
        ],
    },
    {
        title: "Advanced",
        fields: [
            { type: "rating", label: "Rating", icon: Star },
            { type: "address", label: "Address", icon: MapPin },
            { type: "payment", label: "Payment", icon: DollarSign },
            { type: "file", label: "File Upload", icon: Upload },
            { type: "image", label: "Image", icon: Image },
            { type: "section", label: "Section", icon: Star },
        ],
    },
];
