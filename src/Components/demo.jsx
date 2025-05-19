
// import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { calculateTotal, decrementQty, incrementQty, removeItem } from '../reduxwork/CartSlice'

// const Carts = () => {
//   let { cartItems, cartTotalAmount } = useSelector((state) => state.cart)
//   let dispatcher = useDispatch()

//   dispatcher(calculateTotal())

//   return (
//     <>
//       <Box>
//         <Grid container spacing={3} padding={2}>
//           {
//             cartItems.map((prod) => {
//               let pId = prod._id
//               return (
//                 <Grid size={{
//                   sm: 12,
//                   lg: 4,
//                   md: 6
//                 }} item key={prod._id}>
//                   <Card>
//                     <CardMedia component="img" sx={{ height: 190, objectFit: 'contain', width: '100%' }}
//                       image={`http://localhost:5000/${prod.prodimage?.replace("\\", "/")}`}
//                     />

//                     <CardContent>
//                       <Typography variant='h5'>{prod.title}</Typography>
//                       <Typography variant='h5'>{prod.category}</Typography>
//                       <Typography variant='h5' color='{prod.price>15? "error":"primary"}'>{prod.price}</Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Button onClick={() => {
//                         dispatcher(decrementQty({ pId }))
//                       }} variant='contained' color='error'>-</Button>
//                       {prod.qty}
//                       <Button onClick={() => {
//                         dispatcher(incrementQty({ pId }))
//                       }} variant='contained' color='success'>+</Button>
//                       <Button onClick={() => dispatcher(removeItem({ pId }))} variant='contained' color='error'>Remove</Button>
//                     </CardActions>
//                   </Card>

//                 </Grid>
//               )
//             })
//           }
//         </Grid>
//       </Box>
//       <Typography>Total:{cartTotalAmount}</Typography>
//     </>
//   )
// }

// export default Carts

// import { Box, Button, Card,  CardActions, CardContent, CardMedia,  Grid, Snackbar, Typography } from '@mui/material'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { addItem } from '../reduxwork/CartSlice'

// const Products = () => {
//     const [products, setproducts] = useState([])
//     const [isopen, setisopen] = useState(false)
//      let dispatcher = useDispatch()

//   useEffect(()=>{
//     async function fetchproduct(){
//         let result = await axios.get("http://localhost:5000/api/fetchproduct")
//         setproducts(result.data)
//         console.log("Data",result.data);
//     }
//     fetchproduct()
//   },[])
//   let handleopen=()=>{
//     setisopen(true)
//   }  

//   let handleClose=()=>{
//     setisopen(false)
//   }
//   return (
//     <Box sx={{padding:4,backgroundColor:'#f5f5f5',minHeight:'100vh'}}>
//     <Typography variant='h4' align='center' gutterBottom>Product Management</Typography>
//     <Grid container spacing={3} padding={2}>
//     {
//         products.map((prod)=>{
//             return(
//                 <Grid  size={{
//                     sm : 12,
//                     md : 6,
//                     lg : 4
//                 }} item key={prod._id}>
//                 <Card sx={{maxWidth:400,
//                            margin:'auto',
//                            borderRadius:3,
//                            boxShadow:4,
//                            display:'flex',
//                            flexDirection:'column',
//                            justifyContent:'space-between',
//                            textAlign:'center'
//                 }}>
//                     <CardMedia component="img" sx={{height: 190,objectFit:'contain',width:'100%'}}
//                     image={`http://localhost:5000/${prod.prodimage?.replace("\\","/")}`}
//                     />
//                     <CardContent>
//                         <Typography variant='h5'><strong>Title</strong> : {prod.title}</Typography>
//                         <Typography variant='h5'><strong>Category</strong> : {prod.category}</Typography>
//                   <Typography variant='h5'><strong>Price</strong> : {prod.price}</Typography>
//                     </CardContent>
//                     <CardActions>
//                         <Button onClick={()=>{
//                              dispatcher(addItem(prod))
//                             handleopen()
//                         }} color='secondary' variant='contained'>AddToCard</Button>
//                         <Snackbar 
//                         open={isopen}
//                         autoHideDuration={6000}
//                         onClose={handleClose}
//                         message="Product Added"
//                         />
//                     </CardActions>
//                 </Card>
//                 </Grid>
                
//             )
//         })
//     }
//     </Grid>
    
// </Box>
//   )
// }

// export default Products