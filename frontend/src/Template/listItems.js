import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";
import authService from "../services/auth-service";
import GradingIcon from '@mui/icons-material/Grading';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

let loggedUser = authService.getCurrentUser();

//zo krijgen we te zien wat gebruiker rol is bij het inloggen
export const loggedUserComponent =(
  <React.Fragment>
    <ListItem >
    <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
    <ListItemText >
      {loggedUser !== null ? loggedUser.role == "COMPLIANCEMEDEWERKER"? <span style={{ fontSize: "12px" }}>COMPLIANCE </span>: loggedUser.role == "SYSTAINABILITYMEDEWERKER"? <span style={{ fontSize: "12px" }}>SYSTAINABILITY </span>: <span style={{ fontSize: "12px" }}>{loggedUser.role} </span>:null}
      </ListItemText>
    </ListItem>
    </React.Fragment>
);


//uitlogsidebar
export const LogoutSidebar =(
  <React.Fragment>
    <ListSubheader component="div" inset></ListSubheader>
    <ListItem button onClick={authService.logout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Uitloggen" />
    </ListItem>
  </React.Fragment>

);

//sidebar wat een klant te zien krijg
export const klantItems = (
  <React.Fragment>
    <ListItem button component={Link} to={`/klant/kredieten`}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Overzicht" />
    </ListItem>

    
    <ListItem button component={Link} to={"/klant/addKrediet"}>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Aanvragen" />
    </ListItem>
  </React.Fragment>
);

//sidebar wat kantoormedewerker te zien krijgt als hij inlog
export const kantoorMedewerkerItems = (
  <React.Fragment>
    <ListItem button component={Link} to={`/kantoormedewerker/kredieten`}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Overzicht per klant" />
    </ListItem>
    <ListItem button component={Link} to={"/kantoormedewerker/addKrediet"}>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Krediet aanvragen" />
    </ListItem>

  </React.Fragment>
);


//wat de KREDIETBEOORDELAAR te zien krijgt bij sidebar
export const kredietbeoordelaarItems = (
  <React.Fragment>
    <ListItem button component={Link} to={"/in-behandeling"}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="In behandeling" />
    </ListItem>

    <ListItem button component={Link} to={`/jaarrekening/`}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary=" Jaarrekeningen" />
    </ListItem>
  </React.Fragment>
);


// als COMPLIANCEMEDEWERKER krijg je dit te zien bij sidebar
export const complianceMedewerkerItems = (
  <React.Fragment>
    <ListItem button component={Link} to={`/verdacht`}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Verdachte aanvragen" />
    </ListItem>
  </React.Fragment>
);


// als COMMERCIELEDIRECTIE inlog kan die dit zien
export const commercieleDirectieItems = (
  <React.Fragment>
    <ListItem button component={Link} to={`/whiteList`}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Witte-lijst" />
    </ListItem>
    <ListItem button component={Link} to={`/blackList`}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Zwarte-lijst" />
    </ListItem>
  </React.Fragment>

);


// als SYSTAINABILITYMEDEWERKER inlog kan die dit zien
export const systainabilityMedewerkerItems = (
  <React.Fragment>
    <ListItem button component={Link} to={`/sustainableList`}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Duurzame krediet" />
    </ListItem>
    </React.Fragment>
);


// als ADMINISTRATOR inlog kan die dit zien
export const administratorItems = (
  <React.Fragment>
    <ListItem button component={Link} to={"/gebruikertoevoegen"}>
      <ListItemIcon>
        <PersonAddAltIcon />
      </ListItemIcon>
      <ListItemText primary="Toevoegen" />
    </ListItem>
    <ListItem button component={Link} to={"/gebruikers"}>
      <ListItemIcon>
        <PersonAddAltIcon />
      </ListItemIcon>
      <ListItemText primary="Deactiveren" />
    </ListItem>
    
  </React.Fragment>

);





export const mainListItems = (
  <React.Fragment>
    <ListItem button component={Link} to={`/`}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Overzicht" />
    </ListItem>

    <ListItem button component={Link} to={"/add-krediet"}>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Krediet aanvragen" />
    </ListItem>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset></ListSubheader>

    <ListItem button component={Link} to={"/in-behandeling"}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="In behandeling" />
    </ListItem>
    <ListItem button component={Link} to={'/verdacht'} >
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Verdacht aanvragen" />
    </ListItem>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Instellingen" />
    </ListItemButton>
    <ListItem button component={Link} to={"/gebruikertoevoegen"}>
      <ListItemIcon>
        <PersonAddAltIcon />
      </ListItemIcon>
      <ListItemText primary="Gebruiker Toevoegen" />
    </ListItem>
    <ListItem button onClick={authService.logout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Uitloggen" />
    </ListItem>
  </React.Fragment>
);
