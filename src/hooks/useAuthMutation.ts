import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe, loginUser, registerUser } from "../api/auth";
import { AuthResponse, LoginResponse, RegisterResponse, User } from "../types/auth";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../types/Task";

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token")
  
  // Register
  const registerMutation = useMutation<AuthResponse,
    AxiosError<ApiErrorResponse>,
    RegisterResponse>({
    mutationFn: registerUser,
  })
  
  const loginMutation = useMutation<AuthResponse, Error, LoginResponse>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      queryClient.setQueryData<User>(["me"], data.user);
    }
  })

  const meQuery = useQuery<User, Error>({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: Boolean(token),
    retry: false,
  })
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    queryClient.removeQueries({ queryKey: ["me"] });
  };
  
  return {
    registerMutation,
    loginMutation,
    meQuery,
    logout
  }
}