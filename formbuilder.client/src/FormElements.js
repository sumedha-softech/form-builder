import {
  Type,
  Mail,
  List,
  Hash,
  Link,
  Phone,
  Clock,
  Image,
  Circle,
  MapPin,
  Upload,
  Calendar,
  FileText,
  DollarSign,
  CheckSquare,
  PaintBucket,
  UnfoldVertical,
  LayoutTemplate,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";


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
      { type: "tel", label: "Phone", icon: Phone },
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
      { type: "range", label: "Range", icon: ChartNoAxesColumnIncreasing },
      { type: "color", label: "Color", icon: PaintBucket },
      { type: "file", label: "File Upload", icon: Upload },
      { type: "image", label: "Image", icon: Image },
      { type: "address", label: "Address", icon: MapPin },
      { type: "payment", label: "Payment", icon: DollarSign },
    ],
  },
];

/*
isFieldDisabled: bool       *
isFieldRequired: bool       *
limit: bool   --> 20 words         *
emailCheck: bool      *
passwordCheck: bool     *
isUserNameEmpty: bool     *
phonePattern: bool      *
urlCheck: bool      *
range: bool       *
checkForPastDate       *
checkForFutureDate       *
custom: []/{}     X
*/


// export const controlTemplates = {
//   text: {
//     type: "text",
//     label: "TextBox",
//     isRequired: true,
//     placeholder: "Enter text",
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   file: {
//     type: "file",
//     label: "File",
//     isRequired: true,
//     accept: "*/*",
//     placeholder: "Choose file",
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   email: {
//     type: "email",
//     label: "Email",
//     isRequired: true,
//     placeholder: "Enter email",
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   number: {
//     type: "number",
//     label: "Number",
//     isRequired: true,
//     placeholder: "Enter number",
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   password: {
//     type: "password",
//     label: "Password",
//     isRequired: false,
//     placeholder: "Enter Password",
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   date: {
//     type: "date",
//     label: "Date",
//     isRequired: true,
//     placeholder: "Choose date",
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   datetime: {
//     type: "datetime-local",
//     label: "Date Time",
//     isRequired: true,
//     placeholder: "Choose date time",
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   textarea: {
//     type: "textarea",
//     label: "Text Area",
//     isRequired: true,
//     placeholder: "Enter text",
//     cols: 10,
//     rows: 10,
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   radio: {
//     type: "radio",
//     label: "Radio Options",
//     isRequired: true,
//     options: [
//       { label: "option 1", value: "Option1" },
//       { label: "option 2", value: "Option2" },
//     ],
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   checkbox: {
//     type: "checkbox",
//     label: "Checkbox Options",
//     isRequired: true,
//     options: [
//       { label: "checkbox 1", value: "checkbox1" },
//       { label: "checkbox 2", value: "checkbox2" },
//     ],
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
//   dropdown: {
//     type: "dropdown",
//     label: "Dropdown",
//     isRequired: true,
//     options: [
//       { label: "option 1", value: "Option1" },
//       { label: "option 2", value: "Option2" },
//     ],
//     isShowLabel: true,
//     isReadonly: false,
//     fieldWidth: "50%",
//     fieldAlign: "left",
//     validations: [
//         { isFieldRequired: false },
//         { range: false },
//         { fieldLimit: 20 },
//         { confirmation: false },
//         { emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//         { passwordLimit: 8 },
//         { isUsernameEmpty: false },
//         { custom: [] }
//     ]
//   },
// };