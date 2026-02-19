import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe, loginUser, registerUser } from "../api/auth";

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  
  // Register
  const registerMutation = useMutation({
    mutationFn: registerUser,
  })
  
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSettled: (data) => {
      localStorage.setItem("token", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  })
  
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!localStorage.getItem("token"),
    retry: false,
  })
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    queryClient.clear();
  };
  
  return {
    registerMutation,
    loginMutation,
    meQuery,
    logout
  }
}