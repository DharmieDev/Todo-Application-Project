import api from "./axios"

export const fetchTasks = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  priority,
  sort = "DESC",
  all = false,
}) => {
  const params = {
    page,
    limit,
    sort
  }
  if (search) {
    params.search = search;
  }
  if (status && status !== "ALL") {
    params.status = status;
  }
  if (priority) {
    params.priority = priority;
  }
  if (all === true) {
    params.all = true;
  }
  const response = await api.get("/tasks", { params });
  const data = response.data;

  const tasks = data.data || [];
  const total = data.meta?.total || 0;
  const currentPage = data.meta?.page || page;
  
  const filteredTasks = search
    ? tasks.filter((task) => search.toLowerCase().split(" ").every(
      (term) => task.name?.toLowerCase().includes(term))
    )
    : tasks;

  
  return {
    tasks: filteredTasks,
    total,
    page: currentPage
  };
};


export const getTask = async id => {
  const response = await api.get(`/tasks/${id}`)
  return response.data;
}

export const addTask = async ({
  name,
  description,
  priority,
  status = "TODO",
  completedAt = null,
}) => {
  const payload = {
    name,
    description,
    priority,
    status,
    createdAt: new Date().toISOString(),
    completedAt,
  }
  
  const { data } = await api.post("/tasks", payload);
  return data;
}

export const updateTask = async ({ id, updates }) => {
  const { data } = await api.patch(`/tasks/${id}`, updates);
  return data;
}

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
}
