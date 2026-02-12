export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-page">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  )
}