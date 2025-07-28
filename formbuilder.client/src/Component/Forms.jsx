import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchForms } from '../Api/formApi';

const Forms = () => {
    const [templates, setTemplates] = useState([]);


    useEffect(() => {
        (async () => {
            var res = await fetchForms(true);
            if (res.isSuccess) {
                var updated = res.data.map((value) => {
                    return { id: value.formId, name: value.formName }
                });
                setTemplates(updated);
            } else {
                alert(res.message);
            }
        })();
    }, [])

    return (
        <div className="container-fluid p-4 border">
            <h4>Form Builder Project</h4>

            {/* Templates */}
            <div className="d-flex flex-wrap gap-3 my-3 border-bottom pb-3">
                {templates && templates.map((temp, i) => (
                    <div key={i} className="template-box border p-3" style={{ width: '120px', height: '100px' }}>
                        <a href="/formbuilder">{temp.name}</a>
                    </div>
                ))
                }
            </div>

            {/* Forms List */}
            <h5 className="my-3">List of Forms</h5>
            <div className="d-flex flex-column gap-2" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="form-box border p-3">
                        Form {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forms;
