import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '../login/Alert';
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import AuthService from '../../services/auth-service';


export default function Login(props) {

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [messageType, setMessageType] = React.useState("")
  const [error, setError] = React.useState("error")



  let navigate = useNavigate();

  const alertRef = React.useRef();
  const theme = createTheme();

  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("email"))
    console.log(data.get("password"))


    // Calls the authentication service to check if the email and password exists to login //
    AuthService.login(email, password).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        if (error.response.status === 401) {
          setError(401)
          // setMessage("De combinatie van email en wachtwoord is fout!");
        } else if (error.response.status === 400) {
          setError(400)
          // setMessage("Velden moeten ingevuld worden!");
        } else {
          setMessage(error.message);
        }
        console.log("error message: ", resMessage);
      }
    );
  };

  React.useEffect(() => {
    if (error === 401) {
      setMessageType("error");
      setMessage("Foutieve email of wachtwoord!");

    } else if (error === 400) {
      setMessageType("error");
      setMessage("Velden moeten ingevuld worden!");
    } else if (error === "" || error == null) {
      setMessageType("success");
      setMessage("U bent successvol aangemeld!")
    }
  }, [error])

  const ButtonStyle = {

    background : '#2E3B55'
  };

  return (
    // <ThemeProvider theme={theme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor:'green' }}>

    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Login
    //       </Typography>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_960_720.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#2E3B55' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Gebruikersnaam"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="wachtwoord"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
           

            <Alert ref={alertRef} type={messageType} message={message}></Alert>
            <Button 
              style={ButtonStyle}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}
              onClick={() => alertRef.current.handleClick()}
            >
              Aanmelden
            </Button>
          </Box>
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}