import React from "react";
import { Box, Typography } from "@mui/material";

export const NotFoundText = ({
  title = "Not Found",
  description = "The page you are looking for does not exist."
}) => {
  return (
    <Box
      py={4}
      px={4}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        color={"error"}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
      >
        {description}
      </Typography>
    </Box>
  )
}