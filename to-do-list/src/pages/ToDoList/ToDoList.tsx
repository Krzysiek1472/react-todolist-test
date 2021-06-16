import React, { useState } from "react";
import { Task } from "../../models/Task";
import TaskItem from "../../components/TaskItem/TaskItem";
import styled from 'styled-components';
import { UseInit } from "../../utils/useInit";
import { Button } from "@material-ui/core";
import  AddTaskDialog  from '../../components/AddTaskDialog/AddTaskDialog';
import { ToDoListApi } from "../../http/toDoListApi";

const Header = styled.h1`
    font-size: 20px;
    color: grey;
`

const ToDoList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [dialogOpened, setDialogOpened] = useState(false);

    const loadData = async () => {
        const tasks = await ToDoListApi.getAllTasks();
        setTasks(tasks);
    }

    UseInit(() => {
        loadData();
    })

    const editTask = (item: Task) => {
        console.log('edit', item)
    }

    const addTask = async (item: Task) => {
        await ToDoListApi.addTask(item);
        toggleDialogOpen();
        await loadData();
    }

    const deleteTask = async (item: Task) => {
        await ToDoListApi.removeTask(item);
        await loadData();
    }

    const toggleDialogOpen = () => {
        setDialogOpened(!dialogOpened);
    }

    return (
        <>
            <Header>To do list:</Header>
            {tasks.map(x =>
                <TaskItem key={x.id} item={x} handleEdit={editTask} handleDelete={deleteTask}></TaskItem>
            )}
            <Button variant="contained" color='primary' onClick={toggleDialogOpen}>Add new</Button>

            <AddTaskDialog open={dialogOpened} handleCancel={toggleDialogOpen} itemAdded={addTask}></AddTaskDialog>
        </>
    )
}

export default ToDoList;