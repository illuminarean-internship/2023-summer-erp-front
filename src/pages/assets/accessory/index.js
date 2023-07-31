import { Alert, Box, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AddBoxOutlined } from '@mui/icons-material';
import Link from 'next/link';
import BookAction from '../../../components/actions/BookAction';
import { useRouter } from 'next/router';

const Accessory = ({ setSelectedLink }) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const router = useRouter();

    // const fetchData = async () => {
    //     try {
    //         await axios
    //             .get('http://43.200.193.130:4040/api/books/')
    //             .then((res) => {
    //                 setRows(res.data);
    //             });
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     setSelectedLink(router.pathname.slice(1));
    //     fetchData();
    // }, [rows]);

    useEffect(() => {
        setSelectedLink(router.pathname.slice(1));
    }, []);

    const columns = [
        { field: 'name', headerName: 'Name', width: 300 },

        {
            field: 'purchaseDate',
            headerName: 'Purchase Date',
            width: 170,
            renderCell: (params) =>
                moment(params.row.purchaseDate).format('YYYY-MM-DD'),
        },
        {
            field: 'unitPrice',
            headerName: 'Unit Price',
            width: 170,
            renderCell: (params) => '₩' + params.row.price,
        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            width: 170,
            renderCell: (params) => '₩' + params.row.price,
        },
        {
            field: 'currency',
            headerName: 'Currency',
            width: 170,
        },
        { field: 'reference', headerName: 'Reference', width: 170 },
        { field: 'user', headerName: 'User', width: 170 },
        {
            field: 'Actions',
            headerName: 'Actions',
            type: 'actions',
            width: 200,
            renderCell: (params) => (
                <BookAction
                    params={params}
                    setAlertVisible={setAlertVisible}
                ></BookAction>
            ),
        },
    ];
    return (
        <Box sx={{ height: 650, width: '100%', overflowX: 'auto' }}>
            <div>
                {alertVisible && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={() => setAlertVisible(false)}>
                            This is a success alert — item has been deleted!
                        </Alert>
                    </Stack>
                )}
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{ textAlign: 'left', mt: 3, mb: 3 }}
                >
                    Software
                </Typography>
                <Link href={'/assets/software/add'}>
                    <IconButton sx={{}} aria-label="add software">
                        <AddBoxOutlined />
                    </IconButton>
                </Link>
            </Box>

            <DataGrid
                columns={columns}
                rows={rows}
                getRowId={(rows) => rows._id}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableDensitySelector
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
                loading={isLoading}
            ></DataGrid>
        </Box>
    );
};

export default Accessory;
