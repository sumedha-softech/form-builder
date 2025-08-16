import { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

const EditControl = ({ controlId, setEditingCtrlId, formData, setFormData }) => {
    const [controlData, setControlData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (controlId && formData) {
            const control = formData.controls.find(ctrl => ctrl.id === controlId);
            if (control) {
                setControlData(control);
            }
        }
    }, []);

    const handleSave = () => {
        const updated = formData.controls.map((c) => {
            if (c.id === controlId) {
                let data = {
                    ...c,
                    label: controlData.label?.trim() !== "" ? controlData.label : c.label,
                    placeholder: controlData.placeholder?.trim() !== "" ? controlData.placeholder : c.placeholder,
                    name: controlData.name?.trim() !== "" ? controlData.name : c.name,
                    id: controlData.name?.trim() !== "" ? controlData.name : c.id,
                    isRequired: controlData.isRequired ?? c.isRequired,
                };
                if (c.type === "file") {
                    data = {
                        ...data, accept: controlData.accept?.trim() !== "" ? controlData.accept : c.accept
                    };
                }
                else if (["radio", "checkbox", "dropdown"].includes(c.type)) {

                    data = {
                        ...data,
                        options: Array.isArray(controlData.options) ? controlData.options : c.options
                    };
                } else if (c.type === "textarea") {
                    data = {
                        ...data,
                        cols: controlData.cols > 0 ? controlData.cols : c.cols,
                        rows: controlData.rows > 0 ? controlData.rows : c.rows
                    }
                }

                return data;
            }
            return c;
        });
        setFormData({ ...formData, controls: updated });
        setEditingCtrlId(null);
    };

    const handleOptionChange = (parentIndex, childIndex, value, isLabel, isChildren) => {
        let newOptions = [];

        if (isChildren === true) {
            newOptions = [...controlData.options]

            if (isLabel === true) {
                newOptions[parentIndex].childrens[childIndex].label = value?.trim() ? value : `option ${parentIndex + 1}${childIndex + 1}`;
            } else {
                newOptions[parentIndex].childrens[childIndex].value = value?.trim() ? value : `option${parentIndex + 1}${childIndex + 1}`;
            }
        } else {
            newOptions = [...controlData.options];

            if (isLabel === true) {
                newOptions[parentIndex].label = value?.trim() ? value : `option ${parentIndex + 1}`;
            } else {
                newOptions[parentIndex].value = value?.trim() ? value : `option${parentIndex + 1}`;
            }
        }

        setControlData(per => ({ ...per, options: newOptions }));
    };

    const addOption = (labelPrefix = "Option", parentIndex, isChildren) => {
        if (isChildren) {
            const options = [...controlData.options];
            const IndexOption = options[parentIndex];
            const newChild = { label: `Child ${parentIndex + 1}${(IndexOption.childrens?.length || 0) + 1}`, value: `Child${parentIndex + 1}${(IndexOption.childrens?.length || 0) + 1}` }

            var updatedOptions = options?.map((_, index) => {
                if (index === parentIndex) return { ...IndexOption, childrens: [...(IndexOption.childrens || []), newChild] };
                return _;
            })

            setControlData(per => ({
                ...per,
                options: updatedOptions
            }));
        } else {
            setControlData(per => ({
                ...per,
                options: [...(per.options || []), { label: `${labelPrefix} ${per.options?.length + 1}`, value: `${labelPrefix}${per.options?.length + 1}` }]
            }));
        }
    };

    const handleRemove = (parentIndex, childIndex, isChildren) => {
        if (!Array.isArray(controlData.options) && !isChildren) return;
        if (!Array.isArray(controlData.options[parentIndex]?.childrens) && isChildren) return;

        if (isChildren) {
            setControlData(prev => ({ ...prev, options: controlData.options.filter((_, index) => index !== parentIndex) }));
        } else {
            setControlData(prev => {
                return {
                    ...prev,
                    options: controlData.options.filter((option, index) => {
                        if (index === parentIndex) {
                            return { ...option, childrens: option.childrens.filter((_, childI) => childI != childIndex) }
                        } else {
                            index !== parentIndex
                        }
                    })
                }
            });
        }
    };

    const renderOptions = (opt, parentIndex, childIndex, isChildren) => {

        return (
            <>
                <Form.Group className="mb-3">
                    <Form.Label>label</Form.Label>
                    <Form.Control
                        type="text"
                        value={opt.label || ""}
                        onChange={(e) => handleOptionChange(parentIndex, childIndex, e.target.value, true, isChildren)}
                    />

                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>value</Form.Label>
                    <Form.Control
                        type="text"
                        value={opt.value || ""}
                        onChange={(e) => handleOptionChange(parentIndex, childIndex, e.target.value, false, isChildren)}
                    />

                </Form.Group>  </>
        )
    }

    return (
        <Modal show={controlId && true} onHide={() => setEditingCtrlId(null)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Control</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Label</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter label"
                            autoFocus
                            value={controlData?.label || ""}
                            onChange={(e) => setControlData({ ...controlData, label: e.target.value })}
                        />
                    </Form.Group>
                    {["text", "number", "email", "file", "textarea", "password"].includes(controlData?.type) &&
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>PlaceHolder</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="enter input placeholder"
                                value={controlData?.placeholder || ""}
                                onChange={(e) => setControlData({ ...controlData, placeholder: e.target.value })}
                            />
                        </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter text for name attribute"
                            value={controlData?.name || ""}
                            onChange={(e) => {
                                setControlData(per => ({ ...per, name: e.target.value, id: e.target.value }))
                                const isExist = formData?.controls.find(c => c.name === e.target.value && c.id !== controlId);
                                if (isExist) {
                                    setErrorMessage({ Name: ["Name should be unique!!"] });
                                }
                                else if (!e.target.value) {
                                    setErrorMessage({ Name: ["Name is required!!"] });
                                } else {
                                    setErrorMessage();
                                }
                                return;
                            }
                            }
                        />
                        {
                            errorMessage?.Name && <Form.Text className="text-danger"> {errorMessage.Name[0]} </Form.Text>
                        }
                    </Form.Group>

                    {controlData?.type === "textarea" &&
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Rows</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="enter rows value"
                                    value={controlData?.rows || ""}
                                    onChange={(e) => setControlData({ ...controlData, rows: e.target.value })}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cols</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="enter cols value"
                                    value={controlData?.cols || ""}
                                    onChange={(e) => setControlData({ ...controlData, cols: e.target.value })}
                                />

                            </Form.Group>
                        </>
                    }

                    {
                        controlData?.type === "file" &&
                        <Form.Group className="mb-3">
                            <Form.Label>Select Accept Type</Form.Label>
                            <Form.Select value={controlData?.accept || ""} onChange={(e) => setControlData({ ...controlData, accept: e.target.value })}>
                                <option value="*/*">Select File (All Types)</option>
                                <option value="image/*">Only Images</option>
                                <option value="application/pdf">Only PDFs</option>
                            </Form.Select>
                        </Form.Group>
                    }

                    <Form.Check
                        className="mb-3"
                        type="switch"
                        id="custom-switch"
                        label="Is Required"
                        checked={controlData?.isRequired || false}
                        onChange={(e) => setControlData({ ...controlData, isRequired: e.target.checked })}
                    />

                    {controlData && controlData.options &&
                        <>
                            <fieldset style={{ height: "300px", overflowY: "auto" }}>
                                <legend>Options</legend>
                                {controlData?.options?.map((opt, parentIndex) => (
                                    <>
                                        <div className="d-flex gap-3">
                                            {renderOptions(opt, parentIndex, null, false)}

                                            <button type="button" className="btn mt-3" onClick={() => handleRemove(parentIndex, null, false)}> <i className="bi bi-trash"></i> </button> <br />
                                            <button type="button" className="btn btn-secondary mt-4" style={{ height: "40px" }} onClick={() => addOption(controlData.type === "checkbox" ? "Checkbox" : "Option", parentIndex, true)}> Addchild</button> <br />
                                        </div>

                                        {opt.childrens && opt?.childrens?.map((opt, childIndex) => (
                                            <>
                                                <div className="d-flex gap-3 ms-4">
                                                    {renderOptions(opt, parentIndex, childIndex, true)}
                                                    <button type="button" className="btn mt-3" onClick={() => handleRemove(parentIndex, childIndex, true)}> <i className="bi bi-trash"></i> </button> <br />
                                                </div>
                                            </>
                                        ))}
                                    </>
                                ))}
                            </fieldset>
                            {/* Add new option button */}
                            <Button variant="secondary" onClick={() => addOption(controlData.type === "checkbox" ? "Checkbox" : "Option", null, null)}>
                                + Add Option
                            </Button>
                        </>
                    }
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditingCtrlId(null)}> Close </Button>
                <Button variant="primary" onClick={handleSave} disabled={controlData?.name && false} disabled={errorMessage}> Save Changes </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default EditControl;