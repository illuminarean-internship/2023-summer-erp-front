// We don't use this component anymore. we this leave here just in case.

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CategoryButton from './CategoryItem';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { useState } from 'react';

export default function AddCategoryDialog({
    categoryButtonList,
    setCategoryButtonList,
}) {
    const [isOpenedState, setIsOpened] = useState(false);
    const [textValue, setTextValue] = useState(''); //tracks the text in the component,

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
        setIsOpened(true);
    };

    const handleClose = (isSubmit = false) => {
        textValue && isSubmit && addItemToCategoryButtonList(); //lifts the state up
        setIsOpened(false);
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
            <Dialog open={isOpenedState} onClose={() => handleClose(false)}>
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
// We don't use this component anymore. we this leave here just in case.
