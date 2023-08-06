import { AddBoxOutlined } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useLocationsData from '../../../../hooks/useLocationsData';
import BookForm from '../../../../components/form/BookForm';
import PageWrapper from '../../../../components/form/PageWrapper';

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
            />
        </PageWrapper>
    );
};

export default BooksAdd;
