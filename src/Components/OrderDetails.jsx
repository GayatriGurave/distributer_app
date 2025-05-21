import React from 'react';
import {
    Typography,
    Box,
    Paper,
    Grid,
    Divider,
    useTheme
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';

const OrderDetails = () => {
    const orderData = useLocation().state;
    const theme = useTheme();

    const columns = [
        { field: 'name', headerName: 'Product Name', flex: 1 },
        { field: 'price', headerName: 'Price', type: 'number', width: 120 },
        { field: 'demandedQty', headerName: 'Demanded Qty', type: 'number', width: 150 },
        { field: 'exceptedQty', headerName: 'Expected Qty', type: 'number', width: 150 }
    ];

    const rows = orderData?.orderItems?.map((ord, index) => ({
        id: ord.prodId?._id || index,
        name: ord.prodId?.title || 'N/A',
        price: ord.prodId?.price || 0,
        demandedQty: ord.demandedQty || 0,
        exceptedQty: ord.exceptedQty || 0
    })) || [];

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                Order Details
            </Typography>

            <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Distributor Information
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography><strong>Name:</strong> {orderData.distributerId.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography><strong>City:</strong> {orderData.distributerId.city}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography><strong>Type:</strong> {orderData.distributerId.distType}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography><strong>Mobile:</strong> {orderData.distributerId.mobile}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Products in Order
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default OrderDetails;
