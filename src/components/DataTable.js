import { AddBoxOutlined } from '@mui/icons-material';
import { Alert, Box, IconButton, Stack, Typography } from '@mui/material';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { getPageTitle } from '../utils/stringUtils';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExport />
            <GridToolbarQuickFilter sx={{ ml: 3, width: 300 }} />
        </GridToolbarContainer>
    );
}

const DataTable = ({
    columns,
    rows,
    isLoading,
    isOpen,
    alertVisible,
    setAlertVisible,
    children,
}) => {
    const router = useRouter();
    const { pathname } = router;
    const pathParsed = pathname.split('/');
    let pageTitle = '';

    if (pathParsed[1] === 'assets') {
        const assetName = pathParsed[2];
        pageTitle = getPageTitle(assetName);
    } else {
        pageTitle =
            pathParsed[1].charAt(0).toUpperCase() + pathParsed[1].slice(1);
    }

    return (
        <Box sx={{ height: 800, width: '100%', overflowX: 'auto', p: 3 }}>
            <div>
                {alertVisible && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert onClose={() => setAlertVisible(false)}>
                            This is a success alert — successfully deleted!
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
                <IconButton aria-label="add item" href={`${pathname}/add`}>
                    <AddBoxOutlined />
                </IconButton>
                {children}
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
                slots={{ toolbar: CustomToolbar }}
                loading={isLoading}
                style={{ width: isOpen ? '1500px' : '1680px' }}
            ></DataGrid>
        </Box>
    );
};

export default DataTable;
