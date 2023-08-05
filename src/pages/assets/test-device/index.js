import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import DataTable from '../../../components/DataTable';
import Action from '../../../components/actions/Action';

const TestDevice = ({ setSelectedLink, isOpen }) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        try {
            await axios
                .get('http://43.200.193.130:4040/api/test-device/')
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
        { field: 'ram', headerName: 'RAM', width: 100 },
        { field: 'ssd', headerName: 'SSD', width: 100 },
        { field: 'team', headerName: 'Team', width: 100 },
        { field: 'location', headerName: 'Location', width: 100 },
        { field: 'serialNumber', headerName: 'Serial #', width: 100 },
        { field: 'condition', headerName: 'Condition', width: 100 },
        { field: 'color', headerName: 'Color', width: 100 },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            width: 170,
            renderCell: (params) => '₩' + params.row.price,
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

export default TestDevice;
