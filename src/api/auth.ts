import { AuthResponse, LoginResponse, RegisterResponse, User } from "../types/auth";
import api from "./axios";

// Register
export const registerUser = async (userData: RegisterResponse):
 Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", userData);
  return data;
}

// Login
export const loginUser = async (credentials: LoginResponse):
  Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", credentials);
  return data;
}

// Get current userData
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/me");
  return data;
}