import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Title from "../../Template/Title";
import { Slider, MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import authService from "../../services/auth-service";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { IMaskInput } from "react-imask";
import { capitalize } from "@material-ui/core";

const theme = createTheme();
const ButtonStyle = {
  background: "#2E3B55",
};

function valuetext(value) {
  return `${value}m`;
}

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      //prefix="€"
    />
  );
});

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#*0000.000.000"
      definitions={{
        "#": /[B-b]/,
        "*": /[E-e]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function AddKrediet(props) {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {authService.getCurrentUser().role === "KANTOORMEDEWERKER" ?  props.errorEmploy && <div style={{ color: "red" }}>{props.errorEmploy}</div>: 
            props.error && <div style={{ color: "red" }}>{props.error}</div>}
           
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Indienen krediet aanvraag</Title>
              {authService.getCurrentUser().role === "KANTOORMEDEWERKER" ? (
                <Grid item xs={12} sx={{ p: 1 }}>
                  <br></br>
                  <Autocomplete
                    id="mail"
                    freeSolo
                    options={props.customers}
                    getOptionLabel={(options) => `${options.email} `}
                    renderInput={(params) => (
                      <>
                        <InputLabel>Gebruikersnaam</InputLabel>
                        <TextField {...params} variant="standard" />
                      </>
                    )}
                    onChange={(event, value) =>
                      value !== null ? props.setUserId(value.id) : null
                    }
                  />
                </Grid>
              ) : null}
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Projectnaam</InputLabel>
                <TextField
                  // error ={this.state.naam.length === 0 ? true : false }
                  required
                  id="Projectname"
                  htmlFor="naam"
                  name="naam"
                  variant="standard"
                  fullWidth
                  value={props.naam}
                  onChange={(event) => props.setNaam(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Ondernemingsnummer</InputLabel>
                <TextField
                  // error ={this.state.naam.length === 0 ? true : false }
                  required
                  htmlFor="ondernemingsNummer"
                  name="naam"
                  variant="standard"
                  fullWidth
                  value={props.klantId}
                  onChange={(event) => {
                    props.setKlantId(event.target.value.toUpperCase());
                  }}
                  InputProps={{
                    placeholder: "BEXXXX.XXX.XX",
                    inputComponent: TextMaskCustom,
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Eigen inbreng</InputLabel>
                <TextField
                  // error ={this.state.naam.length === 0 ? true : false }
                  //sx={{input: {textAlign: "right"}}}      align right
                  required
                  htmlFor="eigenVermogen"
                  name="eigenVermogen"
                  variant="standard"
                  fullWidth
                  alig
                  value={props.eigenVermogen}
                  onChange={(event) =>
                    props.setEigenVermogen(event.target.value)
                  }
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: (
                      <InputAdornment position="start">€</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Te lenen bedrag</InputLabel>
                <TextField
                  // error ={this.state.naam.length === 0 ? true : false }
                  required
                  htmlFor="lening"
                  name="lening"
                  variant="standard"
                  fullWidth
                  value={props.lening}
                  onChange={(event) => props.setLening(event.target.value)}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: (
                      <InputAdornment position="start">€</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                {/* <TextField
                                    required
                                    htmlFor="leningType"
                                    name="leningType"
                                    label="Soort investering"
                                    fullWidth
                                    variant="standard"
                                    onChange={
                                        this.handleInputChange
                                    }
                                /> */}

                <InputLabel id="Type-lening-label">Type</InputLabel>
                <Select
                  required
                  labelId="Type-lening-label"
                  label="Type"
                  id="Type-lening-select"
                  htmlFor="leningType"
                  name="leningType"
                  fullWidth
                  variant="standard"
                  value={props.leningType}
                  onChange={(event) => props.setLeningType(event.target.value)}
                >
                  <MenuItem name="leningType" value={0}>
                    Auto lening
                  </MenuItem>
                  <MenuItem name="leningType" value={1}>
                    Vastgoed
                  </MenuItem>
                  <MenuItem name="leningType" value={2}>
                    Zakelijke lening
                  </MenuItem>
                  <MenuItem name="leningType" value={3}>
                    Inventaris en winkelinrichting
                  </MenuItem>
                  <MenuItem name="leningType" value={4}>
                    Machines/zwaar transport
                  </MenuItem>
                  <MenuItem name="leningType" value={5}>
                    Verbouwing bedrijfspand(huur)
                  </MenuItem>
                  <MenuItem name="leningType" value={6}>
                    Verbouwing bedrijfspand(eigendom)
                  </MenuItem>
                  <MenuItem name="leningType" value={7}>
                    Aanschaf bedrijfspand
                  </MenuItem>
                  <MenuItem name="leningType" value={8}>
                    Kaskrediet
                  </MenuItem>
                  <MenuItem name="leningType" value={9}>
                    Aankoop van materieel
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Rentevoet</InputLabel>
                <Select
                  required
                  htmlFor="rentevoet"
                  name="rentevoet"
                  fullWidth
                  variant="standard"
                  value={props.rentevoet}
                  onChange={(event) => props.setRentevoet(event.target.value)}
                >
                  <MenuItem name="rentevoet" value={0}>
                    Vaste rentevoet
                  </MenuItem>
                  <MenuItem name="rentevoet" value={1}>
                    Variabele rentevoet
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Looptijd (In maanden)</InputLabel>
                <Slider
                  aria-label="Small steps"
                  defaultValue={0.00000005}
                  getAriaValueText={valuetext}
                  step={1}
                  marks
                  min={props.minValue(props.leningType)}
                  max={props.maxValue(props.leningType)}
                  valueLabelDisplay="auto"
                  value={props.looptijd}
                  onChange={(event) => props.setLooptijd(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <InputLabel>Extra info over de lening</InputLabel>
                <TextField
                  aria-label="empty textarea"
                  placeholder="Typ hier een omschrijving voor uw lening, dit kan helpen om uw lening te valideren"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={props.leningOmschrijving}
                  onChange={(event) =>
                    props.setLeningOmschrijving(event.target.value)
                  }
                />
              </Grid>

              <Button
                type="submit"
                style={ButtonStyle}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => props.AddKrediet()}
              >
                Vraag aan
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
