import React, { useEffect, useState } from 'react';
import { Box, Button, Typography,Chip, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Orders = () => {
    const statusColors = {
    Pending: 'warning',
    Completed: 'success',
    Cancelled: 'error',
    Processing: 'info',
};


    const [allOrders, setAllOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/fetchorder');
                console.log("Fetched Orders:", response.data);
                setAllOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const columns = [
        {
            field: 'orderDate',
            headerName: 'Date',
            flex: 1,
            renderCell: (params) => {
                const date = params.row?.orderDate;
                return (
                    <Tooltip title={date ? new Date(date).toLocaleString() : 'N/A'}>
                        <span>{date ? new Date(date).toLocaleDateString() : 'N/A'}</span>
                    </Tooltip>
                );
            }
        },
       {
            field: 'orderStatus',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={statusColors[params.value] || 'default'}
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                />
            )
        },
        {
            field: 'orderTotalAmount',
            headerName: 'Price',
            flex: 1,
            renderCell: (params) => (
                <Typography fontWeight={600} color="primary">
                    ₹{params.value?.toLocaleString() || '0'}
                </Typography>
            )
        },
        {
            field: 'actions',
            headerName: 'Details',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
               <Button
                    variant="contained"
                    color="primary"
                    endIcon={<InfoOutlinedIcon />}
                    onClick={() => navigate("/detail", { state: params.row })}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)',
                        boxShadow: 2,
                        '&:hover': {
                            background: 'linear-gradient(90deg, #1565c0 60%, #64b5f6 100%)',
                        }
                    }}
                >
                    Details
                </Button>
            )
        }
    ];

    const rows = allOrders.map((order, index) => ({
        id: order._id || index, // Required unique id
        ...order
    }));

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Orders List
            </Typography>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default Orders