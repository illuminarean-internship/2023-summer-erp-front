import { AddBoxOutlined, DisabledByDefaultOutlined } from '@mui/icons-material';
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
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BookAdd = () => {
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

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Fetch locations data from the API and update the locations state
        axios
            .get('http://43.200.193.130:4040/api/users/')
            .then((response) => {
                const locationNames = response.data.map(
                    (location) => location.name,
                );
                setLocations(locationNames);
            })
            .catch((error) => {
                console.error('Error fetching locations:', error);
            });
    }, []);

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
                    <form onSubmit={handleSubmit}>
                        <Container maxWidth="sm">
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ p: 1 }}
                            >
                                <Typography sx={{ mr: 2 }}>Title</Typography>
                                <Box mb={2}>
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
                            {/* Automaticly chooesd by backend */}
                            {/* <Box
                                display="flex"
                                alignItems="center"
                                sx={{ p: 1 }}
                            >
                                <Typography sx={{ mr: 2 }}>Team</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="select-team">
                                        Select
                                    </InputLabel>
                                    <Select
                                        labelId="select-team"
                                        id="team"
                                        name="team"
                                        fullWidth
                                        value={bookInfo.team}
                                        onChange={(event) =>
                                            handleChange(event)
                                        }
                                        required
                                        label="Select"
                                    >
                                        <MenuItem value="Operation Team">
                                            Operation Team
                                        </MenuItem>
                                        <MenuItem value="Develop Team">
                                            Develop Team
                                        </MenuItem>
                                        <MenuItem value="Design Team">
                                            Design Team
                                        </MenuItem>
                                        <MenuItem value="Product Team">
                                            Product Team
                                        </MenuItem>
                                        <MenuItem value="QA Team">
                                            QA Team
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box> */}
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

export default BookAdd;
