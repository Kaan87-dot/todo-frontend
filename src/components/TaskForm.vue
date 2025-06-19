<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto animate-slide-up">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ isEditing ? 'Edit Task' : 'Create New Task' }}
        </h2>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': errors.title }"
            placeholder="Enter task title"
          />
          <p v-if="errors.title" class="text-red-600 text-sm mt-1">{{ errors.title }}</p>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter task description"
          ></textarea>
        </div>

        <!-- Due Date -->
        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">
            Due Date *
          </label>
          <input
            id="dueDate"
            v-model="formData.dueDate"
            type="date"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': errors.dueDate }"
          />
          <p v-if="errors.dueDate" class="text-red-600 text-sm mt-1">{{ errors.dueDate }}</p>
        </div>

        <!-- Priority -->
        <div>
          <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            v-model="formData.priority"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            v-model="formData.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <input
            id="tags"
            v-model="tagsInput"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter tags separated by commas"
          />
          <p class="text-gray-500 text-sm mt-1">Separate multiple tags with commas</p>
          <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="tag in formData.tags"
              :key="tag"
              class="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs flex items-center"
            >
              #{{ tag }}
              <button
                type="button"
                @click="removeTag(tag)"
                class="ml-1 text-blue-600 hover:text-blue-800"
              >
                <XMarkIcon class="h-3 w-3" />
              </button>
            </span>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="taskStore.loading || !isFormValid"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ taskStore.loading ? 'Saving...' : (isEditing ? 'Update Task' : 'Create Task') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Task, TaskFormData } from '../types/task'
import { useTaskStore } from '../stores/taskStore'
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  task?: Task
}

interface Emits {
  (e: 'close'): void
  (e: 'saved', task: Task): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const taskStore = useTaskStore()

const formData = ref<TaskFormData>({
  title: '',
  description: '',
  dueDate: '',
  priority: 'MEDIUM',
  status: 'OPEN',
  tags: []
})

const tagsInput = ref('')
const errors = ref<Record<string, string>>({})

const isEditing = computed(() => !!props.task)

const isFormValid = computed(() => {
  return formData.value.title.trim() !== '' && 
         formData.value.dueDate !== '' && 
         Object.keys(errors.value).length === 0
})

// Initialize form data
onMounted(() => {
  if (props.task) {
    formData.value = {
      title: props.task.title,
      description: props.task.description,
      dueDate: props.task.dueDate,
      priority: props.task.priority,
      status: props.task.status,
      tags: [...props.task.tags]
    }
    tagsInput.value = props.task.tags.join(', ')
  } else {
    // Set default due date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    formData.value.dueDate = tomorrow.toISOString().split('T')[0]
  }
})

// Watch tags input and update tags array
watch(tagsInput, (newValue) => {
  if (newValue) {
    formData.value.tags = newValue
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
  } else {
    formData.value.tags = []
  }
})

function removeTag(tagToRemove: string) {
  formData.value.tags = formData.value.tags.filter(tag => tag !== tagToRemove)
  tagsInput.value = formData.value.tags.join(', ')
}

function validateForm() {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
  }

  if (!formData.value.dueDate) {
    errors.value.dueDate = 'Due date is required'
  } else {
    const dueDate = new Date(formData.value.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (dueDate < today) {
      errors.value.dueDate = 'Due date cannot be in the past'
    }
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  try {
    let savedTask: Task

    if (isEditing.value && props.task) {
      savedTask = await taskStore.updateTask(props.task.id, formData.value)
    } else {
      savedTask = await taskStore.createTask(formData.value)
    }

    emit('saved', savedTask)
    emit('close')
  } catch (error) {
    // Error is handled by the store
  }
}
</script>