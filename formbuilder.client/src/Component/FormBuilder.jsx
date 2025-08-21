import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormCanvas from "./FormCanvas";
import { fetchFormById } from "../Api/formApi";
import { fetchTemplateById } from "../Api/templateApi";
import { controlTemplates } from "../Utils/FormElements.js";
import { AppContext } from "../Utils/MyContext.jsx";

const FormBuilder = () => {
    const { getTemplates, templates } = useContext(AppContext);
    const [formData, setFormData] = useState({});
    const [formDataText, setFormDataText] = useState({});

    const params = useParams();

    const id = parseInt(params.id, 10);
    const isTemplate = params.isTemplate === "true";

    useEffect(() => {
        (async () => {
            await getTemplates();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setFormData({
                name: "Untitled",
                description: "",
                controls: [],
            });

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
                    controls: [],
                });
            }
        })();
    }, [id]);

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
                fields: formData?.controls,
            });
        }
    }, [formData, setFormData]);

    return (
        <div className="container-lg p-1">
            <div className="row">
                {/* Left Sidebar */}
                <div className="col-12 col-md-3 col-lg-2">
                    <div className="d-flex justify-content-start align-items-center mb-3 py-2">
                        <Link to={`/`} className="btn btn-outline-primary px-2 py-0 me-1">
                            <i className="bi bi-arrow-left"></i>
                        </Link>
                        <h5 className="fw-bold fs-4">Form Builder</h5>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <div
                            key={0}
                            className="text-center text-black fw-bold fs-5 p-2 mb-2"
                        >
                            Templates
                        </div>
                        {templates &&
                            templates.map((value) => (
                                <div
                                    key={value.id}
                                    className="border p-2 text-center rounded"
                                >
                                    <Link to={`/builder/form/${value.id}/isTemplate=${true}`}>
                                        {value.name}
                                    </Link>
                                </div>
                            ))}
                    </div>

                    <div className="border position-relative">
                        <button
                            className="btn position-absolute end-0 top-0"
                            style={{ zIndex: 1, margin: "5px" }}
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    JSON.stringify(formDataText, null, 2)
                                );
                            }}
                        >
                            <i className="bi bi-copy"></i>
                        </button>
                        {/* Scrollable content */}
                        <div style={{ height: "100%", overflowY: "auto", padding: "10px" }}>
                            <pre>
                                {JSON.stringify(
                                    (() => {
                                        // eslint-disable-next-line no-unused-vars
                                        const {
                                            id,
                                            createdAt,
                                            updatedAt,
                                            isDeleted,
                                            controls,
                                            ...rest
                                        } = formDataText;
                                        return rest;
                                    })(),
                                    null,
                                    2
                                )}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="col-12 col-md-6 col-lg-8">
                    <div
                        className="bg-white border rounded p-3 mb-5"
                        style={{
                            minHeight: "95dvh",
                            overflowY: "auto",
                        }}
                        onDrop={handleDrop}
                    >
                        {/* Form Name */}
                        <input
                            type="text"
                            className="form-control mb-3 text-center fw-bold"
                            value={formData.name || "Enter form name"}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            placeholder="Enter form name"
                        />

                        <textarea
                            className="form-control mb-3 fw-bold"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Enter form description"
                        ></textarea>

                        {/* Canvas UI */}
                        {formData && (
                            <FormCanvas
                                formId={id}
                                formData={formData}
                                setFormData={setFormData}
                                isTemplate={isTemplate}
                            />
                        )}
                    </div>
                </div>

                {/* Toolbox */}
                <div className="col-12 col-md-3 col-lg-2">
                    <h5 className="text-center mb-3 fw-bold">
                        Toolbox
                    </h5>
                    {Object.keys(controlTemplates).map((type) => (
                        <div
                            key={type}
                            className="border p-2 mb-2 text-center bg-light rounded"
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData("controlType", type)}
                            style={{ cursor: "grab" }}
                        >
                            {controlTemplates[type].label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FormBuilder;
