import { useEffect } from "react";
import { useState } from "react";

export default function TodoForm({ onSubmit, todo = null, onClose }) {
  const [text, setText] = useState(todo?.todo || "");
  const [completed, setCompleted] = useState(todo?.completed || false);

  // useEffect((todo) => {
  //   if (todo) {
  //     setText(todo.todo);
  //     setCompleted(todo.completed);
  //   } else {
  //     setText("");
  //     setCompleted(false);
  //   }
  // }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ todo: text, completed, id: todo?.id });
    onClose();
  };

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my_modal_6" className="btn">
        Add Todo
      </label>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2.5">
              <input
                placeholder="Todo title.."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="input"
              />
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
                Completed
              </label>
              <button type="submit" className="btn w-20">{todo ? "Update" : "Add"}</button>
              <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn">
                  Close!
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
