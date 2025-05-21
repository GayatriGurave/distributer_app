import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
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
            headerName: 'Order Date',
            flex: 1,
            renderCell: (params) => {
                const date = params.row?.orderDate;
                return <span>{date ? new Date(date).toLocaleString() : 'N/A'}</span>;
            }
        },
        { field: 'orderStatus', headerName: 'Status', flex: 1 },
        { field: 'orderTotalAmount', headerName: 'Total Amount', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/detail", { state: params.row })}
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