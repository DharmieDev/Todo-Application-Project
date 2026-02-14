import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getTask } from "../api/tasks";
import { useTaskMutations } from "../hooks/useTasksMutation";

export default function TodoDetails() {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const id = Number(paramId);
  const { data, isLoading,isError } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => getTask(id),
    enabled: !!id

  });
  const { updateMutation, deleteMutation } = useTaskMutations();
  const handleTask = (todo) => {
    updateMutation.mutate({
      id: todo.id,
      updates: {completed: !todo.completed}
    })
  }
  
  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        navigate("/");
      }
    })
  }
  
  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>
  }
  
  if (isError) {
    return <span>Error fetching data</span>
  }
  
  return (
    <div>
      <span>{data.id}</span>
      <h2 className="text-3xl font-bold">{data.todo}</h2>
      <p>{data.completed ? 'Completed ✅' : 'Not Completed ❌'}</p>
      <button onClick={() => handleTask(data)} className="btn">
        {data.completed ? 'Mark as Not Completed ❌' : 'Mark as Completed ✅'}
      </button>
      <button onClick={handleDelete} className="btn btn-error">
        Delete
      </button>
    </div>
  )
}