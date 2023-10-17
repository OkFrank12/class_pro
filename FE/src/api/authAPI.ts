import axios from "axios";

const apiUrl: string = `http://localhost:1000`;

export const registerAPI = async (data: any) => {
  try {
    return await axios.post(`${apiUrl}/api/register`, data).then((res: any) => {
      return res.data.data;
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const verifiedAPI = async (id: string) => {
  try {
    return await axios.get(`${apiUrl}/api/${id}/verify`).then((res: any) => {
      return res.data.data;
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const signInAPI = async (data: any) => {
  try {
    return await axios.post(`${apiUrl}/api/sign-in`, data).then((res: any) => {
      return res.data.data;
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const readOne = async (id: string) => {
  try {
    return await axios.get(`${apiUrl}/api/${id}/one`).then((res: any) => {
      return res.data.data;
    });
  } catch (error: any) {
    console.log(error);
  }
};
