import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Task, TaskFormData, TaskFilters } from '../types/task'
import { taskService } from '../services/taskService'
import { isAfter, parseISO } from 'date-fns'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<TaskFilters>({
    sortBy: 'dueDate',
    sortOrder: 'asc'
  })

  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
      const matchesStatus = !filters.value.status || task.status === filters.value.status
      const matchesPriority = !filters.value.priority || task.priority === filters.value.priority
      const matchesSearch = !filters.value.searchTerm || 
        task.title.toLowerCase().includes(filters.value.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.value.searchTerm.toLowerCase())
      const matchesTags = !filters.value.tags?.length || 
        filters.value.tags.some(tag => task.tags.includes(tag))
      
      return matchesStatus && matchesPriority && matchesSearch && matchesTags
    }).sort((a, b) => {
      if (!filters.value.sortBy) return 0
      
      let aValue: any = a[filters.value.sortBy]
      let bValue: any = b[filters.value.sortBy]

      if (filters.value.sortBy === 'priority') {
        const priorityOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 }
        aValue = priorityOrder[a.priority]
        bValue = priorityOrder[b.priority]
      } else if (filters.value.sortBy === 'dueDate' || filters.value.sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (filters.value.sortOrder === 'desc') {
        return bValue - aValue
      }
      return aValue - bValue
    })
  })

  const overdueTasks = computed(() => {
    const now = new Date()
    return tasks.value.filter(task => 
      task.status !== 'DONE' && isAfter(now, parseISO(task.dueDate))
    )
  })

  const tasksByStatus = computed(() => {
    return {
      open: tasks.value.filter(task => task.status === 'OPEN').length,
      inProgress: tasks.value.filter(task => task.status === 'IN_PROGRESS').length,
      done: tasks.value.filter(task => task.status === 'DONE').length
    }
  })

  async function fetchTasks() {
    loading.value = true
    error.value = null
    try {
      tasks.value = await taskService.getAllTasks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch tasks'
    } finally {
      loading.value = false
    }
  }

  async function createTask(taskData: TaskFormData) {
    loading.value = true
    error.value = null
    try {
      const newTask = await taskService.createTask(taskData)
      tasks.value.push(newTask)
      return newTask
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create task'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateTask(id: string, taskData: Partial<TaskFormData>) {
    loading.value = true
    error.value = null
    try {
      const updatedTask = await taskService.updateTask(id, taskData)
      const index = tasks.value.findIndex(task => task.id === id)
      if (index !== -1) {
        tasks.value[index] = updatedTask
      }
      return updatedTask
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update task'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteTask(id: string) {
    loading.value = true
    error.value = null
    try {
      await taskService.deleteTask(id)
      tasks.value = tasks.value.filter(task => task.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete task'
      throw err
    } finally {
      loading.value = false
    }
  }

  function setFilters(newFilters: Partial<TaskFilters>) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function clearError() {
    error.value = null
  }

  return {
    tasks,
    filteredTasks,
    overdueTasks,
    tasksByStatus,
    loading,
    error,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setFilters,
    clearError
  }
})