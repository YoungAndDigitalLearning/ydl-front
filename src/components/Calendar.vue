<template>
  <div class="calendar">
    <ul class="list-group">
      <a v-for="task in tasks" :key="task.key" :task="task" href="#" class="list-group-item list-group-item-action heading">
        {{ task.title }}
      </a>
    </ul>
    <hr>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  color: black;
}

.calendar > ul > li{
  text-decoration: none;
}

.heading {
  font-size: 15px;
  color: black;
}

span {
  font-size: 15px;
}
</style>
