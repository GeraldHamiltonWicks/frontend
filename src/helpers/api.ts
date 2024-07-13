import { Template } from "./types";

const API_URL = process.env.REACT_APP_API_URL

/**
 * Fetches templates from the API.
 * 
 * @returns A promise that resolves to an array of Template objects.
 */
export async function getTemplates(): Promise<Array<Template>> {
    try {
        const response = await fetch(`${API_URL}/templates`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}