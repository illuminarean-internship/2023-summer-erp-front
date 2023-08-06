import React from 'react';
import { Box, Container, Paper, Typography, IconButton } from '@mui/material';
import { DisabledByDefaultOutlined } from '@mui/icons-material';

const PageWrapper = ({ title, icon, href, children }) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
                sx={{ p: 3 }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {icon}
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{ textAlign: 'left', mt: 3, mb: 3, ml: 0.5 }}
                    >
                        {title}
                    </Typography>
                </Box>
                <IconButton href={href}>
                    <DisabledByDefaultOutlined />
                </IconButton>
            </Box>
            <Container maxWidth="lg">
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: 'white',
                        padding: 4,
                        borderRadius: 3,
                    }}
                >
                    {children}
                </Paper>
            </Container>
        </Box>
    );
};

export default PageWrapper;
