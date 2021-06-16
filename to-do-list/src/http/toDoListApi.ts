import { axiosRequest } from "./request";
import { Task } from '../models/Task';

export const getAllTasks = () => {
    return axiosRequest<Task[]>('/tasks/GetAllTasks', 'GET');
}

export const addTask = (task: Task) => {
    return axiosRequest<void>('/tasks/AddTask', 'POST', { body: task });
}

export const removeTask = (task: Task) => {
    const params = {
        id: task.id
    }
    return axiosRequest<void>('/tasks/RemoveTask', 'DELETE', { params });
}