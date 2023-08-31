import { CancelOutlined } from '@mui/icons-material';
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

const SettingAction = ({ params, setAlertVisible }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const deleteUser = () => {
        axios
            .put('http://localhost:4040/api/users/admin', {
                email: params.row.email,
                isAdmin: false,
            })
            .then(() => {
                setIsOpen(false);
                setAlertVisible(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Admin permission delete">
                <IconButton
                    onClick={() => {
                        handleOpen();
                    }}
                >
                    <CancelOutlined />
                </IconButton>
            </Tooltip>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {
                        'Are you sure you want to delete administrator privileges?'
                    }
                </DialogTitle>
                <DialogActions>
                    <Button onClick={deleteUser}>Delete</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SettingAction;
