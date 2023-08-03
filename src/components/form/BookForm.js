import {
    Autocomplete,
    Box,
    Button,
    Container,
    Grid,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';

const BookForm = ({ handleSubmit, bookInfo, handleChange, locations }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="sm">
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Title</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <TextField
                                name="title"
                                label="Enter Title"
                                fullWidth
                                value={bookInfo.title}
                                onChange={handleChange}
                                required
                                inputProps={{
                                    style: {
                                        height: '16px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Team</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <TextField
                                name="team"
                                label="Auto-filled "
                                fullWidth
                                value={bookInfo.team}
                                onChange={handleChange}
                                disabled
                                inputProps={{
                                    style: {
                                        height: '16px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Location</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
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
                                        label="Select Location"
                                        required
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Purchase Date</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <TextField
                                name="purchaseDate"
                                type="date"
                                fullWidth
                                value={bookInfo.purchaseDate}
                                onChange={handleChange}
                                required
                                inputProps={{
                                    style: {
                                        height: '16px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Purchased From</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box display="flex" alignItems="center" height="100%">
                            <TextField
                                name="purchasedFrom"
                                label="Purchased From"
                                fullWidth
                                value={bookInfo.purchasedFrom}
                                onChange={handleChange}
                                required
                                inputProps={{
                                    style: {
                                        height: '16px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Price</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box display="flex" alignItems="center" height="100%">
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
                                    style: {
                                        height: '50px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </Box>
            </Container>
        </form>
    );
};

export default BookForm;
