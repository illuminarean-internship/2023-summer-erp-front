import {
    Alert,
    Box,
    Button,
    Container,
    Divider,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import PageWrapper from '../../components/form/PageWrapper';
import { SettingsOutlined } from '@mui/icons-material';
import SettingAction from '../../components/actions/SettingAction';
const Settings = () => {
    const [adminList, setAdminList] = useState([]);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const theme = useTheme();

    const fetchAdminList = async () => {
        try {
            const response = await axios.get(
                'http://localhost:4040/api/users/admin?isAdmin=true',
            );
            const adminList = response.data;
            const transformedAdminList = adminList.map((admin) => ({
                ...admin,
                id: admin._id,
            }));
            setAdminList(transformedAdminList);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching admin list:', error);
            setIsLoading(false);
        }
    };

    const addNewAdmin = async () => {
        try {
            await axios.put('http://localhost:4040/api/users/admin', {
                email: newAdminEmail + '@illuminarean.com',
                isAdmin: true,
            });
            fetchAdminList(); // Refresh the admin list after adding a new admin
            setNewAdminEmail(''); // Clear the input field
        } catch (error) {
            console.error('Error adding new admin:', error);
        }
    };

    useEffect(() => {
        fetchAdminList();
    }, [adminList]);

    const columns = [
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'Actions',
            headerName: 'Actions',
            type: 'actions',
            width: 200,
            renderCell: (params) => (
                <SettingAction
                    params={params}
                    setAlertVisible={setAlertVisible}
                />
            ),
        },
    ];

    return (
        <PageWrapper title="Settings" icon={<SettingsOutlined />} href="/">
            <Container maxWidth="md">
                <div>
                    {alertVisible && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert onClose={() => setAlertVisible(false)}>
                                This is a success alert — successfully deleted!
                            </Alert>
                        </Stack>
                    )}
                </div>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Authority Settings
                </Typography>
                <Typography sx={{ mb: 1 }}>
                    Logged in by {session.user.email}
                </Typography>

                <Divider sx={{ my: 2, borderColor: theme.palette.grey[300] }} />
                <Typography variant="h6" sx={{ mt: 5 }}>
                    Administrators
                </Typography>
                <Typography gutterBottom>
                    Set the administrators that have access to manage the
                    system.
                </Typography>
                <Box height={300} width="100%">
                    <DataGrid
                        rows={adminList}
                        columns={columns}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        loading={isLoading}
                    />
                </Box>

                <Box mt={5} mb={10} display="flex" alignItems="center">
                    <TextField
                        label="New Admin Email"
                        variant="outlined"
                        size="small"
                        sx={{ width: '60%' }}
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    @illuminarean.com
                                </InputAdornment>
                            ),
                        }}
                        style={{ marginRight: '10px' }}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={addNewAdmin}
                        disabled={!newAdminEmail}
                    >
                        Add New Admin
                    </Button>
                </Box>
            </Container>
        </PageWrapper>
    );
};

export default Settings;
