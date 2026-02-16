import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";


export const useTask = (id) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["todos", "single", id],
    queryFn: async () => {
      // 1️⃣ Try to find the todo in cache 
      const allPages = queryClient.getQueriesData({ queryKey: ["todos"] });
      for (const [, pageData] of allPages) {
        const found = pageData?.todos?.find((todo) => todo.id === Number(id));
        if (found) return found;
      }

      // 2️⃣ Otherwise fetch from API
      const response = await fetchTasks({ page: 1, search: "", status: "all" });
      const todoFromApi = response.todos.find((t) => t.id === Number(id));

      if (!todoFromApi) throw new Error("Todo not found");
      return todoFromApi;
    },
    enabled: !!id,
  });
};
