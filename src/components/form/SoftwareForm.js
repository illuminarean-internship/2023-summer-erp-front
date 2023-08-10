import {
    Autocomplete,
    Box,
    Button,
    Container,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';

const SoftwareForm = ({
    handleSubmit,
    softwareInfo,
    handleChange,
    locations: locationsData,
    handleUserChange,
    handleUnitPriceChange,
    handleQuantityChange,
}) => {
    const locations = locationsData.map((location) => location.name);

    const currencyOptions = [
        { value: 'KRW', label: '₩ (KRW)' },
        { value: 'USD', label: '$ (USD)' },
        { value: 'JPY', label: '￥ (JPY)' },
    ];

    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="md">
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Name</Typography>
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
                                name="name"
                                label="Enter Name"
                                fullWidth
                                value={softwareInfo.name}
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
                                value={softwareInfo.purchaseDate}
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
                                value={softwareInfo.remarks}
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
                            <Typography>Currency</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box display="flex" alignItems="center" height="100%">
                            <Select
                                variant="outlined"
                                id="currency-select"
                                name="currency"
                                value={softwareInfo.currency}
                                onChange={handleChange}
                                sx={{ height: '43px' }}
                            >
                                {currencyOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Unit Price</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box display="flex" alignItems="center" height="100%">
                            <TextField
                                name="unitPrice"
                                label="Enter Unit Price"
                                type="number"
                                fullWidth
                                value={softwareInfo.unitPrice}
                                onChange={handleUnitPriceChange}
                                required
                                InputProps={{
                                    style: {
                                        height: '50px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Quantity</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box display="flex" alignItems="center" height="100%">
                            <TextField
                                name="quantity"
                                label="Enter Quantity"
                                type="number"
                                fullWidth
                                value={softwareInfo.quantity}
                                onChange={handleQuantityChange}
                                required
                                InputProps={{
                                    style: {
                                        height: '50px',
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
                                label="Total Price"
                                type="number"
                                fullWidth
                                value={softwareInfo.totalPrice}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    style: {
                                        height: '50px',
                                    },
                                }}
                                disabled
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Reference</Typography>
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
                                name="reference"
                                label="Enter Reference"
                                fullWidth
                                value={softwareInfo.reference}
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
                            <Typography>User</Typography>
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
                                id="team"
                                name="team"
                                fullWidth
                                value={softwareInfo.user}
                                onChange={handleUserChange}
                                options={locations}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select User"
                                        required
                                    />
                                )}
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

export default SoftwareForm;
