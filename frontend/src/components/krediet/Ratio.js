import { Button, Grid, TableCell, TableRow, TextField, TableContainer, Table } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import FeedbackService from "../../services/FeedbackService";
import axios from "axios";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth-service";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../../Template/Title";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { createTheme } from "@mui/system";

export default function Ratio(props) {
  const [currentUser] = useState(authService.getCurrentUser());

  const ButtonStyleAccept = {
    color: "white",
    background: "darkgreen",
    width: "150px",
    margin: "15px",
    textAlign: "center",
  };

  const ButtonStyleDecline = {
    color: "white",
    background: "darkred",
    width: "150px",
    margin: "15px",
    textAlign: "center",
  };

  const [liquiditeit, setLiquiditeit] = useState();
  const [solvabiliteit, setSolvabiliteit] = useState();
  const [rentabiliteit, setRentabiliteit] = useState();
  const [Feedback, setFeedback] = useState();
  const [Omschrijving, setOmschrijving] = useState();
  let navigate = useNavigate();

  const { ondernemingsNr, id } = useParams();

  useEffect(() => {
    FeedbackService.getFeedbackById(id).then((response) => {
      if (response.data) {
        setFeedback(response.data);
        setOmschrijving(response.data.omschrijving);
        console.log("response data", response.data);
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/api/jaarrekening/" +
          ondernemingsNr +
          "/liquiditeit"
      )
      .then((res) => {
        setLiquiditeit(res.data);
        console.log(res.data);
      });

    axios
      .get(
        "http://localhost:8080/api/jaarrekening/" +
          ondernemingsNr +
          "/solvabiliteit"
      )
      .then((res) => {
        setSolvabiliteit(res.data);
        console.log(res.data);
      });
  }, []);

  const feedbackStatusGoedgekeurd = () => {
    FeedbackService.updateFeedback("GOEDGEKEURD", Omschrijving, id);
    navigate("/in-behandeling");
    window.location.reload();
  };
  const feedbackStatusAfgekeurd = () => {
    FeedbackService.updateFeedback("GEWEIGERD", Omschrijving, id);
    navigate("/in-behandeling");
    window.location.reload();
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Ratio-analyse</Title>

            
              

              <TableContainer>
              <Table>
                <TableRow><TableCell>liquiditeit:</TableCell>
                  <TableCell align="left">{Number(liquiditeit).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow><TableCell>solvabiliteit:</TableCell>
                  <TableCell align="left">{Number(solvabiliteit).toFixed(2) + "%"}</TableCell>
                </TableRow>
              </Table>
              </TableContainer>

                {Feedback &&
                Feedback.status === "INBEHANDELING" &&
                currentUser.role === "KREDIETBEOORDELAAR" ? (
                  <>
                    <br />
                    <TextField
                      multiline
                      rows={4}
                      maxRows={4}
                      placeholder="FeedbackOmschrijving"
                      style={{ width: 350 }}
                      onChange={(Event) => setOmschrijving(Event.target.value)}
                    />

                    <div style={{ textAlign: "center", width: "100%" }}>
                      <Button
                        style={ButtonStyleAccept}
                        onClick={() => feedbackStatusGoedgekeurd()}
                      >
                        {" "}
                        Goedkeuren{" "}
                      </Button>
                      <Button
                        style={ButtonStyleDecline}
                        onClick={() => feedbackStatusAfgekeurd()}
                      >
                        {" "}
                        Afkeuren{" "}
                      </Button>
                    </div>
                  </>
                ) : null}

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
