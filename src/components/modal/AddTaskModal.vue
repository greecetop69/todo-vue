<script setup>
import { useTasksStore } from '../../stores/tasksStore';

const store = useTasksStore();

let newTasks = { completed: false };

</script>

<template>
	<div class="form">
		<h3>Add a new task</h3>
		<label for="title"> Title *</label>
		<input v-model="newTasks.name" type="text" name="title" placeholder="Enter a title..."><br />
		<label for="description">Description *</label>
		<textarea v-model="newTasks.description" name="description" rows="4"
			placeholder="Enter a description..." /><br />
		<button @click="store.addTask(newTasks)" class="btn gray">Add Task</button>

	</div>
</template>

<style></style>