import { Task, TaskFormData, TaskFilters } from '../types/task'

// Mock API service - replace with actual API calls
class TaskService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Projektarbeit schreiben',
      description: 'Kapitel 3 bis Freitag fertigstellen',
      dueDate: '2025-01-21',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      tags: ['uni', 'dringend'],
      createdAt: '2025-01-17T10:30:00',
      updatedAt: '2025-01-18T09:00:00'
    },
    {
      id: '2',
      title: 'Einkaufen gehen',
      description: 'Lebensmittel für die Woche besorgen',
      dueDate: '2025-01-20',
      priority: 'MEDIUM',
      status: 'OPEN',
      tags: ['alltag', 'haushalt'],
      createdAt: '2025-01-18T14:15:00',
      updatedAt: '2025-01-18T14:15:00'
    },
    {
      id: '3',
      title: 'Zahnarzttermin',
      description: 'Kontrolltermin um 14:30 Uhr',
      dueDate: '2025-01-22',
      priority: 'LOW',
      status: 'DONE',
      tags: ['gesundheit'],
      createdAt: '2025-01-15T08:00:00',
      updatedAt: '2025-01-19T16:45:00'
    }
  ]

  async getAllTasks(): Promise<Task[]> {
    // Simulate API delay
    await this.delay(300)
    return [...this.tasks]
  }

  async getTaskById(id: string): Promise<Task | null> {
    await this.delay(200)
    return this.tasks.find(task => task.id === id) || null
  }

  async createTask(taskData: TaskFormData): Promise<Task> {
    await this.delay(400)
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.tasks.push(newTask)
    return newTask
  }

  async updateTask(id: string, taskData: Partial<TaskFormData>): Promise<Task> {
    await this.delay(400)
    const taskIndex = this.tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString()
    }
    return this.tasks[taskIndex]
  }

  async deleteTask(id: string): Promise<void> {
    await this.delay(300)
    const taskIndex = this.tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }
    this.tasks.splice(taskIndex, 1)
  }

  async filterTasks(filters: TaskFilters): Promise<Task[]> {
    await this.delay(200)
    let filteredTasks = [...this.tasks]

    if (filters.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status)
    }

    if (filters.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority)
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      )
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredTasks = filteredTasks.filter(task =>
        filters.tags!.some(tag => task.tags.includes(tag))
      )
    }

    // Sort tasks
    if (filters.sortBy) {
      filteredTasks.sort((a, b) => {
        let aValue: any = a[filters.sortBy!]
        let bValue: any = b[filters.sortBy!]

        if (filters.sortBy === 'priority') {
          const priorityOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
        } else if (filters.sortBy === 'dueDate' || filters.sortBy === 'createdAt') {
          aValue = new Date(aValue).getTime()
          bValue = new Date(bValue).getTime()
        }

        if (filters.sortOrder === 'desc') {
          return bValue - aValue
        }
        return aValue - bValue
      })
    }

    return filteredTasks
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const taskService = new TaskService()