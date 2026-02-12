import { api } from "./axios"

export const fetchTasks = async ({page, search, status}) => {
  const response = api.get("/tasks", {
    params: {
      page,
      limit: 10,
      search,
      status,
    },
  })
  return response.data
}

export const getTask = id => {
  api.get(`/tasks/${id}`).then(response=> response.data)
}

export const addTask = task => {
  api.post("/tasks", task).then(response => response.data)
}

export const updateTask = ({ id, ...task }) => {
  api.put(`/tasks/${id}`, task).then(response => response.data)
}

export const deleteTask = id => {
  api.delete(`/tasks${id}`);
}