import { useState, useEffect } from 'react';
import axios from 'axios';

const useTeamData = () => {
    const [teamList, setTeamList] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(
                    'http://internship-server.illuminarean.com:4040/api/teams/',
                );
                const teamNames = response.data
                    .map((data) => data.name)
                    .filter(
                        (name) =>
                            !['Resold', 'Disuse', 'Office'].includes(name),
                    );
                setTeamList(teamNames);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, []);

    return teamList;
};

export default useTeamData;
