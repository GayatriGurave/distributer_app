import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../reduxwork/UserSlice';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const submitFormData = async (event) => {
    event.preventDefault();
    const formEntries = new FormData(event.target);
    const formDataObject = Object.fromEntries(formEntries.entries());
    try {
      const res = await axios.post("http://localhost:5000/api/login", formDataObject);
      dispatch(login(res.data.data));
      navigate('/profile');
    } catch (error) {
      alert("Login Error");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 5 },
          width: { xs: '95vw', sm: 400 },
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #1976d2 60%, #64b5f6 100%)",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            boxShadow: 3
          }}
        >
          <LockOutlined sx={{ color: "#fff", fontSize: 32 }} />
        </Box>
        <Typography variant='h4' textAlign="center" mb={1} color="primary" fontWeight={700}>
          Login
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" mb={3} textAlign="center">
          Welcome back! Please enter your credentials.
        </Typography>
        <Box
          component="form"
          onSubmit={submitFormData}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%"
          }}
        >
          <TextField
            type='email'
            label="Email"
            name='email'
            variant='outlined'
            fullWidth
            required
            autoComplete="email"
            sx={{
              background: "#f9f9f9",
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main'
                }
              }
            }}
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name='password'
            variant='outlined'
            fullWidth
            required
            autoComplete="current-password"
            sx={{
              background: "#f9f9f9",
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main'
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size="large"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: 2,
              transition: '0.3s',
              fontSize: 18,
              py: 1.2,
              mt: 1,
              ':hover': {
                background: "linear-gradient(90deg, #1565c0 60%, #64b5f6 100%)",
                boxShadow: 4
              }
            }}
          >
            Login
          </Button>
        </Box>
        
      </Paper>
    </Box>
  );
};

export default Login;
