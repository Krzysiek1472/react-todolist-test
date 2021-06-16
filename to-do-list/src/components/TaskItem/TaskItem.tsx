import React from "react";
import { Task } from "../../models/Task";

export interface TaskItemProps {
    handleEdit: (item: Task) => any;
    handleDelete: (item: Task) => any;
    item: Task;
}

const TaskItem = ({ item, handleEdit, handleDelete }: TaskItemProps) => {
    return (
        <div>
            <span>{item.name}</span>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item)}>Delete</button>
        </div>
    )
}

export default TaskItem;