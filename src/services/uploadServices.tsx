import { API_URL } from "../config/config";
import { httpRequest } from "./httpRequest";

export const getFiles = async () => {};

export const uploadFile = async (files: File) => {
  const formData = new FormData();
  formData.append("files", files);

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No teken found");
    const url = `${API_URL}/upload`;
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    };
    return await httpRequest(url, options);
  } catch (error) {}
};
