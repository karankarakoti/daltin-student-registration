import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Stack, Toolbar } from "@mui/material";

import { LinkWrapper } from "components";
import { appConstants } from "redux/constants";

export const MainLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { redirect } = useSelector(state => state.app);

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
      dispatch({
        type: appConstants.SET_REDIRECT,
        payload: ""
      });
    }
  }, [redirect, navigate, dispatch]);

  return (
    <>  
      <AppBar
        position="fixed"
        color="default"
        // elevation={1}
        sx={{          
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
          top: 0,
          left: 0,
          backgroundColor: "#efefef",
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
          }}
        >          
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <LinkWrapper
              url="/"
            >
              <Box
                height={"48px"}
                width={"144px"}
              >
                <img
                  src="/favicon.png"
                  alt="DALTIN AI"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Box>                              
            </LinkWrapper>
          </Stack>
        </Toolbar>
      </AppBar> 
      <Box
        sx={{
          pt: "64px",
        }}
      >
        <Outlet />      
      </Box> 
    </>
  )
}