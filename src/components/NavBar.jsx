import { Link, useNavigate } from "react-router";
import { useAuthMutation } from "../hooks/useAuthMutation";

export default function NavBar({ setPage, setSearch, searchInput, setSearchInput }) {
  const { logout } = useAuthMutation();
  const navigate = useNavigate();
  
  return (
    <div className="navbar  bg-gray-200 dark:bg-gray-700 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">To-Do App</a>
      </div>
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto"
      value={searchInput}
        onChange={(e) => {
          setPage(1)
          setSearchInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setSearch(searchInput);
          }
        }}
      />
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
                navigate("/login")
              }}
            >Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}