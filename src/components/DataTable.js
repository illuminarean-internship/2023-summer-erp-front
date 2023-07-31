import { AddBoxOutlined } from '@mui/icons-material';
import { Alert, Box, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DataTable = ({
    columns,
    rows,
    isLoading,
    isOpen,
    alertVisible,
    setAlertVisible,
}) => {
    const router = useRouter();
    const { pathname } = router;
    const paths = pathname.split('/');
    const assetName = paths[2];

    const getPageTitle = (assetName) => {
        let title = assetName.replace(/-/g, ' '); // Replace hyphens with spaces
        title = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the first letter
        return title;
    };

    const pageTitle = getPageTitle(assetName);

    return (
        <Box sx={{ height: 650, width: '100%', overflowX: 'auto' }}>
            <div>
                {alertVisible && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={() => setAlertVisible(false)}>
                            This is a success alert — item has been deleted!
                        </Alert>
                    </Stack>
                )}
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{ textAlign: 'left', mt: 3, mb: 3 }}
                >
                    {pageTitle}
                </Typography>
                <Link href={`/assets/${assetName}/add`}>
                    <IconButton sx={{}} aria-label="add item">
                        <AddBoxOutlined />
                    </IconButton>
                </Link>
            </Box>

            <DataGrid
                columns={columns}
                rows={rows}
                getRowId={(rows) => rows._id}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableDensitySelector
                autoHeight
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
                loading={isLoading}
                style={{ width: isOpen ? '1500px' : '1680px' }}
            ></DataGrid>
        </Box>
    );
};

export default DataTable;
