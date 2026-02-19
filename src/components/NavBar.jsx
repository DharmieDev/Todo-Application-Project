import { Link, useNavigate } from "react-router";
import { useAuthMutation } from "../hooks/useAuthMutation";
import { MenuRight } from "@boxicons/react";
import { useState } from "react";

export default function NavBar({
  setPage,
  setSearch,
  searchInput,
  setSearchInput,
}) {
  const { logout } = useAuthMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar  bg-gray-200 dark:bg-gray-700 shadow-sm ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-[16px] md:text-2xl">
          To-Do App
        </a>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-auto"
        value={searchInput}
        onChange={(e) => {
          setPage(1);
          setSearchInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearch(searchInput);
          }
        }}
      />
      {/* Mobile Menu Icon*/}
      <button className="btn btn-ghost btn-circle">
        <MenuRight
        onClick={() => setOpen(!open)}
          className="md:hidden" width={42} height={42} />
      </button>
      {/* Desktop Menu*/}
      <div>
        <ul className="hidden md:menu md:flex md:menu-horizontal px-1 gap-2">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Todo</Link>
          </li>
          <li>
            <button
              className="btn hover:bg-gray-600"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      {/* Mobile Dropdown menu*/}
      {open && (
        <ul className="absolute top-16 right-4 bg-base-200 rounded-box shadow-lg p-3 md:hidden menu menu-vertical">
          <li>
            <Link to={"/login"} onClick={() => setOpen(false)}>Login</Link>
          </li>
          <li>
            <Link to={"/register"} onClick={() => setOpen(false)}>Register</Link>
          </li>
          <li>
            <Link to={"/"} onClick={() => setOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to={"/add"} onClick={() => setOpen(false)}>Add Todo</Link>
          </li>
          <li>
            <button
              className="btn hover:bg-gray-600"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
