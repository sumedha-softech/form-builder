import { useContext, useEffect, useState } from "react";
import { Eye, Moon, Pencil, Sun } from "lucide-react";
import { FbDataContext } from "../context/FbContext";
import FormPreview from "./FormPreview";
import CopyBtn from "./CopyBtn";

const Navbar = () => {
  
  const {setFormTitle, setFormData, formFields, formTitle, formData, setMode, mode} = useContext(FbDataContext);

  const [showPreview, setShowPreview] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [copyMode, setCopyMode] = useState('html');

  useEffect(() => {
    setFormData({ 
      id: Date.now(), 
      title: formTitle, 
      formdata: formFields 
    });
  }, [formFields, formTitle]);

  // function to render copy section/fields
  const copyRenderField = (field) => {
    if (field?.type==="textarea") {
      return `
        <div style={{textAlign: '${field?.fieldAlign}'}}>

          ${field?.isShowLabel && `<label>${field?.label}</label>`}
        
          <textarea rows={3} readOnly={${field?.isReadonly}} placeholder='${field?.placeholder} 'maxLength={${field?.limit ? 20 : "any"}} required={${field?.isFieldRequired}} disabled={${field?.isFieldDisabled}} />
        </div>
      `;
    } else if (field?.type==="select") {
      return `
        <div style={{textAlign: '${field?.fieldAlign}'}}>
          
          ${field?.isShowLabel && `<label>${field?.label}</label>`}

          <select defaultValue="" disabled={${field?.isFieldDisabled}}>
            <option disabled>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
      `;
    } else if (field?.type==="radio") {
      return `
        <div style={{textAlign: '${field?.fieldAlign}'}}>
          
          ${field?.isShowLabel && `<label>${field?.label}</label>`}

          <div>
            <input type="radio" required={${field?.isFieldRequired}} maxLength={${field?.limit ? 20 : "any"}} disabled={${field?.isFieldDisabled}} />
            <label>Radio Option</label>
          </div>
        </div>
      `;
    } else if (field?.type==="checkbox") {
      return `
        <div style={{textAlign: '${field?.fieldAlign}'}}>

          ${field?.isShowLabel && `<label>${field?.label}</label>`}

          <div>
            <input type="checkbox" disabled={${field?.isFieldDisabled}} />
            <label> Checkbox </label>
          </div>
        </div>
      `;
    } else if (field?.type==="range") {
      return `
        <div style={{textAlign: ${field?.fieldAlign}}}>
          
          ${field?.isShowLabel && `<label>${field?.label}</label>`}

          <input type="range" readOnly={${field?.isReadonly}} placeholder='${field?.placeholder}' required={${field?.isFieldRequired}} disabled={${field?.isFieldDisabled}} min={${field?.rangeCheck ? 1 : "any"}} max={${field?.rangeCheck ? 10 : "any"}} />
        </div>
      `;
    } else {
      return `
        <div style={{textAlign: ${field?.fieldAlign}}}>

          ${field?.isShowLabel && `<label>${field?.label}</label>`}

          <input type="${field?.type}" readOnly={${field?.isReadonly}} placeholder='${field?.placeholder}' required={${field?.isFieldRequired}} maxLength={${field?.limit ? 20 : "any"}} disabled={${field?.isFieldDisabled}} />
        </div>
      `;
    }
  };

  // function to get copy of form html
  const copyFormHtml = () => {
    return `
      <div>
        <div>
          <h2>${formData?.title}</h2>
        </div>

        <div>
          ${
            formData?.formdata?.map(sec =>
              `<div 
                style={{
                  width:'${sec?.sectionWidth}', 
                  textAlign:'${sec?.sectionAlign}'
                }}
              >
                <div>
                  ${ 
                    sec?.isShowTitle 
                    && 
                    `<h4>
                      ${sec?.title}
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
                      `<div 
                        style={{
                          width:'${field?.fieldWidth}', 
                          textAlign:'${field?.fieldAlign}'
                        }}
                      >                                             
                        ${copyRenderField(field)}
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

  // function to get copy of form json
  const copyFormJson = () => {
    return {
      "title": formData?.title,
      "sections": formData?.formdata?.map((sec) => {
        return {
          "title": sec?.title,
          "description": sec?.description,
          "fields": sec?.fields?.map((field) => {
            return {
              "type": field?.type,
              "label": field?.label,
              "value": field?.value,
              "error": field?.error,
              "limit": field?.limit,
              "align": field?.fieldAlign,
              "width": field?.fieldWidth,
              "checkUrl": field?.urlCheck,
              "readOnly": field?.isReadonly,
              "showLabel": field?.isShowLabel,
              "checkEmail": field?.emailCheck,
              "checkRange": field?.rangeCheck,             
              "placeholder": field?.placeholder,
              "required": field?.isFieldRequired,
              "disabled": field?.isFieldDisabled,
              "checkPassword": field?.passwordCheck,
              "checkPastDate": field?.checkForPastDate,
              "isUsernameEmpty": field?.isUsernameEmpty,
              "checkPhoneNumber": field?.phoneNumberCheck,
              "checkFutureDate": field?.checkForFutureDate,
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

  return (
    <div className={`nav ${mode === "light" ? "nav-light" : "nav-dark"}`}>
      
      {/* preview form popup */}
      { showPreview && <FormPreview setShowPreview={setShowPreview}/> }

      <div className="nav-left">
        <img width={30} height={30} src="/src/assets/images/formbuilder.svg"/>
        <span className={`nav-left-heading ${mode === "light" ? "nav-left-heading-light" : "nav-left-heading-dark"}`}> Form/ </span>
        <div className="form-title-wrapper">
          {
            editTitle
            ?
            <form onSubmit={()=>setEditTitle(false)}>
              <input autoFocus type="text" maxLength={100} value={formTitle} onChange={e => setFormTitle(e.target.value)} className={`form-title-edit-input ${mode === "light" ? "form-title-edit-input-light" : "form-title-edit-input-dark"}`}/>
            </form>
            :
            <span className={`form-title ${mode === "light" ? "form-title-light" : "form-title-dark"}`}> 
              {formTitle} 
            </span>
          }
          {
            !editTitle
            &&
            <button disabled={editTitle} className="form-title-edit-btn" onClick={() => setEditTitle(true)}>
              <Pencil className={`form-title-edit-btn-icon ${mode === "light" ? "form-title-edit-btn-icon-light" : "form-title-edit-btn-icon-dark"}`}/>
            </button>
          }
        </div>
      </div>

      <div className="nav-right">

        {/* preview-btn */}
        <button onClick={() => setShowPreview(true)} className={`nav-right-btn ${mode==="light" ? "nav-btn-light" : "nav-btn-dark"}`}>
          <Eye size={16}/> Preview
        </button>

        {/* copy-btn */}
        <CopyBtn copyMode={copyMode} setCopyMode={setCopyMode} handleFormCopy={handleFormCopy}/>

        {/* publish-btn */}
        <button className={`nav-right-btn ${mode==="light" ? "nav-btn-light" : "nav-btn-dark"}`} disabled> Publish </button>

        {/* theme-btn */}
        {
          mode==="light"
          ?
          <button onClick={()=>setMode("dark")} className="mode-btn mode-btn-light">
            <Sun size={20}/>
          </button>
          :
          <button onClick={()=>setMode("light")} className="mode-btn mode-btn-dark">
            <Moon size={20}/>
          </button>
        }
      </div>
    </div>
  );
};

export default Navbar;