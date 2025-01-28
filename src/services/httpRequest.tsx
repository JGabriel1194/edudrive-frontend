export interface optionsRequest {
  method: string;
  headers: {};
  body?: string;
}

export const httpRequest = async (url: string, options: optionsRequest) => {
  try {
    const response = await fetch(url, options); 
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error("HTTP error response:", data);
      throw new Error(data.message || "HTTP error");
    }
  } catch (error) {
    console.error("Error in httpRequest:", error);
    throw error;
  }
};
