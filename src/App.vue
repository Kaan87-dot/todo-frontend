<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">TaskFlow</h1>
            <span class="ml-2 text-sm text-gray-500">Manage your tasks efficiently</span>
          </div>
          <button
            @click="showTaskForm = true"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <PlusIcon class="h-5 w-5" />
            <span>New Task</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Task Statistics -->
      <TaskStats />

      <!-- Filter Bar -->
      <FilterBar />

      <!-- Task List -->
      <TaskList
        @create-task="showTaskForm = true"
        @edit-task="editTask"
      />
    </main>

    <!-- Task Form Modal -->
    <TaskForm
      v-if="showTaskForm"
      :task="selectedTask"
      @close="closeTaskForm"
      @saved="handleTaskSaved"
    />

    <!-- Toast Notifications -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Task } from './types/task'
import { useTaskStore } from './stores/taskStore'
import TaskList from './components/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import FilterBar from './components/FilterBar.vue'
import TaskStats from './components/TaskStats.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

const taskStore = useTaskStore()

const showTaskForm = ref(false)
const selectedTask = ref<Task | undefined>(undefined)
const showToast = ref(false)
const toastMessage = ref('')

onMounted(async () => {
  await taskStore.fetchTasks()
})

function editTask(task: Task) {
  selectedTask.value = task
  showTaskForm.value = true
}

function closeTaskForm() {
  showTaskForm.value = false
  selectedTask.value = undefined
}

function handleTaskSaved(task: Task) {
  showToast.value = true
  toastMessage.value = selectedTask.value 
    ? 'Task updated successfully!' 
    : 'Task created successfully!'
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>