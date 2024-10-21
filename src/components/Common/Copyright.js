import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Typography
        component={Link} 
        color="inherit" 
        to="/"        
        variant="body2"
      >
        {process.env.REACT_APP_NAME}
      </Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}