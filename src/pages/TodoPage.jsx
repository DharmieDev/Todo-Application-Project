import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { Link, Outlet, useLocation } from "react-router";
import TodoForm from "../components/TodoForm";

export default function TodoPage({ page, setPage, search }) {
  const [filter, setFilter] = useState("ALL");
  const location = useLocation();
  const isDetailPage = location.pathname.includes("/task/");
  const isAddPage = location.pathname.includes("/add");

  const { data, isLoading, isError } = useTasks(page, search, filter);
  // total pages
  const totalPages = data ? Math.ceil(data.total / 10) : 0;

  if (isLoading) {
    return (
      <span className="loading loading-spinner loading-xl">Loading...</span>
    );
  }

  if (isError) {
    return <p>Error loading tasks</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-2 p-4 gap-6">
      <div className={`${isDetailPage || isAddPage ? 'hidden md:block' : 'block'} flex flex-col gap-6 min-w-0`}>
        {/* Filter*/}
        <select
          value={filter}
          onChange={(e) => {
            setPage(1);
            setFilter(e.target.value);
          }}
          className="btn w-30 p-2.5 rounded-md select"
        >
          <option value={"ALL"}>All</option>
          <option value={"TODO"}>Todo</option>
          <option value={"IN_PROGRESS"}>In Progress</option>
          <option value={"DONE"}>Done</option>
          <option value={"CANCELLED"}>Cancelled</option>
        </select>

        <ul className="flex flex-col gap-5">
          {data?.tasks?.map((task) => (
            <li key={task.id}>
              <Link to={`/task/${task.id}`}>
                <h2>{task.id}</h2>
                <div className="flex flex-col">
                  <h2 className="text-[20px] font-bold wrap-break-word">Name: {task.name}</h2>
                  <p className="text-[16px] wrap-break-word">Description: {task.description}</p>
                  <p>Status: {task.status}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination*/}
        <div className="join">
          <button
            className="join-item btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            «
          </button>
          <button className="join-item btn">
            {page} of {totalPages}
          </button>
          <button
            className="join-item btn light"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            »
          </button>
        </div>
      </div>
      <div className={`${isDetailPage || isAddPage ? 'block' : 'hidden md:block'}`}>
        <Outlet />
        {/* Add Todo Form */}
      </div>
    </div>
  );
}
