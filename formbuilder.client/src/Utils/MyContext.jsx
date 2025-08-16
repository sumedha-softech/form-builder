import { createContext, useState } from 'react';
import { fetchForms } from '../Api/formApi';
import { fetchTemplates } from '../Api/templateApi';

export const AppContext = createContext();

export const MyContext = ({ children }) => {
    const [templates, setTemplates] = useState([]);
    const [forms, setForms] = useState([]);

    const getForms = async () => {
        const formsRes = await fetchForms();
        if (formsRes.isSuccess) {
            setForms(formsRes.data);
        } else {
            console.error("Failed to fetch forms:", formsRes.message);
        }
    }

    const getTemplates = async () => {
        const templatesRes = await fetchTemplates();
        if (templatesRes.isSuccess) {
            setTemplates(templatesRes.data);
        } else {
            console.error("Failed to fetch templates:", templatesRes.message);
        }
    }

    return (
        <AppContext.Provider value={{ templates, setTemplates, forms, setForms, getTemplates, getForms }}> 
            {children}
        </AppContext.Provider>
    )
}
