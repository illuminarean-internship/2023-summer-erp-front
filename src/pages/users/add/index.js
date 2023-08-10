import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import useTeamData from '../../../hooks/useTeamData';
import { Divider, Typography } from '@mui/material';
import { AddBoxOutlined } from '@mui/icons-material';
import useProjectData from '../../../hooks/useProjectData';
import UserForm from '../../../components/form/UserForm';
import PageWrapper from '../../../components/form/PageWrapper';
import { v4 as uuidv4 } from 'uuid';

const UsersAdd = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        name: '',
        team: null,
        projects: [
            { project: null, key: uuidv4() }, // projectData will be { project: null } during the first iteration
        ],
        field: '',
        remarks: '',
        email: '',
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
            projects: [
                ...prevUserInfo.projects,
                { project: null, key: uuidv4() },
            ],
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
        <PageWrapper title="Add" icon={<AddBoxOutlined />} href="/users">
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                New User
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
        </PageWrapper>
    );
};

export default UsersAdd;
