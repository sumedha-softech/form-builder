// src/api/templateApi.js

const API_BASE_URL = '/api/template';

export const fetchTemplates = async () => {
    const response = await fetch(API_BASE_URL);
    return await response.json();
};

export const fetchTemplateById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Error fetching template with id ${id}| Response: ${response}`);
    }
    return await response.json();
};
