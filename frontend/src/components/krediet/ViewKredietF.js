import React, { useEffect, useState } from "react";
import KredietService from "../../services/KredietService";
import FeedbackService from "../../services/FeedbackService";
import ViewFeedbackF from "../officeEmployee/ViewFeedbackF";
import Title from "../../Template/Title";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth-service";
import Ratio from "./Ratio";

export default function ViewKredietF() {
  const ButtonStyle = {
    background: "#2E3B55",
    marginBottom: "10px",
  };

  const ButtonStyleDelete = {
    background: "darkred",
    marginBottom: "10px",
  };
  

  let navigate = useNavigate();
  const [Krediet, setKrediet] = useState({});
  const { id } = useParams();
  const [Feedback, setFeedback] = useState({});
  const [Omschrijving, setOmschrijving] = useState("");
  const loggedUser = authService.getCurrentUser();

  const deleteKrediet = (id) => {
    KredietService.deleteKrediet(id).then((res) => {
      setKrediet({ Krediet: Krediet.filter((Krediet) => Krediet.id !== id) });
    });
    window.location.reload();
    window.location.href =
      "http://localhost:3000/" +
      loggedUser.role.toString().toLowerCase() +
      "/kredieten";
  };

  const viewJaarrekening = (ondernemingsNr) => {
    console.log("test", ondernemingsNr);
    navigate(`/jaarrekening/${ondernemingsNr}`);
  };

  const viewContract = () => {
    navigate(`/contract/${loggedUser.id}/${Krediet.id}`);
    window.location.reload();
  };

  useEffect(() => {
    KredietService.getKredietById(id).then((response) => {
      if (response.data) {
        setKrediet(response.data);
        setFeedback(response.data.feedback);
        setOmschrijving(response.data.Omschrijving);
        console.log(response.data.Omschrijving);
        console.log("krediet", response.data);
      }
    });
  }, []);

  const saveFeedback = () => {
    FeedbackService.updateFeedback(Feedback.status, Omschrijving, id);
    window.location.reload();
  };

  return (
    <>
     
      <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Details voor {Krediet.naam}</Title>

              <TableContainer>
              <Table>

                <TableRow><TableCell>KredietID:</TableCell>
                  <TableCell align="right">{Krediet.id}</TableCell>
                </TableRow>

                <TableRow><TableCell>Projectnaam:</TableCell>
                  <TableCell align="right">{Krediet.naam}</TableCell>
                </TableRow>
                <TableRow><TableCell>Ondernemingsnummer:</TableCell>
                  <TableCell align="right">{Krediet.klantID}</TableCell>
                </TableRow>
                <TableRow><TableCell>Leningtype:</TableCell>
                  <TableCell align="right">{Krediet.leningType}</TableCell>
                </TableRow>
                <TableRow><TableCell>Looptijd (in maanden):</TableCell>
                  <TableCell align="right">{Krediet.looptijd} maanden</TableCell>
                </TableRow>
                <TableRow><TableCell>Rentevoet:</TableCell>
                  <TableCell align="right">{Krediet.rentevoet}</TableCell>
                </TableRow>
                <TableRow><TableCell>Eigen inbreng:</TableCell>
                  <TableCell align="right">{Krediet.eigenVermogen?.toLocaleString("nl-BE", {
                    style: "currency",
                    currency: "EUR",
                  })}</TableCell>
                </TableRow>
                <TableRow><TableCell>Te lenen bedrag:</TableCell>
                  <TableCell align="right">{Krediet.lening?.toLocaleString("nl-BE", {
                    style: "currency",
                    currency: "EUR",
                  })}</TableCell>
                </TableRow>
                <TableRow><TableCell>Projectomschrijving:</TableCell>
                  <TableCell align="right">{Krediet.leningOmschrijving}</TableCell>
                </TableRow>
              </Table>  
              </TableContainer>
              {Feedback.status ==="GOEDGEKEURD" ?( 
                <Button
                  style={ButtonStyle}
                  variant="contained"
                  onClick={() => viewContract()}
                  >Contract bekijken
              </Button>
              ) : null}


              {loggedUser.role === "COMPLIANCEMEDEWERKER" &&
                Feedback.status === "VERDACHT" &&
                Feedback.omschrijving ===
                "U onvangt zodadelijk een reden van afkeuring." ? (
                <>
                  <br />
                  <TextField
                    multiline
                    rows={4}
                    placeholder="Feedback"
                    style={{ width: 350 }}
                    onChange={(Event) => setOmschrijving(Event.target.value)}
                  />
                  <br />
                  <Button
                    style={ButtonStyle}
                    variant="contained"
                    onClick={() => saveFeedback(Krediet.klantID)}
                  >
                    Opslaan
                  </Button>
                </>
              ) : null}

              {(loggedUser.role === "KLANT" ||
                loggedUser.role === "KANTOORMEDEWERKER") &&
                Feedback.status === "INBEHANDELING" ? (
                <>
                  <br />
                  <Button
                    style={ButtonStyleDelete}
                    variant="contained"
                    onClick={() =>
                      window.confirm(
                        "Weet u zeker dat u de aanvraag voor " +
                        Krediet.naam +
                        " wilt intrekken?"
                      )
                        ? deleteKrediet(Krediet.id)
                        : null
                    }
                  >
                    Intrekken
                  </Button>
                </>
              ) : null}

              {loggedUser.role === "KANTOORMEDEWERKER" &&
                Feedback.status === "INBEHANDELING" ? (
                <Button
                  style={ButtonStyle}
                  variant="contained"
                  onClick={() =>
                    (window.location.href = "/update-krediet/" + Krediet.id)
                  }
                >
                  Aanvraag bewerken
                </Button>
              ) : null}
              {loggedUser.role === "KREDIETBEOORDELAAR" ? (
                <Button
                  style={ButtonStyle}
                  variant="contained"
                  onClick={() => viewJaarrekening(Krediet.klantID)}
                >
                  Raadpleeg jaarrekening
                </Button>
              ) : null}

              
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <ViewFeedbackF ondernemingsNr={Krediet.klantID} name={Krediet.naam} />
    </>
  );
}
