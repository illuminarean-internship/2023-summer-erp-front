import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocationsData from '../../../../hooks/useLocationsData';
import PageWrapper from '../../../../components/form/PageWrapper';
import { Build, EditNote } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import LaptopForm from '../../../../components/form/LaptopForm';
import { formatDate } from '../../../../utils/stringUtils';
import moment from 'moment';

const LaptopEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const [isRepairVar, setIsRepairVar] = useState(false);

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

    useEffect(() => {
        axios
            .get(`http://internship-server.illuminarean.com:4040/api/laptop/item/${id}`)
            .then((res) => {
                const laptopData = res.data;
                const filteredData = filterRelevantData(laptopData);
                setLaptopInfo(filteredData);
            });
    }, []);

    const filterRelevantData = (laptopData) => {
        const {
            category,
            model,
            CPU,
            RAM,
            SSD,
            serialNumber,
            location,
            currency,
            price,
            warranty,
            surtax,
            totalPrice,
            illumiSerial,
            color,
            purchaseDate,
            purchasedFrom,
            remarks,
            history,
            isRepair,
            resellPrice,
            karrotPrice,
            request,
            replace,
            repairPrice,
            repairDetails,
            issues,
        } = laptopData;

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

        let updatedData = {
            category,
            model,
            CPU,
            RAM,
            SSD,
            serialNumber,
            location,
            warranty,
            currency,
            price,
            surtax,
            totalPrice,
            illumiSerial,
            color,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            purchasedFrom,
            remarks,
            history: updatedHistory,
            isRepair,
            resellPrice,
            karrotPrice,
            request,
            replace,
            repairPrice,
            repairDetails,
            issues,
        };

        // isRepair가 false일 때 관련 필드들 초기화
        if (!isRepair) {
            updatedData = {
                ...updatedData,
                resellPrice: '',
                karrotPrice: '',
                request: '',
                replace: '',
                repairPrice: '',
                repairDetails: '',
                issues: '',
            };
        }

        return updatedData;
    };

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

        let updatedLaptopInfo = {
            ...laptopInfo,
            price: priceNumber,
            surtax: surtaxNumber,
        };

        if (isRepairVar) {
            updatedLaptopInfo = {
                ...updatedLaptopInfo,
                isRepair: true,
            };
        } else {
            updatedLaptopInfo = {
                ...updatedLaptopInfo,
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
            const response = await axios.put(
                `http://internship-server.illuminarean.com:4040/api/laptop/item/${id}`,
                updatedLaptopInfo,
            );
            console.log('Laptop edited successfully:', response.data);
            router.push(`/assets/laptop/info/${id}`);
        } catch (error) {
            console.error('Error edting Laptop:', error);
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

    const handleRepairClick = () => {
        setIsRepairVar(!isRepairVar);
    };

    return (
        <PageWrapper title="Edit" icon={<EditNote />} href="/assets/laptop">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{ color: 'gray', flex: 1 }}
                >
                    ({laptopInfo.serialNumber}) -{laptopInfo.model}
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
                isRepairVar={isRepairVar}
            />
        </PageWrapper>
    );
};

export default LaptopEdit;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
