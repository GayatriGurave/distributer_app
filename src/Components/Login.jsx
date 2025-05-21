
import {
  Box, Button, Paper, TextField,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../reduxwork/UserSlice'
import axios from 'axios'

const Login = () => {
 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitFormData = async (event) => {
    event.preventDefault()

    const formEntries = new FormData(event.target)
    const formDataObject = Object.fromEntries(formEntries.entries())
    console.log("DATA", formDataObject);
    try {
      const res = await axios.post("http://localhost:5000/api/login",
        formDataObject)
      dispatch(login(res.data.data))
      navigate('/profile')
    } catch (error) {
      console.log("Error", error.message);
      alert("Login Error")
    }

  }

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2
      }}
    >
      <Paper elevation={6} sx={{ padding: 5, width: 400, borderRadius: 3 }}>
        <Typography variant='h4' textAlign="center" mb={3} color="primary">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={submitFormData}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
        >
          <TextField
            type='email'
            label="Email"
            name='email'
            variant='outlined'
            fullWidth
            required
          />
          <TextField
            type='password'
            label="Password"
            name='password'
            variant='outlined'
            fullWidth
            required
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
              ':hover': {
                backgroundColor: '#1976d2',
                boxShadow: 4
              }
            }}
                   >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Login
