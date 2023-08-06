import { ArrowDropDown, ArrowDropUp, Delete } from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';

const DesktopForm = ({
    handleSubmit,
    desktopInfo,
    handleChange,
    locations: locationsData,
    handleLocationChange,
    handleHistoryChange,
    handleDeleteHistory,
    handleAddHistory,
    handleHistoryLocationChange,
    handleDetailChange,
    handleDetailDelete,
    handleDetailAdd,
}) => {
    const locations = locationsData.map((location) => location.name);
    const [showHistory, setShowHistory] = useState(true);
    const [showCategory, setShowCategory] = useState(true);
    const theme = useTheme();

    const currencyOptions = [
        { value: '₩', label: '₩' },
        { value: '$', label: '$' },
        { value: '￥', label: '￥' },
    ];

    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="md">
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Illuminaran Serial Number</Typography>
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
                                name="illumiSerial"
                                label="Enter Illuminaran Serial Number"
                                fullWidth
                                value={desktopInfo.illumiSerial}
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
                                value={desktopInfo.purchaseDate}
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
                                value={desktopInfo.purchasedFrom}
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
                            <Typography>Purpose</Typography>
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
                                name="purpose"
                                label="Enter Purpose"
                                fullWidth
                                value={desktopInfo.purpose}
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
                                value={desktopInfo.location}
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
                <Divider sx={{ my: 2, borderColor: theme.palette.grey[300] }} />
                <Box display="flex" justifyContent="left" mt={3}>
                    <Button
                        variant="standard"
                        color="primary"
                        onClick={() =>
                            setShowCategory(
                                (prevShowCategory) => !prevShowCategory,
                            )
                        }
                    >
                        Category
                        {showCategory ? <ArrowDropDown /> : <ArrowDropUp />}
                    </Button>
                </Box>
                {showCategory && (
                    <>
                        {desktopInfo.details.map((detail, index) => (
                            <Box
                                key={detail.id}
                                display="flex"
                                flexDirection="column"
                                my={2}
                            >
                                <Grid container spacing={1} sx={{ ml: 0.5 }}>
                                    <Grid item xs={3}>
                                        <TextField
                                            name="category"
                                            label="Enter Category"
                                            fullWidth
                                            value={detail.category}
                                            onChange={(e) =>
                                                handleDetailChange(
                                                    detail.id,
                                                    'category',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={5.78}>
                                        <TextField
                                            name="name"
                                            label="Enter Name"
                                            fullWidth
                                            value={detail.name}
                                            onChange={(e) =>
                                                handleDetailChange(
                                                    detail.id,
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={2.5}>
                                        <TextField
                                            name="price"
                                            label="Price"
                                            type="number"
                                            fullWidth
                                            value={detail.price}
                                            onChange={(e) =>
                                                handleDetailChange(
                                                    detail.id,
                                                    'price',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Select
                                                            variant="standard"
                                                            id="currency-select"
                                                            name="currency"
                                                            value={
                                                                detail.currency
                                                            }
                                                            onChange={(e) =>
                                                                handleDetailChange(
                                                                    detail.id,
                                                                    'currency',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        >
                                                            {currencyOptions.map(
                                                                (option) => (
                                                                    <MenuItem
                                                                        key={
                                                                            option.value
                                                                        }
                                                                        value={
                                                                            option.value
                                                                        }
                                                                    >
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </MenuItem>
                                                                ),
                                                            )}
                                                        </Select>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={0.5}>
                                        <IconButton
                                            onClick={() =>
                                                handleDetailDelete(detail.id)
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
                                variant="standard"
                                color="primary"
                                onClick={handleDetailAdd}
                            >
                                Add New Category
                            </Button>
                        </Box>
                    </>
                )}
                <Grid container spacing={2} sx={{ p: 1, pl: 0 }}>
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
                                fullWidth
                                value={desktopInfo.totalPrice}
                                disabled
                                InputProps={{
                                    style: {
                                        height: '50px',
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
                        {showHistory ? <ArrowDropDown /> : <ArrowDropUp />}
                    </Button>
                </Box>
                {showHistory && (
                    <>
                        {desktopInfo.history.map((historyData, index) => (
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
                                        xs={3.6}
                                        container
                                        alignItems="center"
                                        sx={{ ml: 1 }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Remark"
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
                                variant="standard"
                                color="primary"
                                onClick={handleAddHistory}
                            >
                                Add New History
                            </Button>
                        </Box>
                    </>
                )}
                <Grid container spacing={2} sx={{ p: 1, pl: 0 }}>
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
                                label="Enter remarks"
                                fullWidth
                                value={desktopInfo.remarks}
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
                <Box display="flex" justifyContent="center" mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </Box>
            </Container>
        </form>
    );
};

export default DesktopForm;
