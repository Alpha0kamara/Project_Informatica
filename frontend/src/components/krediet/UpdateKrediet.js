import React, { useEffect } from 'react';
import { Navigate, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Title from '../../Template/Title'
import { Slider, MenuItem, makeStyles, Select, Alert, InputAdornment } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import KredietService from "../../services/KredietService";
//import style from '././login/style'
import { useParams } from 'react-router-dom';
import { Identity } from '@mui/base';
import authService from '../../services/auth-service';
import { IMaskInput } from 'react-imask';
import NumberFormat from "react-number-format";
import FeedbackService from "../../services/FeedbackService";

const theme = createTheme();
const ButtonStyle = {

    background: '#2E3B55'
};

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Dit veld is verplicht!
            </div>
        );
    }
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
    const userId = authService.getCurrentUser().id;
    const [naam, setNaam] = React.useState('');
    const [eigenVermogen, setEigenVermogen] = React.useState('');
    const [lening, setLening] = React.useState('');
    const [klantId, setKlantId] = React.useState('');
    const [leningType, setLeningType] = React.useState('');
    const [looptijd, setLooptijd] = React.useState(' ');
    const [rentevoet, setRentevoet] = React.useState('');
    const [leningOmschrijving, setLeningOmschrijving] = React.useState('');
    const [feedback, setFeedback] = React.useState({
        documentId: '',
        omschrijving: 'Ondernemingsnr bestaat niet',
        status: 1

    });
    const id = useParams().id;
    const navigate = useNavigate();
    





    const GetKredietById = (id) => {
        KredietService.getKredietById(id)
            .then(res => {

                setLeningType(res.data.leningType);
                setNaam(res.data.naam);
                setEigenVermogen(res.data.eigenVermogen);
                setLening(res.data.lening);
                setKlantId(res.data.klantID);
                
                setLooptijd(res.data.looptijd);
                setRentevoet(res.data.rentevoet);
                setLeningOmschrijving(res.data.leningOmschrijving);





            })
    }


    const UpdateKrediet = () => {
        KredietService.updateKrediet(naam, eigenVermogen, lening, klantId,leningType , looptijd, rentevoet , leningOmschrijving, feedback, userId, id)
        .then(res => {
            FeedbackService.createFeedback(
                feedback.status,
                feedback.omschrijving,
                res.data.id
            )
            
            console.log(res.data);
            window.location.href= '/view-krediet/'+id;
            
        }

        )
    }



    useEffect(() => {
        GetKredietById(id);



    }, []);

    function convertToNumber(leningType) {

        var number = 0

        switch (leningType) {
            case leningType = "AUTOLENING":
                number = 0
                break;
            case leningType = "VASTGOED":
                number = 1
                break;
            case leningType = "ZAKELIJKELENING":
                number = 2
                break;
            case leningType = "INVENTARIS":
                number = 3
                break;
            case leningType = "ZWAARTRANSPORT":
                number = 4
                break;
            case leningType = "HUUR":
                number = 5
                break;
            case leningType = "EIGENDOM":
                number = 6
                break;
            case leningType = "BEDRIJFSPAND":
                number = 7
                break;
            case leningType = "KASKREDIET":
                number = 8
                break;
            case leningType = "MATERIEEL":
                number = 9
                break;
            default:
                break;
        }
        return number
    }



    function maxValue(leningType) {

        var max = 0

        switch (leningType) {
            case leningType = 0:
                max = 60
                break;
            case leningType = 1:
                max = 240
                break;
            case leningType = 2:
                max = 240
                break;
            case leningType = 3:
                max = 36
                break;
            case leningType = 4:
                max = 60
                break;
            case leningType = 5:
                max = 60
                break;
            case leningType = 6:
                max = 96
                break;
            case leningType = 7:
                max = 240
                break;
            case leningType = 8:
                max = 12
                break;
            case leningType = 9:
                max = 120
                break;
            default:
                break;
        }
        return max
    }
    function minValue(leningType) {

        var min = 0

        switch (leningType) {
            case leningType = 1:
                min = 60
                break;
            case leningType = 2:
                min = 24
                break;
            case leningType = 9:
                min = 2
                break;
            default:
                break;
        }
        return min
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Title>Indienen krediet aanvraag</Title>
                        <Grid item xs={12} sx={{ p: 1 }}  >
                            <InputLabel>Projectnaam</InputLabel>
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
                        </Grid>
                        <Grid item xs={12} sx={{ p: 1 }} >
                            <InputLabel>Ondernemingsnummer</InputLabel>
                            <TextField
                                // error ={this.state.naam.length === 0 ? true : false }
                                required
                                htmlFor="ondernemingsNummer"
                                name="klantId"
                                variant="standard"
                                fullWidth
                                value={klantId}
                                onChange={(event) => setKlantId(event.target.value)}
                                InputProps={{
                                    placeholder: "BEXXXX.XXX.XX",
                                    inputComponent: TextMaskCustom,
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ p: 1 }}  >
                            <InputLabel>Eigen inbreng</InputLabel>
                            <TextField
                                // error ={this.state.naam.length === 0 ? true : false }
                                required
                                htmlFor="eigenVermogen"
                                name="eigenVermogen"
                                variant="standard"
                                fullWidth
                                value={eigenVermogen}
                                onChange={(event) => setEigenVermogen(event.target.value)}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                    startAdornment: (
                                      <InputAdornment position="start">€</InputAdornment>
                                    ),
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ p: 1 }}  >
                            <InputLabel>Te lenen bedrag</InputLabel>
                            <TextField
                                // error ={this.state.naam.length === 0 ? true : false }
                                required    
                                htmlFor="lening"
                                name="lening"
                                variant="standard"
                                fullWidth
                                value={lening}
                                onChange={(event) => setLening(event.target.value)}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                    startAdornment: (
                                      <InputAdornment position="start">€</InputAdornment>
                                    ),
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ p: 1 }} >
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
                                htmlFor="leningType"
                                name='leningType'
                                fullWidth
                                variant="standard"
                                value={leningType}
                                onChange={(event) => { setLeningType(event.target.value); setLooptijd(0); }}
                            >
                                <MenuItem name='leningType'
                                    value={"AUTOLENING"}>Auto lening</MenuItem>
                                <MenuItem name='leningType'
                                    value={"VASTGOED"}>Vastgoed</MenuItem>
                                <MenuItem name='leningType'
                                    value={"ZAKELIJKELENING"}>Zakelijke lening</MenuItem>
                                <MenuItem name='leningType'
                                    value={"INVENTARIS"}>Inventaris en winkelinrichting</MenuItem>
                                <MenuItem name='leningType'
                                    value={"ZWAARTRANSPORT"}>Machines/zwaar transport</MenuItem>
                                <MenuItem name='leningType'
                                    value={"HUUR"}>Verbouwing bedrijfspand(huur)</MenuItem>
                                <MenuItem name='leningType'
                                    value={"EIGENDOM"}>Verbouwing bedrijfspand(eigendom)</MenuItem>
                                <MenuItem name='leningType'
                                    value={"BEDRIJFSPAND"}>Aanschaf bedrijfspand</MenuItem>
                                <MenuItem name='leningType'
                                    value={"KASKREDIET"}>Kaskrediet</MenuItem>
                                <MenuItem name='leningType'
                                    value={"MATERIEEL"}>Aankoop van materieel</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sx={{ p: 1 }}>
                            <InputLabel id="Intrest-type-label">Rentevoet</InputLabel>
                            <Select required
                                htmlFor="rentevoet"
                                labelId="Intrest-type-label"
                                name='rentevoet'
                                fullWidth
                                variant="standard"
                                value={rentevoet}
                                onChange={(event) => setRentevoet(event.target.value) }
                            >
                                <MenuItem name='rentevoet'
                                    value={"VAST"}>Vaste rentevoet</MenuItem>
                                <MenuItem name='rentevoet'
                                    value={"VARIABEL"}>Variabele rentevoet</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sx={{ p: 1 }}>
                            <InputLabel>Looptijd (In maanden)</InputLabel>
                            <Slider
                                aria-label="Small steps"

                                getAriaValueText={valuetext}
                                step={1}
                                marks
                                min={minValue(convertToNumber(leningType))}
                                max={maxValue(convertToNumber(leningType))}
                                valueLabelDisplay="auto"
                                value={looptijd}
                                onChange={(event) => setLooptijd(event.target.value)}
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
                                value={leningOmschrijving}
                                onChange={(event) => setLeningOmschrijving(event.target.value)}
                            />
                        </Grid>

                        <Button

                            type="submit"
                            style={ButtonStyle}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() =>UpdateKrediet() }
                        >
                            Pas Aan
                        </Button>



                    </Paper>

                </Grid>
            </Grid >
        </Container >

    )

}