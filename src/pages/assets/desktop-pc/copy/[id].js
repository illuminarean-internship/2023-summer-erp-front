import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocationsData from '../../../../hooks/useLocationsData';
import axios from 'axios';
import PageWrapper from '../../../../components/form/PageWrapper';
import { Divider, Typography } from '@mui/material';
import DesktopForm from '../../../../components/form/DesktopForm';
import { ContentCopy } from '@mui/icons-material';
import Loading from '../../../../components/Loading';
import moment from 'moment';

const DesktopPcCopy = () => {
    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(true);

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

    const generateNewIds = (data) => {
        return data.map((item) => ({
            ...item,
            id: uuidv4(),
        }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4040/api/desktop-pc/item/${id}`,
                );
                const desktopData = response.data;
                const formattedPurchaseDate = moment(
                    desktopData.purchaseDate,
                    'YYYY-MM-DD',
                ).isValid()
                    ? moment(desktopData.purchaseDate, 'YYYY-MM-DD').format(
                          'YYYY-MM-DD',
                      )
                    : '';

                const formattedHistory = desktopData.history.map(
                    (historyData) => {
                        const startDate = moment(
                            historyData.startDate,
                            'YYYY-MM-DD',
                        ).isValid()
                            ? moment(
                                  historyData.startDate,
                                  'YYYY-MM-DD',
                              ).format('YYYY-MM-DD')
                            : '';

                        const endDate = moment(
                            historyData.endDate,
                            'YYYY-MM-DD',
                        ).isValid()
                            ? moment(historyData.endDate, 'YYYY-MM-DD').format(
                                  'YYYY-MM-DD',
                              )
                            : '';

                        return {
                            ...historyData,
                            id: uuidv4(),
                            startDate,
                            endDate,
                        };
                    },
                );

                const desktopDataWithFormattedDates = {
                    ...desktopData,
                    purchaseDate: formattedPurchaseDate,
                    history: formattedHistory,
                    details: generateNewIds(desktopData.details),
                };

                setDesktopInfo(desktopDataWithFormattedDates);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

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
            console.log('Desktop PC copied successfully:', response.data);
            router.push('/assets/desktop-pc');
        } catch (error) {
            console.error('Error copying desktop pc:', error);
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
            title="Copy"
            icon={<ContentCopy />}
            href="/assets/desktop-pc"
        >
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                {`${desktopInfo.illumiSerial} - Desktop PC`}
            </Typography>
            <Divider sx={{ my: 2, borderColor: 'gray' }} />
            {loading ? (
                <Loading />
            ) : (
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
            )}
        </PageWrapper>
    );
};

export default DesktopPcCopy;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
