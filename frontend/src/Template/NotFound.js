import React from "react";

import { Container, Grid, Paper} from "@mui/material";


export default function NotFound() {


  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <p>Pagina niet gevonden.</p>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
