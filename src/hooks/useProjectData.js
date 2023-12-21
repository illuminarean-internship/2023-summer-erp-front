import axios from 'axios';
import { useEffect, useState } from 'react';

const useProjectData = () => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(
                    'http://internship-server.illuminarean.com:3000/api/projs/',
                );
                const projectNames = response.data.map((data) => data.name);
                setProjectList(projectNames);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchTeams();
    }, []);

    return projectList;
};

export default useProjectData;
