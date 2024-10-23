import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getApplicationDetails } from "redux/actions";

const RegisterDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { application, loading } = useSelector(state => state.app);

  useEffect(() => {
    dispatch(getApplicationDetails(id));
  }, [dispatch, id]); 

  return (
    <>
      {!loading && application?.id !== id ? 
        <Typography
          variant="h3"
          component="h1"
          sx={{ 
            mt: 4, 
            mb: 4,
            color: "error.main" 
          }}
        >
          Application not found
        </Typography>
      : <>
        {/* Application Details Here */}
      </>}
    </>
  )
}

export default RegisterDetail;