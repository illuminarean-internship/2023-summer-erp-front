import {
    DeleteOutline,
    EditNoteOutlined,
    InfoOutlined,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const UserAction = ({ params, setAlertVisible }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteItem = () => {
        axios
            .delete(
                `http://internship-server.illuminarean.com:4040/api/users/user/${params.row._id}`,
            )
            .then(() => {
                setOpen(false);
                setAlertVisible(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Item info">
                <IconButton href={`users/info/${params.row._id}`}>
                    <InfoOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title="Item edit">
                <IconButton href={`users/edit/${params.row._id}`}>
                    <EditNoteOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title="Item delete">
                <IconButton
                    onClick={() => {
                        handleClickOpen();
                    }}
                >
                    <DeleteOutline />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are you sure you want to delete?'}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={deleteItem}>Delete</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserAction;
