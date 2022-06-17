import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import AuthService from './services/auth-service';
import Profile from './components/login/Profile';
import PrivateRoute from './components/login/PrivateRoute';
import { decodeToken, isExpired } from "react-jwt";
import eventBus from './EventBus';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  klantItems, kantoorMedewerkerItems,
  kredietbeoordelaarItems, complianceMedewerkerItems,
  systainabilityMedewerkerItems,
  administratorItems, commercieleDirectieItems,
  loggedUserComponent, LogoutSidebar
} from './Template/listItems';
import Copyright from './Template/Copyright';
import GebruikerToevoegen from './components/administrator/AddUsers';
import Gebruikers from './components/administrator/ListUsers';
import HomePage from './components/login/HomePage';
import ViewKredietF from './components/krediet/ViewKredietF';
import ViewFeedbackF from './components/officeEmployee/ViewFeedbackF';
import UpdateKrediet from './components/krediet/UpdateKrediet';
import JaarrekeningKredietList from './components/creditReviewer/JaarrekeningKredietList';
import Inbehandeling from './components/creditReviewer/In-behandeling';
import JaarrekeningF from './components/krediet/JaarrekeningF';
import Ratio from './components/krediet/Ratio';
import WhiteList from './components/commercialManagement/WhiteList';
import BlackList from './components/commercialManagement/BlackList';
import Contract from './components/officeEmployee/Contract';
import SustainableCredit from './components/systainabilityEmployee/SustainableCredit'
import FilterByeCustomer from './components/officeEmployee/FilterByeCustomer';
import CustomerListKrediet from './components/customer/ListCreditCustomer';
import CustomerAddCredit from './components/customer/AddCreditCustomer';
import AddCreditEmployee from './components/officeEmployee/AddCreditEmployee';
import VerdachteAanvragen from './components/complianceEmployee/VerdachteAanvragen'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Prijszetting from "./components/krediet/PrijsZetting"
import NotFound from './Template/NotFound';
import NoAuth from './Template/NoAuth';


// import EditKrediet from './Krediet/EditKrediet'
// import SearchKrediet from './Krediet/SearchKrediet.js'   //<Route exact path='/search'><SearchKrediet/></Route>
// import DeleteKrediet from './Krediet/DeleteKrediet'






////////////////////////////////////////////////////////////////////////////////////////

let drawerWidth = 0;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();
///////////////////////////////////////////////////////////////////////////////////////

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open)
  }


  const currUser = AuthService.getCurrentUser()
  let token = ""
  if (currUser) {
    token = currUser.accessToken
  }

  const isLoggedIn = AuthService.isLoggedIn()
  const myDecodedToken = decodeToken("Bearer" + token);
  const isMyTokenExpired = isExpired(token);



  function logOut() {
    AuthService.logout();
    setUser(undefined);
  }

  const [user, setUser] = React.useState()
  useEffect(() => {
    setUser(AuthService.getCurrentUser())
    eventBus.on("logout", () => {
      logOut();
    });
    return () => {
      // Anything in here is fired on component unmount.
      eventBus.remove("logout");
    }
  }, []);

  if (currUser) {
    console.log("user in routing.js: ", user);
    // console.log("issued at: ", ((myDecodedToken.iat % 60000) / 1000).toFixed(0))
    // console.log("expires: ", ((myDecodedToken.exp % 60000) / 1000).toFixed(0))
    console.log("active JWT: ", !isMyTokenExpired);
    console.log("is still logged in: ", isLoggedIn);
    console.log("time active JWT: ", ((myDecodedToken.exp - myDecodedToken.iat) / 60) + " min");
    console.log("rol van ingelogde gebruiker: ");
    console.log(currUser.role);
  }

  if (isLoggedIn) {
    drawerWidth = 240;
  }


  return (

    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar style={{ background: '#2E3B55' }} position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              {isLoggedIn === true ? <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton> : <></>}
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Pops Loan
              </Typography>
              {isLoggedIn === true ? <IconButton color="inherit" onClick={AuthService.logout}>
                <LogoutIcon />
              </IconButton> : <></>}
            </Toolbar>
          </AppBar>
          {isLoggedIn === true ? <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {loggedUserComponent}
              <Divider sx={{ my: 1 }} />
              {currUser.role === "KLANT" && klantItems}
              {currUser.role === "KANTOORMEDEWERKER" && kantoorMedewerkerItems}
              {currUser.role === "KREDIETBEOORDELAAR" && kredietbeoordelaarItems}
              {currUser.role === "COMPLIANCEMEDEWERKER" && complianceMedewerkerItems}
              {currUser.role === "SYSTAINABILITYMEDEWERKER" && systainabilityMedewerkerItems}
              {currUser.role === "COMMERCIELEDIRECTIE" && commercieleDirectieItems}
              {currUser.role === "ADMINISTRATOR" && administratorItems}
              <Divider sx={{ my: 1 }} />
              {LogoutSidebar}
            </List>
          </Drawer> : <></>}
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />

            <div className="container">
              <Routes>
                {isLoggedIn ? <Route exact path="/" element={<PrivateRoute user={isLoggedIn == true}> <HomePage /> </PrivateRoute>} /> :
                  <Route exact path="/" element={<PrivateRoute user={isLoggedIn == false}> <Login /> </PrivateRoute>} />}

                <Route path={"/klant/kredieten"} element={<PrivateRoute user={isLoggedIn && currUser.role == "KLANT"}> <CustomerListKrediet /> </PrivateRoute>} />
                <Route path={"/klant/addKrediet"} element={<PrivateRoute user={isLoggedIn && currUser.role == "KLANT"}> <CustomerAddCredit /> </PrivateRoute>} />

                <Route path={"/kantoormedewerker/kredieten"} element={<PrivateRoute user={isLoggedIn && currUser.role == "KANTOORMEDEWERKER"}> <FilterByeCustomer /> </PrivateRoute>} />
                <Route path={"/kantoormedewerker/addKrediet"} element={<PrivateRoute user={isLoggedIn && currUser.role == "KANTOORMEDEWERKER"}> <AddCreditEmployee /> </PrivateRoute>} />


                <Route path={"/update-krediet/:id"} element={<PrivateRoute user={isLoggedIn && currUser.role == "KANTOORMEDEWERKER"}> <UpdateKrediet /> </PrivateRoute>} />

                <Route path={"/feedback/:id"} element={<PrivateRoute user={isLoggedIn && (currUser.role == "KANTOORMEDEWERKER" || currUser.role == "KLANT" || currUser.role == "COMPLIANCEMEDEWERKER" || currUser.role == "KREDIETBEOORDELAAR")}> <ViewFeedbackF /> </PrivateRoute>} />
                <Route path={"/whiteList"} element={<PrivateRoute user={isLoggedIn && currUser.role == "COMMERCIELEDIRECTIE"}> <WhiteList /> </PrivateRoute>} />
                <Route path={"/blackList"} element={<PrivateRoute user={isLoggedIn && currUser.role == "COMMERCIELEDIRECTIE"}> <BlackList /> </PrivateRoute>} />

                <Route path={"/profile"} element={<PrivateRoute user={isLoggedIn && currUser.role == "ADMINISTRATOR"}> <Profile /> </PrivateRoute>} />
                <Route path={"/Gebruikertoevoegen"} element={<PrivateRoute user={isLoggedIn && currUser.role == "ADMINISTRATOR"}> <GebruikerToevoegen /> </PrivateRoute>} />
                <Route path={"/Gebruikers"} element={<PrivateRoute user={isLoggedIn && currUser.role == "ADMINISTRATOR"}> <Gebruikers /> </PrivateRoute>} />
                <Route path={"/view-krediet/:id"} element={<PrivateRoute user={isLoggedIn && (currUser.role == "KANTOORMEDEWERKER" || currUser.role == "KLANT" || currUser.role == "COMPLIANCEMEDEWERKER" || currUser.role == "KREDIETBEOORDELAAR")}> <ViewKredietF /> </PrivateRoute>} />
                <Route path={"/in-behandeling"} element={<PrivateRoute user={isLoggedIn && currUser.role == "KREDIETBEOORDELAAR"}> <Inbehandeling /> </PrivateRoute>} />
                <Route path={"/verdacht"} element={<PrivateRoute user={isLoggedIn && currUser.role == "COMPLIANCEMEDEWERKER"}> <VerdachteAanvragen /> </PrivateRoute>} />
                <Route path={"/jaarrekening/"} element={<PrivateRoute user={isLoggedIn && currUser.role == "KREDIETBEOORDELAAR"}> <JaarrekeningKredietList /> </PrivateRoute>} />
                <Route path={"/contract/:userId/:id"} element={<PrivateRoute user={isLoggedIn && (currUser.role == "KLANT" || currUser.role == "KANTOORMEDEWERKER") } > <Prijszetting /> </PrivateRoute>} />

                <Route path={"/ratio/:ondernemingsNr/:id"} element={<PrivateRoute user={isLoggedIn && currUser.role == "KREDIETBEOORDELAAR"}> <Ratio /> </PrivateRoute>} ></Route>
                <Route path={"/jaarrekening/:ondernemingsNr"} element={<PrivateRoute user={isLoggedIn && currUser.role == "KREDIETBEOORDELAAR"}> <JaarrekeningF /> </PrivateRoute>}></Route>
                <Route path={"/contract"} element={<PrivateRoute user={isLoggedIn && (currUser.role == "KLANT" || currUser.role == "KANTOORMEDEWERKER" || currUser.role == "SYSTAINABILITYMEDEWERKER")}> <Contract /> </PrivateRoute>} />
                <Route path={"/sustainableList"} element={<PrivateRoute user={isLoggedIn}> <SustainableCredit /> </PrivateRoute>} ></Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/auth" element={<NoAuth />} />

      

              </Routes>
            </div>
            <Copyright sx={{ pt: 4 }} />
          </Box>
        </Box>
      </ThemeProvider>

    </Router>


  );
}
export default App;
