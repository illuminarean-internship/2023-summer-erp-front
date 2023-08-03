import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Action from '../../../components/actions/Action';
import { useRouter } from 'next/router';
import DataTable from '../../../components/DataTable';

const Software = ({ setSelectedLink, isOpen }) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        try {
            await axios
                .get('http://43.200.193.130:4040/api/software/')
                .then((res) => {
                    setRows(res.data);
                });
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setSelectedLink(router.pathname.slice(1));
        fetchData();
    }, [rows]);

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
                <Action
                    params={params}
                    setAlertVisible={setAlertVisible}
                ></Action>
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
        />
    );
};

export default Software;
