<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search -->
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <div class="relative">
          <input
            id="search"
            v-model="localFilters.searchTerm"
            type="text"
            placeholder="Search tasks..."
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <!-- Status Filter -->
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          v-model="localFilters.status"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <!-- Priority Filter -->
      <div>
        <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority"
          v-model="localFilters.priority"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <!-- Sort -->
      <div>
        <label for="sortBy" class="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <div class="flex space-x-2">
          <select
            id="sortBy"
            v-model="localFilters.sortBy"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Created Date</option>
          </select>
          <button
            type="button"
            @click="toggleSortOrder"
            class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :title="localFilters.sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'"
          >
            <ArrowUpIcon v-if="localFilters.sortOrder === 'asc'" class="h-5 w-5" />
            <ArrowDownIcon v-else class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Filters -->
    <div class="mt-4 flex flex-wrap gap-2">
      <button
        @click="setQuickFilter('overdue')"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium transition-colors',
          quickFilter === 'overdue' 
            ? 'bg-red-100 text-red-800 border border-red-200' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        Overdue ({{ taskStore.overdueTasks.length }})
      </button>
      <button
        @click="setQuickFilter('today')"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium transition-colors',
          quickFilter === 'today' 
            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        Due Today
      </button>
      <button
        @click="setQuickFilter('high-priority')"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium transition-colors',
          quickFilter === 'high-priority' 
            ? 'bg-orange-100 text-orange-800 border border-orange-200' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        High Priority
      </button>
      <button
        @click="clearFilters"
        class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
      >
        Clear All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { TaskFilters } from '../types/task'
import { useTaskStore } from '../stores/taskStore'
import {
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/vue/24/outline'

const taskStore = useTaskStore()

const localFilters = ref<TaskFilters>({
  searchTerm: '',
  status: '',
  priority: '',
  sortBy: 'dueDate',
  sortOrder: 'asc'
})

const quickFilter = ref<string>('')

onMounted(() => {
  localFilters.value = { ...taskStore.filters }
})

// Watch for changes and update store
watch(localFilters, (newFilters) => {
  taskStore.setFilters(newFilters)
}, { deep: true })

function toggleSortOrder() {
  localFilters.value.sortOrder = localFilters.value.sortOrder === 'asc' ? 'desc' : 'asc'
}

function setQuickFilter(filter: string) {
  clearFilters()
  quickFilter.value = filter

  switch (filter) {
    case 'overdue':
      // This will be handled by the computed property in the store
      break
    case 'today':
      const today = new Date().toISOString().split('T')[0]
      // Would need to implement date filtering in the store
      break
    case 'high-priority':
      localFilters.value.priority = 'HIGH'
      break
  }
}

function clearFilters() {
  localFilters.value = {
    searchTerm: '',
    status: '',
    priority: '',
    sortBy: 'dueDate',
    sortOrder: 'asc'
  }
  quickFilter.value = ''
}
</script>