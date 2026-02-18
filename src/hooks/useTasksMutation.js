import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addTask, deleteTask, updateTask } from "../api/tasks";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();
  
  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        if (!oldTasks) return { tasks: [newTask] };
        return { ...oldTasks, tasks: [newTask, ...oldTasks.tasks] };
      })
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  })
  
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data, deletedId) => {
      queryClient.removeQueries({queryKey: ["tasks", "single", deletedId]})
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
  return {
    addMutation,
    updateMutation,
    deleteMutation
  };
}