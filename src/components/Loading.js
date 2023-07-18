import { Box, Typography } from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';

const Loading = () => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <img src="/images/logo.png" style={{ width: '350px' }} />
                <Typography variant="h4" sx={{ m: 3, color: '#103064' }}>
                    Inventory Management System
                </Typography>
                <LoadingButton loading variant="outlined">
                    Submit
                </LoadingButton>
            </Box>
        </>
    );
};

export default Loading;
