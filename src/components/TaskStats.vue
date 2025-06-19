<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex items-center">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600">Total Tasks</p>
          <p class="text-2xl font-bold text-gray-900">{{ taskStore.tasks.length }}</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <ClipboardDocumentListIcon class="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex items-center">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600">Open</p>
          <p class="text-2xl font-bold text-blue-600">{{ taskStore.tasksByStatus.open }}</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <ClockIcon class="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex items-center">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600">In Progress</p>
          <p class="text-2xl font-bold text-yellow-600">{{ taskStore.tasksByStatus.inProgress }}</p>
        </div>
        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <PlayIcon class="h-6 w-6 text-yellow-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex items-center">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600">Completed</p>
          <p class="text-2xl font-bold text-green-600">{{ taskStore.tasksByStatus.done }}</p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <CheckCircleIcon class="h-6 w-6 text-green-600" />
        </div>
      </div>
    </div>
  </div>

  <!-- Overdue Tasks Alert -->
  <div v-if="taskStore.overdueTasks.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-fade-in">
    <div class="flex items-center">
      <ExclamationTriangleIcon class="h-5 w-5 text-red-500 mr-2" />
      <span class="text-red-800 font-medium">
        {{ taskStore.overdueTasks.length }} task{{ taskStore.overdueTasks.length > 1 ? 's' : '' }} overdue
      </span>
    </div>
    <p class="text-red-700 text-sm mt-1">
      You have {{ taskStore.overdueTasks.length }} overdue task{{ taskStore.overdueTasks.length > 1 ? 's' : '' }} that need immediate attention.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore'
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const taskStore = useTaskStore()
</script>