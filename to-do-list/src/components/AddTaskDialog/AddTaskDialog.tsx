
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Task } from "../../models/Task";
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const TaskSchema = Yup.object().shape({
    name: Yup.string().required('Field required'),
});

export interface AddTaskDialogProps {
    open: boolean;
    itemAdded: (item: Task) => void;
    handleCancel: () => void;
}

const AddTaskDialog = ({ open, itemAdded, handleCancel }: AddTaskDialogProps) => {
    const handleAccept = (values: { name: string }, { setSubmitting }: FormikHelpers<{ name: string }>) => {
        console.log(values);
        setSubmitting(false);
    }

    return (
        <Formik
            initialValues={{ name: '' }}
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
                <Dialog open={open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Task</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                error={!!errors.name}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                value={values.name}
                                onChange={handleChange}
                            />
                            <span>{errors.name}</span>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" type='button' onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button color="primary" type='submit'>
                                Accept
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            )}
        </Formik>

    )
}

export default AddTaskDialog;

