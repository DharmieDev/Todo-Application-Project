import { useState } from "react"
import { useTasks } from "../hooks/useTasks";
import { Link, Outlet } from "react-router";
import { useTaskMutations } from "../hooks/useTasksMutation";

export default function TodoPage({ page, setPage, search }) {
  const [status, setStatus] = useState("all");
  const [newTodo, setNewTodo] = useState("");
  const { addMutation } = useTaskMutations();
  
  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    addMutation.mutate({
      todo: newTodo,
      completed: false,
      userId: 1
    });
    setNewTodo("");
  }
  
  const { data, isLoading, isError } = useTasks(page, search, status);
  // total pages
  const totalPages = data ?Math.ceil(data.total / 10) : 0;
  
  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>
  }
  
  if (isError) {
    return <p>Error loading tasks</p>
  }
  
  return (
    <div className="grid grid-cols-2 m-2 p-4">
      <div className="flex flex-col gap-6">
        {/* Filter*/}
      <select value={status}
        onChange={(e) => {
        setPage(1)
          setStatus(e.target.value)
          }}
        className="btn w-30 p-2.5 rounded-md"
        >
          <option value={"all"}>All</option>
        <option value={"complete"}>Complete</option>
        <option value={"incomplete"}>Incomplete</option>
      </select>
      
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/todo/${todo.id}`}>
              {todo.todo} {todo.completed ? "✅" : "❌"}
            </Link>
          </li>
      ))}
      </ul>
      
      {/* Pagination*/}
      <div className="join">
        <button className="join-item btn"
          disabled={page === 1}
          onClick={() => setPage((p) => p -1)}
        >«</button>
        <button className="join-item btn">{page} of  {totalPages}</button>
        <button className="join-item btn"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >»</button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div className="flex flex-col">
        <input type="text" value={newTodo}
          placeholder="Add new todo..."
          onChange={(e) => setNewTodo(e.target.value)}
          className=""
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  )
}