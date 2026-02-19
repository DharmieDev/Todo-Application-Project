import api from "./axios";

// Register
export const registerUser = async (userData) => {
  console.log(userData);
  const { data } = await api.post("/auth/register", userData);
  console.log(data);
  return data;
}

// Login
export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

// Get current userData
export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
}