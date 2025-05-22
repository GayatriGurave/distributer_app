import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const OrderDetails = () => {
  const orderData = useLocation().state;
  const theme = useTheme();

  const columns = [
   {
      field: 'title',
      headerName: 'Product Name',
      flex: 1,
      renderCell: (params) => (
        <Typography color="primary" fontWeight={600}>
          {params.value}
        </Typography>
      )
    },
     {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 120,
      renderCell: (params) => (
        <Typography fontWeight={600}>
          ₹{params.value}
        </Typography>
      )
    },
    {
      field: 'demandedQty',
      headerName: 'Demanded Qty',
      type: 'number',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.row.demandedQty} color="info" variant="outlined" />
      )
    },
    {
      field: 'exceptedQty',
      headerName: 'Expected Qty',
      type: 'number',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.row.exceptedQty} color="success" variant="outlined" />
      )
    }
  ];

  const rows = orderData?.orderItems?.map((ord, index) => ({
    id: ord.prodId?._id || index,
    title: ord.prodId?.title || 'N/A',
    price: ord.prodId?.price || 0,
    demandedQty: ord.demandedQty || 0,
    exceptedQty: ord.exceptedQty || 0
  })) || [];

  return (
    <Box sx={{ padding: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: '0 4px 24px 0 rgba(33,150,243,0.15)',
          background: '#fff',
          mb: 4,
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Inventory2OutlinedIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
          <Typography variant="h4" fontWeight={700} color="primary.dark">
            Order Details
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 1 }}>
          Distributor Information
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography><strong>Name:</strong> {orderData.distributerId?.name || 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <LocationCityIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
              <Typography><strong>City:</strong> {orderData.distributerId?.city || 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <CategoryIcon sx={{ mr: 1, color: theme.palette.info.main }} />
              <Typography><strong>Type:</strong> {orderData.distributerId?.distType || 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <PhoneAndroidIcon sx={{ mr: 1, color: theme.palette.success.main }} />
              <Typography><strong>Mobile:</strong> {orderData.distributerId?.mobile || 'N/A'}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 1 }}>
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
