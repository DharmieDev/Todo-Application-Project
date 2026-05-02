import { useQuery } from "@tanstack/react-query"
import { fetchTasks, FetchTasksParams, FetchTasksResponse } from "../api/tasks"


export const useTasks = ({
  page, search, status
}: Pick<FetchTasksParams, "page" | "search" | "status">) => {
  const token = localStorage.getItem("token")
  
  return useQuery<FetchTasksResponse>({
    queryKey: ["tasks", { page, search, status }],
    queryFn: () => fetchTasks({
      page, search, status, limit: 10
    }),
    enabled: Boolean(token),
    placeholderData: (prev) => prev,
  })
};
