import React, { useEffect, useState } from "react";
import KredietService from "../../services/KredietService";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Template/Title";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import userService from "../../services/user-service";

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

export default function FilterByeCustomer(props) {
  let loggedUser = authService.getCurrentUser();
  let navigate = useNavigate();
  const [kredieten, setKredieten] = useState([]);
  const [customers, setCustomers] = useState([]);
  //search
  const [searchQuery, setSearchQuery] = useState("");
  

  const viewKrediet = (id) => {
    navigate(`/view-krediet/${id}`);
  };

  //searchquery
  const handleSearchQuery = (query) => {
    if (query != null) {
      //check first if logged user is a officeEmployee
      if (loggedUser.role === "KANTOORMEDEWERKER") {
        KredietService.getKredietenByUserID(query).then((response) => {
          if (response.data) {
            setKredieten(response.data);
          }
        });
      }
    }
  };

  //getting credit applications
  useEffect(() => {
    if (loggedUser.role === "KANTOORMEDEWERKER") {
      KredietService.getKredieten().then((response) => {
        if (response.data) {
          setKredieten(response.data);
        }
      })
    }
  }, []);

  //getting all users with roll klant from db
  useEffect(() =>{
    if(loggedUser.role === "KANTOORMEDEWERKER"){
      userService.getUserByRoleKlant().then(response =>{
        if(response.data){
          setCustomers(response.data.users)
        }})
    }
  }, [])



  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "30px 0 30px 0",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ width: 350 }}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={customers}
                      getOptionLabel={(options) =>
                        `${options.email} `
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Zoeken op klant" />
                      )}
                      onChange= {(event, value) => value !== null ? setSearchQuery(value.id): null }
                    />
                  </div>
                  <Button style={ButtonStyle}  onClick={() =>  handleSearchQuery(searchQuery)} variant="contained"> Search </Button>
                </div>
              </div>
              <Title>Lijst van kredietaanvragen</Title>
              <br />
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Projectnaam</StyledTableCell>
                    <StyledTableCell>Ondernemingsnummer</StyledTableCell>
                    <StyledTableCell>Leningtype</StyledTableCell>
                    <StyledTableCell>Looptijd</StyledTableCell>
                    {/* <TableCell>Rentevoet</TableCell>
                      <TableCell>Eigen inbreng</TableCell>
                      <TableCell>Te lenen bedrag</TableCell> */}
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
                      <TableCell>{Krediet.looptijd + " maanden"}</TableCell>
                      {/* <TableCell>{Krediet.rentevoet}</TableCell>
                        <TableCell>{Krediet.eigenVermogen}</TableCell>
                        <TableCell>{Krediet.lening}</TableCell> */}
                      <TableCell>
                      <p style={
                        Krediet.feedback.status ==="GOEDGEKEURD" ? {color:'green'} 
                        : Krediet.feedback.status ==="GEWEIGERD" ? {color:'red'}
                        : {color:'orange'}}> 
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
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
