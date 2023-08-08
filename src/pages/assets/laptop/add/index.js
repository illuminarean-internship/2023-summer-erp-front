import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PageWrapper from '../../../../components/form/PageWrapper';
import { AddBoxOutlined } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import useLocationsData from '../../../../hooks/useLocationsData';
import LaptopForm from '../../../../components/form/LaptopForm';
const LaptopAdd = () => {
    const router = useRouter();
    const [laptopInfo, setLaptopInfo] = useState({
        category: '',
        model: '',
        CPU: '',
        RAM: '',
        SSD: '',
        serialNumber: '',
        location: null,
        warranty: '',
        currency: 'KRW',
        price: '',
        surtax: '',
        totalPrice: '',
        illumiSerial: '',
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
    });
    const locations = useLocationsData();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLaptopInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleLocationChange = (event, newValue) => {
        setLaptopInfo((prevInfo) => ({
            ...prevInfo,
            location: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const priceNumber = parseFloat(laptopInfo.price);
        const surtaxNumber = parseFloat(laptopInfo.surtax);

        const updatedLaptopInfo = {
            ...laptopInfo,
            price: priceNumber,
            surtax: surtaxNumber,
        };

        try {
            const response = await axios.post(
                'http://43.200.193.130:4040/api/laptop/',
                updatedLaptopInfo,
            );
            console.log('Laptop created successfully:', response.data);
            router.push('/assets/laptop');
        } catch (error) {
            console.error('Error creating Laptop:', error);
            console.log(updatedLaptopInfo);
        }
    };

    const handleHistoryChange = (id, field, value) => {
        setLaptopInfo((prevInfo) => {
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
        setLaptopInfo((prevInfo) => {
            const updatedHistory = prevInfo.history.filter(
                (_, i) => i !== index,
            );
            return { ...prevInfo, history: updatedHistory };
        });
    };

    const handleAddHistory = () => {
        setLaptopInfo((prevInfo) => ({
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
        setLaptopInfo((prevInfo) => {
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
        setLaptopInfo((prevInfo) => ({
            ...prevInfo,
            price: value,
            totalPrice: Number(value) + Number(prevInfo.surtax), // Calculate totalPrice
        }));
    };

    const handleSurtaxChange = (e) => {
        const { value } = e.target;
        setLaptopInfo((prevInfo) => ({
            ...prevInfo,
            surtax: value,
            totalPrice: Number(prevInfo.price) + Number(value), // Calculate totalPrice
        }));
    };

    return (
        <PageWrapper
            title="Add"
            icon={<AddBoxOutlined />}
            href="/assets/laptop"
        >
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                (Serial Number) - Category Model
            </Typography>
            <Divider sx={{ my: 2, borderColor: 'gray' }} />
            <LaptopForm
                handleSubmit={handleSubmit}
                laptopInfo={laptopInfo}
                handleChange={handleChange}
                locations={locations}
                handleLocationChange={handleLocationChange}
                handleHistoryChange={handleHistoryChange}
                handleDeleteHistory={handleDeleteHistory}
                handleAddHistory={handleAddHistory}
                handleHistoryLocationChange={handleHistoryLocationChange}
                handlePriceChange={handlePriceChange}
                handleSurtaxChange={handleSurtaxChange}
            />
        </PageWrapper>
    );
};

export default LaptopAdd;
