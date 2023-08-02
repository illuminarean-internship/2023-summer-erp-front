import { DisabledByDefaultOutlined, EditNote } from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useLocationsData from '../../../../hooks/useLocationsData';
import moment from 'moment';

const BooksEdit = () => {
    const router = useRouter();
    const { id } = router.query;

    const locations = useLocationsData();

    const [bookInfo, setBookInfo] = useState({
        title: '',
        team: '',
        location: null,
        purchaseDate: '',
        purchasedFrom: 'G 마켓',
        price: '',
        history: [],
    });

    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/books/item/${id}`)
            .then((res) => {
                const bookData = res.data;
                const filteredData = filterRelevantData(bookData);
                setBookInfo(filteredData);
            });
    }, []);

    const filterRelevantData = (bookData) => {
        const { title, location, purchaseDate, purchasedFrom, price, history } =
            bookData;
        return {
            title,
            location,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            purchasedFrom,
            price,
            history,
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://43.200.193.130:4040/api/books/item/${id}`,
                bookInfo,
            );
            console.log('Book updated successfully:', response.data);
            router.push(`/assets/books/info/${id}`); // Redirect to the book details page
        } catch (error) {
            console.error('Error updating book:', error);
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
                    <EditNote />
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{ textAlign: 'left', mt: 3, mb: 3, ml: 0.5 }}
                    >
                        Edit
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
                    <Typography variant="h5" component="h5">
                        {bookInfo.title}
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: 'gray' }} />
                    <form onSubmit={handleSubmit}>
                        <Container maxWidth="sm">
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ p: 1 }}
                            >
                                <Typography sx={{ mr: 2 }}>Title</Typography>
                                <Box mb={2} sx={{ width: '100%' }}>
                                    <TextField
                                        name="title"
                                        label="Enter"
                                        fullWidth
                                        value={bookInfo.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ p: 1 }}
                            >
                                <Typography sx={{ mr: 2 }}>Location</Typography>
                                <Autocomplete
                                    id="location"
                                    name="location"
                                    fullWidth
                                    value={bookInfo.location}
                                    onChange={(event, newValue) =>
                                        handleChange({
                                            target: {
                                                name: 'location',
                                                value: newValue,
                                            },
                                        })
                                    }
                                    options={locations}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Location"
                                            required
                                        />
                                    )}
                                />
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ p: 1 }}
                            >
                                <Typography sx={{ mr: 2 }}>
                                    Purchase Date
                                </Typography>

                                <Box mb={2}>
                                    <TextField
                                        name="purchaseDate"
                                        type="date"
                                        fullWidth
                                        value={bookInfo.purchaseDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ p: 1 }}
                            >
                                <Typography sx={{ mr: 2 }}>
                                    Purchased From
                                </Typography>
                                <TextField
                                    name="purchasedFrom"
                                    label="Purchased From"
                                    fullWidth
                                    value={bookInfo.purchasedFrom}
                                    onChange={handleChange}
                                    required
                                />
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ p: 1 }}
                            >
                                <Typography sx={{ mr: 2 }}>Price</Typography>
                                <TextField
                                    name="price"
                                    label="Price"
                                    type="number"
                                    fullWidth
                                    value={bookInfo.price}
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                ₩
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="center" mt={3}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Save
                                </Button>
                            </Box>
                        </Container>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default BooksEdit;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
