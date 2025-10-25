import { ArrowDownUp, ArrowLeft, Copy, Eye, Moon, Pencil, Sun } from "lucide-react";
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
  const [copyMode, setCopyMode] = useState('html');

  useEffect(() => {
    setFormData({ id: Date.now(), title: formTitle, formdata: formFields });
  }, [formFields, formTitle]);

  // function to render copy section/fields
  const copyRenderField = (field) => {
    switch (field?.type) {
      case "text":
        return `
          <div style={{textAlign: ${field?.fieldAlign}}}>
            ${
              field?.isShowLabel 
              && 
              `<label>
                ${field?.label}
              </label>`
            }
            <input 
              type="text" 
              placeholder='${field?.placeholder}' 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
      case "email":
        return `
          <div style={{textAlign: ${field?.fieldAlign}}}>
            ${
              field?.isShowLabel 
              && 
              `<label>
                ${field?.label}
              </label>`
            }
            <input 
              type="email" 
              placeholder='${field?.placeholder}' 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
      case "phone":
        return `
          <div style={{textAlign: ${field?.fieldAlign}}}>
            ${
              field?.isShowLabel 
              && 
              `<label>
                ${field?.label}
              </label>`
            }
            <input 
              type="number" 
              placeholder='${field?.placeholder}' 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
      case "number":
        return `
          <div style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label>
                ${field?.label}
              </label>`
            }
            <input 
              type="number" 
              placeholder='${field?.placeholder}' 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
      case "textarea":
        return `
          <div style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label>
                ${field?.label}
              </label>`
            }
            <textarea 
              placeholder='${field?.placeholder}' 
              readOnly={${field?.isReadonly}} 
              rows={3}
            />
          </div>`;
      case "checkbox":
        return `
          <div style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label>
                ${field?.label}
              </label>`
            }
            <div>
              <input 
                type="checkbox" 
              />
              <label>
                Checkbox
              </label>
            </div>
          </div>`;
      case "radio":
        return `
          <div style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label>
                ${field?.label}
              </label>`
            }
            <div>
              <input 
                type="radio" 
              />
              <label>
                Radio Option
              </label>
            </div>
          </div>`;
      case "select":
        return `
          <div style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label>
                ${field?.label}
              </label>`
            }
            <select defaultValue="">
              <option value="" disabled>Select an option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>`;
      default:
        return `
          <div style={{textAlign: '${field?.fieldAlign}'}}>
            ${
              field?.isShowLabel 
              && 
              `<label>
                ${field?.label}
              </label>`
            }
            <input 
              type="text" 
              placeholder='${field?.placeholder}' 
              readOnly={${field?.isReadonly}}
            />
          </div>`;
    }
  };

  const copyFormHtml = () => {
    return `
      <div>
        <div>
          <h2>
            ${formData?.title}
          </h2>
        </div>

        <div>
          ${
            formData?.formdata?.map(sec =>
              `<div 
                style={{width: '${sec?.sectionWidth}', textAlign: '${sec?.sectionAlign}'}}
              >
                <div>
                  ${
                    sec?.isShowTitle 
                    &&
                    `<h4>
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

                <div>
                  ${
                    sec?.fields?.map(field =>
                      `<div style={{width: '${field?.fieldWidth}', textAlign: '${field?.fieldAlign}'}}>                                             
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

  const copyFormJson = () => {
    return {
      "formTitle": formData?.title,
      "formData": formData?.formdata?.map((sec) => {
        return {
          "sectionTitle": sec?.title,
          "sectionDesc": sec?.description,
          "sectionFields": sec?.fields?.map((field) => {
            return {
              "fieldLabel": field?.label,
              "fieldType": field?.type,
              "fieldAlign": field?.fieldAlign,
              "isFieldLabelShow": field?.isShowLabel,
              "fieldPlaceholder": field?.placeholder,
              "isFieldReadOnly": field?.isReadonly
            }
          })
        }
      })
    }
  }

  // function to handle form copy
  const handleFormCopy = () => {
    if (formData?.formdata?.length<1) return;

    if (copyMode === 'html') {
      const copyHtml = copyFormHtml();
      navigator.clipboard.writeText(copyHtml);
      alert("form HTML copied to clipboard!!");
      return;
    }else if (copyMode === 'json') {
      const copyJson = copyFormJson();
      const jsonString = JSON.stringify(copyJson, null, 2);
      navigator.clipboard.writeText(jsonString);
      alert("form JSON copied to clipboard!!");
      return;
    }else {
      return;
    }
  };

  const changeCopyMode = () => {
    setCopyMode((prev) => {
      if (prev==='html') {
        return 'json';
      }
      return 'html';
    })
  }

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
                  maxLength={100} 
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

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {
            copyMode === 'html'
            ?
            (<button 
              className={`nav-right-btn ${mode==="light"?"nav-btn-light":"nav-btn-dark"}`} 
              onClick={handleFormCopy}
            >
              <Copy size={16} /> Copy HTML
            </button>)
            :
            (<button 
              className={`nav-right-btn ${mode==="light"?"nav-btn-light":"nav-btn-dark"}`} 
              onClick={handleFormCopy}
            >
              <Copy size={16} /> Copy JSON
            </button>)
          }
          <button style={{ display: "flex", alignItems: "center" }} onClick={changeCopyMode}>
            <div className="tooltip">
              <ArrowDownUp color={mode==='light' ? "black" : "white"} size={18} />
              <span className="tooltiptext">
                switch to {copyMode==='html' ? 'json' : 'html'}
              </span>
            </div>
          </button>
        </div>

        <button 
          disabled
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