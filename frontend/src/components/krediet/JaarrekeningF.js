import Title from "../../Template/Title";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Grid, TableCell, TableRow, TableContainer, Table } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function JaarrekeningF() {
  const [jaarrekening, setJaarrekening] = useState({});
  const { ondernemingsNr } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/jaarrekening/" + ondernemingsNr)
      .then((res) => {
        setJaarrekening(res.data);
        console.log(res.data.message);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(ondernemingsNr);
  }, [ondernemingsNr]);

  function valutaFormat(val) {
    return val?.toLocaleString("nl-BE", {
      style: "currency",
      currency: "EUR",
    })
  };



  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Jaarrekening van {jaarrekening.name}</Title>

            <TableContainer>
              <Table>

                <TableRow><TableCell>Ondernemingsnummer:</TableCell>
                  <TableCell align="right">{jaarrekening.vat}</TableCell>
                </TableRow>

                <TableRow><TableCell>NACBEL-code:</TableCell>
                  <TableCell align="right">{jaarrekening.nacbelCode}</TableCell>
                </TableRow>
                <TableRow><TableCell>Eigen vermogen:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.equity)}</TableCell>
                </TableRow>
                <TableRow><TableCell>Activa:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.assets)}</TableCell>
                </TableRow>
                <TableRow><TableCell>Resultaat:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.result)}</TableCell>
                </TableRow>
                <TableRow><TableCell>Belasting:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.tax)}</TableCell>
                </TableRow>
                <TableRow><TableCell>Resultaat na belasting:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.resultAfterTax)}</TableCell>
                </TableRow>
                <TableRow><TableCell>Financiële kosten:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.financialCosts)}</TableCell>
                </TableRow>
                <TableRow><TableCell>Vlottende activa:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.currentAssets)}</TableCell>
                </TableRow>

                <TableRow><TableCell>Marktaandelen:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.stock)}</TableCell>
                </TableRow>
                <TableRow><TableCell>Vaste activa:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.fixedAssets)}</TableCell>
                </TableRow>

                <TableRow><TableCell>Schulden op korte termijn:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.shortTermDebt)}</TableCell>
                </TableRow>
                <TableRow><TableCell>schulden op lange termijn:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.longTermDebt)}</TableCell>
                </TableRow>

                <TableRow><TableCell>Waardevermindering:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.depreciation)}</TableCell>
                </TableRow>
                <TableRow><TableCell>Afschrijving:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.writeDown)}</TableCell>
                </TableRow>

                <TableRow><TableCell>Financiële kosten:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.financialCosts)}</TableCell>
                </TableRow>
                <TableRow><TableCell>Vlottende activa:</TableCell>
                  <TableCell align="right">{valutaFormat(jaarrekening.currentAssets)}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
