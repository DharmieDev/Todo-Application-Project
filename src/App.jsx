import { lazy, Suspense } from 'react'
import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './components/ErrorFallback'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'

const HomePage = lazy(() => import("./pages/HomePage"))
const TodoDetails = lazy(() => import("./pages/TodoDetails"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const NotFound = lazy(() => import("./pages/NotFound"))


function App() {


  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<span className="loading loading-spinner loading-xl"></span>}>
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/todo/:id" element={<TodoDetails />} />
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
