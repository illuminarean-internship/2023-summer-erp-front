import {
    ContentCopy,
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

const BookAction = ({ params, setAlertVisible }) => {
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
                `http://43.200.193.130:4040/api/books/item/${params.row._id}`,
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
            <Tooltip title="Copy item">
                <IconButton href={`/assets/books/copy/${params.row._id}`}>
                    <ContentCopy />
                </IconButton>
            </Tooltip>
            <Tooltip title="Item info">
                <IconButton href={`/assets/books/info/${params.row._id}`}>
                    <InfoOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title="Item edit">
                <IconButton href={`/assets/books/edit/${params.row._id}`}>
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
                    {'Are you sure you want to delete this item?'}
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

export default BookAction;
