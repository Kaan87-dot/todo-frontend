<template>
  <div class="space-y-4">
    <!-- Error State -->
    <div v-if="taskStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-500 mr-2" />
          <span class="text-red-800 font-medium">Error loading tasks</span>
        </div>
        <button
          @click="retryFetch"
          class="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
      <p class="text-red-700 text-sm mt-1">{{ taskStore.error }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="taskStore.loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-2 text-gray-600">Loading tasks...</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="taskStore.filteredTasks.length === 0 && !taskStore.loading" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
      <p class="text-gray-500 mb-4">Get started by creating your first task!</p>
      <button
        @click="$emit('create-task')"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Create Task
      </button>
    </div>

    <!-- Task Grid -->
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TaskItem
        v-for="task in taskStore.filteredTasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit-task', $event)"
        @delete="handleDelete"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-slide-up">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Delete Task</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelDelete"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            :disabled="taskStore.loading"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {{ taskStore.loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Task } from '../types/task'
import { useTaskStore } from '../stores/taskStore'
import TaskItem from './TaskItem.vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

interface Emits {
  (e: 'create-task'): void
  (e: 'edit-task', task: Task): void
}

defineEmits<Emits>()

const taskStore = useTaskStore()
const showDeleteModal = ref(false)
const taskToDelete = ref<string | null>(null)

async function retryFetch() {
  taskStore.clearError()
  await taskStore.fetchTasks()
}

function handleDelete(taskId: string) {
  taskToDelete.value = taskId
  showDeleteModal.value = true
}

function cancelDelete() {
  showDeleteModal.value = false
  taskToDelete.value = null
}

async function confirmDelete() {
  if (taskToDelete.value) {
    try {
      await taskStore.deleteTask(taskToDelete.value)
      showDeleteModal.value = false
      taskToDelete.value = null
    } catch (error) {
      // Error is handled by the store
    }
  }
}
</script>