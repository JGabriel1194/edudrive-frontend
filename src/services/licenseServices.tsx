import { API_URL } from "../config/config";
import { newLicenseInterface } from "../interfaces/LicenseInterface";
import { httpRequest, optionsRequest } from "./httpRequest";

/**
 *
 * @param params - parámetros de búsqueda
 * @returns
 * @throws Error si hay un error en la petición
 * @example getLiceses('?_limit=10&_page=1')
 */
export const getLiceses = async (params: string = "") => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const url = `${API_URL}/lisenses${params ? `?${params}` : ""}`;
    const options: optionsRequest = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    return await httpRequest(url, options);
  } catch (error) {
    console.error("Error getting licenses:", error);
    return null;
  }
};

export const postLicense = async (license: newLicenseInterface) => {
  try {
    const url = `${API_URL}/lisenses`;
    const token = localStorage.getItem("token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({data:license}),
    };
    console.log('options',options)
    return await httpRequest(url, options);
  } catch (error) {
    console.log("Error", error);
  }
};

export const updateLicense = async (
  id: number,
  licesnse: newLicenseInterface,
) => {
  const url = `${API_URL}/lisemses/${id}`;
  try {
    const token = localStorage.getItem("token");

    const options: optionsRequest = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(licesnse)
    };

    return await httpRequest(url,options)
  } catch (error) {}
};
