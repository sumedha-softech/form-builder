import { ArrowLeft, Copy, Eye, Moon, Pencil, Sun } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { FbDataContext } from "../context/FbContext";
import FormPreview from "./FormPreview";

const Navbar = () => {
  const { 
    setFormTitle, 
    setFormData, 
    formFields, 
    formTitle, 
    formData, 
    setMode, 
    mode
  } = useContext(FbDataContext);
  const [editTitle, setEditTitle] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setFormData({ id: Date.now(), title: formTitle, formdata: formFields });
  }, [formFields, formTitle]);

  // function to render copy section/fields
  const copyRenderField = (field) => {
    switch (field?.type) {
      case "text":
        return `
          <div className="form-field-wrapper" style={{textAlign: ${field?.fieldAlign}}}>
            ${
              field?.isShowLabel 
              && 
              `<label className="form-field-label">
                ${field?.label}
              </label>`
            }
            <input 
              type="text" 
              placeholder='${field?.placeholder}' 
              className="form-field-input" 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
      case "email":
        return `
          <div className="form-field-wrapper" style={{textAlign: ${field?.fieldAlign}}}>
            ${
              field?.isShowLabel 
              && 
              `<label className="form-field-label">
                ${field?.label}
              </label>`
            }
            <input 
              type="email" 
              placeholder='${field?.placeholder}' 
              className="form-field-input" 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
      case "phone":
        return `
          <div className="form-field-wrapper" style={{textAlign: ${field?.fieldAlign}}}>
            ${
              field?.isShowLabel 
              && 
              `<label className="form-field-label">
                ${field?.label}
              </label>`
            }
            <input 
              type="number" 
              placeholder='${field?.placeholder}' 
              className="form-field-input" 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
      case "number":
        return `
          <div className="form-field-wrapper" style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label className="form-field-label">
                ${field?.label}
              </label>`
            }
            <input 
              type="number" 
              placeholder='${field?.placeholder}' 
              className="form-field-input" 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
      case "textarea":
        return `
          <div className="form-field-wrapper" style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label className="form-field-label">
                ${field?.label}
              </label>`
            }
            <textarea 
              placeholder='${field?.placeholder}' 
              className="form-field-input" 
              readOnly={${field?.isReadonly}} 
              rows={3}
            />
          </div>`;
      case "checkbox":
        return `
          <div className="form-field-wrapper" style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label className="form-field-label">
                ${field?.label}
              </label>`
            }
            <div className="form-field-checkbox-wrapper">
              <input 
                type="checkbox" 
                className="form-field-checkbox" 
              />
              <label className="form-field-checkbox-label">
                Checkbox
              </label>
            </div>
          </div>`;
      case "radio":
        return `
          <div className="form-field-wrapper" style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label className="form-field-label">
                ${field?.label}
              </label>`
            }
            <div className="form-field-radio-wrapper">
              <input 
                type="radio" 
                className="form-field-radio" 
              />
              <label className="form-field-radio-label">
                Radio Option
              </label>
            </div>
          </div>`;
      case "select":
        return `
          <div className="form-field-wrapper" style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label className="form-field-label">
                ${field?.label}
              </label>`
            }
            <select className="form-field-input" defaultValue="">
              <option value="" disabled>Select an option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>`;
      default:
        return `
          <div className="form-field-wrapper" style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label className="form-field-label">
                ${field?.label}
              </label>`
            }
            <input 
              type="text" 
              placeholder='${field?.placeholder}' 
              className="form-field-default-input" 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
    }
  };

  const copyFormText = () => {
    return `
      <div className="form-preview ${mode === "light" ? "form-preview-light" : "form-preview-dark"}">

        <div className="form-preview-title">
          <h2 className="form-preview-title-heading ${mode === "light" ? "form-preview-title-heading-light" : "form-preview-title-heading-dark"}">
            ${formData?.title}
          </h2>
        </div>

        <div className="form-preview-section-container">
          ${
            formData?.formdata?.map(sec =>
              `<div 
                key={${sec?.id}} 
                className="form-preview-section ${mode === "light" ? "form-preview-section-light" : "form-preview-section-dark"}" 
                style={{width: '${sec?.sectionWidth}', textAlign: '${sec?.sectionAlign}'}}
              >
                <div className="form-preview-section-heading">
                  ${
                    sec?.isShowTitle 
                    &&
                    `<h4 className="form-preview-section-heading-title ${mode === "light" ? "form-preview-section-heading-title-light" : "form-preview-section-heading-title-dark"}"
                    >
                      ${ sec?.title }
                    </h4>`
                  }
                  ${
                    sec?.isShowDescription 
                    && 
                    `<h6>
                      ${sec?.description}
                    </h6>`
                  }
                </div>

                <div className="form-preview-section-wrapper">
                  ${
                    sec?.fields?.map(field =>
                      `<div key={${field?.id}} style={{width: '${field?.fieldWidth}', textAlign: '${field?.fieldAlign}'}} className="form-preview-section-field-wrapper ${mode === "light" ? "form-preview-section-field-wrapper-light" : "form-preview-section-field-wrapper-dark"}"
                      >                                             
                        ${ copyRenderField(field) }
                      </div>`
                    )
                  }
                </div>
              </div>`
            )
          }
        </div>
      </div>
    `;
  };

  // function to handle form copy
  const handleFormCopy = () => {
    if (formData?.formdata?.length<1) return;
    const copyText = copyFormText();
    navigator.clipboard.writeText(copyText);
    alert("form copied to clipboard!!");
    return;
  };

  return (
    <div className={`navbar ${mode === "light" ? "navbar-light" : "navbar-dark"}`}>
      
      {/* preview form popup */}
      { 
        showPreview 
        && 
        <FormPreview setShowPreview={setShowPreview} /> 
      }

      <div className="nav-left">
        <ArrowLeft 
          size={25} 
          color={mode === "light" ? "black" : "white"} 
        />
        
        <span className={`nav-left-heading ${mode === "light" ? "nav-left-heading-light" : "nav-left-heading-dark"}`}>
          Form/
        </span>
        
        <div className="form-title-wrapper">
          {
            editTitle
            ?
            (
              <form onSubmit={() => setEditTitle(false)}>
                <input 
                  type="text" 
                  autoFocus 
                  value={formTitle} 
                  onChange={e => setFormTitle(e.target.value)} 
                  className={`form-title-edit-input ${mode === "light" ? "form-title-edit-input-light" : "form-title-edit-input-dark"}`}
                />
              </form>
            )
            :
            (
              <span className={`form-title ${mode === "light" ? "form-title-light" : "form-title-dark"}`}>
                { formTitle }
              </span>
            )
          }

          {
            !editTitle
            &&
            (
              <button 
                onClick={() => setEditTitle(true)} 
                className="form-title-edit-btn" 
                disabled={editTitle}
              >
                <Pencil className={`form-title-edit-btn-icon ${mode === "light" ? "form-title-edit-btn-icon-light" : "form-title-edit-btn-icon-dark"}`}/>
              </button>
            )
          }
        </div>
      </div>

      <div className="nav-right">

        <button 
          className={`nav-right-btn ${mode==="light"?"nav-btn-light":"nav-btn-dark"}`} 
          onClick={() => setShowPreview(true)}
        >
          <Eye size={16} /> Preview
        </button>

        <button 
          className={`nav-right-btn ${mode==="light"?"nav-btn-light":"nav-btn-dark"}`} 
          onClick={handleFormCopy}
        >
          <Copy size={16} /> Copy
        </button>

        <button 
          className={`nav-right-btn ${mode==="light"?"nav-btn-light":"nav-btn-dark"}`}
        >
          Publish
        </button>

        {
          mode === "light"
          ?
          (
            <button 
              onClick={() => setMode("dark")} 
              className="mode-btn mode-btn-light"
            >
              <Sun size={20} />
            </button>
          )
          :
          (
            <button 
              onClick={() => setMode("light")} 
              className="mode-btn mode-btn-dark"
            >
              <Moon size={20} />
            </button>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;