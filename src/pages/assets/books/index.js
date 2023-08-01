import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import BookAction from '../../../components/actions/BookAction';
import { useRouter } from 'next/router';
import DataTable from '../../../components/DataTable';

const Books = ({ setSelectedLink, isOpen }) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        try {
            await axios
                .get('http://43.200.193.130:4040/api/books/')
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
        { field: 'title', headerName: 'Title', width: 500 },
        {
            field: 'team',
            headerName: 'Team',
            width: 170,
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

export default Books;
