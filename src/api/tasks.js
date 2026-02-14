import { api } from "./axios"

export const fetchTasks = async ({ page = 1, search = "", status = "all" }) => {
  const limit = 10;
  const skip = (page - 1) * limit;
  
  try {
    const response = await api.get("/todos", { params: { limit, skip } });
      
    const data = response.data;
    
    let todos = data.todos;
    
    if (search.trim() !== "") {
      const terms = search.toLowerCase().split(" ");
      todos = todos.filter(todo => terms.every(term => todo.todo.toLowerCase().includes(term)));
    }
    
    if (status === "complete") {
      todos = todos.filter(todo => todo.completed === true)
    }
    
    if (status === "incomplete") {
      todos = todos.filter(todo => todo.completed === false)
    }
    
    return {
      ...data,
      todos
    }

  } catch (error) {
    console.error("Failed to fetch tasks:", error.message)
    throw error;
  }
}

export const getTask = async id => {
  const response = await api.get(`/todos/${id}`)
  return response.data;
}

export const addTask = async (todo) => {
  const {data} = await api.post("/todos", todo)
  return data;
}

export const updateTask = async ({ id, updates }) => {
  const { data } = await api.put(`/todos/${id}`, updates);
  return data;
}

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
}