import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useTeamData from '../../../hooks/useTeamData';
import {
    Box,
    Container,
    Divider,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import { AddBoxOutlined, DisabledByDefaultOutlined } from '@mui/icons-material';
import useProjectData from '../../../hooks/useProjectData';
import UserForm from '../../../components/form/UserForm';
import Loading from '../../../components/Loading';

const UsersEdit = () => {
    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(true);

    const [userInfo, setUserInfo] = useState({
        name: '',
        team: null,
        project: [],
        field: '',
        remarks: '',
    });

    const teamList = useTeamData();
    const projectList = useProjectData();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleProjectChange = (index, newValue) => {
        setUserInfo((prevUserInfo) => {
            const updatedProjects = [...prevUserInfo.projects];
            updatedProjects[index].project = newValue;
            return { ...prevUserInfo, projects: updatedProjects };
        });
    };

    const handleTeamChange = (event, newValue) => {
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            team: newValue,
        }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `http://43.200.193.130:4040/api/users/user/${id}`,
                );
                const userData = response.data;

                // Convert projects data into the format expected by the UserForm component
                const convertedProjects = userData.project.map(
                    (projectName) => ({
                        project: projectName,
                    }),
                );

                // Update userInfo state with the fetched user data
                setUserInfo({
                    name: userData.name,
                    team: userData.team,
                    projects: convertedProjects,
                    field: userData.field,
                    remarks: userData.remarks,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Extract project names from userInfo.projects and filter out null values
        const projectNames = userInfo.projects
            .map((projectData) => projectData.project)
            .filter(Boolean);

        // Add the extracted project names to the project field in the userInfo object
        userInfo.project = projectNames;

        try {
            const response = await axios.put(
                `http://43.200.193.130:4040/api/users/user/${id}`, // Replace userId with the ID of the user you want to edit
                userInfo,
            );
            console.log('User updated successfully:', response.data);
            router.push(`/users/info/${id}`);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleAddProject = () => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            projects: [...prevUserInfo.projects, { project: null }],
        }));
    };

    const handleDeleteProject = (index) => {
        setUserInfo((prevUserInfo) => {
            const updatedProjects = [...prevUserInfo.projects];
            updatedProjects.splice(index, 1);
            return { ...prevUserInfo, projects: updatedProjects };
        });
    };

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
                    <AddBoxOutlined />
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{ textAlign: 'left', mt: 3, mb: 3, ml: 0.5 }}
                    >
                        Add
                    </Typography>
                </Box>
                <IconButton href="/users">
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
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{ color: 'gray' }}
                    >
                        User Name - Team
                    </Typography>
                    <Divider sx={{ my: 2, borderColor: 'gray' }} />
                    {loading ? (
                        <Loading />
                    ) : (
                        <UserForm
                            userInfo={userInfo}
                            teamList={teamList}
                            projectList={projectList}
                            handleChange={handleChange}
                            handleProjectChange={handleProjectChange}
                            handleSubmit={handleSubmit}
                            handleAddProject={handleAddProject}
                            handleDeleteProject={handleDeleteProject}
                            handleTeamChange={handleTeamChange}
                        />
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default UsersEdit;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
