import api from "./axios"
import { type Task, type Priority, type Status, ApiResponse } from "../types/Task"

export type FetchTasksParams = {
  page?: number;
  limit?: number;
  search?: string
  status: Status | "ALL"
  priority?: Priority
  sort?: "ASC" | "DESC"
  all?: boolean
}

export type FetchTasksResponse = {
  tasks: Task[];
  total: number;
  page: number;
}

export const fetchTasks = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  priority,
  sort = "DESC",
  all = false,
}: FetchTasksParams): Promise<FetchTasksResponse> => {
  const params:Record<string, unknown> = {
    page,
    limit,
    sort,
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
  const response = await api.get<ApiResponse<Task[]>>("/tasks", { params });
  const res = response.data;

  const tasks: Task[] = res.data || [];
  const total = res.meta?.total || 0;
  const currentPage = res.meta?.page || page;
  
  const filteredTasks = search
    ? tasks.filter((task) => search.
      toLowerCase()
      .split(" ")
      .every((term) => (task.name?.toLowerCase() ?? "").includes(term)))
    : tasks;

  
  return {
    tasks: filteredTasks,
    total,
    page: currentPage
  };
};


export const getTask = async (id: string): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`)
  return response.data;
}

export type CreateTaskParams = {
  name: string;
  description: string;
  priority: Priority;
  status: Status;
  completedAt?: boolean | null
}

export const addTask = async (
  payload: CreateTaskParams
): Promise<Task> => {
  
  const { data } = await api.post<Task>("/tasks", payload);
  return data;
}

export type UpdateTaskParams = {
  id: string
  updates: Partial<Task>
}

export const updateTask = async ({ id, updates }: UpdateTaskParams): Promise<Task> => {
  const { data } = await api.patch<Task>(`/tasks/${id}`, updates);
  return data;
}

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
}
