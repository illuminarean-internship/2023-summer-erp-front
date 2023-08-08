import { useState, useEffect } from 'react';
import axios from 'axios';

const useLocationsData = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(
                    'http://43.200.193.130:4040/api/users/',
                );
                const locationNames = response.data.map((location) => ({
                    name: location.name,
                    team: location.team,
                }));
                setLocations(locationNames);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    return locations;
};

export default useLocationsData;