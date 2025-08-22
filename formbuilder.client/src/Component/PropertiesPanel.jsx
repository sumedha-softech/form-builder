const PropertiesPanel = ({ selectedField, onUpdateField, selectedSection, onUpdateSection, propertyPanelRef }) => {
    if (!selectedField && !selectedSection) {
        return (
            <div className="properties-panel p-3">
                <h6 className="fw-bold mb-3 text-uppercase small text-muted">Properties</h6>
                <div className="text-center text-muted mt-5">
                    <p>Select a field to edit its properties</p>
                </div>
            </div>
        );
    }

    const handleFieldUpdate = (updates) => {
        onUpdateField({ ...selectedField, ...updates });
    };

    const handleSectionUpdate = (updates) => {
        onUpdateSection({ ...selectedSection, ...updates });
    };

    return (
        <div className="properties-panel p-3 overflow-auto" ref={propertyPanelRef}>
            <h6 className="fw-bold mb-3 text-uppercase small text-muted">Properties</h6>
            {selectedField ? (
                <>
                    <div className="mb-3">
                        <label className="form-label small fw-medium">Field Label</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={selectedField.label}
                            onChange={(e) => handleFieldUpdate({ label: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-medium">Field Type</label>
                        <select
                            className="form-select form-select-sm"
                            value={selectedField.type}
                            onChange={(e) => handleFieldUpdate({ type: e.target.value })}
                        >
                            <option value="text">Text</option>
                            <option value="textarea">Textarea</option>
                            <option value="email">Email</option>
                            <option value="number">Number</option>
                            <option value="date">Date</option>
                            <option value="select">Dropdown</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-medium">Placeholder</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={selectedField.placeholder || ""}
                            onChange={(e) => handleFieldUpdate({ placeholder: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="required"
                                checked={selectedField.required}
                                onChange={(e) => handleFieldUpdate({ required: e.target.checked })}
                            />
                            <label className="form-check-label small fw-medium" htmlFor="required">
                                Required Field
                            </label>
                        </div>
                    </div>

                    <hr />

                    <h6 className="fw-medium mb-3 small">Field Settings</h6>

                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="hide-label"
                                checked={!selectedField.isShowLabel}
                                onChange={(e) => handleFieldUpdate({ isShowLabel: !e.target.checked })}
                            />
                            <label className="form-check-label small" htmlFor="hide-label">
                                Hide Label
                            </label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="read-only"
                                checked={selectedField.isReadOnly}
                                onChange={(e) => handleFieldUpdate({ isReadOnly: e.target.checked })}
                            />
                            <label className="form-check-label small" htmlFor="read-only">
                                Read Only
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-medium">Field Width</label>
                        <div className="btn-group-vertical w-100" role="group">
                            <input
                                type="radio"
                                className="btn-check"
                                name="width"
                                id="width-full"
                                checked={selectedField.width === "col-md-12"}
                                onChange={() => handleFieldUpdate({ width: "col-md-12" })}
                            />
                            <label className="btn btn-outline-secondary btn-sm text-start" htmlFor="width-full">
                                Full Width
                            </label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="width"
                                id="width-half"
                                checked={selectedField.width === "col-md-6"}
                                onChange={() => handleFieldUpdate({ width: "col-md-6" })}

                            />
                            <label className="btn btn-outline-secondary btn-sm text-start" htmlFor="width-half">
                                Half Width
                            </label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="width"
                                id="width-third"
                                checked={selectedField.width === "col-md-4"}
                                onChange={() => handleFieldUpdate({ width: "col-md-4" })}
                            />
                            <label className="btn btn-outline-secondary btn-sm text-start" htmlFor="width-third">
                                One Third
                            </label>
                        </div>
                    </div>

                    <hr />

                    <h6 className="fw-medium mb-3 small">Alignment</h6>

                    <div className="btn-group w-100" role="group">
                        <input
                            type="radio"
                            className="btn-check"
                            name="align"
                            id="align-left"
                            checked={selectedField.align === "text-start"}
                            onChange={() => handleFieldUpdate({ align: "text-start" })}
                        />
                        <label className="btn btn-outline-secondary btn-sm" htmlFor="align-left">
                            Left
                        </label>

                        <input
                            type="radio"
                            className="btn-check"
                            name="align"
                            id="align-center"
                            checked={selectedField.align === "text-center"}
                            onChange={() => handleFieldUpdate({ align: "text-center" })}
                        />
                        <label className="btn btn-outline-secondary btn-sm" htmlFor="align-center">
                            Center
                        </label>

                        <input
                            type="radio"
                            className="btn-check"
                            name="align"
                            id="align-right"
                            checked={selectedField.align === "text-end"}
                            onChange={() => handleFieldUpdate({ align: "text-end" })}
                        />
                        <label className="btn btn-outline-secondary btn-sm" htmlFor="align-right">
                            Right
                        </label>
                    </div>
                </>
            ) : (
                selectedSection && (
                    <>
                        <div className="mb-3">
                            <label className="form-label small fw-medium">Section Title</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={selectedSection.title}
                                onChange={(e) => handleSectionUpdate({ title: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-medium">Section Description</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={selectedSection.description}
                                onChange={(e) => handleSectionUpdate({ description: e.target.value })}
                            />
                        </div>

                        <hr />

                        <h6 className="fw-medium mb-3 small">Section Settings</h6>

                        <div className="mb-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="hide-label"
                                    checked={!selectedSection.isShowTitle}
                                    onChange={(e) => handleSectionUpdate({ isShowTitle: !e.target.checked })}
                                />
                                <label className="form-check-label small" htmlFor="hide-label">
                                    Hide Title
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="read-only"
                                    checked={!selectedSection.isShowDescription}
                                    onChange={(e) => handleSectionUpdate({ isShowDescription: !e.target.checked })}
                                />
                                <label className="form-check-label small" htmlFor="read-only">
                                    Hide Description
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-medium">Width</label>
                            <div className="btn-group-vertical w-100" role="group">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="width"
                                    id="width-full"
                                    checked={selectedSection.width === "col-12"}
                                    onChange={() => handleSectionUpdate({ width: "col-12" })}
                                />
                                <label className="btn btn-outline-secondary btn-sm text-start" htmlFor="width-full">
                                    Full Width
                                </label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="width"
                                    id="width-half"
                                    checked={selectedSection.width === "col-6"}
                                    onChange={() => handleSectionUpdate({ width: "col-6" })}
                                />
                                <label className="btn btn-outline-secondary btn-sm text-start" htmlFor="width-half">
                                    Half Width
                                </label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="width"
                                    id="width-third"
                                    checked={selectedSection.width === "col-4"}
                                    onChange={() => handleSectionUpdate({ width: "col-4" })}
                                />
                                <label className="btn btn-outline-secondary btn-sm text-start" htmlFor="width-third">
                                    One Third
                                </label>
                            </div>
                        </div>

                        <hr />

                        <h6 className="fw-medium mb-3 small">Alignment</h6>

                        <div className="btn-group w-100" role="group">
                            <input
                                type="radio"
                                className="btn-check"
                                name="align"
                                id="align-start"
                                checked={selectedSection.alignment === "w-100 text-start"}
                                onChange={() => handleSectionUpdate({ alignment: "w-100 text-start" })}
                            />
                            <label className="btn btn-outline-secondary btn-sm" htmlFor="align-start">
                                Left
                            </label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="align"
                                id="align-center"
                                checked={selectedSection.alignment === "w-100 text-center"}
                                onChange={() => handleSectionUpdate({ alignment: "w-100 text-center" })}
                            />
                            <label className="btn btn-outline-secondary btn-sm" htmlFor="align-center">
                                Center
                            </label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="align"
                                id="align-end"
                                checked={selectedSection.alignment === "w-100 text-end"}
                                onChange={() => handleSectionUpdate({ alignment: "w-100 text-end" })}
                            />
                            <label className="btn btn-outline-secondary btn-sm" htmlFor="align-end">
                                Right
                            </label>
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default PropertiesPanel;
