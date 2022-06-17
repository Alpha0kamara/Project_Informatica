import React, { useEffect, useState } from "react";
import KredietService from "../../services/KredietService";
import authService from "../../services/auth-service";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../Template/Title'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Grid, tableCellClasses, TableContainer  } from '@mui/material';
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

export default function ListKredietF(props) {

  let loggedUser = authService.getCurrentUser();
  let navigate = useNavigate();

  const [Kredieten, setKredieten] = useState([])

  const viewJaarrekening = (ondernemingsNr) => {
    console.log("test", ondernemingsNr);
    navigate(`/jaarrekening/${ondernemingsNr}`);
};

  useEffect(() => {

    if (loggedUser.role === 'KREDIETBEOORDELAAR') {
        KredietService.getKredieten().then(response => {
            if (response.data) {
              setKredieten(response.data)
              console.log(JSON.stringify(response.data))
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

              <Title>Lijst van krediet aanvragen</Title>
              <br />
              <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Naam</StyledTableCell>
                    <StyledTableCell>Ondernemingsnummer</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Kredieten.map((Krediet) => (
                    <TableRow key={Krediet.id}>
                      <TableCell>{Krediet.naam}</TableCell>
                      <TableCell>{Krediet.klantID}</TableCell>
                      <TableCell>
                        <Button
                          style={ButtonStyle}
                          variant="contained"
                          onClick={() => viewJaarrekening(Krediet.klantID)}
                        >
                          Jaarrekening
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

