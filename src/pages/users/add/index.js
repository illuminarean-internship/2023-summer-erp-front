import { useRouter } from 'next/router';
import { useState } from 'react';
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

const UsersAdd = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        name: '',
        team: null,
        projects: [
            { project: null }, // projectData will be { project: null } during the first iteration
        ],
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Extract project names from userInfo.projects and filter out null values
        const projectNames = userInfo.projects
            .map((projectData) => projectData.project)
            .filter(Boolean);

        // Create a new object without the projects field and add the extracted project names
        const updatedUserInfo = {
            ...userInfo,
            projects: undefined, // Remove the projects field from the object
            project: projectNames, // Add the extracted project names to the project field
        };

        try {
            const response = await axios.post(
                'http://43.200.193.130:4040/api/users/',
                updatedUserInfo,
            );
            console.log('User created successfully:', response.data);
            router.push('/users');
        } catch (error) {
            console.error('Error creating user:', error);
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
                </Paper>
            </Container>
        </Box>
    );
};

export default UsersAdd;
