import React from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom';

const Appbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const navLinks = [
    { label: 'Products', path: '/product' },
    { label: 'Cart', path: '/cart' },
    { label: 'Orders', path: '/order' },
    { label: 'Profile', path: '/profile'}
  ];

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Brand Logo & Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <ListIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            DistributerApp
          </Typography>
        </Box>

        {/* Center: Navigation Links */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              onClick={() => navigate(link.path)}
              sx={{
                color: 'white',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  color: theme.palette.secondary.main,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Right: Profile/Login */}
        <Box>
          
          <Button
            onClick={() => navigate('/login')}
            variant="outlined"
            sx={{
              ml: 2,
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
