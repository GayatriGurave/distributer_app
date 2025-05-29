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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Appbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // Add icon components for each nav item
  const navLinks = [
    { label: 'Products', path: '/product', icon: <StorefrontIcon fontSize="small" /> },
    { label: 'Cart', path: '/cart', icon: <ShoppingCartIcon fontSize="small" /> },
    { label: 'Orders', path: '/order', icon: <ReceiptLongIcon fontSize="small" /> },
    { label: 'Profile', path: '/profile', icon: <AccountCircleIcon fontSize="small" /> }
  ];

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Blue-teal gradient
        borderRadius: '0 0 12px 12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
        paddingX: 2,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Brand */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            '&:hover .brandText': {
              color: theme.palette.secondary.light,
            },
          }}
          onClick={() => navigate('/')}
        >
          <IconButton color="inherit">
            <ListIcon />
          </IconButton>
          <Typography
            variant="h6"
            className="brandText"
            sx={{
              fontWeight: 700,
              color: 'white',
              fontFamily: "'Poppins', sans-serif",
              transition: 'color 0.3s ease',
            }}
          >
            DistributerApp
          </Typography>
        </Box>

        {/* Center: Navigation */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navLinks.map(({ label, path, icon }) => (
            <Button
              key={label}
              onClick={() => navigate(path)}
              startIcon={icon}
              sx={{
                color: 'white',
                fontWeight: 500,
                borderRadius: 2,
                paddingX: 2,
                textTransform: 'none',
                transition: '0.3s',
                '&:hover': {
                  color: theme.palette.secondary.main,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Right: Login Button */}
        <Box>
          <Button
            onClick={() => navigate('/login')}
            variant="outlined"
            sx={{
              ml: 2,
              color: 'white',
              borderColor: 'white',
              fontWeight: 500,
              borderRadius: 2,
              textTransform: 'none',
              transition: '0.3s',
              '&:hover': {
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
