import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { FbDataContext } from "../context/FbContext";
import { useContext, useState } from "react";

const PropertySidebar=({ onUpdateSection, onUpdateField }) => {
  const { selectedField, mode } = useContext(FbDataContext);
  const [showProperties, setShowProperties] = useState(false);

  const handleFieldUpdate = (updates) => { onUpdateField({...selectedField, ...updates}) };
  const handleSectionUpdate = (updates) => { onUpdateSection({...selectedField, ...updates}) };

  return (
    <div className="property-sidebar-outer-container">
      <div className="property-sidebar-outer-wrapper">
        <span 
          className={`property-sidebar-heading ${mode === "light" ? "property-sidebar-heading-light" : "property-sidebar-heading-dark"}`} 
          onClick={() => setShowProperties(!showProperties)}
        >
          <h2>
            Properties
          </h2>
          {
            showProperties
            ?
            ( 
              <ChevronUp className="property-sidebar-chevron-btn" /> 
            )
            :
            ( 
              <ChevronDown className="property-sidebar-chevron-btn" /> 
            )
          }
        </span>

        {
          showProperties
          &&
          (
            <div className="property-sidebar-inner-container">
              {
                !selectedField || selectedField===null
                ?
                (
                  // empty/no properties
                  <div className={`property-sidebar-inner-wrapper-empty ${mode==="light"?"property-sidebar-inner-wrapper-empty-light":"property-sidebar-inner-wrapper-empty-dark"}`}>
                    <h1 className={`property-sidebar-inner-wrapper-empty-heading ${mode==="light" ? "property-sidebar-inner-wrapper-empty-heading-light" : "property-sidebar-inner-wrapper-empty-heading-dark"}`}>
                      no such properties
                    </h1>
                    <p>
                      select a field to see it's properties
                    </p>
                  </div>
                ) 
                : 
                selectedField?.type !== "section"
                ?
                (
                  // field properties
                  <div className={`property-sidebar-inner-wrapper ${mode==="light"?"property-sidebar-inner-wrapper-light":"property-sidebar-inner-wrapper-dark"}`}>
                    <h1 className={`property-sidebar-title ${mode==="light"?"property-sidebar-title-light":"property-sidebar-title-dark"}`}>
                      { selectedField?.type } properties
                    </h1>

                    {/* field-label */}
                    <div className={`field-property-container ${mode==="light"?"field-property-container-light":"field-property-container-dark"}`}>
                      
                      <div className="field-property-title">
                        <Pencil className={`field-property-mark-icon ${mode==="light" ? "field-property-mark-icon-light" : "field-property-mark-icon-dark"}`}/>
                        <h4 className={`field-property-title-heading ${mode==="light" ? "field-property-title-heading-light" : "field-property-title-heading-dark"}`}>
                          field label:
                        </h4>
                      </div>

                      <input 
                        type="text" 
                        className={`field-property-input ${mode === "light" ? "field-property-input-light" : "field-property-input-dark"}`} 
                        value={selectedField?.label} 
                        onChange={e => handleFieldUpdate({label:e.target.value})}
                      />

                    </div>

                    {/* field-type */}
                    <div className={`field-property-container ${mode === "light" ? "field-property-container-light" : "field-property-container-dark"}`}>
                      <div className="field-property-title">
                        <Pencil className={`field-property-mark-icon ${mode==="light"?"field-property-mark-icon-light":"field-property-mark-icon-dark"}`}/>
                        <h4 className={`field-property-title-heading ${mode==="light"?"field-property-title-heading-light":"field-property-title-heading-dark"}`} htmlFor="type">
                          field type:
                        </h4>
                      </div>

                      <div className={`field-select-dropdown ${mode==="light"?"field-select-dropdown-light":"field-select-dropdown-dark"}`}>
                        <select 
                          id="type" 
                          name="field-type" 
                          value={selectedField?.type} 
                          onChange={e => handleFieldUpdate({type:e.target.value})}
                        >
                          <option value="text">text</option>
                          <option value="textarea">textarea</option>
                          <option value="email">email</option>
                          <option value="number">number</option>
                          <option value="date">date</option>
                          <option value="dropdown">dropdown</option>
                        </select>
                      </div>
                    </div>

                    {/* field-placeholder */}
                    <div className={`field-property-container ${mode==="light"?"field-property-container-light":"field-property-container-dark"}`}>
                      <div className="field-property-title">
                        <Pencil className={`field-property-mark-icon ${mode==="light"?"field-property-mark-icon-light":"field-property-mark-icon-dark"}`}/>
                        <h4 className={`field-property-title-heading ${mode==="light"?"field-property-title-heading-light":"field-property-title-heading-dark"}`}>
                          field placeholder:
                        </h4>
                      </div>
                      <input 
                        type="text" 
                        className={`field-property-input ${mode === "light" ? "field-property-input-light" : "field-property-input-dark"}`} 
                        value={selectedField?.placeholder} 
                        onChange={e => handleFieldUpdate({placeholder:e.target.value})}
                      />
                    </div>

                    {/* field-settings  */}
                    <div className="field-property-container-settings">
                      <div className="field-property-title">
                        <Pencil className={`field-property-mark-icon ${mode==="light"?"field-property-mark-icon-light":"field-property-mark-icon-dark"}`}/>
                        <h4 className={`field-property-title-heading ${
                        mode==="light"?"field-property-title-heading-light":"field-property-title-heading-dark"}`}>
                          field settings:
                        </h4>
                      </div>
                      <div className="field-hide-settings-wrapper">
                        
                        <input 
                          type="checkbox" 
                          id="hide-label" 
                          className="field-property-setting-checkbox" 
                          checked={!selectedField?.isShowLabel} 
                          onChange={e => handleFieldUpdate({isShowLabel:!e.target.checked})}
                        />

                        <label 
                          className={`field-hide-settings-wrapper-label ${mode === "light" ?"field-hide-settings-wrapper-label-light" : "field-hide-settings-wrapper-label-dark"}`} 
                          htmlFor="hide-label"
                        >
                          Hide label
                        </label>

                      </div>

                      <div className="field-hide-settings-wrapper">
                        <input 
                          type="checkbox" 
                          id="read-only" 
                          className="field-property-setting-checkbox" 
                          checked={selectedField?.isReadonly} 
                          onChange={e => handleFieldUpdate({isReadonly:e.target.checked})}
                        />

                        <label className={`field-hide-settings-wrapper-label ${mode==="light"?"field-hide-settings-wrapper-label-light":"field-hide-settings-wrapper-label-dark"}`} htmlFor="read-only">
                          read only
                        </label>

                      </div>
                    </div>

                    {/* field-width */}
                    <div
                    className={`field-property-container ${mode === "light" ? "field-property-container-light" : "field-property-container-dark"}`}
                    >
                      <div className="field-property-title">
                        <Pencil
                        className={`field-property-mark-icon ${mode === "light" ? "field-property-mark-icon-light" : "field-property-mark-icon-dark"}`}
                        />
                        <h4
                          className={`field-property-title-heading ${mode === "light" ? "field-property-title-heading-light" : "field-property-title-heading-dark"}`}
                        >
                          field width:
                        </h4>
                      </div>

                      <div
                        className={`field-width-property-wrapper ${mode === "light" ? "field-width-property-wrapper-light" : "field-width-property-wrapper-dark"}`}
                      >
                        <label className="field-label" htmlFor="width-full">
                          <input
                            type="radio"
                            className="field-btn-check"
                            name="width"
                            id="width-full"
                            checked={selectedField?.fieldWidth === "100%"}
                            onChange={() => handleFieldUpdate({fieldWidth:"100%"})}
                          />
                          <span className="field-text">Full Width</span>
                        </label>

                        <label className="field-label" htmlFor="width-half">
                          <input
                            type="radio"
                            className="field-btn-check"
                            name="width"
                            id="width-half"
                            checked={selectedField?.fieldWidth === "50%"}
                            onChange={() => handleFieldUpdate({fieldWidth:"50%"})}
                          />
                          <span className="field-text">Half Width</span>
                        </label>

                        <label className="field-label" htmlFor="width-third">
                          <input
                            type="radio"
                            className="field-btn-check"
                            name="width"
                            id="width-third"
                            checked={selectedField?.fieldWidth === "33%"}
                            onChange={() => handleFieldUpdate({fieldWidth:"33%"})}
                          />
                          <span className="text">
                            One Third
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* field-alignment  */}
                    <div className={`field-property-container ${mode === "light" ? "field-property-container-light" : "field-property-container-dark"}`}>
                      <div className="field-property-title">
                        <Pencil
                          className={`field-property-mark-icon ${mode === "light" ? "field-property-mark-icon-light" : "field-property-mark-icon-dark"}`}
                        />
                        <h4
                          className={`field-property-title-heading ${mode === "light" ? "field-property-title-heading-light" : "field-property-title-heading-dark"}`}
                        >
                          field alignment:
                        </h4>
                      </div>

                      <div
                        className={`field-alignment-property-wrapper ${mode === "light" ? "field-alignment-property-wrapper-light" : "field-alignment-property-wrapper-dark"}`}
                      >
                        <label
                          className="field-alignment-property-label"
                          htmlFor="field-align-start"
                        >
                          <input
                            type="radio"
                            name="field-align"
                            id="field-align-start"
                            checked={selectedField?.fieldAlign === "left"}
                            onChange={() => handleFieldUpdate({fieldAlign:"left"})}
                          />
                          <span className="field-alignment-property-name">
                            Left
                          </span>
                        </label>

                        <label
                          className="field-alignment-property-label"
                          htmlFor="field-align-center"
                        >
                          <input
                            type="radio"
                            name="field-align"
                            id="field-align-center"
                            checked={selectedField?.fieldAlign === "center"}
                            onChange={() => handleFieldUpdate({fieldAlign:"center"})}
                          />
                          <span className="field-alignment-property-name">
                            Center
                          </span>
                        </label>

                        <label
                          className="field-alignment-property-label"
                          htmlFor="field-align-end"
                        >
                          <input
                            type="radio"
                            name="field-align"
                            id="field-align-end"
                            checked={selectedField?.fieldAlign === "right"}
                            onChange={() => handleFieldUpdate({fieldAlign:"right"})}
                          />
                          <span className="field-alignment-property-name">
                            Right
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                ) 
                : 
                (
                  // section properties
                  <div className="property-sidebar-inner-wrapper">
                    <h1
                      className={`property-sidebar-title ${mode === "light" ? "property-sidebar-title-light" : "property-sidebar-title-dark"}`}
                    >
                      {selectedField?.type} properties
                    </h1>

                    {/* section-title  */}
                    <div className={`section-property-container ${mode === "light" ? "section-property-container-light" : "section-property-container-dark"}`}>
                      <div className="section-property-title">
                        <Pencil
                          className={`section-property-mark-icon ${mode === "light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`}
                        />
                        <h4
                          className={`section-property-title-heading ${mode === "light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}
                        >
                          section title:
                        </h4>
                      </div>
                      <input
                        type="text"
                        className={`section-property-input ${mode === "light" ? "section-property-input-light" : "section-property-input-dark"}`}
                        value={selectedField.title}
                        onChange={e => handleSectionUpdate({title: e.target.value})}
                      />
                    </div>

                    {/* section-description  */}
                    <div className="section-property-container">
                      <div className="section-property-title">
                        <Pencil
                          className={`section-property-mark-icon ${mode==="light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`}
                        />
                        <h4
                          className={`section-property-title-heading ${mode === "light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}
                        >
                          section description:
                        </h4>
                      </div>
                      <input
                        type="text"
                        className={`section-property-input ${mode === "light" ? "section-property-input-light" : "section-property-input-dark"}`}
                        value={selectedField.description}
                        onChange={e => handleSectionUpdate({description: e.target.value})}
                      />
                    </div>

                    {/* section-settings  */}
                    <div className="section-property-container-settings">
                      <div className="section-property-title">
                        <Pencil
                          className={`section-property-mark-icon ${mode === "light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`}
                        />
                        <h4
                          className={`section-property-title-heading ${mode === "light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}
                        >
                          section settings:
                        </h4>
                      </div>
                      <div className="section-hide-settings-wrapper">
                        <input
                          type="checkbox"
                          id="hide-title"
                          className="section-property-setting-checkbox"
                          checked={!selectedField.isShowTitle}
                          onChange={e => handleSectionUpdate({isShowTitle: !e.target.checked})}
                        />
                        <label
                          className={`section-hide-settings-wrapper-label ${mode==="light" ? "section-hide-settings-wrapper-label-light" : "section-hide-settings-wrapper-label-dark"}`}
                          htmlFor="hide-title"
                        >
                          Hide title
                        </label>
                      </div>
                      <div className="section-hide-settings-wrapper">
                        <input
                          type="checkbox"
                          id="hide-desc"
                          className="section-property-setting-checkbox"
                          checked={!selectedField.isShowDescription}
                          onChange={e => handleSectionUpdate({isShowDescription: !e.target.checked})}
                        />
                        <label
                          className={`section-hide-settings-wrapper-label ${mode==="light" ? "section-hide-settings-wrapper-label-light" : "section-hide-settings-wrapper-label-dark"}`}
                          htmlFor="hide-desc"
                        >
                          Hide description
                        </label>
                      </div>
                    </div>

                    {/* section-width  */}
                    <div className={`section-property-container ${mode==="light" ? "section-property-container-light" : "section-property-container-dark"}`}>
                      <div className="section-property-title">
                        <Pencil
                          className={`section-property-mark-icon ${mode==="light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`}
                        />
                        <h4
                          className={`section-property-title-heading ${mode==="light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}
                        >
                          section width:
                        </h4>
                      </div>

                      <div
                        className={`section-width-property-wrapper ${mode === "light" ? "section-width-property-wrapper-light" : "section-width-property-wrapper-dark"}`}
                      >
                        <label className="section-label" htmlFor="width-full">
                          <input
                            type="radio"
                            className="section-btn-check"
                            name="width"
                            id="width-full"
                            checked={selectedField?.sectionWidth==="100%"}
                            onChange={() => handleSectionUpdate({sectionWidth: "100%"})}
                          />
                          <span className="section-text">
                            Full Width
                          </span>
                        </label>

                        <label className="section-label" htmlFor="width-half">
                          <input
                            type="radio"
                            className="section-btn-check"
                            name="width"
                            id="width-half"
                            checked={selectedField?.sectionWidth==="50%"}
                            onChange={() => handleSectionUpdate({sectionWidth: "50%"})}
                          />
                          <span className="section-text">
                            Half Width
                          </span>
                        </label>

                        <label className="section-label" htmlFor="width-third">
                          <input
                            type="radio"
                            className="section-btn-check"
                            name="width"
                            id="width-third"
                            checked={selectedField?.sectionWidth==="33%"}
                            onChange={() => handleSectionUpdate({sectionWidth: "33%"})}
                          />
                          <span className="section-text">
                            One Third
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* section-alignment  */}
                    <div className={`section-property-container ${mode === "light" ? "section-property-container-light" : "section-property-container-dark"}`}>
                      <div className="section-property-title">
                        <Pencil
                          className={`section-property-mark-icon ${mode==="light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`}
                        />
                        <h4
                          className={`section-property-title-heading ${mode==="light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}
                        >
                          section alignment:
                        </h4>
                      </div>
                      <div
                        className={`section-alignment-property-wrapper ${mode==="light" ? "section-alignment-property-wrapper-light" : "section-alignment-property-wrapper-dark"}`}
                      >
                        <label
                          className="section-alignment-property-label"
                          htmlFor="section-align-start"
                        >
                          <input
                            type="radio"
                            name="section-align"
                            id="section-align-start"
                            checked={selectedField?.sectionAlign==="left"}
                            onChange={() => handleSectionUpdate({sectionAlign: "left"})}
                          />
                          <span className="section-alignment-property-name">
                            Left
                          </span>
                        </label>

                        <label
                          className="section-alignment-property-label"
                          htmlFor="section-align-center"
                        >
                          <input
                            type="radio"
                            name="section-align"
                            id="section-align-center"
                            checked={selectedField.sectionAlign==="center"}
                            onChange={() => handleSectionUpdate({sectionAlign: "center"})}
                          />
                          <span className="section-alignment-property-name">
                            Center
                          </span>
                        </label>

                        <label
                          className="section-alignment-property-label"
                          htmlFor="section-align-end"
                        >
                          <input
                            type="radio"
                            name="section-align"
                            id="section-align-end"
                            checked={selectedField.sectionAlign === "right"}
                            onChange={() => handleSectionUpdate({sectionAlign: "right"})}
                          />
                          <span className="section-alignment-property-name">
                            Right
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default PropertySidebar;