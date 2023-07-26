import { Box, Button, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log(session);
    if (status === 'loading') {
        <Loading></Loading>;
    }
    if (session) {
        router.push('/');
    }
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
                <Button
                    variant="contained"
                    sx={{ m: 4, py: 2, px: 10 }}
                    onClick={() => signIn()}
                >
                    Login now
                </Button>
            </Box>
        </>
    );
};

export default Login;
