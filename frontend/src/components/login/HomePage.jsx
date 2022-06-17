import { useState } from "react";
import authService from "../../services/auth-service";
import { Button, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";

const HomePage = () => {
  const [loggedUser, setLoggedUser] = useState(authService.getCurrentUser());
  console.log(loggedUser);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                {loggedUser ? <p> U bent Ingelogd als gebruiker {loggedUser.role} </p> : null}
            </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
