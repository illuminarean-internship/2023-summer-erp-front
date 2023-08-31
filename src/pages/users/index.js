import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import DataTable from '../../components/DataTable';
import UserAction from '../../components/actions/UserAction';

const UserPage = ({ setSelectedLink, isOpen }) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        try {
            await axios
                .get('http://localhost:4040/api/users/')
                .then((res) => {
                    const filteredData = res.data.filter(
                        (item) =>
                            !['Resold', 'Disuse', 'Office'].includes(item.name),
                    );
                    setRows(filteredData);
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
        { field: 'name', headerName: 'Name', width: 280 },
        { field: 'team', headerName: 'Team', width: 280 },
        {
            field: 'project',
            headerName: 'Project',
            width: 500,
            valueGetter: (params) => params.row.project.join(', '),
        },
        { field: 'field', headerName: 'Field', width: 300 },
        {
            field: 'Actions',
            headerName: 'Actions',
            type: 'actions',
            width: 200,
            renderCell: (params) => (
                <UserAction params={params} setAlertVisible={setAlertVisible} />
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

export default UserPage;
