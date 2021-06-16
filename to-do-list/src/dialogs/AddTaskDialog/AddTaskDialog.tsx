
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
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
    const handleAccept = (values: { name: string }, { resetForm }: FormikHelpers<{ name: string }>) => {
        itemAdded({
            id: 0,
            name: values.name
        });
        resetForm();
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
                            <FormControl error={!!errors.name}>
                                <InputLabel>Name</InputLabel>
                                <Input autoFocus name='name' value={values.name} onChange={handleChange} />
                                <FormHelperText id="component-error-text">{errors.name}</FormHelperText>
                            </FormControl>
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

