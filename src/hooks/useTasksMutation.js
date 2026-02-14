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
          return {
            ...oldData,
            todos: [newTask, ...oldData.todos],
            total: oldData.total + 1
          };
        }
      )
    }
  })
  
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["todos", updatedTask.id], updatedTask);
      queryClient.setQueriesData({ queryKey: ["todos"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            todos: oldData.todos.map(todo => todo.id === updatedTask.id ? updatedTask : todo)
          }
        }
      );
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