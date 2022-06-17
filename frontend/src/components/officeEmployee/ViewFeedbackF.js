import React, { useEffect, useState } from "react";
import FeedbackService from "../../services/FeedbackService";
import Title from "../../Template/Title";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Grid, Table, TableCell, TableContainer, TableRow } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import authService from "../../services/auth-service";

export default function ViewFeedbackF(props) {
  let navigate = useNavigate();
  const viewRatio = (ondernemingsNr) => {
    navigate(`/ratio/${ondernemingsNr}/${id}`);
  };

  const ButtonStyle = {
    background: "#2E3B55",
    marginLeft: "10px",
    marginBottom: "10px"
  };

  const [Feedback, setFeedback] = useState({});
  const { id } = useParams();
  const loggedUser = authService.getCurrentUser();

  useEffect(() => {

    FeedbackService.getFeedbackById(id).then((response) => {
      if (response.data) {
        setFeedback(response.data);
        console.log("feedback", response.data);
      }
    });
  }, []);

  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Feedback voor {props.name}</Title>

            <TableContainer>
              <Table>
                <TableRow><TableCell>Status:</TableCell>
                  <TableCell align="left">{Feedback.status}</TableCell>
                </TableRow>
                <TableRow><TableCell>omschrijving:</TableCell>
                  <TableCell align="left">{Feedback.omschrijving}</TableCell>
                </TableRow>
              </Table>
              </TableContainer>



            {loggedUser.role == "KREDIETBEOORDELAAR" ?
              <><br /><Button
                style={ButtonStyle}
                variant="contained"
                onClick={() => viewRatio(props.ondernemingsNr)}
              >
                Raadpleeg ratio-analyse
              </Button></>
              : null
            }
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
