import { Alert, Box, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AddBoxOutlined } from '@mui/icons-material';
import Link from 'next/link';
import BookAction from '../../../components/actions/BookAction';
import { useRouter } from 'next/router';

const Books = ({ setSelectedLink }) => {
    const [rows, setRows] = useState([]);
    const [alertVisible, setAlertVisible] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        await axios.get('http://43.200.193.130:4040/api/books/').then((res) => {
            setRows(res.data);
        });
    };

    useEffect(() => {
        setSelectedLink(router.pathname.slice(1));
        fetchData();
    }, [rows]);

    const columns = [
        { field: 'title', headerName: 'Title', width: 500 },
        {
            field: 'team',
            headerName: 'Team',
            width: 200,
            type: 'singleSelect',
            valueOptions: [
                'HR Team',
                'Flow Team',
                'Dev Team',
                'Product Team',
                'Design Team',
                'QA Team',
            ],
            editable: true,
        },
        { field: 'location', headerName: 'Location', width: 250 },
        {
            field: 'purchaseDate',
            headerName: 'Purchase Date',
            width: 250,
            renderCell: (params) =>
                moment(params.row.purchaseDate).format('YYYY-MM-DD'),
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 200,
            renderCell: (params) => '₩' + params.row.price,
        },
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
        <Box sx={{ height: 650, width: '100%' }}>
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
                    Books
                </Typography>
                <Link href={'/assets/books/add'}>
                    <IconButton sx={{}} aria-label="add book">
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
            ></DataGrid>
        </Box>
    );
};

export default Books;
