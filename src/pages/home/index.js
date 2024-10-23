import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";

import { Steps } from "utils/constant-data";
import { scrollToTop } from "utils/utilities";

const Home = () => {

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    scrollToTop(window);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      p={4}
    >
      
      <Box
        maxWidth={1080}
        mx="auto"
      >
        <Stack 
          direction={{ xs: "column", sm: "row" }}          
          position="relative"
        >
          <Box
            flex={1}
            width="100%"
            minHeight={{ xs: "360px", sm: "inherit" }}
            sx={{
              backgroundImage: "url(https://www.daltinaiportal.com/slider/images/bg-image-17.jpg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",              
            }}
            overflow="hidden"
            borderRadius={{ xs: "8px 8px 0 0", sm: "8px 0 0 8px" }}
            position="relative"
          >         
            <Stack
              p={4}
              bgcolor="rgba(0,0,0,0.5)"
              width="100%"
              minHeight="inherit"
              height="100%"
              alignItems={{ xs: "center", sm: "flex-start" }}
              justifyContent="center"              
            >
              <Typography
                variant="h4"
                color="white"
                textAlign={{ xs: "center", sm: "left" }}
                gutterBottom
              >
                Daltin AI Portal is a platform that allows you to apply for a job, internship, or training program.                
              </Typography>
              <Typography
                variant="body1"
                color="white"
                textAlign={{ xs: "center", sm: "left" }}               
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/register"
                sx={{ 
                  mt: 2,
                  width: "fit-content", 
                }}                
              >
                Register Now
              </Button>
            </Stack>   
          </Box>
          <Box
            bgcolor="white"
            p={4}
            flex={1}
            borderRadius={{ xs: "0 0 8px 8px", sm: "0 8px 8px 0" }}
          >
            <Typography
              variant="h4"
              gutterBottom
              mb={2}
            >
              Register in {Steps.length} easy steps
            </Typography>
            <Stepper 
              activeStep={activeStep} 
              orientation="vertical"
            >
              {Steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === Steps.length - 1 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        component={index === Steps.length - 1 ? Link : "button"}
                        to={index === Steps.length - 1 ? "/register" : ""}
                      >
                        {index === Steps.length - 1 ? "Get Started" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default Home;