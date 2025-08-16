import { useContext, useEffect } from "react";
import { AppContext } from '../Utils/MyContext';
import { Link } from 'react-router-dom';

const FormBuilderTempletes = () => {
    const { getTemplates, templates } = useContext(AppContext);

    useEffect(() => {
        (async () => {
            await getTemplates();
        })();
    }, [])

    return (
        <div className="col-12 col-md-3 col-lg-2 border-end mb-3">
            <h5 className="fw-bold fs-4">Form Builder</h5>
            <div className="d-flex flex-column gap-2 mt-5" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                <Link to={`/`} className="mb-3" style={{ textDecoration: 'none' }}> <i className="bi bi-arrow-left"></i> Back</Link>
                <div key={0} className="p-2 text-center mb-2" style={{ fontSize: "20px", fontWeight: "bolder" }}>
                Templates
                </div>
                {templates &&
                    templates.map((value) => (
                        <div key={value.id} className="border p-2 text-center formbuilder-templete-box rounded">
                            <Link to={`/formbuilder/${value.id}/isTemplate=${true}`}> {value.name}</Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}
export default FormBuilderTempletes;