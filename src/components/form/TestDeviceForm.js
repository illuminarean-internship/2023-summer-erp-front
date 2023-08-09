import { ArrowDropDown, ArrowDropUp, Delete } from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

const TestDeviceForm = ({
    handleSubmit,
    testDeviceInfo,
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
        { value: 'KRW', label: '₩ (KRW)' },
        { value: 'USD', label: '$ (USD)' },
        { value: 'JPY', label: '￥ (JPY)' },
    ];

    const categoryOptions = ['Android', 'iOS', 'Galaxy Note', 'iPad', 'Others'];

    const ramOptions = ['3G', '4G', '6G', '8G', '12G', '16G'];

    const memoryOptions = ['32G', '64G', '128G', '256G', '512G', '1TB'];

    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="md">
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Model</Typography>
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
                                name="model"
                                label="Enter Model"
                                fullWidth
                                value={testDeviceInfo.model}
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
                            <Typography>Category</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="select-category-label">
                                    Select Category
                                </InputLabel>
                                <Select
                                    labelId="select-category-label"
                                    variant="outlined"
                                    id="category-select"
                                    name="category"
                                    label="Select Category"
                                    value={testDeviceInfo.category}
                                    onChange={handleChange}
                                    displayEmpty
                                    sx={{
                                        height: '50px',
                                    }}
                                >
                                    {categoryOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>RAM</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="select-RAM-label">
                                    Select Memory
                                </InputLabel>
                                <Select
                                    labelId="select-RAM-label"
                                    variant="outlined"
                                    label="Select RAM"
                                    id="RAM-select"
                                    name="RAM"
                                    value={testDeviceInfo.RAM}
                                    onChange={handleChange}
                                    displayEmpty
                                    sx={{
                                        height: '50px',
                                    }}
                                >
                                    {ramOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Memory</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="select-memory-label">
                                    Select Memory
                                </InputLabel>
                                <Select
                                    labelId="select-memory-label"
                                    variant="outlined"
                                    label="Select Memory"
                                    id="memory-select"
                                    name="memory"
                                    value={testDeviceInfo.memory}
                                    onChange={handleChange}
                                    displayEmpty
                                    sx={{
                                        height: '50px',
                                    }}
                                >
                                    {memoryOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                value={testDeviceInfo.team}
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
                                value={testDeviceInfo.location}
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
                            <Typography>Serial Number</Typography>
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
                                name="serialNumber"
                                label="Enter Serial Number"
                                fullWidth
                                value={testDeviceInfo.serialNumber}
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
                            <Typography>Condition</Typography>
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
                                name="condition"
                                label="Enter Condition"
                                fullWidth
                                value={testDeviceInfo.condition}
                                onChange={handleChange}
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
                            <Typography>Color</Typography>
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
                                name="color"
                                label="Enter Color"
                                fullWidth
                                value={testDeviceInfo.color}
                                onChange={handleChange}
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
                            <Typography>Total Price</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box display="flex" alignItems="center" height="100%">
                            <TextField
                                name="totalPrice"
                                label="Enter Total Price"
                                type="number"
                                fullWidth
                                value={testDeviceInfo.totalPrice}
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
                                                value={testDeviceInfo.currency}
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
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Purchased From</Typography>
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
                                name="purchasedFrom"
                                label="Enter Purchase Location"
                                fullWidth
                                value={testDeviceInfo.purchasedFrom}
                                onChange={handleChange}
                                inputProps={{
                                    style: {
                                        height: '16px',
                                    },
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
                        {testDeviceInfo.history.map((historyData, index) => (
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
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Remarks</Typography>
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
                                name="remarks"
                                label="Enter Remarks"
                                fullWidth
                                value={testDeviceInfo.remarks}
                                onChange={handleChange}
                                inputProps={{
                                    style: {
                                        height: '16px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt={3}>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </Box>
            </Container>
        </form>
    );
};

export default TestDeviceForm;
