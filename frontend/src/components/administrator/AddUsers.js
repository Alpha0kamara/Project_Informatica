import React, { useEffect, useState } from "react";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Title from "../../Template/Title";
import axios from "axios";
import { InputLabel, MenuItem, Select } from "@mui/material";

const ButtonStyle = {
  background: "#2E3B55",
};
export default function AddUsers() {
  let loggedUser = authService.getCurrentUser();
  let navigate = useNavigate();
  const [userName, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [passwordError, setPaswordError] = useState(null)

  //when adding a user we make sure that the state value are not empty or that the password is longer than 8 //
  const addUser = () => {
    setPaswordError(null)
    setError(null)
    if (loggedUser.role === "ADMINISTRATOR") {
      if (
        password.length < 8 ||
        !role ||
        !lastName||
        !firstName || !userName
      ) {
        if (password.length < 8) {
          setPaswordError("Wachtwoord is te kort!");
          setPassword("");
        } else {
          setError("alle velden moeten ingevuld worden!");
        }
      } else {
        authService
          .register(userName, firstName, lastName, password, role)
          .then((res) => {
            navigate("/gebruikers");
          })
          .catch(function (error) {
            if (error.response.status === 400) {
              setError("Username bestaat al, probeer een andere!");
              setEmail("");
            }
            console.log(error);
          });
      }
    }
    
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {error && <div style={{ color: "red" }}>{error}</div>}
            {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Gebruiker Toevoegen</Title>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Gebruikersnaam</InputLabel>
                <TextField
                  required
                  htmlFor="userName"
                  name="userName"
                  variant="standard"
                  fullWidth
                  value={userName}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Voornaam</InputLabel>
                <TextField
                  required
                  htmlFor="firstName"
                  name="firstName"
                  variant="standard"
                  fullWidth
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Achternaam</InputLabel>
                <TextField
                  required
                  htmlFor="lastName"
                  name="lastName"
                  variant="standard"
                  fullWidth
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Wachtwoord</InputLabel>
                <TextField
                  required
                  htmlFor="password"
                  name="password"
                  variant="standard"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel id="Type-role-label">Type</InputLabel>
                <Select
                  required
                  labelId="Type-role-label"
                  label="Type"
                  id="Type-role-select"
                  htmlFor="rolType"
                  name="rolType"
                  fullWidth
                  variant="standard"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <MenuItem name="role" value={"ADMINISTRATOR"}>
                    Administrator
                  </MenuItem>
                  <MenuItem name="role" value={"KLANT"}>
                    Klant
                  </MenuItem>
                  <MenuItem name="role" value={"KANTOORMEDEWERKER"}>
                    KANTOORMEDEWERKER
                  </MenuItem>
                  <MenuItem name="role" value={"KREDIETBEOORDELAAR"}>
                    KREDIETBEOORDELAAR
                  </MenuItem>
                  <MenuItem name="role" value={"COMPLIANCEMEDEWERKER"}>
                    COMPLIANCEMEDEWERKER
                  </MenuItem>
                  <MenuItem name="role" value={"SYSTAINABILITYMEDEWERKER"}>
                    SYSTAINABILITYMEDEWERKER
                  </MenuItem>
                  <MenuItem name="role" value={"COMMERCIELEDIRECTIE"}>
                    COMMERCIELEDIRECTIE
                  </MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sx={{ p: 1 }}></Grid>
              <Button
                type="submit"
                style={ButtonStyle}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => addUser()}
              >
                Voeg Toe
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
