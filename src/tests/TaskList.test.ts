import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TaskList from '../components/TaskList.vue'
import { useTaskStore } from '../stores/taskStore'

describe('TaskList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders empty state when no tasks', () => {
    const wrapper = mount(TaskList)
    const taskStore = useTaskStore()
    
    taskStore.tasks = []
    
    expect(wrapper.text()).toContain('No tasks found')
    expect(wrapper.text()).toContain('Get started by creating your first task!')
  })

  it('renders loading state', () => {
    const wrapper = mount(TaskList)
    const taskStore = useTaskStore()
    
    taskStore.loading = true
    
    expect(wrapper.text()).toContain('Loading tasks...')
  })

  it('renders error state with retry button', () => {
    const wrapper = mount(TaskList)
    const taskStore = useTaskStore()
    
    taskStore.error = 'Failed to load tasks'
    
    expect(wrapper.text()).toContain('Error loading tasks')
    expect(wrapper.text()).toContain('Try Again')
  })

  it('renders tasks when available', () => {
    const wrapper = mount(TaskList)
    const taskStore = useTaskStore()
    
    taskStore.tasks = [
      {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '2025-01-25',
        priority: 'HIGH',
        status: 'OPEN',
        tags: ['test'],
        createdAt: '2025-01-20T10:00:00',
        updatedAt: '2025-01-20T10:00:00'
      }
    ]
    
    expect(wrapper.text()).toContain('Test Task')
  })

  it('emits create-task event when create button is clicked', async () => {
    const wrapper = mount(TaskList)
    const taskStore = useTaskStore()
    
    taskStore.tasks = []
    
    const createButton = wrapper.find('button')
    await createButton.trigger('click')
    
    expect(wrapper.emitted('create-task')).toBeTruthy()
  })
})