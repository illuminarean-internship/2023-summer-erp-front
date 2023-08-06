import { AddBoxOutlined, DisabledByDefaultOutlined } from '@mui/icons-material';
import {
    Box,
    Container,
    Divider,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useLocationsData from '../../../../hooks/useLocationsData';
import BookForm from '../../../../components/form/BookForm';

const BooksAdd = () => {
    const router = useRouter();
    const [bookInfo, setBookInfo] = useState({
        title: '',
        team: '',
        location: null,
        purchaseDate: '',
        purchasedFrom: 'G 마켓',
        price: '',
        history: [],
        isArchived: false,
        isUnreserved: false,
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
            console.log(bookInfo);
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

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
                sx={{ p: 3 }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AddBoxOutlined />
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{ textAlign: 'left', mt: 3, mb: 3, ml: 0.5 }}
                    >
                        Add
                    </Typography>
                </Box>
                <IconButton href="/assets/books">
                    <DisabledByDefaultOutlined />
                </IconButton>
            </Box>
            <Container maxWidth="lg">
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: 'white',
                        padding: 4,
                        borderRadius: 3,
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{ color: 'gray' }}
                    >
                        New Book
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: 'gray' }} />
                    <BookForm
                        handleSubmit={handleSubmit}
                        bookInfo={bookInfo}
                        handleChange={handleChange}
                        locations={locations}
                        handleLocationChange={handleLocationChange}
                    />
                </Paper>
            </Container>
        </Box>
    );
};

export default BooksAdd;
