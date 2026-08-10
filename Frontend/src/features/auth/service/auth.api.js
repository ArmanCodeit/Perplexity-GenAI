import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});


export async function registerUser({username, email, password}) {
  try {
    const response = await api.post("/api/auth/register", {
        username, 
        email, 
        password 
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}


export async function loginUser({email, password}) {
  try {
    const response = await api.post("/api/auth/login", {
        email, 
        password 
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}


export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}