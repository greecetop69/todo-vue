import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTasksStore = defineStore("tasks", () => {
    const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);

    const modalIsActive = ref(false);
    const filterBy = ref("");

    const filteredTasks = computed(() => {
        switch (filterBy.value) {
            case "todo":
                return tasks.value.filter((task) => !task.completed);
            case "done":
                return tasks.value.filter((task) => task.completed);
            default:
                return tasks.value;
        }
    });

    function setFilter(value) {
        filterBy.value = value;
    }

    function addTask(newTask) {
        if (newTask.name && newTask.description) {
            newTask.id = tasks.value.length
                ? Math.max(...tasks.value.map((task) => task.id)) + 1
                : 1;
            tasks.value.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks.value));
            closeModal();
        }
    }

    function deleteTask(id) {
        if (id) {
            const index = tasks.value.findIndex((task) => task.id === id);
            if (index !== -1) {
                tasks.value.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks.value));
                console.log("Tasks after delete:", tasks.value);
            }
        }
    }

    function openModal() {
        modalIsActive.value = true;
    }

    function closeModal() {
        modalIsActive.value = false;
    }

    function toggleCompleted(id) {
        const task = tasks.value.find((task) => task.id === id);
        if (task) {
            task.completed = !task.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks.value));
        }
    }

    return {
        tasks,
        modalIsActive,
        filterBy,
        filteredTasks,
        setFilter,
        addTask,
        deleteTask,
        openModal,
        closeModal,
        toggleCompleted,
    };
});
