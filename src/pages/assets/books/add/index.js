import { AddBoxOutlined } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useLocationsData from '../../../../hooks/useLocationsData';
import BookForm from '../../../../components/form/BookForm';
import PageWrapper from '../../../../components/form/PageWrapper';
import { v4 as uuidv4 } from 'uuid';

const BooksAdd = () => {
    const router = useRouter();
    const [bookInfo, setBookInfo] = useState({
        title: '',
        team: '',
        location: null,
        purchaseDate: '',
        purchasedFrom: 'G 마켓',
        price: '',
        currency: '₩',
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
        setBookInfo((prevInfo) => ({
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
                setBookInfo((prevInfo) => ({
                    ...prevInfo,
                    location: newValue,
                    team: selectedLocation.team,
                }));
            }
        } else {
            setBookInfo((prevInfo) => ({
                ...prevInfo,
                location: newValue,
                team: '', // If location is cleared, also clear the team
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://43.200.193.130:4040/api/books',
                bookInfo,
            );
            console.log('Book created successfully:', response.data);
            router.push('/assets/books');
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    const handleHistoryChange = (id, field, value) => {
        setBookInfo((prevBookInfo) => {
            const updatedHistory = prevBookInfo.history.map((historyData) => {
                if (historyData.id === id) {
                    return { ...historyData, [field]: value };
                }
                return historyData;
            });
            return { ...prevBookInfo, history: updatedHistory };
        });
    };

    const handleDeleteHistory = (index) => {
        setBookInfo((prevBookInfo) => {
            const updatedHistory = prevBookInfo.history.filter(
                (_, i) => i !== index,
            );
            return { ...prevBookInfo, history: updatedHistory };
        });
    };

    const handleAddHistory = () => {
        setBookInfo((prevBookInfo) => ({
            ...prevBookInfo,
            history: [
                ...prevBookInfo.history,
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
        setBookInfo((prevBookInfo) => {
            // Find the index of the history entry with the given id
            const historyIndex = prevBookInfo.history.findIndex(
                (historyData) => historyData.id === id,
            );

            // Create a copy of the history entry and update the historyLocation field
            const updatedHistoryEntry = {
                ...prevBookInfo.history[historyIndex],
                historyLocation: newValue,
            };

            // Create a copy of the history array and replace the updated history entry
            const updatedHistory = [...prevBookInfo.history];
            updatedHistory[historyIndex] = updatedHistoryEntry;

            // Update the bookInfo state with the updated history array
            return {
                ...prevBookInfo,
                history: updatedHistory,
            };
        });
    };

    return (
        <PageWrapper title="Add" icon={<AddBoxOutlined />} href="/assets/books">
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                New Book
            </Typography>
            <Divider sx={{ my: 2, borderColor: 'gray' }} />
            <BookForm
                handleSubmit={handleSubmit}
                bookInfo={bookInfo}
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

export default BooksAdd;
