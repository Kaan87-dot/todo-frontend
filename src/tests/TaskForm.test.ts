import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TaskForm from '../components/TaskForm.vue'
import { Task } from '../types/task'

describe('TaskForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly for creating new task', () => {
    const wrapper = mount(TaskForm)
    
    expect(wrapper.find('h2').text()).toBe('Create New Task')
    expect(wrapper.find('button[type="submit"]').text()).toBe('Create Task')
  })

  it('renders correctly for editing existing task', () => {
    const mockTask: Task = {
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

    const wrapper = mount(TaskForm, {
      props: { task: mockTask }
    })
    
    expect(wrapper.find('h2').text()).toBe('Edit Task')
    expect(wrapper.find('button[type="submit"]').text()).toBe('Update Task')
    expect(wrapper.find('input#title').element.value).toBe('Test Task')
  })

  it('validates required fields', async () => {
    const wrapper = mount(TaskForm)
    
    // Try to submit without required fields
    await wrapper.find('form').trigger('submit')
    
    // Should show validation errors
    expect(wrapper.text()).toContain('Title is required')
  })

  it('handles tag input correctly', async () => {
    const wrapper = mount(TaskForm)
    
    const tagsInput = wrapper.find('input#tags')
    await tagsInput.setValue('tag1, tag2, tag3')
    
    // Should display tags
    expect(wrapper.text()).toContain('#tag1')
    expect(wrapper.text()).toContain('#tag2')
    expect(wrapper.text()).toContain('#tag3')
  })

  it('emits close event when cancel button is clicked', async () => {
    const wrapper = mount(TaskForm)
    
    await wrapper.find('button[type="button"]').trigger('click')
    
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})