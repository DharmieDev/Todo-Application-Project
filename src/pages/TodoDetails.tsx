import { useNavigate, useParams } from "react-router";
import { useTaskMutations } from "../hooks/useTasksMutation";
import { useQuery } from "@tanstack/react-query";
import { getTask } from "../api/tasks";
import { ChevronLeft } from "@boxicons/react";
import { Priority, Status, Task } from "../types/Task";

export default function TodoDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if(!id) return <span>Task not found</span>
  
  const { data, isLoading, isError } = useQuery<Task>({
    queryKey: ["tasks", id],
    queryFn: () => getTask(id),
    enabled: Boolean(id),
  });

  const { updateMutation, deleteMutation } = useTaskMutations();
  const handlePriorityChange = (task: Task) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateMutation.mutate({
      id: task.id,
      updates: { priority: e.target.value as Priority},
    });
  };

  const handleStatusChange = (task: Task) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateMutation.mutate({
      id: task.id,
      updates: { status: e.target.value as Status},
    });
  };

  const handleDelete = () => {
    if (!data?.id) return;
    deleteMutation.mutate(data.id, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error("Delete failed", error);
      },
    });
  };

  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (isError || !data) {
    return <span>Error fetching data</span>;
  }

  return (
    <div className="flex flex-col gap-10 m-9">
      <button onClick={() => navigate(-1)} className="btn w-[20%] md:hidden">
        <ChevronLeft/>
      </button>
      <span>{data.id}</span>
      <h2 className="text-3xl font-bold wrap-break-word">{data.name}</h2>
      <p className="wrap-break-word">Description: {data.description}</p>
      <p>Status: {data.status}</p>
      <div>
        <p className="text-[13px]">Priority: {data.priority}</p>
        <p className="text-[13px]">Created At: {data.createdAt}</p>
        <p className="text-[13px]">Updated At: {data.updatedAt}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-5">
          <select
            value={data.priority}
            onChange={handlePriorityChange(data)}
            className="select light: bg-gray-300 dark:bg-gray-700 w-[50%] border-none"
          >
            <option disabled value="">Select Priority</option>
            <option value={"LOW"}>LOW</option>
            <option value={"MEDIUM"}>MEDIUM</option>
            <option value={"HIGH"}>HIGH</option>
          </select>
          <select
            value={data.status}
            onChange={handleStatusChange(data)}
            className="select light: bg-gray-300  dark:bg-gray-700 w-[50%] border-none"
          >
            <option>Select Status</option>
            <option value={"TODO"}>TODO</option>
            <option value={"IN_PROGRESS"}>IN PROGRESS</option>
            <option value={"DONE"}>DONE</option>
            <option value={"CANCELLED"}>CANCELLED</option>
          </select>
        </div>
        <button onClick={handleDelete} className="btn btn-error w-[30%]">
          Delete
        </button>
      </div>
    </div>
  );
}
