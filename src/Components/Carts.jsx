import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  calculateTotal,
  clearCart,
  decrementQty,
  incrementQty,
  removeItem,
} from '../reduxwork/CartSlice';
import axios from 'axios';

const Carts = () => {
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const { userdata } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  // Recalculate total only when cartItems change
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  let postOrder = async () => {
    let finalItems = []
    cartItems.forEach(item => {
      finalItems.push({ prodId: item._id, demandedQty: item.qty })
    });
    console.log("FI", finalItems);
    const distributerId = userdata._id;
    let orderReqData = {
      orderTotalAmount: cartTotalAmount,
      distributerId,
      orderItems: finalItems,

    }
    try {
      let result = await axios.post("http://localhost:5000/api/createorder", orderReqData)
      console.log("Ord", result.data);
      dispatch(clearCart())
      alert("Order Placed")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Your  Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No items in the cart.
        </Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {cartItems.map((prod) => {
              const pId = prod._id;
              return (
                <Grid item xs={12} sm={6} md={4} key={pId}>
                  <Card
                    sx={{
                      boxShadow: 4,
                      borderRadius: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      sx={{ objectFit: 'contain', backgroundColor: '#fff', p: 2 }}
                      image={`http://localhost:5000/${prod.prodimage?.replace('\\', '/')}`}
                      alt={prod.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{prod.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {prod.category}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', color: prod.price > 15 ? 'error.main' : 'primary.main' }}
                      >
                        ${prod.price}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'center', gap: 1 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => dispatch(decrementQty({ pId }))}
                      >
                        -
                      </Button>
                      <Typography variant="body1" sx={{ px: 2 }}>
                        {prod.qty}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => dispatch(incrementQty({ pId }))}
                      >
                        +
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => dispatch(removeItem({ pId }))}
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ textAlign: 'center', marginTop: 5 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h5" color="secondary">
              Total Amount: ${cartTotalAmount.toFixed(2)}
            </Typography>
            <Button onClick={() => postOrder()} variant='contained' color='primary'>Place Order</Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Carts;
