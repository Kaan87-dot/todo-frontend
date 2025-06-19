export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE'
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface TaskFormData {
  title: string
  description: string
  dueDate: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE'
  tags: string[]
}

export interface TaskFilters {
  status?: string
  priority?: string
  searchTerm?: string
  tags?: string[]
  sortBy?: 'dueDate' | 'priority' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}