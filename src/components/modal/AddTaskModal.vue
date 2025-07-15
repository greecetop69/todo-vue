<script setup>
import { ErrorMessage, Field, Form, useField } from 'vee-validate';
import { useTasksStore } from '../../stores/tasksStore';
import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

const store = useTasksStore();

let newTasks = { completed: false };

const validationSchema = toTypedSchema(
	z.object({
		title: z.string().min(1, 'Title is required'),
		description: z.string().min(1, 'Description is required'),
	})
);

const { value: title, errorMessage: titleError } = useField('title');
const { value: description, errorMessage: descriptionError } = useField('description');

function onSubmit(values) {
	store.addTask({ ...newTasks, name: values.title, description: values.description });
}
</script>

<template>
	<div class="form max-w-md mx-auto p-6">
		<h3 class="text-xl font-semibold mb-4">Add a new task</h3>

		<Form :validation-schema="validationSchema" @submit="onSubmit" class="flex flex-col gap-4">
			<div class="flex flex-col">
				<label for="title" class="text-sm font-medium text-gray-700">Title *</label>
				<Field :validate-on-input="true" v-model="title" type="text" name="title" placeholder="Enter a title..."
					class="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-[250px]"
					:class="{ 'border-red-500': titleError, 'focus:ring-red-500': titleError }" />
				<ErrorMessage name="title" class="text-xs text-red-600 mt-1" />
			</div>

			<div class="flex flex-col">
				<label for="description" class="text-sm font-medium text-gray-700">Description *</label>
				<Field :validate-on-input="true" as="textarea" v-model="description" type="text" name="description"
					placeholder="Enter a description..."
					class="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-[250px]"
					:class="{ 'border-red-500': descriptionError, 'focus:ring-red-500': descriptionError }" />
				<ErrorMessage name="description" class="text-xs text-red-600 mt-1" />
			</div>

			<button type="submit" class="bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
				Add Task
			</button>
		</Form>
	</div>
</template>