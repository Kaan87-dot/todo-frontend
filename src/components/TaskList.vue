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
      tasks: []
    };
  },
  async mounted() {
    try {
      const response = await fetch('https://todo-backend-1-uwrt.onrender.com');
      const data = await response.json();
      this.tasks = data;
    } catch (error) {
      console.error('Fehler beim Laden der Aufgaben:', error);
    }
  }
};
</script>
