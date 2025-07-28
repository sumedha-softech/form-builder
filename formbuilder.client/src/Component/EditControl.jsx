import { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

const EditControl = ({ controlId, setEditingCtrlId, formData, setFormData }) => {
    const [controlData, setControlData] = useState(null);
    const [editingOptionId, setEditingOptionId] = useState(null);

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
                    isRequired: controlData.isRequired ?? c.isRequired,
                };
                if (c.type === "file") {
                    data = { ...data, accept: controlData.accept?.trim() !== "" ? controlData.accept : c.accept
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

    const handleOptionChange = (i, value) => {
        const newOptions = [...controlData.options];
        newOptions[i] = value?.trim() ? value : `option ${i}`;
        setControlData(per => ({ ...per, options: newOptions }));
    };

    const addOption = (labelPrefix = "Option") => {
        setControlData(per => ({
            ...per,
            options: [...(per.options || []), `${labelPrefix} ${per.options?.length + 1}`]
        }));
    };

    const handleRemove = (i) => {
        if (!Array.isArray(controlData.options)) return;
        setControlData(prev => ({ ...prev, options: controlData.options.filter((_, index) => index !== i) }));
    };

    const handleSaveName = (e) => {
        var isNameAlreadyUsed = formData.controls.some(ctrl => ctrl.name === e.target.value.trim() && ctrl.id !== controlId);
        if (isNameAlreadyUsed) {
            alert("Name already used by another control. Please choose a different name.");
            return;
        }
        setControlData(per => ({ ...per, name: e.target.value }));
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
                    {["text", "number", "email", "file", "textarea"].includes(controlData?.type) &&
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
                            onChange={(e) => handleSaveName(e)}
                        />

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
                            {controlData?.options?.map((opt, i) => (
                                editingOptionId?.ctrlId === controlId && editingOptionId?.index === i ? (
                                    <Form.Control
                                        className="mb-3"
                                        key={i}
                                        type="text"
                                        style={{ width: "200px" }}
                                        value={opt}
                                        onChange={(e) => handleOptionChange(i, e.target.value)}
                                        onBlur={() => setEditingOptionId(null)}
                                        autoFocus
                                    />
                                ) : (
                                    <>
                                        <Form.Label key={i}
                                            onClick={() => setEditingOptionId({ ctrlId: controlId, index: i })}
                                            style={{ cursor: "pointer" }}>
                                            {opt}
                                        </Form.Label>
                                        <button type="button" className="btn mb-3" onClick={() => handleRemove(i)}> <i className="bi bi-trash"></i> </button> <br />
                                    </>
                                )
                            ))}
                            {/* Add new option button */}
                            <Button variant="secondary" onClick={() => addOption(controlData.type === "checkbox" ? "Checkbox" : "Option")}>
                                + Add Option
                            </Button>
                        </>
                    }
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditingCtrlId(null)}> Close </Button>
                <Button variant="primary" onClick={handleSave} disabled={controlData?.name && false}> Save Changes </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default EditControl;