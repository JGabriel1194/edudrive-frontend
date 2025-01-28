import { API_URL } from '../config/config';
import { httpRequest } from './httpRequest';

/**
 * Función para iniciar sesión
 * @param identifier - puede ser un nombre de usuario o un correo electrónico
 * @param password - contraseña del usuario
 * @returns Promise con la respuesta del servidor
 * @throws Error si hay un error en la petición
 * */

export const login = async (identifier: string, password: string) => {
    try {
        const url = `${API_URL}/auth/local`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ identifier, password })
        };
        const data = await httpRequest(url, options);
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
    }
}