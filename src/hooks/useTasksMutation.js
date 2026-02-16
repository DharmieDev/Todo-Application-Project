import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addTask, deleteTask, updateTask } from "../api/tasks";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();
  
  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: (newTask) => {
      queryClient.setQueriesData(
        { queryKey: ["todos"] },
        oldData => {
          if (!oldData?.todos) return oldData;
          const newTodoId = {
            ...newTask,
            id: crypto.randomUUID()

          }
          return {
            ...oldData,
            todos: [newTodoId, ...oldData.todos],
            total: oldData.total + 1
          };
        }
      )
    }
  })
  
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) => updateTask(id, updates),
    onSuccess: (updatedTask) => {
      const queries = queryClient.getQueriesData({ queryKey: ["todos"] });
      queries.forEach(([queryKey, queryData]) => {
        if (!queryData?.todos) return;
        queryClient.setQueryData(queryKey, {
          ...queryData,
          todos: queryData.todos.map((todo) => todo.id === updatedTask.id ? updatedTask : todo)
        })
      })
      
      queryClient.setQueryData(["todos", "single", updatedTask.id], updatedTask);
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (deletedTask, id) => {
      queryClient.removeQueries({
        queryKey: ["todos", id]
      });
      queryClient.setQueriesData(
        { queryKey: ["todos"] },
        (oldData) => {
          if (!oldData?.todos) return oldData;
          return {
            ...oldData,
            todos: oldData.todos.filter((todo) => todo.id !== id)
          }
        }
      );
    }
  });
  return {
    addMutation,
    updateMutation,
    deleteMutation
  };
}