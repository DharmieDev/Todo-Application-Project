import { useQuery } from "@tanstack/react-query"
import { fetchTasks } from "../api/tasks"


export const useTasks = (page, search, status) => {
  return useQuery({
    queryKey: ["tasks", page, search, status],
    queryFn: () => fetchTasks({
      page, search, status, limit: 10
    }),
    enabled: !!localStorage.getItem("token"),
    keepPreviousData: true,
  })
}
