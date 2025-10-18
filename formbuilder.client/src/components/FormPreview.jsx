import { FbDataContext } from "../context/FbContext";
import { Cross } from "lucide-react";
import { useContext } from "react";

const FormPreview = ({ setShowPreview }) => {
  const { formData, mode } = useContext(FbDataContext);

  // function to render preview section/fields
  const previewRenderField = (field) => {
    switch (field?.type) {
      case "text":
        return (
          <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
            {
              field?.isShowLabel 
              && 
              (
                <label className="form-field-label">
                  {field?.label}
                </label>
              )
            }

            <input
              type="text"
              placeholder={field?.placeholder}
              className={`form-field-input ${
                mode === "light"
                  ? "form-field-input-light"
                  : "form-field-input-dark"
              }`}
              readOnly={field?.isReadonly}
              disabled
            />

          </div>
        );
      case "email":
        return (
          <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
            {
              field?.isShowLabel 
              && 
              (
                <label className="form-field-label">
                  {field?.label}
                </label>
              )
            }

            <input
              type="email"
              placeholder={field?.placeholder}
              className={`form-field-input ${
                mode === "light"
                  ? "form-field-input-light"
                  : "form-field-input-dark"
              }`}
              readOnly={field?.isReadonly}
              disabled
            />

          </div>
        );
      case "phone":
        return (
          <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
            {
              field?.isShowLabel 
              && 
              (
                <label className="form-field-label">
                  {field?.label}
                </label>
              )
            }
            
            <input
              type="number"
              placeholder={field?.placeholder}
              className={`form-field-input ${
                mode === "light"
                  ? "form-field-input-light"
                  : "form-field-input-dark"
              }`}
              readOnly={field?.isReadonly}
              disabled
            />

          </div>
        );
      case "number":
        return (
          <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
            {
              field?.isShowLabel 
              && 
              (
                <label className="form-field-label">
                  {field?.label}
                </label>
              )
            }

            <input
              type="number"
              placeholder={field?.placeholder}
              className={`form-field-input ${
                mode === "light"
                  ? "form-field-input-light"
                  : "form-field-input-dark"
              }`}
              readOnly={field?.isReadonly}
              disabled
            />

          </div>
        );
      case "textarea":
        return (
          <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
            {
              field?.isShowLabel 
              && 
              (
                <label className="form-field-label">
                  {field?.label}
                </label>
              )
            }

            <textarea
              placeholder={field?.placeholder}
              className={`form-field-input ${
                mode === "light"
                  ? "form-field-input-light"
                  : "form-field-input-dark"
              }`}
              readOnly={field?.isReadonly}
              rows={3}
              disabled
            />

          </div>
        );
      case "checkbox":
        return (
          <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
            {
              field?.isShowLabel 
              && 
              (
                <label className="form-field-label">
                  {field?.label}
                </label>
              )
            }

            <div className="form-field-checkbox-wrapper">
              <input 
                type="checkbox" 
                className="form-field-checkbox" 
                disabled 
              />
              <label
                className={`form-field-checkbox-label ${
                  mode === "light"
                    ? "form-field-checkbox-label-light"
                    : "form-field-checkbox-label-dark"
                }`}
              >
                Checkbox
              </label>
            </div>
          </div>
        );
      case "radio":
        return (
          <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
            {
              field?.isShowLabel 
              && 
              (
                <label className="form-field-label">
                  {field?.label}
                </label>
              )
            }

            <div className="form-field-radio-wrapper">
              <input 
                type="radio" 
                className="form-field-radio" 
                disabled 
              />
              <label
                className={`form-field-radio-label ${
                  mode === "light"
                    ? "form-field-radio-label-light"
                    : "form-field-radio-label-dark"
                }`}
              >
                Radio Option
              </label>
            </div>
          </div>
        );
      case "select":
        return (
          <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
            {
              field?.isShowLabel 
              && 
              (
                <label className="form-field-label">
                  {field?.label}
                </label>
              )
            }

            <select
              className={`form-field-input ${
                mode === "light"
                  ? "form-field-input-light"
                  : "form-field-input-dark"
              }`}
              defaultValue=""
              disabled
            >
              <option value="" disabled>Select an option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
        );
      default:
        return (
          <div className="form-field-wrapper" style={{ textAlign: field?.fieldAlign }}>
            { field?.isShowLabel && (<label className="form-field-label">{field?.label}</label>)}

            <input type="text" placeholder={field?.placeholder} className={`form-field-default-input ${mode === "light" ? "form-field-default-input-light" : "form-field-default-input-dark"}`} readOnly={field?.isReadonly} disabled/>
          </div>
        );
    }
  };

  return (
    <div className={`form-preview-page ${mode === "light" ? "form-preview-page-light" : "form-preview-page-dark"}`}>
      <button className="form-preview-close-btn">
        <Cross onClick={() => setShowPreview(false)} className={`form-preview-close-btn-icon ${mode === "light" ? "form-preview-close-btn-icon-light" : "form-preview-close-btn-icon-dark"}`}/>
      </button>

      <div className={`form-preview-container ${mode === "light" ? "form-preview-container-light" : "form-preview-container-dark"}`}>
        <div className="form-preview-heading">
          <h1 className={`form-preview-heading-title ${mode === "light" ? "form-preview-heading-title-light" : "form-preview-heading-title-dark"}`}>
            form preview
          </h1>
          <h5>This is the preview of how the form look like.</h5>
        </div>

        <div className={`form-preview ${mode === "light" ? "form-preview-light" : "form-preview-dark"}`}>
          <div className="form-preview-title">
            <h2 className={`form-preview-title-heading ${mode === "light" ? "form-preview-title-heading-light" : "form-preview-title-heading-dark"}`}>
              {formData?.title}
            </h2>
          </div>

          <div className="form-preview-section-container">
            {
              formData?.formdata?.map(sec => (
                <div key={sec?.id} className={`form-preview-section ${mode === "light" ? "form-preview-section-light" : "form-preview-section-dark"}`} style={{width: sec?.sectionWidth, textAlign: sec?.sectionAlign}}>
                  <div className="form-preview-section-heading">
                    { sec?.isShowTitle && ( <h4 className={`form-preview-section-heading-title ${mode === "light" ? "form-preview-section-heading-title-light" : "form-preview-section-heading-title-dark"}`}> {sec?.title} </h4> )}
                    { sec?.isShowDescription && <h6>{sec?.description}</h6> }
                  </div>

                  <div className="form-preview-section-wrapper">
                    {
                      sec?.fields?.map(field => (
                        <div key={field?.id} style={{width: field?.fieldWidth, textAlign: field?.fieldAlign}} className={`form-preview-section-field-wrapper ${mode === "light" ? "form-preview-section-field-wrapper-light" : "form-preview-section-field-wrapper-dark"}`}>
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
      </div>
    </div>
  );
};

export default FormPreview;