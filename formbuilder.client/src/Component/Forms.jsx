import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Utils/MyContext";
import { DeleteForm } from "../Api/formApi";

const Forms = () => {
    const { forms, getForms, templates, getTemplates } = React.useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await getForms();
            setIsLoading(false);

            await getTemplates();
        })();
    }, []);

    const handleDeleteForm = async (id) => {
        var res = await DeleteForm(id);
        if (!res.isSuccess) {
            console.error("error while deleting form. ", res);
            return;
        }
        await getForms();
    };

    return (
        <div className="container-xl p-1">
            <h4 className="display-4 fw-normal text-center text-body-emphasis">
                Form Builder
            </h4>
            <div className="d-flex flex-wrap gap-3 my-3" >
                <Link to={`/builder/form`} className="btn btn-lg btn-primary"><i className="bi bi-plus-lg"></i></Link>

                {/* Templates */}
                {
                    templates && templates.map((temp, i) => (
                        <Link key={i} to={`/builder/form/${temp.id}/${true}`} className="btn btn-lg btn-primary">{temp.name}</Link>
                    ))
                }
            </div>

            {/* Forms List */}
            <div className="text-center">
                <h5 className="my-3">📋 Available Forms</h5>
                <div className="d-flex flex-column gap-2">
                    {isLoading ?
                        (<p className="text-center fs-4 text-black">Loading...</p>)
                        : forms && forms.length > 0 ?
                            (forms.map((form, i) => (
                                <div
                                    key={i}
                                    className="position-relative border p-3 rounded form-box"
                                >
                                    <button
                                        type="button"
                                        className="btn position-absolute top-0 end-0 mt-2 d-none delete-form-btn"
                                        onClick={() => handleDeleteForm(form.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <Link to={`/builder/form/${form.id}/${false}`}>
                                        {form.name}
                                    </Link>
                                </div>
                            )))
                            : (<p className="text-center fs-6 text-black-50"> Records not found!! </p>)}
                </div>
            </div>
        </div>
    );
};

export default Forms;
