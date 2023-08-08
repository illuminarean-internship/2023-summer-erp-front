import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useLocationsData from '../../../../hooks/useLocationsData';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { formatDate } from '../../../../utils/stringUtils';
import PageWrapper from '../../../../components/form/PageWrapper';
import { ContentCopy } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import TestDeviceForm from '../../../../components/form/TestDeviceForm';
const TestDeviceCopy = () => {
    const router = useRouter();
    const { id } = router.query;

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

    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/test-device/item/${id}`)
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

        return {
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
        };
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
        try {
            const response = await axios.post(
                'http://43.200.193.130:4040/api/test-device/',
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
            title="Copy"
            icon={<ContentCopy />}
            href="/assets/test-device"
        >
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                {testDeviceInfo.serialNumber} - {testDeviceInfo.model}
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

export default TestDeviceCopy;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
