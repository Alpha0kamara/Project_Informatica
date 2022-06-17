import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Template/Title";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Button, Grid, TableContainer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const ButtonStyle = {
  background: "#2E3B55",
  marginLeft: "10px",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2E3B55",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}));

export default function Copy() {
  const [kredieten, setKredieten] = useState([]);
  const navigate = useNavigate();

  const viewKrediet = (id) => {
    navigate(`/view-krediet/${id}`);
  };

  //debugger
  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/kredietaanvragen/")
      .then((res) => {
        var data = [];
        data.push(res.data);
        var inBehandeling = [];

        for (let i = 0; i < data.length; i++) {
          console.log(data);
          for (let j = 0; j < data[i].length; j++) {
            console.log(
              "Eyo dit is uw status: " + i + JSON.stringify(data[i][j])
            );

            if (data[i][j].feedback.status == "INBEHANDELING") {
              console.log("JSON SHIT: " + JSON.stringify(data[i][j]));
              inBehandeling.push(data[i][j]);

              console.log("Jow dit is in behandeling: " + inBehandeling);
            }
          }
        }
        setKredieten(inBehandeling);
        //console.log("Dit staat in behandling " + inBehandeling);
        //console.log("Dit zit erin: "+ kredieten)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Aanvragen in behandeling</Title>
              <br />
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Projectnaam</StyledTableCell>
                      <StyledTableCell>Ondernemingsnummer</StyledTableCell>
                      <StyledTableCell>Leningtype</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>

                  {
                    <TableBody>
                      {kredieten.map((Krediet) => (
                        <TableRow key={Krediet.id}>
                          <TableCell>{Krediet.naam}</TableCell>
                          <TableCell>{Krediet.klantID}</TableCell>
                          <TableCell>{Krediet.leningType}</TableCell>
                          <TableCell>
                            <p
                              style={
                                Krediet.feedback.status === "GOEDGEKEURD"
                                  ? { color: "green" }
                                  : Krediet.feedback.status === "GEWEIGERD"
                                  ? { color: "red" }
                                  : { color: "orange" }
                              }
                            >
                              {Krediet.feedback.status}
                            </p>
                          </TableCell>
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
                  }
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
