import React, { useState, Fragment, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
// import RazorPay from "./razorpay";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Enroll() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  const [contactOne, setContactOne] = useState("");
  const [contactTwo, setContactTwo] = useState("");
  const [previousKnowledge, setPreviousKnowledge] = useState();
  const [knowledgeFrom, setKnowledgeFrom] = useState();
  const [message, setMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [amount, setAmount] = useState(1550);
  const [courseType, setCourseType] = useState();
  const [paymentId, setPaymentId] = useState("");
  const [ifYes, setIfYes] = useState({
    basics: false,
    adruino: false,
    raspberry: false,
    iot: false,
  });

  const handleChange = (event) => {
    setCourseType(event.target.value);
  };
  const handleChangeCourse = (event) => {
    setPreviousKnowledge(event.target.value);
  };
  const handleKnowledgeFrom = (event) => {
    setKnowledgeFrom(event.target.value);
  };
  const handleChangeIfYes = (event) => {
    setIfYes({ ...ifYes, [event.target.name]: event.target.checked });
  };

  const identifiers = Object.keys(ifYes);
  const active = identifiers.filter(function(id) {
    return ifYes[id];
  });
  console.log("active know", active);

  const { basics, adruino, raspberry, iot } = ifYes;

  useEffect(() => {
    if (courseType == "Intern") {
      setAmount(1550);
      setMessage("15 days course(4days/week, 1hour/day) & Fee - ₹1550");
    } else if (courseType == "Foundation") {
      setAmount(4500);
      setMessage("30 days course(4days/week, 1hour/day) & Fee - ₹4500");
    } else if (courseType == "Advanced") {
      setAmount(8500);
      setMessage("30 days course(4days/week, 1hour/day) & Fee - ₹8500");
    }
  }, [courseType]);

  function submitHandle() {
    if (
      name &&
      parentName &&
      contactOne &&
      contactTwo &&
      previousKnowledge &&
      amount &&
      courseType
    ) {
      if (courseType == "Intern") {
        setAmount(1550);
      } else if (courseType == "Foundation") {
        setAmount(4500);
      } else if (courseType == "Advanced") {
        setAmount(8500);
      }
      setShowPayment(true);
      // console.log("all state print");
      // console.log("name", name);
      // console.log("parent", parentName);
      // console.log("contactone", contactOne);
      // console.log("contattwo", contactTwo);
      // console.log("previous know", previousKnowledge);
      // console.log("knowledge from ", knowledgeFrom);
      // console.log("amount", amount);
      // console.log("ifyes know", ifYes);
      // console.log("course type", courseType);
      const datanow = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      console.log("known", knowledgeFrom)
      const datauser =
        "Name=" +
        name +
        "&Parent=" +
        parentName +
        "&Contact One=" +
        contactOne +
        "&Contact Two=" +
        contactTwo +
        "&Previous Knowledge=" +
        previousKnowledge +
        "&Amount=" +
        amount +
        "&Course Type=" +
        courseType +
        "&Payment Id=Not paid"  +
        "&Known=" +
        active +
        "&Date=" +
        datanow+
        "&Knowledge From=" +
        knowledgeFrom+
        "&sheetName=Enroll Before";
      axios
        .get(
          "https://script.google.com/macros/s/AKfycbwm9QSWLAsv2sRXY8vArAiQTeTr4-_EuOH7ZnpHjFHFVJBZK20/exec?" +
            datauser
        )
        .then(function(response) {
          //handle success
          console.log(response);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    } else {
      setMessage("Enter all fields in form");
    }
  }
  function paymentHandler(e) {
    e.preventDefault();
    const options = {
      key: "rzp_live_9rcnv8oETQ0qq9",
      image: "https://i.imgur.com/ZHKTrnL.jpg",
      amount: amount * 100,
      name: "K-BOTIX",
      description: "Robotics concepts in simple way",

      handler(response) {
        setPaymentId(response.razorpay_payment_id);
        const datanow = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        const datauser =
          "Name=" +
          name +
          "&Parent=" +
          parentName +
          "&Contact One=" +
          contactOne +
          "&Contact Two=" +
          contactTwo +
          "&Previous Knowledge=" +
          previousKnowledge +
          "&Amount=" +
          amount +
          "&Course Type=" +
          courseType +
          "&Payment Id=" +
          response.razorpay_payment_id +
          "&Known=" +
          active +
          "&Knowledge From=" +
          knowledgeFrom +
          "&Date=" +
          datanow+
          "&sheetName=Enroll";
        axios
          .get(
            "https://script.google.com/macros/s/AKfycbwm9QSWLAsv2sRXY8vArAiQTeTr4-_EuOH7ZnpHjFHFVJBZK20/exec?" +
              datauser
          )
          .then(function(response) {
            //handle success
            console.log(response);
            alert("Payment Done. Thank you for Enrolling");
          })
          .catch(function(response) {
            //handle error
            console.log(response);
            alert("Payment Failed");
          });
      },

      prefill: {
        name: name,
        email: "",
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#011f3b",
      },
    };
    const rzp1 = new window.Razorpay(options);

    rzp1.open();
  }
  return (
    <Fragment>
      {!showPayment ? (
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
              label="Parent/Guardian Name"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="standard-name"
              label="Contact No 1*"
              value={contactOne}
              onChange={(e) => setContactOne(e.target.value)}
            />
            <TextField
              id="standard-name"
              label="Contact No 2"
              value={contactTwo}
              onChange={(e) => setContactTwo(e.target.value)}
            />
          </div>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Have you attended any robotic classes
              </FormLabel>
              <RadioGroup
                aria-label="courses"
                name="courses"
                value={previousKnowledge}
                onChange={handleChangeCourse}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            
          {previousKnowledge == "Yes" ? (
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Where did you learn from ?
              </FormLabel>
              <RadioGroup
                aria-label="knowledgefrom"
                name="knowledgefrom"
                value={knowledgeFrom}
                onChange={handleKnowledgeFrom}
              >
                <FormControlLabel value="School" control={<Radio />} label="School" />
                <FormControlLabel value="Training Center" control={<Radio />} label="Training Center" />
              </RadioGroup>
            </FormControl>) : <Fragment/>}
          </div>
          <div>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                Select relevent options with your knowledge
              </FormLabel>
              {previousKnowledge == "Yes" ? (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={basics}
                        onChange={handleChangeIfYes}
                        name="basics"
                      />
                    }
                    label="BASICS OF ELECTRONICS and SENSORS"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={adruino}
                        onChange={handleChangeIfYes}
                        name="adruino"
                      />
                    }
                    label="ARDUINO BASED"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={raspberry}
                        onChange={handleChangeIfYes}
                        name="raspberry"
                      />
                    }
                    label="RASPBERRY PI BASED"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={iot}
                        onChange={handleChangeIfYes}
                        name="iot"
                      />
                    }
                    label="IoT"
                  />
                </FormGroup>
              ) : (
                <Fragment />
              )}
            </FormControl>
          </div>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Courses Offered(Select One)
            </FormLabel>
            <RadioGroup
              aria-label="courses"
              name="courses"
              value={courseType}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Intern"
                control={<Radio />}
                label="Intern"
              />
              <FormControlLabel
                value="Foundation"
                control={<Radio />}
                label="Foundation Level"
              />
              <FormControlLabel
                value="Advanced"
                control={<Radio />}
                label="Advanced Level"
              />
            </RadioGroup>
          </FormControl>
          <div>
            <p>{message}</p>
          </div>
          <Button variant="contained" onClick={submitHandle}>
            Enroll
          </Button>
        </form>
      ) : (
        <Fragment />
      )}
      {showPayment ? (
        <div className="wrapper">
          <div className="payments">
            <div className="payments-title"></div>
            <div className="payments-form">
              {paymentId == "" ? (
                <form action="#" onSubmit={paymentHandler}>
                  <p>
                    <label htmlFor="pay_amount" className="pay_amount">
                      Amount to be paid
                    </label>
                  </p>
                  <p>{amount} Rs</p>
                  <p>
                    <button type="submit">Pay Now</button>
                  </p>
                </form>
              ) : (
                <Fragment>
                  <p>Your payment ID {paymentId}</p>
                  <p>Payment Done</p>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}
