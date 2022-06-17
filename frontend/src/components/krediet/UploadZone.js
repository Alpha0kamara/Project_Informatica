import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ContractService from '../../services/ContractService';
import axios from 'axios';
import InputLabel from "@mui/material/InputLabel";
import { IMaskInput } from "react-imask";

const ButtonStyle = {
    background: "#2E3B55",
    marginLeft: "10px"
};
export default function UploadZone(props) {
    const [file, setFile] = React.useState(null)
    const [kredieten, setKredieten] = useState([]);
    var disable = true;

    React.useEffect(() => {
        axios
            .get("http://localhost:8080/api/kredietaanvragen/")
            .then((res) => {
                console.log(res.data)
                setKredieten(res.data);
                //console.log("Dit staat in behandling " + inBehandeling);
                //console.log("Dit zit erin: "+ kredieten)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

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


    function Verzend() {
        console.log("uw contract wordt verzonden")
        ContractService.postContract(file)
        return (
            <div>
                <h1>UW CONTRACT IS VERZONDEN</h1>
            </div>
        )
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <h1>Dien hier uw ondertekend contract in!</h1>

                        <Grid item xs={12} sx={{ p: 1 }}>
                            <InputLabel>Ondernemingsnummer</InputLabel>
                            <TextField
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
                            <input
                                type="file"
                                multiple
                                variant="outlined"
                                fullWidth
                                value={file}
                                accept="application/pdf"
                                onChange={(event) => setFile(event.target.value)}
                            />
                        </Grid>

                        <Button style={ButtonStyle}
                            variant="contained"

                            onClick={
                                () => Verzend()
                            }>Verzenden
                        </Button>
                    </Paper>

                </Grid>
            </Grid >
        </Container >

    )

}