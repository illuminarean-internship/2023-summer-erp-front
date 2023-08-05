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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useBoolean from '../../hooks/useBoolean';

const Action = ({ params, setAlertVisible }) => {
    const [open, setOpen] = useState(false);
    const [deleteUrl, setDeleteUrl] = useState('');

    const {
        value: isUsers,
        setTrue: setIsUsersTrue,
        setFalse: setIsUsersFalse,
    } = useBoolean(false);

    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        const pathParsed = pathname.split('/');
        let url = '';

        if (pathParsed[1] === 'assets') {
            url = `${pathParsed[2]}/item`;
            setIsUsersFalse();
        } else {
            url = `${pathParsed[1]}/user`;
            setIsUsersTrue();
        }
        setDeleteUrl(url);
    }, [pathname, setIsUsersTrue, setIsUsersFalse]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteItem = () => {
        axios
            .delete(
                `http://43.200.193.130:4040/api/${deleteUrl}/${params.row._id}`,
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
            {!isUsers && (
                <Tooltip title="Copy item">
                    <IconButton href={`${pathname}/copy/${params.row._id}`}>
                        <ContentCopy />
                    </IconButton>
                </Tooltip>
            )}
            <Tooltip title="Item info">
                <IconButton href={`${pathname}/info/${params.row._id}`}>
                    <InfoOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title="Item edit">
                <IconButton href={`${pathname}/edit/${params.row._id}`}>
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

export default Action;
