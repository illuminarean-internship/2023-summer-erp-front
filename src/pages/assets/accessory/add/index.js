import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PageWrapper from '../../../../components/form/PageWrapper';
import { AddBoxOutlined, Build } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import useLocationsData from '../../../../hooks/useLocationsData';
import AccessoryForm from '../../../../components/form/AccessoryForm';

const AccessoryAdd = () => {
    const router = useRouter();

    const [isRepairVar, setIsRepairVar] = useState(false);
    const [accessoryInfo, setAccessoryInfo] = useState({
        model: '',
        category: '',
        serialNumber: '',
        location: null,
        currency: 'KRW',
        price: '',
        surtax: '',
        totalPrice: '',
        illuSerialNumber: '',
        color: '',
        purchaseDate: '',
        purchasedFrom: '',
        remarks: '',
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
        setAccessoryInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleLocationChange = (event, newValue) => {
        setAccessoryInfo((prevInfo) => ({
            ...prevInfo,
            location: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedAccessoryInfo = {
            ...accessoryInfo,
        };

        if (isRepairVar) {
            updatedAccessoryInfo = {
                ...updatedAccessoryInfo,
                isRepair: true,
            };
        } else {
            updatedAccessoryInfo = {
                ...updatedAccessoryInfo,
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
                'http://internship-server.illuminarean.com:4040/api/accessory/',
                updatedAccessoryInfo,
            );
            console.log('Accessory created successfully:', response.data);
            router.push('/assets/accessory');
        } catch (error) {
            console.error('Error creating accessory:', error);
        }
    };

    const handleHistoryChange = (id, field, value) => {
        setAccessoryInfo((prevInfo) => {
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
        setAccessoryInfo((prevInfo) => {
            const updatedHistory = prevInfo.history.filter(
                (_, i) => i !== index,
            );
            return { ...prevInfo, history: updatedHistory };
        });
    };

    const handleAddHistory = () => {
        setAccessoryInfo((prevInfo) => ({
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
        setAccessoryInfo((prevInfo) => {
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

    const handlePriceChange = (e) => {
        const { value } = e.target;
        setAccessoryInfo((prevInfo) => ({
            ...prevInfo,
            price: value,
            totalPrice: Number(value) + Number(prevInfo.surtax), // Calculate totalPrice
        }));
    };

    const handleSurtaxChange = (e) => {
        const { value } = e.target;
        setAccessoryInfo((prevInfo) => ({
            ...prevInfo,
            surtax: value,
            totalPrice: Number(prevInfo.price) + Number(value), // Calculate totalPrice
        }));
    };

    const handleRepairClick = () => {
        setIsRepairVar(!isRepairVar);
    };

    return (
        <PageWrapper
            title="Add"
            icon={<AddBoxOutlined />}
            href="/assets/accessory"
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{ color: 'gray', flex: 1 }}
                >
                    New Accessory
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
            <AccessoryForm
                handleSubmit={handleSubmit}
                accessoryInfo={accessoryInfo}
                handleChange={handleChange}
                locations={locations}
                handleLocationChange={handleLocationChange}
                handleHistoryChange={handleHistoryChange}
                handleDeleteHistory={handleDeleteHistory}
                handleAddHistory={handleAddHistory}
                handleHistoryLocationChange={handleHistoryLocationChange}
                handlePriceChange={handlePriceChange}
                handleSurtaxChange={handleSurtaxChange}
                isRepairVar={isRepairVar}
            />
        </PageWrapper>
    );
};

export default AccessoryAdd;
