import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addTask, CreateTaskParams, deleteTask, FetchTasksResponse, updateTask, UpdateTaskParams } from "../api/tasks";
import { Task } from "../types/Task";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();
  
  const addMutation = useMutation<Task, Error, CreateTaskParams>({
    mutationFn: addTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData<FetchTasksResponse>(["tasks"], (oldTasks) => {
        if (!oldTasks) return {
          tasks: [newTask],
          total: 1,
          page: 1,
        };
        return {
          ...oldTasks,
          tasks: [newTask, ...oldTasks.tasks],
          total: oldTasks.total + 1,
        };
      })
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  })
  
  const updateMutation = useMutation<Task, Error, UpdateTaskParams>({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
  
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteTask,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries(
        { queryKey: ["tasks", "single", deletedId] }
      )
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
  return {
    addMutation,
    updateMutation,
    deleteMutation
  };
}