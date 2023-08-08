import { ArrowDropDown, ArrowDropUp, Delete } from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

const BookForm = ({
    handleSubmit,
    bookInfo,
    handleChange,
    locations: locationsData,
    handleLocationChange,
    handleHistoryChange,
    handleDeleteHistory,
    handleAddHistory,
    handleHistoryLocationChange,
}) => {
    const locations = locationsData.map((location) => location.name);
    const [showHistory, setShowHistory] = useState(true);

    const currencyOptions = [
        { value: '₩', label: '₩ (KRW)' },
        { value: '$', label: '$ (USD)' },
        { value: '￥', label: '￥ (JPY)' },
    ];

    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="md">
                <Grid container spacing={2} sx={{ p: 1 }}>
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
                <Grid container spacing={2} sx={{ p: 1 }}>
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
                <Grid container spacing={2} sx={{ p: 1 }}>
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
                                onChange={handleLocationChange}
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
                <Grid container spacing={2} sx={{ p: 1 }}>
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
                <Grid container spacing={2} sx={{ p: 1 }}>
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
                <Grid container spacing={2} sx={{ p: 1 }}>
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
                                    style: {
                                        height: '50px',
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Select
                                                variant="standard"
                                                id="currency-select"
                                                name="currency"
                                                value={bookInfo.currency}
                                                onChange={handleChange}
                                            >
                                                {currencyOptions.map(
                                                    (option) => (
                                                        <MenuItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </MenuItem>
                                                    ),
                                                )}
                                            </Select>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="left" mt={3}>
                    <Button
                        variant="standard"
                        color="primary"
                        onClick={() =>
                            setShowHistory(
                                (prevShowHistory) => !prevShowHistory,
                            )
                        }
                    >
                        History
                        {showHistory ? <ArrowDropUp /> : <ArrowDropDown />}
                    </Button>
                </Box>
                {showHistory && (
                    <>
                        {bookInfo.history.map((historyData, index) => (
                            <Box
                                key={historyData.id}
                                display="flex"
                                flexDirection="column"
                                my={2}
                            >
                                <Grid container spacing={1}>
                                    <Grid
                                        item
                                        xs={2}
                                        container
                                        alignItems="center"
                                        sx={{ ml: 1.5 }}
                                    >
                                        <TextField
                                            variant="standard"
                                            type="date"
                                            value={historyData.startDate}
                                            onChange={(e) =>
                                                handleHistoryChange(
                                                    historyData.id,
                                                    'startDate',
                                                    e.target.value,
                                                )
                                            }
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={0.5}
                                        container
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Typography variant="body2">
                                            ~
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        container
                                        alignItems="center"
                                    >
                                        <TextField
                                            variant="standard"
                                            type="date"
                                            value={historyData.endDate}
                                            onChange={(e) =>
                                                handleHistoryChange(
                                                    historyData.id,
                                                    'endDate',
                                                    e.target.value,
                                                )
                                            }
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        container
                                        alignItems="center"
                                        sx={{ ml: 1 }}
                                    >
                                        <Autocomplete
                                            id={`historyLocation-${historyData.id}`}
                                            name={`historyLocation-${historyData.id}`}
                                            fullWidth
                                            value={historyData.historyLocation}
                                            onChange={(event, newValue) =>
                                                handleHistoryLocationChange(
                                                    historyData.id,
                                                    newValue,
                                                )
                                            }
                                            options={locations}
                                            getOptionLabel={(option) => option}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Location"
                                                    required
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3.5}
                                        container
                                        alignItems="center"
                                        sx={{ ml: 1 }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Remarks"
                                            value={historyData.historyRemark}
                                            onChange={(e) =>
                                                handleHistoryChange(
                                                    historyData.id,
                                                    'historyRemark',
                                                    e.target.value,
                                                )
                                            }
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={0.5}
                                        container
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteHistory(index)
                                            }
                                            size="small"
                                            color="error"
                                            disabled={index === 0}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                        <Box display="flex" justifyContent="right" mt={3}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAddHistory}
                            >
                                Add New History
                            </Button>
                        </Box>
                    </>
                )}
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
