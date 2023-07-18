import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CategoryButton from './CategoryButton';

export default function AddCategoryButton({
    categoryButtonList,
    setCategoryButtonList,
}) {
    const [open, setOpen] = React.useState(false);
    const [textValue, setTextValue] = React.useState(''); //tracks the text in the component,

    const addItemToCategoryButtonList = () => {
        setCategoryButtonList((existingItems) => {
            return [
                <CategoryButton name={textValue} link="test" size={0} />,
                ...existingItems,
            ];
            // return [getRandomNumber()].concat(existingItems);
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (isSubmit = false) => {
        textValue && isSubmit && addItemToCategoryButtonList(); //lifts the state up
        setOpen(false);
    };
    const handleChange = (event) => {
        setTextValue(event.target.value);

        console.log('value is:', event.target.value);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + New
            </Button>
            <Dialog open={open} onClose={() => handleClose(false)}>
                <DialogTitle>New Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add the name of the new category
                    </DialogContentText>
                    <TextField
                        autoFocus
                        onChange={handleChange}
                        margin="dense"
                        id="name"
                        label="category name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={() =>
                            textValue
                                ? handleClose(true)
                                : alert('enter a valid name')
                        }
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
