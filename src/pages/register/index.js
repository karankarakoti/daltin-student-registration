import React, { useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, MobileStepper, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";

import { BottomAppBar, Copyright } from "components";
import { Academic, Address, Background, Document, Education, Personal, Review } from "./components";

const steps = [
  "Personal Information",
  "Address & Passport Information", 
  "Academic Interests",
  "Educational Background",
  "Background Information",
  "Document Upload",
  "Final Review & Submission"
];

const Register = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    "personal": {
      "title": "",
      "firstName": "",
      "middleName": "",
      "lastName": "",
      "mobile": "",
      "emergencyContact": "",
      "email": "",
      "martialStatus": "",
      "gender": "",
      "dob": "",
    },
    "address": {      
      "city": "",
      "state": "",
      "country": "",
      "pincode": "",
      "passportNumber": "",
      "passportExpiry": "",
    },
    "academic": {
      "intrerestedCountry": "",
      "englishProficiencyTest": null,
      "englishProficiencyTestScore": "",
    },
    "education": [],
    "background": {
      "visaRejected": null,
      "gapInEducation": null,
    },
    "documents": [
      { label: "10th Marksheet", value: "10th", required: true, type: ["PDF", "JPG", "PNG"], maxSize: 1, file: null, url: "" },
      { label: "12th Marksheet", value: "12th", required: true, type: ["PDF", "JPG", "PNG"], maxSize: 1, file: null, url: "" },
      { label: "Passport", value: "passport", required: true, type: ["PDF", "JPG", "PNG"], maxSize: 1, file: null, url: "" },
    ]
  });  
  
  const handleNext = () => {
    if(activeStep < steps.length - 1) setActiveStep(activeStep + 1);
    else  return;    
  };

  const handleBack = () => {
    if(activeStep > 0)  setActiveStep(activeStep - 1);
    else  return;
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Personal
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={steps}
          data={data}
          setData={setData}
        />;
      case 1:
        return <Address
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={steps}
          data={data}
          setData={setData}
        />;
      case 2:
        return <Academic 
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={steps}
          data={data}
          setData={setData}
        />;
      case 3:
        return <Education 
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={steps}
          data={data}
          setData={setData}
        />;
      case 4:
        return <Background 
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={steps}
          data={data}
          setData={setData}
        />;
      case 5:
        return <Document 
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={steps}
          data={data}
          setData={setData}       
        />;
      case 6:
        return <Review 
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={steps}
          data={data}
          setData={setData}        
        />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <CssBaseline />      
      <Container 
        component="main" 
        maxWidth="md" 
        sx={{ 
          mb: 4,
          pb: { xs: "80px", md: 0 },
        }}
      >
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Student Registration
          </Typography>
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              pt: 3,
              pb: 5,
              display: { xs: "none", md: "flex" }
            }}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>            
          {getStepContent(activeStep)}                          
        </Paper>
        <Copyright />
      </Container>

      <Box
        sx={{
          display: { xs: "flex", md: "none" } 
        }}
      >
        <BottomAppBar>
          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            sx={{ 
              maxWidth: "100%", 
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              backgroundColor: "transparent",
            }}
            nextButton={
              <Button 
                size="small" 
                onClick={handleNext} 
                disabled={activeStep === steps.length - 1}
              >
                Next                
                <KeyboardArrowRight />                
              </Button>
            }
            backButton={
              <Button 
                size="small" 
                onClick={handleBack} 
                disabled={activeStep === 0}
              >                
                <KeyboardArrowLeft />                
                Back
              </Button>
            }            
          />        
        </BottomAppBar>
      </Box>          
    </>
  )
}

export default Register;