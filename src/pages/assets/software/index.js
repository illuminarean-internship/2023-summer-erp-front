import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Action from '../../../components/actions/Action';
import { useRouter } from 'next/router';
import DataTable from '../../../components/DataTable';
import { getCurrencySymbol } from '../../../utils/stringUtils';
import { Button } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

const Software = ({ setSelectedLink, isOpen }) => {
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
                'http://internship-server.illuminarean.com:4040/api/software/',
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
        { field: 'name', headerName: 'Name', width: 300 },

        {
            field: 'purchaseDate',
            headerName: 'Purchase Date',
            width: 170,
            renderCell: (params) =>
                moment(params.row.purchaseDate).format('YYYY-MM-DD'),
        },
        {
            field: 'remarks',
            headerName: 'Remarks',
            width: 150,
        },
        {
            field: 'unitPrice',
            headerName: 'Unit Price',
            width: 150,
            renderCell: (params) =>
                `${getCurrencySymbol(params.row.currency)}  ${
                    params.row.unitPrice
                }`,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 130,
        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            width: 170,
            renderCell: (params) =>
                `${getCurrencySymbol(params.row.currency)}  ${
                    params.row.totalPrice
                }`,
        },
        {
            field: 'currency',
            headerName: 'Currency',
            width: 150,
        },
        { field: 'reference', headerName: 'Reference', width: 250 },
        { field: 'user', headerName: 'User', width: 170 },
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

export default Software;
