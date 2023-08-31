import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocationsData from '../../../../hooks/useLocationsData';
import axios from 'axios';
import PageWrapper from '../../../../components/form/PageWrapper';
import { AddBoxOutlined } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import TestDeviceForm from '../../../../components/form/TestDeviceForm';

const TestDeviceAdd = () => {
    const router = useRouter();
    const [testDeviceInfo, setTestDeviceInfo] = useState({
        model: '',
        category: '',
        RAM: '',
        memory: '',
        team: '',
        location: null,
        serialNumber: '',
        condition: '',
        color: '',
        totalPrice: '',
        purchasedFrom: '',
        remarks: '',
        currency: 'KRW',
        history: [
            {
                startDate: '',
                endDate: '',
                historyLocation: null,
                historyRemark: '',
                id: uuidv4(),
            },
        ],
    });

    const locations = useLocationsData();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestDeviceInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    // Update team value when location is selected
    const handleLocationChange = (event, newValue) => {
        if (newValue) {
            const selectedLocation = locations.find(
                (location) => location.name === newValue,
            );
            if (selectedLocation) {
                setTestDeviceInfo((prevInfo) => ({
                    ...prevInfo,
                    location: newValue,
                    team: selectedLocation.team,
                }));
            }
        } else {
            setTestDeviceInfo((prevInfo) => ({
                ...prevInfo,
                location: newValue,
                team: '', // If location is cleared, also clear the team
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:4040/api/test-device/',
                testDeviceInfo,
            );
            console.log('Test device created successfully:', response.data);
            router.push('/assets/test-device');
        } catch (error) {
            console.error('Error creating test device:', error);
        }
    };

    const handleHistoryChange = (id, field, value) => {
        setTestDeviceInfo((prevInfo) => {
            const updatedHistory = prevInfo.history.map((historyData) => {
                if (historyData.id === id) {
                    return { ...historyData, [field]: value };
                }
                return historyData;
            });
            return { ...prevInfo, history: updatedHistory };
        });
    };

    const handleDeleteHistory = (index) => {
        setTestDeviceInfo((prevInfo) => {
            const updatedHistory = prevInfo.history.filter(
                (_, i) => i !== index,
            );
            return { ...prevInfo, history: updatedHistory };
        });
    };

    const handleAddHistory = () => {
        setTestDeviceInfo((prevInfo) => ({
            ...prevInfo,
            history: [
                ...prevInfo.history,
                {
                    id: uuidv4(),
                    startDate: '',
                    endDate: '',
                    historyLocation: null,
                    historyRemark: '',
                },
            ],
        }));
    };

    const handleHistoryLocationChange = (id, newValue) => {
        setTestDeviceInfo((prevInfo) => {
            const historyIndex = prevInfo.history.findIndex(
                (historyData) => historyData.id === id,
            );

            const updatedHistoryEntry = {
                ...prevInfo.history[historyIndex],
                historyLocation: newValue,
            };

            const updatedHistory = [...prevInfo.history];
            updatedHistory[historyIndex] = updatedHistoryEntry;

            return {
                ...prevInfo,
                history: updatedHistory,
            };
        });
    };

    return (
        <PageWrapper
            title="Add"
            icon={<AddBoxOutlined />}
            href="/assets/test-device"
        >
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                (Serial Number) - Category Model
            </Typography>
            <Divider sx={{ my: 2, borderColor: 'gray' }} />
            <TestDeviceForm
                handleSubmit={handleSubmit}
                testDeviceInfo={testDeviceInfo}
                handleChange={handleChange}
                locations={locations}
                handleLocationChange={handleLocationChange}
                handleHistoryChange={handleHistoryChange}
                handleDeleteHistory={handleDeleteHistory}
                handleAddHistory={handleAddHistory}
                handleHistoryLocationChange={handleHistoryLocationChange}
            />
        </PageWrapper>
    );
};

export default TestDeviceAdd;
