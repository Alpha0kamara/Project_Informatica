import React, { useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import KredietService from "../../services/KredietService";
import FeedbackService from "../../services/FeedbackService";
import { useState } from "react";
import KredietComponent from "../krediet/AddKrediet";
import authService from "../../services/auth-service";
import JaarRekeningService from "../../services/JaarRekeningService";

const theme = createTheme();
const ButtonStyle = {
  background: "#2E3B55",
};

function valuetext(value) {
  return `${value}m`;
}

export default function AddCreditCustomer(props) {
  let loggedUser = authService.getCurrentUser();

  const [naam, setNaam] = useState("");
  const [eigenVermogen, setEigenVermogen] = useState("");
  const [lening, setLening] = useState("");
  const [klantId, setKlantId] = useState("");
  const [leningType, setLeningType] = useState("");
  const [looptijd, setLooptijd] = useState("");
  const [rentevoet, setRentevoet] = useState("");
  const [userId] = useState(authService.getCurrentUser().id);
  const [leningOmschrijving, setLeningOmschrijving] = useState("");
  const [feedback, setFeedback] = useState({
    documentId: "",
    omschrijving: "overwritten",
    status: 2,
  });
  const [error, setError] = useState(null);

  const AddKrediet = () => {
    setError(null)
    if(loggedUser.role === "KLANT"){
     if(!eigenVermogen || !lening || !klantId  || !looptijd){
      setError("Alle verplichte velden moeten ingevuld worden!");
     } 
     else{
      KredietService.addKrediet(
        naam,
        eigenVermogen,
        lening,
        klantId,
        userId,
        leningType,
        looptijd,
        rentevoet,
        feedback,
        leningOmschrijving
      ).then((res) => {
        console.log("krediet toegevoegd");
        FeedbackService.createFeedback(
          feedback.status,
          feedback.omschrijving,
          res.data.id
        ).then((res) => {
          setFeedback(res.data);
          console.log("feedback gepost");
          window.location.href = "/klant/kredieten";
        });
      });


     }
      
    }
    
  };

  function maxValue(leningType) {
    var max = 0;

    switch (leningType) {
      case (leningType = 0):
        max = 60;
        break;
      case (leningType = 1):
        max = 240;
        break;
      case (leningType = 2):
        max = 240;
        break;
      case (leningType = 3):
        max = 36;
        break;
      case (leningType = 4):
        max = 60;
        break;
      case (leningType = 5):
        max = 60;
        break;
      case (leningType = 6):
        max = 96;
        break;
      case (leningType = 7):
        max = 240;
        break;
      case (leningType = 8):
        max = 12;
        break;
      case (leningType = 9):
        max = 120;
        break;
      default:
        break;
    }
    return max;
  }
  function minValue(leningType) {
    var min = 1;

    switch (leningType) {
      // case leningType = 0:
      //     max=60
      //     break;
      case (leningType = 1):
        min = 60;
        break;
      case (leningType = 2):
        min = 24;
        break;
      // case leningType = 3:
      //     max=36
      //     break;
      // case leningType = 4:
      //     max=60
      //     break;
      // case leningType = 5:
      //     max=60
      //     break;
      // case leningType = 6:
      //     max=96
      //     break;
      // case leningType = 7:
      //     max=240
      //     break;
      // case leningType = 8:
      //     max=12
      //     break;
      case (leningType = 9):
        min = 2;
        break;
      default:
        break;
    }
    return min;
  }

  return (
    <KredietComponent
      naam={naam}
      setNaam={setNaam}
      eigenVermogen={eigenVermogen}
      setEigenVermogen={setEigenVermogen}
      lening={lening}
      setLening={setLening}
      klantId={klantId}
      setKlantId={setKlantId}
      userId={userId}
      leningType={leningType}
      setLeningType={setLeningType}
      looptijd={looptijd}
      setLooptijd={setLooptijd}
      rentevoet={rentevoet}
      setRentevoet={setRentevoet}
      leningOmschrijving={leningOmschrijving}
      setLeningOmschrijving={setLeningOmschrijving}
      feedback={feedback}
      setFeedback={setFeedback}
      AddKrediet={AddKrediet}
      maxValue={maxValue}
      minValue={minValue}
      error={error}
      valuetext
    />
  );
}
