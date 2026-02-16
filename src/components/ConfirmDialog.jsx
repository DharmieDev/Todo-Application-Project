
export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal p-4 bg-white rounded shadow">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="btn btn-ghost">Cancel</button>
        <button onClick={onConfirm} className="btn btn-error">Delete</button>
      </div>
    </div>
  );
}
