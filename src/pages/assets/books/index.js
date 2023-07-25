import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';

const Books = ({ setSelectedLink }) => {
    useEffect(() => {
        setSelectedLink('assets/books');
    }, []);

    const columns = [
        { field: 'Title', width: 300 },
        {
            field: 'Team',
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
        { field: 'Location', width: 200 },
        { field: 'PurchaseDate', width: 200 },
        { field: 'Price', width: 200 },
    ];
    const rows = [
        {
            id: 1,
            Title: 'UI/UX 디자인 이론과 실습',
            Team: 'Design Team',
            Location: '강남사무실',
            PurchaseDate: '2019-07-19',
            Price: '27,000원',
        },
        {
            id: 2,
            Title: 'UI/UX 디자인 이론과 실습',
            Team: 'Design Team',
            Location: '강남사무실',
            PurchaseDate: '2019-07-19',
            Price: '27,000원',
        },
        {
            id: 3,
            Title: 'UI/UX 디자인 이론과 실습',
            Team: 'Design Team',
            Location: '강남사무실',
            PurchaseDate: '2019-07-19',
            Price: '27,000원',
        },
        {
            id: 4,
            Title: 'UI/UX 디자인 이론과 실습',
            Team: 'Design Team',
            Location: '강남사무실',
            PurchaseDate: '2019-07-19',
            Price: '27,000원',
        },
        {
            id: 5,
            Title: 'UI/UX 디자인 이론과 실습',
            Team: 'Design Team',
            Location: '강남사무실',
            PurchaseDate: '2019-07-19',
            Price: '27,000원',
        },
        {
            id: 6,
            Title: 'UI/UX 디자인 이론과 실습',
            Team: 'Design Team',
            Location: '강남사무실',
            PurchaseDate: '2019-07-19',
            Price: '27,000원',
        },
        {
            id: 7,
            Title: 'UI/UX 디자인 이론과 실습',
            Team: 'Design Team',
            Location: '강남사무실',
            PurchaseDate: '2019-07-19',
            Price: '27,000원',
        },
        {
            id: 8,
            Title: 'UI/UX 디자인 이론과 실습',
            Team: 'Design Team',
            Location: '강남사무실',
            PurchaseDate: '2019-07-19',
            Price: '27,000원',
        },
    ];
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography
                variant="h5"
                component="h5"
                sx={{ textAlign: 'left', mt: 3, mb: 3 }}
            >
                Books
            </Typography>
            <DataGrid
                columns={columns}
                rows={rows}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
            ></DataGrid>
        </Box>
    );
};

export default Books;
