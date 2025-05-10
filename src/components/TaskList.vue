<!-- src/components/TaskList.vue -->
<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      {{ task.title }} – {{ task.done ? 'Erledigt' : 'Offen' }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: 1, title: 'Einkaufen gehen', done: false },
        { id: 2, title: 'Hausaufgaben machen', done: true }
      ]
    };
  }
};
</script>
