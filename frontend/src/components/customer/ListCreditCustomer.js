import React, { useEffect, useState } from "react";
import KredietService from "../../services/KredietService";
import authService from "../../services/auth-service";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Template/Title";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Grid, TableContainer } from "@mui/material";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2E3B55",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}));

const ButtonStyle = {
  background: "#2E3B55",
  marginLeft: "10px",
};

export default function ListKredietF(props) {
  let loggedUser = authService.getCurrentUser();
  let navigate = useNavigate();

  //data that comes from the api
  const [kredieten, setKredieten] = useState([]);

  const viewKrediet = (id) => {
    navigate(`/view-krediet/${id}`);
    
   
  };

  useEffect(() => {
    if (loggedUser.role === "KLANT") {
      KredietService.getKredietenByUserID(loggedUser.id).then((response) => {
        if (response.data) {
          setKredieten(response.data);
        }
      });
    }
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Lijst van uw krediet aanvragen </Title>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead style={ButtonStyle}>
                    <TableRow>
                      <StyledTableCell>Projectnaam </StyledTableCell>
                      <StyledTableCell>Ondernemingsnummer</StyledTableCell>
                      <StyledTableCell>Leningtype</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {kredieten.map((Krediet) => (
                      <TableRow key={Krediet.id}>
                        <TableCell>{Krediet.naam}</TableCell>
                        <TableCell>{Krediet.klantID}</TableCell>
                        <TableCell>{Krediet.leningType}</TableCell>
                        <TableCell><p style={
                        Krediet.feedback.status ==="GOEDGEKEURD" ? {color:'green'} 
                        : Krediet.feedback.status ==="GEWEIGERD" ? {color:'red'}
                        : {color:'orange'}}> 
                            {Krediet.feedback.status} 
                        </p></TableCell>
                        <TableCell>
                          <Button
                            style={ButtonStyle}
                            variant="contained"
                            onClick={() => viewKrediet(Krediet.id)}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
