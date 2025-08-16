const BASE_URL = '/api/dynamicForm';

export const fetchForms = async () => {
    const response = await fetch(BASE_URL);
    return await response.json();
}

export const fetchFormById = async (formId) => {
    const response = await fetch(`${BASE_URL}/${formId}`);
    return await response.json();
}

export const saveForm = async (formData) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    return await response.json();
}

export const updateForm = async (id, formData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    return await response.json();
}

export const DeleteForm = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'Delete'
    });
    return await response.json();
}