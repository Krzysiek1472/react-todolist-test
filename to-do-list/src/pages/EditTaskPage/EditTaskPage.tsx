import { UseInit } from "../../utils/useInit";
import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useContext, useState } from "react";
import { ToDoListApi } from "../../http/toDoListApi";
import { Task } from "../../models/Task";
import UserContext from "../../context/userContext";

const TaskSchema = Yup.object().shape({
    name: Yup.string().required('Field required'),
});

const EditTaskPage = () => {
    const params = useParams<{ id: string }>();
    const [task, setTask] = useState<Task>();
    const history = useHistory();
    const user = useContext(UserContext);

    const loadData = async () => {
        setTask(await ToDoListApi.getTask(+params.id));
    }

    UseInit(() => {
        loadData();
    })

    const handleAccept = async (values: Task) => {
        await ToDoListApi.editTask(values);
        goBack();
    }

    const handleCancel = () => {
        goBack();
    }

    const goBack = () => {
        history.goBack();
    }
    return (
        <>
            <div>Current user is: {user.firstName} {user.lastName} </div>
            {
                task ?
                <Formik
                    initialValues={task as Task}
                    onSubmit={handleAccept}
                    validationSchema={TaskSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <FormControl error={!!errors.name}>
                                <InputLabel>Name</InputLabel>
                                <Input autoFocus name='name' value={values.name} onChange={handleChange} />
                                <FormHelperText id="component-error-text">{errors.name}</FormHelperText>
                            </FormControl>
                            <Button color="primary" type='button' onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button color="primary" type='submit'>
                                Accept
                            </Button>
                        </form>
                    )}
                </Formik>
                : null
            }
        </>
    )
}

export default EditTaskPage;