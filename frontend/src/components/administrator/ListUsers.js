import React, { useEffect, useState } from "react";
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
import { Grid } from "@mui/material";
import userService from "../../services/user-service";

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

//This function will show a list of users that only the administration is allowed to view. //
export default function ListUsers(props) {
  let loggedUser = authService.getCurrentUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (loggedUser.role === "ADMINISTRATOR") {
      userService.getAll().then((response) => {
        if (response.data) {
          setUsers(response.data);
        }
      });
    }
  }, []);

  //this method will let the administrator delete an user. //
  const deleteUser = (id) => {
    if (loggedUser.role === "ADMINISTRATOR") {
      userService.deleteUser(id).then((response) => {
        if (response.data) {
          userService.getAll().then((response) => {
            if (response.data) {
              setUsers(response.data);
            }
          });
        }
      });
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Lijst van gebruikers</Title>
              <br />
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Gebruikersnaam</StyledTableCell>
                    <StyledTableCell>Voornaam</StyledTableCell>
                    <StyledTableCell>Achternaam</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>
                        <Button
                          style={ButtonStyle}
                          variant="contained"
                          onClick={() => window.confirm('Weet u zeker dat u de gebruiker: ' + user.email + ' wilt deactiveren?') ? deleteUser(user.id) : null}>
                          deactiveren
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
