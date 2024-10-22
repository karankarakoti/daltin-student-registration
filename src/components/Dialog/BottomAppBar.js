import React from "react";
import { Box, useTheme } from "@mui/material";

export const BottomAppBar = ({
  children
}) => {

  const theme = useTheme();

  return (
    <Box            
      p={2}
      bgcolor="white"
      sx={{
        position: "fixed",
        width: "100%",            
        right: { xs: 2, sm: 3 },
        bottom: 0,
        borderTop: `1px solid ${theme.palette.divider}`,            
        borderRadius: "16px 16px 0 0",
        zIndex: 1000,
      }}
    >
      {children}
    </Box>
  )
}