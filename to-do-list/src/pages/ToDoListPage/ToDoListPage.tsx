import React, { useContext, useState } from "react";
import { Task } from "../../models/Task";
import TaskItem from "../../components/TaskItem/TaskItem";
import styled from 'styled-components';
import { UseInit } from "../../utils/useInit";
import { Button } from "@material-ui/core";
import  AddTaskDialog  from '../../dialogs/AddTaskDialog/AddTaskDialog';
import { ToDoListApi } from "../../http/toDoListApi";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";

const Header = styled.h1`
    font-size: 20px;
    color: grey;
`

const ToDoListPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [dialogOpened, setDialogOpened] = useState(false);
    const history = useHistory();
    const user = useContext(UserContext);

    const loadData = async () => {
        const tasks = await ToDoListApi.getAllTasks();
        setTasks(tasks);
    }

    UseInit(() => {
        loadData();
    })

    const editTask = async (item: Task) => {
        await ToDoListApi.editTask(item);
        await loadData();
        history.push(`/edit/${item.id}`);
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
            <div>Current user is: {user.firstName} {user.lastName} </div>
            <Header>To do list:</Header>
            {tasks.map(x =>
                <TaskItem key={x.id} item={x} handleEdit={editTask} handleDelete={deleteTask}></TaskItem>
            )}
            <Button variant="contained" color='primary' onClick={toggleDialogOpen}>Add new</Button>

            <AddTaskDialog open={dialogOpened} handleCancel={toggleDialogOpen} itemAdded={addTask}></AddTaskDialog>
        </>
    )
}

export default ToDoListPage;