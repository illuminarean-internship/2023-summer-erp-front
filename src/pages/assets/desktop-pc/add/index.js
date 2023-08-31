import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocationsData from '../../../../hooks/useLocationsData';
import PageWrapper from '../../../../components/form/PageWrapper';
import { AddBoxOutlined } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import axios from 'axios';
import DesktopForm from '../../../../components/form/DesktopForm';

const DesktopPcAdd = () => {
    const router = useRouter();
    const [desktopInfo, setDesktopInfo] = useState({
        illumiSerial: '',
        purchaseDate: '',
        purchasedFrom: '',
        purpose: '',
        location: null,
        details: [
            {
                category: '',
                name: '',
                price: '',
                currency: '₩',
                id: uuidv4(),
            },
        ],
        history: [
            {
                startDate: '',
                endDate: '',
                historyLocation: null,
                historyRemark: '',
                id: uuidv4(),
            },
        ],
        totalPrice: '',
        remarks: '',
    });

    const locations = useLocationsData();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesktopInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleLocationChange = (event, newValue) => {
        setDesktopInfo((prevInfo) => ({
            ...prevInfo,
            location: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:4040/api/desktop-pc',
                desktopInfo,
            );
            console.log('Desktop PC created successfully:', response.data);
            router.push('/assets/desktop-pc');
        } catch (error) {
            console.error('Error creating desktop pc:', error);
        }
    };

    const handleHistoryChange = (id, field, value) => {
        setDesktopInfo((prevInfo) => {
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
        setDesktopInfo((prevInfo) => {
            const updatedHistory = prevInfo.history.filter(
                (_, i) => i !== index,
            );
            return { ...prevInfo, history: updatedHistory };
        });
    };

    const handleAddHistory = () => {
        setDesktopInfo((prevInfo) => ({
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
        setDesktopInfo((prevInfo) => {
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

    const calculateTotalPrice = (details) => {
        if (details.length === 0 || !details[0].currency) {
            return '';
        }

        const currency = details[0].currency;

        const allSameCurrency = details.every(
            (detail) => detail.currency === currency,
        );

        if (!allSameCurrency) {
            return 'Error: Currencies are not the same';
        }

        let totalPrice = 0;
        for (const detail of details) {
            totalPrice += Number(detail.price);
        }

        return `${currency} ${totalPrice}`;
    };

    const handleDetailChange = (id, field, value) => {
        setDesktopInfo((prevDesktopInfo) => {
            const updatedDetails = prevDesktopInfo.details.map((detail) => {
                if (detail.id === id) {
                    return { ...detail, [field]: value };
                }
                return detail;
            });

            const totalPrice = calculateTotalPrice(updatedDetails);
            return { ...prevDesktopInfo, details: updatedDetails, totalPrice };
        });
    };

    const handleDetailDelete = (id) => {
        setDesktopInfo((prevDesktopInfo) => {
            const updatedDetails = prevDesktopInfo.details.filter(
                (detail) => detail.id !== id,
            );

            const totalPrice = calculateTotalPrice(updatedDetails);
            return { ...prevDesktopInfo, details: updatedDetails, totalPrice };
        });
    };

    const handleDetailAdd = () => {
        setDesktopInfo((prevDesktopInfo) => {
            const newDetail = {
                category: '',
                name: '',
                price: '',
                currency: '₩',
                id: uuidv4(),
            };

            const updatedDetails = [...prevDesktopInfo.details, newDetail];
            const totalPrice = calculateTotalPrice(updatedDetails);
            return { ...prevDesktopInfo, details: updatedDetails, totalPrice };
        });
    };

    return (
        <PageWrapper
            title="Add"
            icon={<AddBoxOutlined />}
            href="/assets/desktop-pc"
        >
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                (Illuminarean Serial Number) - Desktop PC
            </Typography>
            <Divider sx={{ my: 2, borderColor: 'gray' }} />
            <DesktopForm
                handleSubmit={handleSubmit}
                desktopInfo={desktopInfo}
                handleChange={handleChange}
                locations={locations}
                handleLocationChange={handleLocationChange}
                handleHistoryChange={handleHistoryChange}
                handleDeleteHistory={handleDeleteHistory}
                handleAddHistory={handleAddHistory}
                handleHistoryLocationChange={handleHistoryLocationChange}
                handleDetailChange={handleDetailChange}
                handleDetailDelete={handleDetailDelete}
                handleDetailAdd={handleDetailAdd}
            />
        </PageWrapper>
    );
};

export default DesktopPcAdd;
