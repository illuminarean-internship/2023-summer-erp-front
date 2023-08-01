import { Box, Button, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from 'public/images/logo.png';

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        <Loading />;
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
                <Image src={logo} alt="일루미나리안 로고" width="300" />
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
