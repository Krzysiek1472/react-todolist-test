import { axiosRequest } from "./request";
import { Task } from '../models/Task';

export class ToDoListApi {
    static getAllTasks() {
        return axiosRequest<Task[]>('/tasks/GetAllTasks', 'GET');
    }

    static addTask(task: Task) {
        return axiosRequest<void>('/tasks/AddTask', 'POST', { body: task });
    }

    static editTask(task: Task) {
        return axiosRequest<void>('/tasks/EditTask', 'PUT', { body: task });
    }

    static getTask(id: number) {
        const params = {
            id: id.toString()
        }
        return axiosRequest<Task>('/tasks/GetTask', 'GET', { params });
    }

    static removeTask(task: Task) {
        const params = {
            id: task.id.toString()
        }
        return axiosRequest<void>('/tasks/RemoveTask', 'DELETE', { params });
    }
}