import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocationsData from '../../../../hooks/useLocationsData';
import axios from 'axios';
import PageWrapper from '../../../../components/form/PageWrapper';
import { AddBoxOutlined, Build } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import TestDeviceForm from '../../../../components/form/TestDeviceForm';

const TestDeviceAdd = () => {
    const router = useRouter();
    const [isRepairVar, setIsRepairVar] = useState(false);
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
        isRepair: false,
        resellPrice: '',
        karrotPrice: '',
        request: '',
        replace: '',
        repairPrice: '',
        repairDetails: '',
        issues: '',
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

        let updatedTestDeviceInfo = {
            ...testDeviceInfo,
        };

        if (isRepairVar) {
            updatedTestDeviceInfo = {
                ...updatedTestDeviceInfo,
                isRepair: true,
            };
        } else {
            updatedTestDeviceInfo = {
                ...updatedTestDeviceInfo,
                isRepair: false,
                resellPrice: '',
                karrotPrice: '',
                request: '',
                replace: '',
                repairPrice: '',
                repairDetails: '',
                issues: '',
            };
        }

        try {
            const response = await axios.post(
                'http://internship-server.illuminarean.com:3000/api/test-device/',
                updatedTestDeviceInfo,
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

    const handleRepairClick = () => {
        setIsRepairVar(!isRepairVar);
    };

    return (
        <PageWrapper
            title="Add"
            icon={<AddBoxOutlined />}
            href="/assets/test-device"
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{ color: 'gray', flex: 1 }}
                >
                    New Test Device
                </Typography>
                <Button
                    variant={isRepairVar ? 'contained' : 'outlined'}
                    startIcon={<Build />}
                    onClick={handleRepairClick}
                >
                    Repair
                </Button>
            </Box>
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
                isRepairVar={isRepairVar}
            />
        </PageWrapper>
    );
};

export default TestDeviceAdd;
