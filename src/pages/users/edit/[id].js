import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useTeamData from '../../../hooks/useTeamData';
import { Divider, Typography } from '@mui/material';
import { EditNote } from '@mui/icons-material';
import useProjectData from '../../../hooks/useProjectData';
import UserForm from '../../../components/form/UserForm';
import Loading from '../../../components/Loading';
import PageWrapper from '../../../components/form/PageWrapper';
import { v4 as uuidv4 } from 'uuid';

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
                    `http://localhost:4040/api/users/user/${id}`,
                );
                const userData = response.data;

                // Convert projects data into the format expected by the UserForm component
                const convertedProjects = userData.project.map(
                    (projectName) => ({
                        project: projectName,
                        key: uuidv4(),
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
                `http://localhost:4040/api/users/user/${id}`, // Replace userId with the ID of the user you want to edit
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
        <PageWrapper title="Edit" icon={<EditNote />} href="/users">
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                {`${userInfo.name} - ${userInfo.team}`}
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
        </PageWrapper>
    );
};

export default UsersEdit;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
