import { useContext, useEffect } from "react";
import { AppContext } from '../Utils/MyContext';
import { Link } from 'react-router-dom';

const FormsTemplates = () => {
    const { templates, getTemplates } = useContext(AppContext);

    useEffect(() => {
        (async () => {
            await getTemplates();
        })();
    }, [])

    return (
        <>
            <div className="d-flex flex-wrap gap-3 my-3 border-bottom pb-3" >
                <div key={0} className="template-box border p-3">
                    <Link to={`/formbuilder`}><i className="bi bi-plus-lg"></i></Link>
                </div>
                {
                    templates && templates.map((temp, i) => (
                        <div key={i} className="template-box border rounded">
                            <Link to={`/formbuilder/${temp.id}/${true}`}>{temp.name}</Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
};

export default FormsTemplates;