import { useQuery } from "@tanstack/react-query"
import { fetchTasks } from "../api/tasks"

export const useTasks = (page, search, status) => {
  useQuery({
    queryKey: ["tasks", page, search, status],
    queryFn: () => fetchTasks({ page, search, status }),
    keepPreviousData: true,
  })
}