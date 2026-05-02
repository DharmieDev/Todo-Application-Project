export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'COMPLETED' | 'IN_PROGRESS' | 'PENDING'| 'TODO';
export type ApiResponse<T> = {
  data: T;
  meta?: {
    total: number
    page: number
  };
};
export type ApiErrorResponse = {
  message?: string
  errors?: Record<string, string[]>
};

export interface Task {
  id: string
  name: string
  description: string
  priority: Priority
  status: Status
  completedAt?: boolean
  createdAt: string | null
  updatedAt: string | null
}