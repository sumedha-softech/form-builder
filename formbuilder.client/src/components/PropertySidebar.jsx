import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { FbDataContext } from "../context/FbContext";
import { useContext } from "react";

const PropertySidebar=({ onUpdateSection, onUpdateField }) => {
  const { selectedField, mode, showPropertiesPanel, setShowPropertiesPanel } = useContext(FbDataContext);

  const handleFieldUpdate = (updates) => { 
    onUpdateField({...selectedField, ...updates}) 
  };
  const handleSectionUpdate = (updates) => { 
    onUpdateSection({...selectedField, ...updates}) 
  };

  return (
    <div className="property-sidebar-outer-container">
      
      <div className={`property-sidebar-outer-wrapper ${mode==='light' ? 'property-sidebar-outer-wrapper-light' : 'property-sidebar-outer-wrapper-dark'}`}>
        
        {/* properties-heading */}
        <span onClick={() => setShowPropertiesPanel(!showPropertiesPanel)} className={`property-sidebar-heading ${mode === "light" ? "property-sidebar-heading-light" : "property-sidebar-heading-dark"}`}>
          <h2>Properties</h2>
          {
            showPropertiesPanel
            ?
            <ChevronUp className="property-sidebar-chevron-btn" />
            :
            <ChevronDown className="property-sidebar-chevron-btn" />
          }
        </span>

        {
          showPropertiesPanel
          &&
          (
            <div className="property-sidebar-inner-container">
              {
                !selectedField || selectedField===null
                ?
                // empty/no selected field properties
                (
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
                // field properties
                selectedField?.type !== "section"
                ?
                (
                  <div className={`property-sidebar-inner-wrapper ${mode==="light"?"property-sidebar-inner-wrapper-light":"property-sidebar-inner-wrapper-dark"}`}>
                    
                    {/* field-properties-heading */}
                    <h1 className={`property-sidebar-title ${mode==="light"?"property-sidebar-title-light":"property-sidebar-title-dark"}`}>
                      {selectedField?.type} properties
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
                        value={selectedField?.label} 
                        onChange={e => handleFieldUpdate({label:e.target.value})}
                        className={`field-property-input ${mode === "light" ? "field-property-input-light" : "field-property-input-dark"}`} 
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
                        <select id="type" name="field-type" value={selectedField?.type} onChange={e => handleFieldUpdate({type:e.target.value})}>
                          {
                            ["text", "textarea", "number", "email", "tel", "url", "date", "time", "select", "radio", "checkbox", "range"].map((type, idx) => (
                              <option key={idx} value={type}>
                                {type}
                              </option>
                            ))
                          }
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
                        value={selectedField?.placeholder} 
                        onChange={e => handleFieldUpdate({placeholder:e.target.value})}
                        className={`field-property-input ${mode === "light" ? "field-property-input-light" : "field-property-input-dark"}`} 
                      />
                    </div>

                    {/* field-settings  */}
                    <div className="field-property-container-settings">
                    
                      <div className="field-property-title">    
                        <Pencil className={`field-property-mark-icon ${mode==="light"?"field-property-mark-icon-light":"field-property-mark-icon-dark"}`}/>
                        <h4 className={`field-property-title-heading ${
                        mode==="light" ? "field-property-title-heading-light" : "field-property-title-heading-dark"}`}>
                          field settings:
                        </h4>
                      </div>

                      {/* isShowLabel */}
                      <div className="field-checkbox-settings-wrapper">
                        
                        <input 
                          id="hide-label" 
                          type="checkbox" 
                          checked={!selectedField?.isShowLabel} 
                          className="field-property-setting-checkbox" 
                          onChange={e => handleFieldUpdate({isShowLabel:!e.target.checked})}
                        />

                        <label htmlFor="hide-label" className={`field-settings-label ${mode === "light" ?"field-settings-label-light" : "field-settings-label-dark"}`}>
                          Hide label
                        </label>

                      </div>

                      {/* isReadOnly */}
                      <div className="field-checkbox-settings-wrapper">
                        
                        <input 
                          id="read-only" 
                          type="checkbox" 
                          checked={selectedField?.isReadonly} 
                          className="field-property-setting-checkbox" 
                          onChange={e => handleFieldUpdate({isReadonly:e.target.checked})}
                        />

                        <label htmlFor="read-only" className={`field-settings-label ${mode==="light" ? "field-settings-label-light" : "field-settings-label-dark"}`}>
                          read only
                        </label>

                      </div>
                    </div>

                    {/* field-validation */}
                    <div className="field-property-container-settings">
                      
                      {/* field-validation-heading */}
                      <div className="field-property-title">
                        <Pencil className={`field-property-mark-icon ${mode==="light" ? "field-property-mark-icon-light" : "field-property-mark-icon-dark"}`}/>
                        <h4 className={`field-property-title-heading ${
                        mode==="light" ? "field-property-title-heading-light" : "field-property-title-heading-dark"}`}>
                          field validations:
                        </h4>
                      </div>

                      {/* isFieldDisabled */}
                      <div className="field-checkbox-settings-wrapper">
                        <input 
                          type="checkbox" 
                          id="isFieldDisabled" 
                          checked={selectedField?.isFieldDisabled} 
                          className="field-property-setting-checkbox" 
                          onChange={e => handleFieldUpdate({isFieldDisabled:e.target.checked})}
                        />
                        <label htmlFor="isFieldDisabled" className={`field-settings-label ${mode === "light" ?"field-settings-label-light" : "field-settings-label-dark"}`}>
                          Disabled
                        </label>
                      </div>
                      
                      {/* isFieldRequired */}
                      <div className="field-checkbox-settings-wrapper">
                        <input 
                          type="checkbox" 
                          id="isFieldRequired" 
                          checked={selectedField?.isFieldRequired} 
                          className="field-property-setting-checkbox" 
                          onChange={e => handleFieldUpdate({isFieldRequired:e.target.checked})}
                        />
                        <label htmlFor="isFieldRequired" className={`field-settings-label ${mode === "light" ?"field-settings-label-light" : "field-settings-label-dark"}`}>
                          Required
                        </label>
                      </div>

                      {/* field-limit */}
                      {
                        (selectedField?.type === "text" ||
                        selectedField?.type === "email" ||
                        selectedField?.type === "textarea" ||
                        selectedField?.type === "url" ||
                        selectedField?.type === "number")
                        &&
                        <div className="field-checkbox-settings-wrapper">  
                          <input 
                            type="checkbox" 
                            id="fieldLimit" 
                            checked={selectedField?.limit} 
                            className="field-property-setting-checkbox" 
                            onChange={e => handleFieldUpdate({limit:e.target.checked})}
                          />
                          <label htmlFor="fieldLimit" className={`field-settings-label ${mode==="light"?"field-settings-label-light":"field-settings-label-dark"}`}>
                            Field Limit
                          </label>
                        </div>
                      }

                      {/* email-check */}
                      {
                        (selectedField?.type === "text" ||
                        selectedField?.type === "email")
                        &&
                        <div className="field-checkbox-settings-wrapper">  
                          <input 
                            type="checkbox" 
                            id="emailCheck" 
                            checked={selectedField?.emailCheck} 
                            className="field-property-setting-checkbox" 
                            onChange={e => handleFieldUpdate({emailCheck:e.target.checked})}
                          />
                          <label htmlFor="emailCheck" className={`field-settings-label ${mode==="light"?"field-settings-label-light":"field-settings-label-dark"}`}>
                            Check For Email
                          </label>
                        </div>
                      }

                      {/* password-check */}
                      {
                        (selectedField?.type === "text" ||
                          selectedField?.type === "password")
                        &&
                        <div className="field-checkbox-settings-wrapper">  
                          <input 
                            type="checkbox" 
                            id="passwordCheck" 
                            checked={selectedField?.passwordCheck} 
                            className="field-property-setting-checkbox" 
                            onChange={e => handleFieldUpdate({passwordCheck:e.target.checked})}
                          />
                          <label htmlFor="passwordCheck" className={`field-settings-label ${mode==="light"?"field-settings-label-light":"field-settings-label-dark"}`}>
                            Check For Password
                          </label>
                        </div>
                      }

                      {/* isUsernameEmpty */}
                      {
                        selectedField?.type === "text"
                        &&
                        <div className="field-checkbox-settings-wrapper">  
                          <input 
                            type="checkbox" 
                            id="isUsernameEmpty" 
                            checked={selectedField?.isUsernameEmpty} 
                            className="field-property-setting-checkbox" 
                            onChange={e => handleFieldUpdate({isUsernameEmpty:e.target.checked})}
                          />
                          <label htmlFor="isUsernameEmpty" className={`field-settings-label ${mode==="light"?"field-settings-label-light":"field-settings-label-dark"}`}>
                            Check For Username
                          </label>
                        </div>
                      }

                      {/* phoneNumberCheck */}
                      {
                        (selectedField?.type === "text" ||
                        selectedField?.type === "tel")
                        &&
                        <div className="field-checkbox-settings-wrapper">  
                          <input 
                            type="checkbox" 
                            id="phoneNumberCheck" 
                            checked={selectedField?.phoneNumberCheck} 
                            className="field-property-setting-checkbox" 
                            onChange={e => handleFieldUpdate({phoneNumberCheck:e.target.checked})}
                          />
                          <label htmlFor="phoneNumberCheck" className={`field-settings-label ${mode==="light"?"field-settings-label-light":"field-settings-label-dark"}`}>
                            Check For Phone Number
                          </label>
                        </div>
                      }

                      {/* urlCheck */}
                      {
                        (selectedField?.type === "text" ||
                        selectedField?.type === "url")
                        &&
                        <div className="field-checkbox-settings-wrapper">  
                          <input 
                            type="checkbox" 
                            id="urlCheck" 
                            checked={selectedField?.urlCheck} 
                            className="field-property-setting-checkbox" 
                            onChange={e => handleFieldUpdate({urlCheck:e.target.checked})}
                          />
                          <label htmlFor="urlCheck" className={`field-settings-label ${mode==="light"?"field-settings-label-light":"field-settings-label-dark"}`}>
                            Check For URL
                          </label>
                        </div>
                      }

                      {/* rangeCheck */}
                      {
                        selectedField?.type === "range"
                        &&
                        <div className="field-checkbox-settings-wrapper">  
                          <input 
                            id="rangeCheck" 
                            type="checkbox" 
                            checked={selectedField?.rangeCheck} 
                            className="field-property-setting-checkbox" 
                            onChange={e => handleFieldUpdate({rangeCheck:e.target.checked})}
                          />
                          <label htmlFor="rangeCheck" className={`field-settings-label ${mode==="light"?"field-settings-label-light":"field-settings-label-dark"}`}>
                            Check for range
                          </label>
                        </div>
                      }

                      {/* Check For Past Date only */}
                      {
                        selectedField?.type === "date"
                        &&
                        <div className="field-checkbox-settings-wrapper">  
                          <input 
                            id="checkForPastDate" 
                            type="checkbox" 
                            checked={selectedField?.checkForPastDate} 
                            className="field-property-setting-checkbox" 
                            onChange={e => handleFieldUpdate({checkForPastDate:e.target.checked})}
                          />
                          <label htmlFor="checkForPastDate" className={`field-settings-label ${mode==="light"?"field-settings-label-light":"field-settings-label-dark"}`}>
                            Check for Past Date 
                          </label>
                        </div>
                      }

                      {/* Check For Future Date only */}
                      {
                        selectedField?.type === "date"
                        &&
                        <div className="field-checkbox-settings-wrapper">  
                          <input 
                            id="checkForFutureDate" 
                            type="checkbox" 
                            checked={selectedField?.checkForFutureDate} 
                            className="field-property-setting-checkbox" 
                            onChange={e => handleFieldUpdate({checkForFutureDate:e.target.checked})}
                          />
                          <label htmlFor="checkForFutureDate" className={`field-settings-label ${mode==="light"?"field-settings-label-light":"field-settings-label-dark"}`}>
                            Check for Future Date 
                          </label>
                        </div>
                      }

                    </div>

                    {/* field-width */}
                    <div className={`field-property-container ${mode === "light" ? "field-property-container-light" : "field-property-container-dark"}`}>
                      
                      <div className="field-property-title">
                        <Pencil className={`field-property-mark-icon ${mode === "light" ? "field-property-mark-icon-light" : "field-property-mark-icon-dark"}`} />
                        <h4 className={`field-property-title-heading ${mode === "light" ? "field-property-title-heading-light" : "field-property-title-heading-dark"}`}>
                          field width:
                        </h4>
                      </div>

                      <div className={`field-width-property-wrapper ${mode === "light" ? "field-width-property-wrapper-light" : "field-width-property-wrapper-dark"}`}>
                        
                        <label className="field-label" htmlFor="width-full">
                          <input
                            name="width"
                            type="radio"
                            id="width-full"
                            className="field-btn-check"
                            checked={selectedField?.fieldWidth === "100%"}
                            onChange={() => handleFieldUpdate({fieldWidth:"100%"})}
                          />
                          <span className="field-text">Full Width</span>
                        </label>

                        <label className="field-label" htmlFor="width-half">
                          <input
                            type="radio"
                            name="width"
                            id="width-half"
                            className="field-btn-check"
                            checked={selectedField?.fieldWidth === "50%"}
                            onChange={() => handleFieldUpdate({fieldWidth:"50%"})}
                          />
                          <span className="field-text">Half Width</span>
                        </label>

                        <label className="field-label" htmlFor="width-third">
                          <input
                            name="width"
                            type="radio"
                            id="width-third"
                            className="field-btn-check"
                            checked={selectedField?.fieldWidth === "33%"}
                            onChange={() => handleFieldUpdate({fieldWidth:"33%"})}
                          />
                          <span className="text">One Third</span>
                        </label>
                      </div>
                    </div>

                    {/* field-alignment  */}
                    <div className={`field-property-container ${mode === "light" ? "field-property-container-light" : "field-property-container-dark"}`}>
                      <div className="field-property-title">
                        <Pencil className={`field-property-mark-icon ${mode === "light" ? "field-property-mark-icon-light" : "field-property-mark-icon-dark"}`} />
                        <h4 className={`field-property-title-heading ${mode === "light" ? "field-property-title-heading-light" : "field-property-title-heading-dark"}`}>
                          field alignment:
                        </h4>
                      </div>

                      <div className={`field-alignment-property-wrapper ${mode === "light" ? "field-alignment-property-wrapper-light" : "field-alignment-property-wrapper-dark"}`}>
                        <label htmlFor="field-align-start" className="field-alignment-property-label">
                          <input
                            type="radio"
                            name="field-align"
                            id="field-align-start"
                            checked={selectedField?.fieldAlign === "left"}
                            onChange={() => handleFieldUpdate({fieldAlign:"left"})}
                          />
                          <span className="field-alignment-property-name">Left</span>
                        </label>

                        <label htmlFor="field-align-center" className="field-alignment-property-label">
                          <input
                            type="radio"
                            name="field-align"
                            id="field-align-center"
                            checked={selectedField?.fieldAlign === "center"}
                            onChange={() => handleFieldUpdate({fieldAlign:"center"})}
                          />
                          <span className="field-alignment-property-name">Center</span>
                        </label>

                        <label htmlFor="field-align-end" className="field-alignment-property-label">
                          <input
                            type="radio"
                            name="field-align"
                            id="field-align-end"
                            checked={selectedField?.fieldAlign === "right"}
                            onChange={() => handleFieldUpdate({fieldAlign:"right"})}
                          />
                          <span className="field-alignment-property-name">Right</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ) 
                : 
                // section properties
                (
                  <div className="property-sidebar-inner-wrapper">
                    
                    <h1 className={`property-sidebar-title ${mode === "light" ? "property-sidebar-title-light" : "property-sidebar-title-dark"}`}>
                      {selectedField?.type} properties
                    </h1>

                    {/* section-title  */}
                    <div className={`section-property-container ${mode === "light" ? "section-property-container-light" : "section-property-container-dark"}`}>
                      
                      <div className="section-property-title">
                        <Pencil className={`section-property-mark-icon ${mode === "light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`} />
                        
                        <h4 className={`section-property-title-heading ${mode === "light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}>
                          section title:
                        </h4>
                      </div>
                      
                      <input
                        type="text"
                        value={selectedField.title}
                        onChange={e => handleSectionUpdate({title: e.target.value})}
                        className={`section-property-input ${mode === "light" ? "section-property-input-light" : "section-property-input-dark"}`}
                      />
                    </div>

                    {/* section-description  */}
                    <div className="section-property-container">
                      
                      <div className="section-property-title">
                        <Pencil className={`section-property-mark-icon ${mode==="light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`} />
                        
                        <h4 className={`section-property-title-heading ${mode === "light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}>
                          section description:
                        </h4>
                      </div>
                      
                      <input
                        type="text"
                        value={selectedField.description}
                        onChange={e => handleSectionUpdate({description: e.target.value})}
                        className={`section-property-input ${mode === "light" ? "section-property-input-light" : "section-property-input-dark"}`}
                      />
                    </div>

                    {/* section-settings  */}
                    <div className="section-property-container-settings">
                      
                      <div className="section-property-title">
                        <Pencil className={`section-property-mark-icon ${mode === "light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`} />
                        
                        <h4 className={`section-property-title-heading ${mode === "light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}>
                          section settings:
                        </h4>
                      </div>
                      
                      <div className="section-hide-settings-wrapper">
                        
                        <input
                          id="hide-title"
                          type="checkbox"
                          checked={!selectedField.isShowTitle}
                          className="section-property-setting-checkbox"
                          onChange={e => handleSectionUpdate({isShowTitle: !e.target.checked})}
                        />
                        
                        <label htmlFor="hide-title" className={`section-hide-settings-wrapper-label ${mode==="light" ? "section-hide-settings-wrapper-label-light" : "section-hide-settings-wrapper-label-dark"}`}>
                          Hide title
                        </label>
                      </div>
                      
                      <div className="section-hide-settings-wrapper">
                        
                        <input
                          id="hide-desc"
                          type="checkbox"
                          checked={!selectedField.isShowDescription}
                          className="section-property-setting-checkbox"
                          onChange={e => handleSectionUpdate({isShowDescription: !e.target.checked})}
                        />
                        
                        <label htmlFor="hide-desc" className={`section-hide-settings-wrapper-label ${mode==="light" ? "section-hide-settings-wrapper-label-light" : "section-hide-settings-wrapper-label-dark"}`}>
                          Hide description
                        </label>
                      </div>
                    </div>

                    {/* section-width  */}
                    <div className={`section-property-container ${mode==="light" ? "section-property-container-light" : "section-property-container-dark"}`}>
                      
                      <div className="section-property-title">
                        <Pencil className={`section-property-mark-icon ${mode==="light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`} />
                        
                        <h4 className={`section-property-title-heading ${mode==="light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}>
                          section width:
                        </h4>
                      </div>

                      <div className={`section-width-property-wrapper ${mode === "light" ? "section-width-property-wrapper-light" : "section-width-property-wrapper-dark"}`}>
                        
                        <label className="section-label" htmlFor="width-full">
                          <input
                            type="radio"
                            name="width"
                            id="width-full"
                            className="section-btn-check"
                            checked={selectedField?.sectionWidth==="100%"}
                            onChange={() => handleSectionUpdate({sectionWidth: "100%"})}
                          />
                          <span className="section-text">Full Width</span>
                        </label>

                        <label className="section-label" htmlFor="width-half">
                          <input
                            type="radio"
                            name="width"
                            id="width-half"
                            className="section-btn-check"
                            checked={selectedField?.sectionWidth==="50%"}
                            onChange={() => handleSectionUpdate({sectionWidth: "50%"})}
                          />
                          <span className="section-text">Half Width</span>
                        </label>

                        <label className="section-label" htmlFor="width-third">
                          <input
                            type="radio"
                            name="width"
                            id="width-third"
                            className="section-btn-check"
                            checked={selectedField?.sectionWidth==="33%"}
                            onChange={() => handleSectionUpdate({sectionWidth: "33%"})}
                          />
                          <span className="section-text">One Third</span>
                        </label>
                      </div>
                    </div>

                    {/* section-alignment  */}
                    <div className={`section-property-container ${mode === "light" ? "section-property-container-light" : "section-property-container-dark"}`}>
                      
                      <div className="section-property-title">
                        <Pencil className={`section-property-mark-icon ${mode==="light" ? "section-property-mark-icon-light" : "section-property-mark-icon-dark"}`} />
                        
                        <h4 className={`section-property-title-heading ${mode==="light" ? "section-property-title-heading-light" : "section-property-title-heading-dark"}`}>
                          section alignment:
                        </h4>
                      </div>
                      
                      <div className={`section-alignment-property-wrapper ${mode==="light" ? "section-alignment-property-wrapper-light" : "section-alignment-property-wrapper-dark"}`}>
                        
                        <label htmlFor="section-align-start" className="section-alignment-property-label">
                          <input
                            type="radio"
                            name="section-align"
                            id="section-align-start"
                            checked={selectedField?.sectionAlign==="left"}
                            onChange={() => handleSectionUpdate({sectionAlign: "left"})}
                          />
                          <span className="section-alignment-property-name">Left</span>
                        </label>

                        <label htmlFor="section-align-center" className="section-alignment-property-label">
                          <input
                            type="radio"
                            name="section-align"
                            id="section-align-center"
                            checked={selectedField.sectionAlign==="center"}
                            onChange={() => handleSectionUpdate({sectionAlign: "center"})}
                          />
                          <span className="section-alignment-property-name">Center</span>
                        </label>

                        <label htmlFor="section-align-end" className="section-alignment-property-label">
                          <input
                            type="radio"
                            name="section-align"
                            id="section-align-end"
                            checked={selectedField.sectionAlign === "right"}
                            onChange={() => handleSectionUpdate({sectionAlign: "right"})}
                          />
                          <span className="section-alignment-property-name">Right</span>
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