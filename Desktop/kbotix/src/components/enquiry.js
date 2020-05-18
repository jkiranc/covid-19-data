import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Enquiry() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [contactno, setContactNo] = useState("");
  const [email, setEmailID] = useState("");
  const [message, setMessage] = useState("")
  
  function submitHandle(){
      if( name && grade && school && contactno && email ){
        setMessage("form submitted")
        const datanow = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
        const datauser = "Name="+ name + "&Grade="+ grade + "&School="+ school + "&Contact No="+ contactno + "&Email Id="+ email + "&Date="+ datanow+"&sheetName=Enquiry";
        axios
        .get("https://script.google.com/macros/s/AKfycbwm9QSWLAsv2sRXY8vArAiQTeTr4-_EuOH7ZnpHjFHFVJBZK20/exec?"+datauser)
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
        alert("Thank you for your enquiry")
      } else{
        setMessage("Enter all fields in form")
        alert("form not submitted")
      }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="standard-name"
          label="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="standard-name"
          label="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="standard-name"
          label="Contact Number"
          value={contactno}
          onChange={(e) => setContactNo(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="standard-name"
          label="Email ID"
          value={email}
          onChange={(e) => setEmailID(e.target.value)}
        />
      </div>
        <div><p>{message}</p></div>
      <Button variant="contained" onClick={submitHandle}>Submit</Button>
    </form>
  );
}
