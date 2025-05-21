import React from 'react';
import { Box, Button, Typography, Paper, Divider } from '@mui/material';
import { logout } from '../reduxwork/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.userInfo);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
      }}
    >
      <Paper elevation={5} sx={{ padding: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom color="primary">
          User Profile
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6"><strong>Name:</strong> {userdata.name}</Typography>
          <Typography variant="h6"><strong>Mobile:</strong> {userdata.mobile}</Typography>
          <Typography variant="h6"><strong>Email:</strong> {userdata.email}</Typography>
          <Typography variant="h6"><strong>Distributor Type:</strong> {userdata.distType}</Typography>
          <Typography variant="h6"><strong>Address:</strong> {userdata.address}</Typography>
          <Typography variant="h6"><strong>City:</strong> {userdata.city}</Typography>
          <Typography variant="h6"><strong>State:</strong> {userdata.state}</Typography>
          <Typography variant="h6"><strong>Pincode:</strong> {userdata.pincode}</Typography>

          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{
              mt: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 2,
              boxShadow: 2,
              transition: '0.3s',
              ':hover': {
                boxShadow: 4,
                backgroundColor: '#d32f2f'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
