import { API_URL } from "../config/config";
import { httpRequest } from "./httpRequest";

/**
 * 
 * @param params - parámetros de búsqueda
 * @returns 
 * @throws Error si hay un error en la petición
 * @example getUsers('?_limit=10&_page=1')
 */
export const getUsers = async (params: string = '') => {
    try {
        const token = localStorage.getItem("token");
        if(!token) throw new Error('No token found');
        const url = `${API_URL}/users ${params ? `?${params}` : ''}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        return await httpRequest(url, options);
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

/**
 * 
 * @param id - id del usuario
 * @param params - parámetros de búsqueda
 * @returns 
 * @throws Error si hay un error en la petición
 * @example getUserById(1, '_limit=10&_page=1')
 */
export const getUserById = async (id: number, params: string = '') => {
    try {
        const token = localStorage.getItem("token");
        if(!token) throw new Error('No token found');
        const url = `${API_URL}/users/${id}${params ? `?${params}` : ''}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        return await httpRequest(url, options);
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
}