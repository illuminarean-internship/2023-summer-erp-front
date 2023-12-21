import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocationsData from '../../../../hooks/useLocationsData';
import PageWrapper from '../../../../components/form/PageWrapper';
import { Build, EditNote } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import TestDeviceForm from '../../../../components/form/TestDeviceForm';
import axios from 'axios';
import { formatDate } from '../../../../utils/stringUtils';

const TestDeviceEdit = () => {
    const router = useRouter();
    const { id } = router.query;
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

    useEffect(() => {
        axios
            .get(`http://internship-server.illuminarean.com:3000/api/test-device/item/${id}`)
            .then((res) => {
                const testDeviceData = res.data;
                const filteredData = filterRelevantData(testDeviceData);
                setTestDeviceInfo(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching test device data:', error);
            });
    }, [id]);

    const filterRelevantData = (testDeviceData) => {
        const {
            model,
            category,
            RAM,
            memory,
            team,
            location,
            serialNumber,
            condition,
            color,
            totalPrice,
            purchasedFrom,
            remarks,
            currency,
            history,
            isRepair,
            resellPrice,
            karrotPrice,
            request,
            replace,
            repairPrice,
            repairDetails,
            issues,
        } = testDeviceData;

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
            model,
            category,
            RAM,
            memory,
            team,
            location,
            serialNumber,
            condition,
            color,
            totalPrice,
            purchasedFrom,
            remarks,
            currency,
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
                team: '',
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
            const response = await axios.put(
                `http://internship-server.illuminarean.com:3000/api/test-device/item/${id}`,
                updatedTestDeviceInfo,
            );
            console.log('Test device updated successfully:', response.data);
            router.push(`/assets/test-device/info/${id}`);
        } catch (error) {
            console.error('Error updating test device:', error);
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
            title="Edit"
            icon={<EditNote />}
            href="/assets/test-device"
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{ color: 'gray', flex: 1 }}
                >
                    {testDeviceInfo.serialNumber} - {testDeviceInfo.model}
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

export default TestDeviceEdit;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
