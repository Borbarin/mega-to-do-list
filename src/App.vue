<script setup>
import Task from './components/Task.vue'
import TASKS_KEY from '@/config.js'
import storage from '@/storage.js'
import { ref } from 'vue'

let tasks = loadTasks()
let lastId = tasks.reduce((max, task) => Math.max(max, Number(task.id) || 0), 0)
let editingId = null

const todoList = ref([])
const isModalOpen = ref(false)
const isEditing = ref(false)
const newTaskLabel = ref('')

function loadTasks() {
  const saved = storage.getItem(TASKS_KEY)
  return Array.isArray(saved) ? saved : []
}

function saveTasks() {
  storage.setItem(TASKS_KEY, tasks)
}

function renderTodoList() {
  todoList.value = tasks.map((task) => ({ ...task }))
}

function openModal() {
  editingId = null
  isEditing.value = false
  newTaskLabel.value = ''
  isModalOpen.value = true
}

function editItem(id) {
  const task = tasks.find((item) => item.id === id)
  if (!task) return

  editingId = id
  isEditing.value = true
  newTaskLabel.value = task.label
  isModalOpen.value = true
}

function createTask() {
  const label = newTaskLabel.value.trim()
  if (!label) return

  if (editingId !== null) {
    const task = tasks.find((item) => item.id === editingId)
    if (task) task.label = label
  } else {
    lastId += 1
    tasks.push({
      id: lastId,
      label,
      isComplete: false,
    })
  }

  saveTasks()
  renderTodoList()
  closeModal()
}

function closeModal() {
  isModalOpen.value = false
  newTaskLabel.value = ''
  editingId = null
  isEditing.value = false
}

function deleteItem(id) {
  tasks = tasks.filter((task) => task.id !== id)
  saveTasks()
  renderTodoList()
}

function setDone(id) {
  const task = tasks.find((item) => item.id === id)
  if (!task) return

  task.isComplete = !task.isComplete
  saveTasks()
  renderTodoList()
}

renderTodoList()
</script>

<template>
  <div class="todo">
    <ul>
      <Task
        v-for="task in todoList"
        :key="task.id"
        :id="task.id"
        :label="task.label"
        :isComplete="task.isComplete"
        @delete="deleteItem"
        @toggle="setDone"
        @update="editItem"
      />
    </ul>
    <button class="create-task-btn" @click="openModal">
      +
    </button>
  </div>
  <div v-if="isModalOpen" class="modal">
    <input
      v-model="newTaskLabel"
      placeholder="Что нужно сделать?"
      @keyup.enter="createTask"
    />
    <button @click="createTask">{{ isEditing ? 'Сохранить' : 'Создать' }}</button>
    <button @click="closeModal">Отмена</button>
  </div>
</template>

<style scoped>
.todo {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f5f7;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  list-style: none;
  padding: 0 0 90px;
  margin: 0;
  width: 100%;
  max-width: 700px;
}

.create-task-btn {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fbc02d;
  color: white;
  font-size: 32px;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
  z-index: 10;
}

.create-task-btn:hover {
  transform: translateX(-50%) scale(1.05);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
  padding: 20px;
  box-sizing: border-box;
}

.modal input {
  width: 100%;
  max-width: 300px;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 15px;
  outline: none;
}

.modal button {
  width: 100%;
  max-width: 300px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
}

.modal button:first-of-type {
  background-color: #fbc02d;
  color: white;
  font-weight: bold;
}

.modal button:last-of-type {
  background-color: #e0e0e0;
  color: #333;
}
</style>
