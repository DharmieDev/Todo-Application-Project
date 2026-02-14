import { lazy, Suspense } from 'react'
import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './components/ErrorFallback'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import { useState } from 'react'

const TodoPage = lazy(() => import("./pages/TodoPage"))
const TodoDetails = lazy(() => import("./pages/TodoDetails"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const NotFound = lazy(() => import("./pages/NotFound"))


function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");


  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<span className="loading loading-spinner loading-xl"></span>}>
          <div>
            <NavBar
              page={page} setPage={setPage}
              search={search} setSearch={setSearch}
              searchInput={searchInput} setSearchInput={setSearchInput}
            />
            <Routes>
              <Route path="/" element={<TodoPage
                page={page} setPage={setPage}
                search={search} setSearch={setSearch}
                searchInput={searchInput} setSearchInput={setSearchInput}
              />}>
                <Route path="/todo/:id" element={<TodoDetails />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
