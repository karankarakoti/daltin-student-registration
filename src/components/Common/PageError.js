import React from "react";
import { Box, Button, Container, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

import { Background, Logo } from "assets";
import { Link } from "react-router-dom";

export const PageError = ({
  title = "Something went wrong",
  description = "We are sorry, but there was an error processing your request. Please try again later.",
  buttonType = "Link",
  buttonText = "Go Home",
  onClick = () => {},
  buttonLink = "/"
}) => {

  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Background />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: "100vh"
        }}
      >
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: "calc(100vh - 180px)", md: "calc(100vh - 112px)"} }}
          >            
             <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',                
                maxWidth: '520px',
                mx: 'auto',
                px: { xs: 3, md: 0 },
              }}
            >
              <Typography variant="h1" sx={{ mb: 2, textAlign: "center" }}>
                {title}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                {description}
              </Typography>
              {buttonType === "Link" ?  <Button 
                variant="contained"
                component={Link}
                to={buttonLink}
              >
                {buttonText}
              </Button> : <Button 
                variant="contained"
                onClick={onClick}
              >
                {buttonText}
              </Button>}              
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <Container maxWidth="xl">
            <Stack
              direction={matchDownSM ? "column" : "row"}
              justifyContent={matchDownSM ? "center" : "space-between"}
              spacing={2}
              textAlign={matchDownSM ? "center" : "inherit"}
            >
              <Typography variant="subtitle2" color="secondary" component="span">
                &copy; {process.env.REACT_APP_NAME} | Developed By&nbsp;
                <Typography component={Link} variant="subtitle2" href="https://karan-karakoti.vercel.app/" target="_blank" underline="hover">
                  Karan Karakoti
                </Typography>
              </Typography>

              <Stack direction={matchDownSM ? "column" : "row"} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? "center" : "inherit"}>          
                <Typography
                  variant="subtitle2"
                  color="secondary"
                  component={Link}
                  href="/privacy-policy"
                  target="_blank"
                  underline="hover"
                >
                  Privacy Policy
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="secondary"
                  component={Link}
                  href="/support"
                  target="_blank"
                  underline="hover"
                >
                  Support
                </Typography>
              </Stack>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}