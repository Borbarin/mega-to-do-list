<script setup>
defineProps({
  id: Number,
  label: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle', 'delete', 'update'])
</script>

<template>
  <li class="task">
    <input
      class="task-check"
      type="checkbox"
      :checked="isComplete"
      @change="$emit('toggle', id)"
    />
    <div class="task-label" :class="{ done: isComplete }">
      {{ label }}
    </div>
    <button class="update-task-btn" type="button" @click="$emit('update', id)">
      ✏️
    </button>
    <button class="delete-task-btn" type="button" @click="$emit('delete', id)">
      ❌
    </button>
  </li>
</template>

<style scoped>
.task {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.task-check {
  width: 18px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
}

.task-label {
  flex: 1;
  word-break: break-word;
}

.task-label.done {
  text-decoration: line-through;
  color: #888;
}

button {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
}
</style>
