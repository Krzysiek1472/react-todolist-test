import { axiosRequest } from "./request";
import { Task } from '../models/Task';

export class ToDoListApi {
    static getAllTasks() {
        return axiosRequest<Task[]>('/tasks/GetAllTasks', 'GET');
    }

    static addTask(task: Task) {
        return axiosRequest<void>('/tasks/AddTask', 'POST', { body: task });
    }

    static removeTask(task: Task) {
        const params = {
            id: task.id
        }
        return axiosRequest<void>('/tasks/RemoveTask', 'DELETE', { params });
    }
}