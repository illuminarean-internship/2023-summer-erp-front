import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import DataTable from '../../../components/DataTable';
import Action from '../../../components/actions/Action';
import { getCurrencySymbol } from '../../../utils/stringUtils';
import { Button } from '@mui/material';
import { Build, FolderOpen } from '@mui/icons-material';

const TestDevice = ({ setSelectedLink, isOpen }) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const [isArchived, setIsArchived] = useState(false);
    const [isRepair, setIsRepair] = useState(false);
    const [columns, setColumns] = useState([]);

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

            if (isRepair) {
                queryParams.isRepair = true;
            }
            const response = await axios.get(
                'http://internship-server.illuminarean.com:4040/api/test-device/',
                {
                    params: queryParams,
                },
            );

            setColumns(isRepair ? repairColumns : defaultColumns); // Set columns based on isRepair
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
    }, [isArchived, isRepair]);

    const handleArchivedClick = () => {
        if (isArchived) {
            setIsArchived(false);
        } else {
            setIsArchived(true);
            setIsRepair(false);
        }
    };

    const handleRepairClick = () => {
        if (isRepair) {
            setIsRepair(false);
        } else {
            setIsRepair(true);
            setIsArchived(false);
        }
    };

    const defaultColumns = [
        { field: 'model', headerName: 'Model', width: 300 },
        { field: 'category', headerName: 'Category', width: 100 },
        { field: 'RAM', headerName: 'RAM', width: 100 },
        { field: 'memory', headerName: 'Memory', width: 100 },
        { field: 'team', headerName: 'Team', width: 150 },
        { field: 'location', headerName: 'Location', width: 100 },
        { field: 'serialNumber', headerName: 'Serial #', width: 200 },
        { field: 'condition', headerName: 'Condition', width: 100 },
        { field: 'color', headerName: 'Color', width: 100 },
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
            field: 'purchasedFrom',
            headerName: 'Purchased From',
            width: 170,
        },
        {
            field: 'remarks',
            headerName: 'Remarks',
            width: 170,
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

    const repairColumns = [
        { field: 'model', headerName: 'Model', width: 300 },
        { field: 'category', headerName: 'Category', width: 100 },
        { field: 'RAM', headerName: 'RAM', width: 100 },
        { field: 'memory', headerName: 'Memory', width: 100 },
        { field: 'team', headerName: 'Team', width: 150 },
        { field: 'location', headerName: 'Location', width: 100 },
        { field: 'serialNumber', headerName: 'Serial #', width: 200 },
        { field: 'condition', headerName: 'Condition', width: 100 },
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
            field: 'remarks',
            headerName: 'Remarks',
            width: 170,
        },
        ////////////////////////////////////////
        {
            field: 'request',
            headerName: 'Request',
            width: 170,
        },
        {
            field: 'replace',
            headerName: 'Replace',
            width: 170,
        },
        {
            field: 'repairPrice',
            headerName: 'Repair Price',
            width: 170,
        },
        {
            field: 'repairDetails',
            headerName: 'Repair details',
            width: 170,
        },
        {
            field: 'resellPrice',
            headerName: 'Resell Price',
            width: 170,
        },
        {
            field: 'karrotPrice',
            headerName: 'Karrot Price',
            width: 170,
        },
        ///////////////////////////////////////
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
                sx={{
                    ml: 2,
                }}
                startIcon={<FolderOpen />}
                onClick={handleArchivedClick}
            >
                Archived
            </Button>
            <Button
                variant={isRepair ? 'contained' : 'outlined'}
                sx={{ ml: 2 }}
                startIcon={<Build />}
                onClick={handleRepairClick}
            >
                Repair
            </Button>
        </DataTable>
    );
};

export default TestDevice;
