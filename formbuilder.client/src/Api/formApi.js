
const BASE_URL = '/api/Form';

export const fetchForms = async (isRequestForTemplates = false) => {
    const response = await fetch(`${BASE_URL}/${isRequestForTemplates}`);
    return await response.json();
}

export const fetchFormById = async (formId) => {
    const response = await fetch(`${BASE_URL}/${formId}`);
    return await response.json();
}
export const saveForm = async (formData) => {
    const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    return await response.json();
}