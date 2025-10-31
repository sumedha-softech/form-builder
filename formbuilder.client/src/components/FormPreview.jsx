import { FbDataContext } from "../context/FbContext";
import { Cross } from "lucide-react";
import { useContext } from "react";

const FormPreview = ({ setShowPreview }) => {
  const { formData, mode } = useContext(FbDataContext);

  // function to render preview section/fields
  const previewRenderField = (field) => {

    if (field?.type==="textarea") {
      return (
        <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
          {
            field?.isShowLabel 
            && 
            <label className="form-field-label">{field?.label}</label>
          }

          <textarea
            rows={3}
            readOnly={field?.isReadonly}
            maxLength={field?.limit ? 20 : "any"}
            placeholder={field?.placeholder}
            required={field?.isFieldRequired}
            disabled={field?.isFieldDisabled}
            className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
          />

        </div>
      );
    }else if(field?.type==="select") {
      return (
        <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
          {
            field?.isShowLabel 
            && 
            <label className="form-field-label">{field?.label}</label>
          }

          <select className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`} defaultValue="" disabled={field?.isFieldDisabled}>
            <option value="" disabled>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
      );
    } else if (field?.type==="radio") {
      return (
        <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
          {
            field?.isShowLabel 
            && 
            <label className="form-field-label">{field?.label}</label>
          }

          <div className="form-field-radio-wrapper">
            <input 
              type="radio" 
              className="form-field-radio" 
              required={field?.isFieldRequired}
              maxLength={field?.limit ? 20 : "any"}
              disabled={field?.isFieldDisabled}
            />
            <label className={`form-field-radio-label ${mode === "light" ? "form-field-radio-label-light" : "form-field-radio-label-dark"}`}>
              Radio Option
            </label>
          </div>
        </div>
      );
    } else if (field?.type==="checkbox") {
      return (
        <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
          {
            field?.isShowLabel 
            && 
            <label className="form-field-label">{field?.label}</label>
          }

          <div className="form-field-checkbox-wrapper">
            <input 
              type="checkbox" 
              className="form-field-checkbox" 
              disabled={field?.isFieldDisabled}
            />
            <label className={`form-field-checkbox-label ${mode === "light" ? "form-field-checkbox-label-light" : "form-field-checkbox-label-dark"}`}>
              Checkbox
            </label>
          </div>
        </div>
      );
    } else if (field?.type==="range") {
      return (
        <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
          {
            field?.isShowLabel 
            && 
            <label className="form-field-label">{field?.label}</label>
          }

          <input
            type="range"
            readOnly={field?.isReadonly}
            required={field?.isFieldRequired}
            disabled={field?.isFieldDisabled}
            placeholder={field?.placeholder}
            min={field?.rangeCheck ? 1 : "any"}
            max={field?.rangeCheck ? 10 : "any"}
            className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
          />
        </div>
      );
    } else {
      return (
        <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
          {
            field?.isShowLabel 
            && 
            <label className="form-field-label">{field?.label}</label>
          }

          <input
            type={field?.type}
            readOnly={field?.isReadonly}
            required={field?.isFieldRequired}
            maxLength={field?.limit ? 20 : "any"}
            disabled={field?.isFieldDisabled}
            placeholder={field?.placeholder}
            className={`form-field-input ${mode === "light" ? "form-field-input-light" : "form-field-input-dark"}`}
          />
        </div>
      );
    }
  };

  return (
    <div className={`form-preview-page ${mode === "light" ? "form-preview-page-light" : "form-preview-page-dark"}`}>
      
      <button className="form-preview-close-btn">
        <Cross 
          onClick={() => setShowPreview(false)} 
          className={`form-preview-close-btn-icon ${mode === "light" ? "form-preview-close-btn-icon-light" : "form-preview-close-btn-icon-dark"}`}
        />
      </button>

      <div className={`form-preview-container ${mode === "light" ? "form-preview-container-light" : "form-preview-container-dark"}`}>
        
        <div className="form-preview-heading">
          <h1 className={`form-preview-heading-title ${mode === "light" ? "form-preview-heading-title-light" : "form-preview-heading-title-dark"}`}>
            <span className={`form-preview-title-heading ${mode === "light" ? "form-preview-title-heading-light" : "form-preview-title-heading-dark"}`}>
              {formData?.title ? formData?.title : "Form"}
            </span> preview
          </h1>
          
          <h5>This is the preview of how the form look like.</h5>
        </div>

        {
          formData?.formdata?.length>0
          ?
          (
            <div className={`form-preview ${mode === "light" ? "form-preview-light" : "form-preview-dark"}`}>
              <div className="form-preview-section-container">
                {
                  formData?.formdata?.map(sec => (
                    <div 
                      key={sec?.id} 
                      className={`form-preview-section ${mode === "light" ? "form-preview-section-light" : "form-preview-section-dark"}`} 
                      style={{
                        width: sec?.sectionWidth, 
                        textAlign: sec?.sectionAlign
                      }}
                    >  
                      <div className="form-preview-section-heading">
                        { 
                          sec?.isShowTitle 
                          && 
                          <h4 className={`form-preview-section-heading-title ${mode === "light" ? "form-preview-section-heading-title-light" : "form-preview-section-heading-title-dark"}`}>    
                            {sec?.title} 
                          </h4> 
                        }
                        
                        {sec?.isShowDescription && <h6>{sec?.description}</h6>}
                      </div>

                      <div className="form-preview-section-wrapper">
                        {
                          sec?.fields?.map(field => (
                            <div 
                              key={field?.id} 
                              style={{width: field?.fieldWidth, textAlign: field?.fieldAlign}} 
                              className={`form-preview-section-field-wrapper ${mode === "light" ? "form-preview-section-field-wrapper-light" : "form-preview-section-field-wrapper-dark"}`}
                            >
                              {previewRenderField(field)}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )
          :
          (
            <div className={`empty-preview-section ${mode==='light' ? 'empty-preview-section-light' : 'empty-preview-section-dark'}`}>
              <h1>No Fields Found...</h1>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default FormPreview;