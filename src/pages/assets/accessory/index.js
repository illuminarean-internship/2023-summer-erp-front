import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Action from '../../../components/actions/Action';
import { useRouter } from 'next/router';
import DataTable from '../../../components/DataTable';

const Accessory = ({ setSelectedLink, isOpen }) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        try {
            await axios
                .get('http://43.200.193.130:4040/api/accessory/')
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
        { field: 'deviceImage', headerName: 'Device Image', width: 100 },
        { field: 'model', headerName: 'Model', width: 100 },
        { field: 'category', headerName: 'Category', width: 100 },
        { field: 'serialNumber', headerName: 'Serial #', width: 100 },
        { field: 'location', headerName: 'Location', width: 100 },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            width: 100,
            renderCell: (params) => '₩' + params.row.price,
        },
        {
            field: 'availableDate',
            headerName: 'Available Date',
            width: 200,
            renderCell: (params) =>
                moment(params.row.purchaseDate).format('YYYY-MM-DD'),
        },
        { field: 'color', headerName: 'Color', width: 100 },
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
            field: 'Actions',
            headerName: 'Actions',
            type: 'actions',
            width: 200,
            renderCell: (params) => (
                <Action params={params} setAlertVisible={setAlertVisible} />
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

export default Accessory;
