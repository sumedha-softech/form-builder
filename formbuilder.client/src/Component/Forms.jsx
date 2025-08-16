import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../Utils/MyContext';
import { DeleteForm } from '../Api/formApi';
import FormsTemplates from './FormsTemplates';

const Forms = () => {
    const { forms, getForms } = React.useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await getForms();
            setIsLoading(false);
        })();
    }, [])

    const handleDeleteForm = async (id) => {
        var res = await DeleteForm(id);
        if (!res.isSuccess) {
            console.error("error while deleting form. ", res)
            return;
        }

        await getForms();
    }

    return (
        <div className="container-fluid p-4 border">
            <h4 className="mb-5 border p-4 text-bold text-center" style={{ boxShadow: "10px 10px gray", backgroundColor:"darkgray"}}>Form Builder Project</h4>

            {/* Templates */}
            <FormsTemplates />

            {/* Forms List */}
            <div style={{ textAlign: "center" }}>
                <h5 className="my-3">📋 Available Forms</h5>
                <div className="d-flex flex-column gap-2 " style={{ maxHeight: '500px', overflowY: 'auto', maxWidth: "900px", margin: "auto" }}>

                    {
                        isLoading
                            ? <p style={{ textAlign: "center", fontSize: "20px" }}>Loading...</p>
                            : forms && forms.length > 0
                                ? forms.map((form, i) => (
                                    <div key={i} className="position-relative form-box border p-3 rounded">
                                        <button type="button" className="btn position-absolute top-0 end-0 delete-form-btn d-none mt-2" onClick={() => handleDeleteForm(form.id)}> <i className="bi bi-trash"></i></button>
                                        <Link to={`/formbuilder/${form.id}/${false}`}> {form.name}</Link>
                                    </div>
                                ))
                                : <p style={{ textAlign: "center", fontSize: "20px" }}>Records not found!!</p>
                    }

                </div>
            </div>
        </div>
    );
};

export default Forms;
