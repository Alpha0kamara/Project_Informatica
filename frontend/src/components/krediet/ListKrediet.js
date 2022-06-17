import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../Template/Title'
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';


const ButtonStyle = {
  background: "#2E3B55",
  marginLeft: "10px",
};

function ListKrediet({kredieten, setSearchQuery, handleSearchQuery,searchQuery,viewKrediet,handleChange,filterKRedieten}) {
  return (
    <>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", margin: '30px 0 30px 0' }}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: 350 }}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={kredieten}
                      getOptionLabel={option => `user id: ${option.userID} naam krediet: ${option.email} `}
                      renderInput={(params) => <TextField {...params} label="Input search value" />}
                      onChange={(event, value) => { setSearchQuery(value); console.log(value); }}
                    />
                  </div>

                  <Button style={ButtonStyle} onClick={() => handleSearchQuery(searchQuery)} variant="contained">
                    Search
                  </Button>
                </div>

              </div>
              <Title>Lijst van krediet aanvragen</Title>
              <br />
              <div style={{ width: 350 }} >
                <input type="checkbox" onChange={(e) => { handleChange(e) }} />
                <label>Inbehandeling</label>
              </div>
              <br />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Projectnaam</TableCell>
                    <TableCell>Ondernemingsnummer</TableCell>
                    <TableCell>Leningtype</TableCell>
                    <TableCell>Looptijd</TableCell>
                    {/* <TableCell>Rentevoet</TableCell>
                        <TableCell>Eigen inbreng</TableCell>
                        <TableCell>Te lenen bedrag</TableCell> */}
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kredieten.map((Krediet) => (
                    <TableRow key={Krediet.id}>
                      <TableCell>{Krediet.naam}</TableCell>
                      <TableCell>{Krediet.klantID}</TableCell>
                      <TableCell>{Krediet.leningType}</TableCell>
                      <TableCell>{Krediet.looptijd + " maanden"}</TableCell>
                      {/* <TableCell>{Krediet.rentevoet}</TableCell>
                          <TableCell>{Krediet.eigenVermogen}</TableCell>
                          <TableCell>{Krediet.lening}</TableCell> */}
                      <TableCell>{(Krediet.feedback.status != null) ? 
                      
                      <p style={
                        Krediet.feedback.status ==="GOEDGEKEURD" ? {color:'green'} 
                        : Krediet.feedback.status ==="GEWEIGERD" ? {color:'red'}
                        : {color:'orange'}}> 
                            {Krediet.feedback.status} 
                        </p>
                      
                      : null}</TableCell>
                      <TableCell>
                        <Button
                          style={ButtonStyle}
                          variant="contained"
                          onClick={() => viewKrediet(Krediet.id)}
                        >
                          Details
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
}
export default  ListKrediet

