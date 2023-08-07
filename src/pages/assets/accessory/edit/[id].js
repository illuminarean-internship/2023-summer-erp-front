import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../../../../utils/stringUtils';
import moment from 'moment';
import useLocationsData from '../../../../hooks/useLocationsData';
import axios from 'axios';
import PageWrapper from '../../../../components/form/PageWrapper';
import { EditNote } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import AccessoryForm from '../../../../components/form/AccessoryForm';
const AccessoryEdit = () => {
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
            .get(`http://43.200.193.130:4040/api/accessory/item/${id}`)
            .then((res) => {
                const accessoryData = res.data;
                const filteredData = filterRelevantData(accessoryData);
                setAccessoryInfo(filteredData);
                console.log(filteredData);
            });
    }, []);

    const filterRelevantData = (accessoryData) => {
        const {
            model,
            category,
            serialNumber,
            location,
            currency,
            price,
            surtax,
            totalPrice,
            illuSerialNumber,
            color,
            purchaseDate,
            purchasedFrom,
            remarks,
            history,
        } = accessoryData;

        const updatedHistory = history.length
            ? history.map((historyEntry) => ({
                  ...historyEntry,
                  id: uuidv4(),
                  startDate: formatDate(historyEntry.startDate),
                  endDate: formatDate(historyEntry.endDate),
              }))
            : [
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
            location,
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
            const response = await axios.put(
                `http://43.200.193.130:4040/api/accessory/item/${id}`,
                accessoryInfo,
            );
            console.log('Accessory edited successfully:', response.data);
            router.push(`/assets/accessory/info/${id}`);
        } catch (error) {
            console.error('Error edting accessory:', error);
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
        <PageWrapper title="Edit" icon={<EditNote />} href="/assets/accessory">
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

export default AccessoryEdit;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
