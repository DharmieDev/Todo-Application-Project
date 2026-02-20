import { useState } from "react";
import { useTaskMutations } from "../hooks/useTasksMutation";
import { useNavigate } from "react-router";
import { ChevronLeft } from "@boxicons/react";

export default function AddTodo() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("TODO");
  const [priority, setPriority] = useState("LOW");
  const [description, setDescription] = useState("");
  const { addMutation, isLoading } = useTaskMutations();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addMutation.mutate({
      name,
      description,
      status,
      priority,
    });
    setName("");
    setDescription("");
    setPriority("LOW");
    setStatus("TODO");
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}
        className="btn md:hidden"
      >
        <ChevronLeft />
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 m-10">
        <input
          type="text"
          value={name}
          placeholder="Task name..."
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <textarea
          value={description}
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
          className="textarea"
        />
        <div className="flex gap-3">
          <select
            value={priority}
            className="select bg-gray-700 md:w-[20%] border-none"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={"LOW"}>LOW</option>
            <option value={"MEDIUM"}>MEDIUM</option>
            <option value={"HIGH"}>HIGH</option>
          </select>
          <select
            value={status}
            className="select bg-gray-700 md:w-[20%] border-none"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={"TODO"}>TODO</option>
            <option value={"IN_PROGRESS"}>IN_PROGRESS</option>
            <option value={"DONE"}>DONE</option>
            <option value={"CANCELLED"}>CANCELLED</option>
          </select>
        </div>
        <button type="submit" className="btn w-40" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
}
