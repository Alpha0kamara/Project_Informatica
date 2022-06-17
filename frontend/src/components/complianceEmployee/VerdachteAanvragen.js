import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../Template/Title'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Alert, Autocomplete, Button, Grid, TableContainer, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KredietService from "../../services/KredietService";
import authService from "../../services/auth-service";
import styled from '@emotion/styled';

const ButtonStyle = {
    background: "#2E3B55",
    marginLeft: "10px",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2E3B55",
        color: theme.palette.common.white,
        fontWeight: "bold"
    },

}));



export default function VerdachteAanvragen() {

    const [krediet, setKrediet] = useState([]);
    const [savedKrediet, setSavedKrediet]= useState([]);;
    let navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    let loggedUser = authService.getCurrentUser();
    const [alertVisibility, setAlertVisibility] = React.useState('none');


    

    const viewKrediet = (id) => {
        navigate(`/view-krediet/${id}`);
    };


    //debugger
    React.useEffect(() => {
        console.log(loggedUser);
        axios.get('http://localhost:8080/api/kredietaanvragen/')
            .then(res => {

                var data = []
                data.push(res.data)
                var verdacht = []

                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].length; j++) {


                        if (data[i][j].feedback.status === "VERDACHT") {

                            verdacht.push(data[i][j])


                        }
                    }
                }
                setKrediet(verdacht)
                setSavedKrediet(verdacht)

            })
            .catch(function (error) {
                console.log(error)
            })
    }, []);


    const handleChange = (e) => {
        let isChecked = e.target.checked;
        console.log("value in checked: " + isChecked);
        if (isChecked === true) {
            console.log(' Checkbox is is  checked :)');
            let cartArr = [...krediet];
            krediet.forEach((selected) => {
                cartArr = cartArr.filter((el) => el.feedback.status === "VERDACHT" && el.feedback.omschrijving === "U onvangt zodadelijk een reden van afkeuring.");

            });
            setKrediet(cartArr);
        } else {

            console.log('⛔️ Checkbox is NOT checked');
            setKrediet(savedKrediet)

        }

    };






    return (


        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>


                    <Grid item xs={12}>
                    <Alert style={{ display: alertVisibility }} severity="success">Feedback is toegevoegd </Alert><br style={{ display: alertVisibility }} />
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Title>Verdachte Aanvragen</Title>
                            <br />




                            <div style={{ width: 350 }} >
                                <input type="checkbox" onChange={(e) => { handleChange(e) }} />
                                <label>Onbehandelde aanvragen</label>
                            </div>
                            <br/>
                            <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Naam</StyledTableCell>
                                        <StyledTableCell>Ondernemingsnummer</StyledTableCell>
                                        <StyledTableCell>Leningtype</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {krediet.map((krediet) => (
                                        <TableRow key={krediet.id}>
                                            <TableCell>{krediet.naam}</TableCell>
                                            <TableCell>{krediet.klantID}</TableCell>
                                            <TableCell>{krediet.leningType}</TableCell>
                                            <TableCell>{(krediet.feedback.status != null) ? krediet.feedback.status : null}</TableCell>
                                            <TableCell>
                                                <Button
                                                    style={ButtonStyle}
                                                    variant="contained"
                                                    onClick={() => {viewKrediet(krediet.id); 
                                                        setAlertVisibility('');
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </React.Fragment>

    )

} 
