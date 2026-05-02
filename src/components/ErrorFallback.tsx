
import { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="error-page">
      <h2>Something went wrong</h2>
      <p>{ error instanceof Error ?
        error.message: String(error)}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  )
}