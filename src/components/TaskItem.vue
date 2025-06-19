<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 animate-fade-in">
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ task.title }}</h3>
        <p class="text-gray-600 text-sm mb-3">{{ task.description }}</p>
      </div>
      <div class="flex items-center space-x-2 ml-4">
        <button
          @click="$emit('edit', task)"
          class="text-gray-400 hover:text-blue-600 transition-colors"
          title="Edit task"
        >
          <PencilIcon class="h-5 w-5" />
        </button>
        <button
          @click="$emit('delete', task.id)"
          class="text-gray-400 hover:text-red-600 transition-colors"
          title="Delete task"
        >
          <TrashIcon class="h-5 w-5" />
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <span
          :class="[
            'px-2 py-1 rounded-full text-xs font-medium',
            statusClasses[task.status]
          ]"
        >
          {{ statusLabels[task.status] }}
        </span>
        <span
          :class="[
            'px-2 py-1 rounded-full text-xs font-medium',
            priorityClasses[task.priority]
          ]"
        >
          {{ task.priority }}
        </span>
      </div>
      
      <div class="flex items-center text-sm text-gray-500">
        <CalendarIcon class="h-4 w-4 mr-1" />
        <span :class="{ 'text-red-600 font-medium': isOverdue }">
          {{ formatDate(task.dueDate) }}
        </span>
        <ExclamationTriangleIcon v-if="isOverdue" class="h-4 w-4 ml-1 text-red-600" />
      </div>
    </div>

    <div v-if="task.tags.length > 0" class="flex flex-wrap gap-1 mb-3">
      <span
        v-for="tag in task.tags"
        :key="tag"
        class="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
      >
        #{{ tag }}
      </span>
    </div>

    <div class="flex items-center justify-between text-xs text-gray-400">
      <span>Created: {{ formatDateTime(task.createdAt) }}</span>
      <span v-if="task.updatedAt !== task.createdAt">
        Updated: {{ formatDateTime(task.updatedAt) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Task } from '../types/task'
import { format, parseISO, isAfter } from 'date-fns'
import {
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

interface Props {
  task: Task
}

interface Emits {
  (e: 'edit', task: Task): void
  (e: 'delete', id: string): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const statusClasses = {
  OPEN: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  DONE: 'bg-green-100 text-green-800'
}

const statusLabels = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
}

const priorityClasses = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-orange-100 text-orange-800',
  HIGH: 'bg-red-100 text-red-800'
}

const isOverdue = computed(() => {
  if (props.task.status === 'DONE') return false
  return isAfter(new Date(), parseISO(props.task.dueDate))
})

function formatDate(dateString: string) {
  return format(parseISO(dateString), 'MMM dd, yyyy')
}

function formatDateTime(dateString: string) {
  return format(parseISO(dateString), 'MMM dd, yyyy HH:mm')
}
</script>