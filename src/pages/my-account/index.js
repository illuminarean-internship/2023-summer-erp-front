import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useSession, signOut } from 'next-auth/react';
import PageWrapper from '../../components/form/PageWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
const MyAccount = () => {
    const { data: session } = useSession();
    const [userTeam, setTeam] = useState('');
    const [userProjects, setUserProjects] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4040/api/users?email=${email}`,
            );
            setTeam(response.data[0].team);
            setUserProjects(response.data[0].project);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const { image, name, email } = session.user;
    return (
        <>
            <PageWrapper href="/">
                <Container>
                    <Typography variant="h4">My account</Typography>
                    <Box sx={{ m: 4, mb: 5 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Login Info
                        </Typography>
                        <Typography variant="h7" sx={{ m: 2 }}>
                            Logged in by {email}
                        </Typography>
                    </Box>
                    <Box sx={{ m: 4, mb: 2 }}>
                        <Typography variant="h5">Name</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                alt="user image"
                                src={image}
                                sx={{ width: 56, height: 56, m: 2 }}
                            />
                            <Typography variant="h7">{name}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ m: 4, mb: 5, mt: 0 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Team
                        </Typography>
                        <Typography variant="h7" sx={{ m: 2 }}>
                            {userTeam}
                        </Typography>
                    </Box>
                    <Box sx={{ m: 4, mb: 5 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Project
                        </Typography>
                        <Typography variant="h7" sx={{ m: 2 }}>
                            {userProjects && userProjects.join(', ')}
                        </Typography>
                    </Box>
                    <Box sx={{ m: 4, mb: 5 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Contact Info
                        </Typography>
                        <Typography variant="h7" sx={{ m: 2 }}>
                            {email}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => signOut()}
                        >
                            LogOut
                        </Button>
                    </Box>
                </Container>
            </PageWrapper>
        </>
    );
};

export default MyAccount;
