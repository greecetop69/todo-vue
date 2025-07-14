import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useTasksStore = defineStore("tasks", () => {
    let tasks = reactive(JSON.parse(localStorage.getItem("tasks")) || []);

    const modalIsActive = ref(false);

    const filterBy = ref("");

    const filteredTasks = computed(() => {
        switch (filterBy.value) {
            case "todo":
                return tasks.filter((task) => !task.completed);
            case "done":
                return tasks.filter((task) => task.completed);
            default:
                return tasks;
        }
    });

    function setFilter(value) {
        filterBy.value = value;
    }

    function addTask(newTask) {
        if (newTask.name && newTask.description) {
            newTask.id = tasks.length
                ? Math.max(...tasks.map((task) => task.id)) + 1
                : 1;
            tasks.push(newTask);
            closeModal();
        } else {
            return;
        }
    }

    function openModal() {
        modalIsActive.value = true;
    }

    function closeModal() {
        modalIsActive.value = false;
    }

    function toggleCompleted(id) {
        tasks.forEach((task) => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
        });
    }

    return {
        tasks,
        modalIsActive,
        filterBy,
        filteredTasks,
        setFilter,
        addTask,
        openModal,
        closeModal,
        toggleCompleted,
    };
});
