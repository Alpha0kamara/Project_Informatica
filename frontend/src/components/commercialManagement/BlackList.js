import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { Button, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Title from "../../Template/Title";
import BlackListService from "../../services/BlackListService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import WhiteListService from "../../services/WhiteListService";
import authService from "../../services/auth-service";

const BlackList = () => {
  const ButtonStyle = {
    background: "#2E3B55",
  };
  const loggedUser = authService.getCurrentUser();
  const [naam, setNaam] = useState("");
  const [nacbelCode, setNacbelCode] = useState("");
  const [blackList, setBlackLists] = useState([]);
  const [whiteList, setWhiteLists] = useState([]);
  const [error, setError] = useState(null);

  // When logged in as commercial manager he will be able to see a list of
  // company's that are in the black and whitelist.//
  useEffect(() => {
    if (loggedUser.role === "COMMERCIELEDIRECTIE") {
      BlackListService.getBlackLists().then((response) => {
        if (response.data) {
          setBlackLists(response.data);
        }
      });
      WhiteListService.getWhiteLists().then((response) => {
        if (response.data) {
          setWhiteLists(response.data);
        }
      });
    }
  }, []);
console.log(nacbelCode);
  
// Method to add a type of company's name and Nacebel Code to the blacklist.
// There is also a check to see if it already exists in the blacklist.//

  const AddList = () => {
    setError(null)
    if (loggedUser.role === "COMMERCIELEDIRECTIE"){
      if(!nacbelCode || !naam){
        setError("Vul de verplicte velden in aub!")
      }
     else{
      BlackListService.addBlackList(naam, nacbelCode).then((res) => {
        window.location.href = "/blackList";
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setError("Nacbelcode bestaat al in de witte of zwarte lijst!");
          setNacbelCode("");
        }
        console.log(error);
      });
     }

    }
    
    
  };

  // Method to delete type of company by its Nacebel Code from the blacklist //
  const deleteNacebel = (id) => {
    BlackListService.deleteBlackList(id).then((res) => {
      setBlackLists({
        blackList: blackList.filter((list) => list.nacebelCode !== id),
      });
    });
    window.location.reload();
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          {error && <div style={{ color: "red" }}>{error}</div>}
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Voeg een nacbelcode toe aan de zwarte lijst!</Title>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "30px 0 30px 0",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ margin: "20px" }}>
                    <InputLabel>naam</InputLabel>
                    <TextField
                      // error ={this.state.naam.length === 0 ? true : false }
                      required
                      htmlFor="naam"
                      name="naam"
                      variant="standard"
                      fullWidth
                      value={naam}
                      onChange={(event) => setNaam(event.target.value)}
                    />
                  </div>
                  <div style={{ margin: "20px" }}>
                    <InputLabel>nacbelcode</InputLabel>
                    <TextField
                      required
                      htmlFor="naam"
                      name="naam"
                      variant="standard"
                      fullWidth
                      value={nacbelCode}
                      onChange={(event) => setNacbelCode(event.target.value)}
                    />
                  </div>
                  <div>
                    <Button
                      style={ButtonStyle}
                      onClick={() => AddList()}
                      variant="contained"
                    >
                      {" "}
                      Voeg Toe{" "}
                    </Button>
                  </div>
                </div>
              </div>
              <Title>Overzicht van de zwarte lijst!</Title>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Naam</TableCell>
                    <TableCell>nacbelCode</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blackList?.map((blacklist) => (
                    <TableRow key={blacklist.nacbelCode}>
                      <TableCell>{blacklist.naam}</TableCell>
                      <TableCell>{blacklist.nacbelCode}</TableCell>
                      <TableCell>
                        <Button
                          style={ButtonStyle}
                          variant="contained"
                          onClick={() =>
                            window.confirm(
                              "Weet u zeker dat u de code: " +
                                blacklist.nacbelCode +
                                " wilt verwijderen van zwarte lijst?"
                            )
                              ? deleteNacebel(blacklist.nacbelCode)
                              : null
                          }
                        >
                          Delete
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
};

export default BlackList;
