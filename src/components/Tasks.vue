<script setup>
import { useTasksStore } from '../stores/tasksStore';


const store = useTasksStore();

const props = defineProps(['task']);

</script>


<template>

	<div class="task">
		<h3>
			{{ props.task.name }} - {{ props.task.id }}
		</h3>
		<p>
			{{ props.task.description }}
		</p>
		<div class="task-check">
			<input @click="store.toggleCompleted(task.id)" type="checkbox"
				:checked="props.task.completed" />
			<label>
				{{ props.task.completed ? 'Done' : 'To-Do' }}
			</label>
		</div>

		<span @click="store.deleteTask(props.task.id)" class="delete-btn">Delete</span>
	</div>

</template>

<style lang="scss">
.tasks {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;

	@media (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
	}
}

.task {
	display: flex;
	flex-direction: column;
	background-color: var(--white-color);
	color: var(--black-color);
	padding: 20px;
	border-radius: 12px;
	position: relative;


	h3 {
		font-size: 20px;
		font-weight: 700;
		line-height: 21px;
		letter-spacing: 0em;
		text-align: left;
	}

	p {
		margin-top: 24px;
		margin-bottom: 12px;
		font-size: 16px;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0em;
		text-align: left;
	}


	.task-check {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom: 10px;
		right: 10px;

		label {
			font-size: 13px;
			font-weight: 400;
			line-height: 16px;
			letter-spacing: 0em;
			text-align: left;
			margin-left: 5px;
			cursor: pointer;
		}

		input {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 18px;
			height: 18px;
			border-radius: 100%;
			border: 0.77px solid #AEAEB2;
			appearance: none;
			cursor: pointer;


			&:checked {
				background-color: #0A7AFF;
				border-color: #0A7AFF;

				&::before {
					content: '';
					display: block;
					width: 4.5px;
					height: 9px;
					border: solid white;
					border-width: 0 2px 2px 0;
					transform: rotate(45deg);
				}
			}
		}
	}
	.delete-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
	}
	.delete-btn:hover {
		text-decoration: underline;
		color: tan;
	}
}
</style>