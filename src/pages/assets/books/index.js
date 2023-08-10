import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import DataTable from '../../../components/DataTable';
import Action from '../../../components/actions/Action';
import { Button } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

const Books = ({ setSelectedLink, isOpen }) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const [isArchived, setIsArchived] = useState(false);

    const router = useRouter();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            let queryParams = {};

            if (isArchived) {
                queryParams.isArchived = true;
            } else {
                queryParams.isArchived = false;
            }
            const response = await axios.get(
                'http://43.200.193.130:4040/api/books/',
                {
                    params: queryParams,
                },
            );

            setIsLoading(false);
            setRows(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setSelectedLink(router.pathname.slice(1));
        fetchData();
    }, [isArchived]);

    const handleArchivedClick = () => {
        if (isArchived) {
            setIsArchived(false);
        } else {
            setIsArchived(true);
        }
    };

    const columns = [
        { field: 'title', headerName: 'Title', width: 550 },
        {
            field: 'team',
            headerName: 'Team',
            width: 170,
        },
        { field: 'location', headerName: 'Location', width: 170 },
        {
            field: 'purchaseDate',
            headerName: 'Purchase Date',
            width: 200,

            renderCell: (params) =>
                moment(params.row.purchaseDate).format('YYYY-MM-DD'),
        },
        {
            field: 'purchasedFrom',
            headerName: 'Purchased From',
            width: 200,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            renderCell: (params) =>
                `${params.row.currency}  ${params.row.price}`,
        },
        {
            field: 'Actions',
            headerName: 'Actions',
            type: 'actions',
            width: 200,
            renderCell: (params) => (
                <Action
                    params={params}
                    setAlertVisible={setAlertVisible}
                    fetchData={fetchData}
                />
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            rows={rows}
            isLoading={isLoading}
            isOpen={isOpen}
            alertVisible={alertVisible}
            setAlertVisible={setAlertVisible}
        >
            <Button
                variant={isArchived ? 'contained' : 'outlined'}
                color="secondary"
                sx={{ ml: 2 }}
                startIcon={<FolderOpen />}
                onClick={handleArchivedClick}
            >
                Archived
            </Button>
        </DataTable>
    );
};

export default Books;
