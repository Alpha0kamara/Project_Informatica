import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import Button from '@mui/material/Button';

import React, { useEffect, useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import userService from '../../services/user-service';
import KredietService from '../../services/KredietService';
import Title from '../../Template/Title';
import logo from './img/logo.png'
import ContractService from '../../services/ContractService';
import authService from '../../services/auth-service';
import { SignatureComponent } from '@syncfusion/ej2-react-inputs';

class Prijszetting extends React.Component {

    constructor(props) {
        super(props);

        // Initializing the state
        this.state = {
            rows: [],
            klantScore: '',
            renteVoet: '',
            krediet: {},
            image: "",
            content: "",
            rente: '',
            kredietId: 1,
            file: null
        }


        this.setKlantScore = this.setKlantScore.bind(this)
        this.setKrediet = this.setKrediet.bind(this)
        this.printDocument = this.printDocument.bind(this)
        this.numberFormatter = this.numberFormatter.bind(this)
        this.Verzend = this.Verzend.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)


    }


    componentDidMount() {
        

        const queryString = document.URL;
        var queryStringSplitted = queryString.split('/')
        var id = queryStringSplitted = queryStringSplitted.slice(-1)
        console.log("DIT IS DE ID IN DE URL " + id)
        console.log("rol" + authService.getCurrentUser().role)
        console.log("joww swag" + id)
        this.setKlantScore(id)
        this.setKrediet(id)
    }

    numberFormatter(value) {
        var val = Math.round(Number(value) * 100) / 100;
        var parts = val.toString().split(".");
        var num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
        return num
    }
    setKlantScore() {

        userService.getKlantScoreCurrentUser().then(res => {
            if (res.data != null) {
                this.setState({ klantScore: res.data.klantScore })
                console.log('klantscore', this.state.klantScore)
            }

        }).catch(function (error) {
            console.log(error)
        })

    }

    setKrediet(id) {


        KredietService.getKredietById(id).then(res => {

            this.setState({ krediet: res.data })

            console.log('krediet', res.data)
            console.log("looptijd", this.state.klantScore)
            console.log("looptijd", this.state.krediet.feedback.status)

            var array = []
            var aflossing = 0;
            var rente = 0;
            var balance = 0;
            var months = 0;


            for (let index = 0; index < this.state.krediet.looptijd; index++) {
                if (this.state.krediet.feedback.status == "GOEDGEKEURD") {
                    switch (this.state.klantScore) {
                        case 1:
                            var leningBedrag = this.state.krediet.lening;

                            if (index > 0) {
                                leningBedrag = array[index - 1].lening - rente
                                rente = leningBedrag * 0.015
                                aflossing = array[index - 1].kapitaal + rente
                                balance = aflossing + rente
                                // lening * ((float)interest/100) * i

                            } else {

                                rente = leningBedrag * 0.015
                                aflossing = leningBedrag * 0.015 + leningBedrag * (0.015 / (Math.pow(1.015, this.state.krediet.looptijd) - 1))
                                balance = aflossing + rente

                            }

                            var rows = {
                                months: months,
                                lening: leningBedrag,
                                kapitaal: Math.floor(aflossing),
                                rente: rente,
                                balance: balance
                            }

                            array.push(rows)
                            break;
                        case 0: months++
                            console.log("DIT IS CASE 2")
                            var leningBedrag = this.state.krediet.lening;

                            if (index > 0) {
                                leningBedrag = array[index - 1].lening - rente
                                rente = leningBedrag * 0.02
                                aflossing = array[index - 1].kapitaal + rente
                                balance = aflossing + rente
                                // lening * ((float)interest/100) * i

                            } else {

                                rente = leningBedrag * 0.02
                                aflossing = leningBedrag * 0.02 + leningBedrag * (0.02 / (Math.pow(1.02, this.state.krediet.looptijd) - 1))
                                balance = aflossing + rente

                            }

                            var rows = {
                                months: months,
                                lening: leningBedrag,
                                kapitaal: Math.floor(aflossing),
                                rente: rente,
                                balance: balance
                            }

                            array.push(rows)
                            break;
                        case 3:
                            var leningBedrag = this.state.krediet.lening;

                            if (index > 0) {
                                leningBedrag = array[index - 1].lening - rente
                                rente = leningBedrag * 0.02
                                aflossing = array[index - 1].kapitaal + rente

                                balance = aflossing + rente
                                // lening * ((float)interest/100) * i

                            } else {

                                rente = leningBedrag * 0.025
                                aflossing = leningBedrag * 0.025 + leningBedrag * (0.025 / (Math.pow(1.025, this.state.krediet.looptijd) - 1))
                                balance = aflossing + rente

                            }

                            var rows = {
                                months: months,
                                lening: leningBedrag,
                                kapitaal: Math.floor(aflossing),
                                rente: rente,
                                balance: balance
                            }

                            array.push(rows)
                            break;

                        case 4:
                            var leningBedrag = this.state.krediet.lening;

                            if (index > 0) {
                                leningBedrag = array[index - 1].lening - rente
                                rente = leningBedrag * 0.03
                                aflossing = array[index - 1].kapitaal + rente

                                balance = aflossing + rente
                                // lening * ((float)interest/100) * i

                            } else {

                                rente = leningBedrag * 0.03
                                aflossing = leningBedrag * 0.03 + leningBedrag * (0.03 / (Math.pow(1.02, this.state.krediet.looptijd) - 1))
                                balance = aflossing + rente

                            }

                            var rows = {
                                months: months,
                                lening: leningBedrag,
                                kapitaal: Math.floor(aflossing),
                                rente: rente,
                                balance: balance
                            }

                            array.push(rows)
                            break;
                        case 5:
                            var leningBedrag = this.state.krediet.lening;

                            if (index > 0) {
                                leningBedrag = array[index - 1].lening - rente
                                rente = leningBedrag * 0.035
                                aflossing = array[index - 1].kapitaal + rente

                                balance = aflossing + rente
                                // lening * ((float)interest/100) * i

                            } else {

                                rente = leningBedrag * 0.035
                                aflossing = leningBedrag * 0.035 + leningBedrag * (0.035 / (Math.pow(1.035, this.state.krediet.looptijd) - 1))
                                balance = aflossing + rente

                            }

                            var rows = {
                                months: months,
                                lening: leningBedrag,
                                kapitaal: Math.floor(aflossing),
                                rente: rente,
                                balance: balance
                            }

                            array.push(rows)
                            break;
                    }
                }


            }

            this.setState({ rows: array })


        });
    }


    async printDocument() {

        const input = document.getElementById('divToPrint');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.addImage(imgData, 'PNG', 10, 10, 200, 0, null, null, 0);

            pdf.save("download.pdf");
        });

    }
    Verzend() {
        console.log("uw contract wordt verzonden")
        ContractService.postContract(this.state.file)
        window.alert("U heeft uw contract succesvol geupload! ")
    };
    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {

        const queryString = document.URL;
        var queryStringSplitted = queryString.split('/')
        var id = queryStringSplitted = queryStringSplitted.slice()[4]


        const ButtonStyle = {
            background: "#2E3B55",
            marginLeft: "10px"
        };
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        })
        const topRight = {
            zIndex: '-1',
            position: 'absolute',
            top: '0',
            right: '0',
            fontSize: '18px',
            width: '50px',
            transform: 'translate(50%, -50%)'
        };

        return (

            <Container maxWidth="lg"
                sx={
                    {
                        mt: 4,
                        mb: 4
                    }
                }>
                {authService.getCurrentUser().id == id || authService.getCurrentUser().role == "KANTOORMEDEWERKER" ? (
                    <Grid container name="content"
                        spacing={3}>
                        <Grid item
                            xs={12}>
                            <Paper sx={
                                {
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column"
                                }
                            }>
                                <div id='divToPrint'>
                                    <p>
                                        <Title>CONTRACT</Title>
                                    </p>
                                    <p>De ondergetekende:&nbsp;</p>
                                    <p>
                                        Naam: .................................. &nbsp;,<br />wonende te&nbsp;Plaats ..................................&nbsp;,<br />hierna te noemen&nbsp;<em>geldlener</em>&nbsp;en<br /><br /><strong>POPS LOAN</strong>&nbsp;,<br />wonende te&nbsp;<strong>Antwerpen</strong>,<br />hierna te noemen&nbsp;<em>geldgever</em>
                                    </p>
                                    <p>Overwegende dat:</p>
                                    <p>Ondergetekenden op strikt zakelijke basis een overeenkomst van geldlening wensen te af te sluiten.</p>
                                    <p>Verklaren te zijn overeengekomen:</p>
                                    <p>&nbsp;</p>
                                    <ol>
                                        <li>
                                            <em>Geldlener</em>&nbsp;verklaart
                                            een lening van &nbsp;<strong> {
                                                formatter.format(this.state.krediet.lening)
                                            }</strong>
                                            &nbsp;te hebben ontvangen.</li>
                                        <li>
                                            <em>Geldlener</em>&nbsp;verklaart deswege de in punt 1. genoemde hoofdsom schuldig te zijn aan&nbsp;<em>
                                                <strong>POPS LOAN</strong>
                                            </em>.</li>

                                        <li>
                                            Geldlener&nbsp;zal de lening aflossen volgens een aflosschema, met een bedrag van (zie aflossingstabel).</li>
                                        <li>
                                            De geldlener mag ten allen tijde de lening of een deel daarvan aflossen, zonder dat&nbsp;<em>
                                                <strong>POPS LOAN</strong>
                                            </em>&nbsp;een boeterente of andere kosten in rekening zal brengen.</li>
                                        <li>
                                            <em>
                                                <strong>POPS LOAN</strong>
                                            </em>&nbsp;kan de hoofdsom onmiddellijk opeisen als het faillissement wordt aangevraagd,in surs&eacute;ance van betaling geraakt of beslag wordt gelegd aan&nbsp;toebehorende zaken.</li>
                                    </ol>
                                    <div>
                                        <Grid>
                                            <Title>Aflossingstabel</Title>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Maand(en)</TableCell>
                                                        <TableCell>Lening saldo</TableCell>
                                                        <TableCell>Rente</TableCell>
                                                        <TableCell>Aflossing</TableCell>
                                                        <TableCell>Betaling</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>{
                                                    this.state.rows.map((row) => (
                                                        <TableRow key={
                                                            row.months
                                                        }>
                                                            <TableCell>{
                                                                row.months
                                                            }</TableCell>
                                                            <TableCell>{
                                                                formatter.format(row.lening)
                                                            }</TableCell>
                                                            <TableCell>{
                                                                formatter.format(row.rente)
                                                            }</TableCell>
                                                            <TableCell>{
                                                                formatter.format(row.kapitaal)
                                                            }</TableCell>
                                                            <TableCell>{
                                                                formatter.format(row.balance)
                                                            }</TableCell>
                                                        </TableRow>
                                                    ))
                                                } </TableBody>
                                            </Table>
                                        </Grid>
                                    </div>
                                    <p>Aldus overeengekomen, in tweevoud opgemaakt en getekend:</p>
                                    geldlener<br /><em>(handtekening)</em>&nbsp;
                                    <br />
                                    <br />
                                    <SignatureComponent style={{ "border-style": "dotted", "float": "left" }}>


                                    </SignatureComponent>

                                </div>
                                &nbsp;
                                &nbsp;
                                <h5>Upload hier een getekende versie van het contract</h5>
                                <input
                                    type="file"
                                    name="lening"
                                    multiple
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.file}
                                    accept="application/pdf"
                                    onChange={
                                        this.handleInputChange
                                    }
                                />

                                &nbsp;
                                &nbsp;
                                <Button style={ButtonStyle}
                                    variant="contained"
                                    onChange={
                                        this.handleInputChange
                                    }
                                    onClick={
                                        () => this.Verzend()
                                    }>Verzenden
                                </Button>
                                &nbsp;
                                <Button style={ButtonStyle}
                                    variant="contained"
                                    onClick={
                                        () => this.printDocument()
                                    }>Downloaden
                                </Button>



                            </Paper>
                        </Grid>
                    </Grid>
                ) : <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <p>Er is geen contract gevonden voor deze pagina!!</p>
                        </Paper>
                    </Grid>
                </Grid>}
            </Container>
        )

    }




}


// render(<Example />, document.querySelector("#root"));
export default Prijszetting;
