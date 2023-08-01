import { CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';

const Loading = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="h6">Loading...</Typography>
            </>
        </Container>
    );
};

export default Loading;
