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
  mounted() {
    fetch('https://todo-backend-1-uwrt.onrender.com/tasks')
      .then(response => response.json())
      .then(data => {
        this.tasks = data;
      })
      .catch(error => {
        console.error('Fehler beim Laden der Tasks:', error);
      });
  }
};
</script> 
