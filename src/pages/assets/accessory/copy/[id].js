import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocationsData from '../../../../hooks/useLocationsData';
import axios from 'axios';
import moment from 'moment';
import PageWrapper from '../../../../components/form/PageWrapper';
import { ContentCopy } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import AccessoryForm from '../../../../components/form/AccessoryForm';
const AccessoryCopy = () => {
    const router = useRouter();
    const { id } = router.query;

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
    });

    const locations = useLocationsData();

    useEffect(() => {
        axios
            .get(`http://internship-server.illuminarean.com:3000/api/accessory/item/${id}`)
            .then((res) => {
                const accessoryData = res.data;
                const filteredData = filterRelevantData(accessoryData);
                setAccessoryInfo(filteredData);
            });
    }, []);

    const filterRelevantData = (accessoryData) => {
        const {
            model,
            category,
            serialNumber,
            currency,
            price,
            surtax,
            totalPrice,
            illuSerialNumber,
            color,
            purchaseDate,
            purchasedFrom,
            remarks,
        } = accessoryData;

        const updatedHistory = [
            {
                startDate: '',
                endDate: '',
                historyLocation: null,
                historyRemark: '',
                id: uuidv4(),
            },
        ];

        return {
            model,
            category,
            serialNumber,
            location: null,
            currency,
            price,
            surtax,
            totalPrice,
            illuSerialNumber,
            color,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            purchasedFrom,
            remarks,
            history: updatedHistory,
        };
    };

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
        try {
            const response = await axios.post(
                'http://internship-server.illuminarean.com:3000/api/accessory/',
                accessoryInfo,
            );
            console.log('Accessory copied successfully:', response.data);
            router.push('/assets/accessory');
        } catch (error) {
            console.error('Error copying accessory:', error);
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

    return (
        <PageWrapper
            title="Copy"
            icon={<ContentCopy />}
            href="/assets/accessory"
        >
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                {accessoryInfo.model} - {accessoryInfo.category}
            </Typography>
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
            />
        </PageWrapper>
    );
};

export default AccessoryCopy;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
