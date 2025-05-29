import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
  Tooltip
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../reduxwork/CartSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const result = await axios.get("http://localhost:5000/api/fetchproduct");
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProduct();
  }, []);

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
         Products
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 2,
          mt: 4,
        }}
      >
        {products.map((prod) => (
          <Box
            key={prod._id}
            sx={{
              flex: '1 1 calc(25% - 16px)', // 4 cards per row
              maxWidth: 'calc(25% - 16px)',
              minWidth: 250,
            }}
          >
            <Card
              sx={{
                height: '100%',
                borderRadius: 2,
                boxShadow: 4,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 8,
                  transform: 'translateY(-4px)',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                }}
              >
                <img
                  src={`http://localhost:5000/${prod.prodimage?.replace("\\", "/")}`}
                  alt={prod.title}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
              </CardMedia>

              <CardContent>
                <Typography variant="h6" gutterBottom>{prod.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {prod.category}
                </Typography>
                <Typography variant="h6" color="secondary" mt={1}>
                  ₹ {prod.price}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'center', mb: 1 }}>
                <Tooltip title="Add to Cart">
                  <Button
                    onClick={() => {
                      dispatch(addItem(prod));
                      handleSnackbar(`"${prod.title}" added to cart!`);
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    Add to Cart
                  </Button>
                </Tooltip>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#43a047',
            color: '#fff',
            fontWeight: 500,
          },
        }}
      />
    </Box>
  );
};

export default Products;
