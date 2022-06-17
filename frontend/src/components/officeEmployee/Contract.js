import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import React from 'react';
import Button from '@mui/material/Button';
import { SignatureComponent } from '@syncfusion/ej2-react-inputs';

export default function Contract() {
    const ButtonStyle = {

        background : '#2E3B55'
      };
      
const [image,setImage]=React.useState()
function printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            // pdf.addPage(null, 'l')
            pdf.addImage(imgData, 'PNG', 10, 10, 200, 0, null, null, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
        });
}


const input = document.getElementById('divToPrint');
html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    setImage(imgData)
});

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;





return(
    <div>
  <div id= 'divToPrint'> 
  <p><strong>GELDLENING</strong></p>
<p>&nbsp;</p>
<p>De ondergetekenden:&nbsp;</p>
<p><strong>Naam Geldlener</strong>&nbsp;,<br />wonende te&nbsp;<strong>Plaats</strong>&nbsp;,<br />hierna te noemen&nbsp;<em>geldlener</em>&nbsp;en<br /><br /><strong>Naam Geldgever</strong>&nbsp;,<br />wonende te&nbsp;<strong>Plaats</strong>,<br />hierna te noemen&nbsp;<em>geldgever</em></p>
<p>Overwegende dat:</p>
<p>Ondergetekenden op strikt zakelijke basis een overeenkomst van geldlening wensen te af te sluiten.</p>
<p>Verklaren te zijn overeengekomen:</p>
<p>&nbsp;</p>
<ol>
<li><em>Geldlener</em>&nbsp;verklaart van&nbsp;<em>geldgever</em>&nbsp;per (datum) een lening van&nbsp;<strong>&euro; (bedrag)</strong><br />(zegge: (bedrag voluit geschreven)&nbsp;<strong>euro</strong>) te hebben ontvangen.</li>
<li><em>Geldlener</em>&nbsp;verklaart deswege de in punt 1. genoemde hoofdsom schuldig te zijn aan&nbsp;<em>geldgever</em>.</li>
<li>Over de hoofdsom is&nbsp;<em>geldlener</em>&nbsp;aan&nbsp;<em>geldgever</em>&nbsp;een jaarlijkse rente verschuldigd ter grootte van&nbsp;<strong>percentage</strong>&nbsp;procent (<strong>percentage</strong>%).</li>
<li><em>Geldlener</em>&nbsp;zal de lening aflossen in dertig jaar volgens een annu&iuml;tair aflosschema, met een annu&iuml;teit van&nbsp;<strong>&euro; (bedrag)</strong>&nbsp;(zegge:&nbsp;<strong>bedrag voluit geschreven euro</strong>) per jaar.</li>
<li><em>Geldlener</em>&nbsp;mag te allen tijde de lening of een deel daarvan aflossen, zonder dat&nbsp;<em>geldgever</em>&nbsp;een boeterente of andere kosten in rekening zal brengen.</li>
<li><em>Geldgever</em>&nbsp;kan de hoofdsom onmiddellijk opeisen van&nbsp;<em>geldlener</em>, als het faillissement van&nbsp;<em>geldlener</em>&nbsp;wordt aangevraagd,&nbsp;<em>geldlener</em>&nbsp;in surs&eacute;ance van betaling geraakt of beslag wordt gelegd op aan&nbsp;<em>geldlener</em>&nbsp;toebehorende zaken.</li>
</ol>
<p>&nbsp;</p>
<p>Aldus overeengekomen, in tweevoud opgemaakt en getekend op&nbsp;<strong>datum: </strong>{today}</p>
<p><br />(handtekening)<br /></p>
      <SignatureComponent>
                                          test
                                  </SignatureComponent>
                                  </div>  
                                
<Button type="submit"  
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }} style={ButtonStyle} onClick={printDocument}>Afdrukken</Button>
                             
</div>

);
}