import React, { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";

import { ApplicationDetails, CongratulationDialog } from "components";
import { getApplicationDetails } from "redux/actions";
import { formatName, generatePublicURL, scrollToTop } from "utils/utilities";

const RegisterDetail = () => {

  const { id } = useParams();  
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const success = params.get("success");
  const dispatch = useDispatch();
  const { application, loading } = useSelector(state => state.app);  
  const printRef = useRef();

  const [ showCongratulation, setShowCongratulation ] = useState(success === "true" ? true : false);

  useEffect(() => {
    scrollToTop(window);
  }, []);

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
      : <Box>
        <CongratulationDialog        
          title="Congratulations!"
          content={`Your application has been submitted successfully. Our team will get back to you soon.`}          
          confirmText="View Application"
          open={showCongratulation}
          handleClose={() => setShowCongratulation(false)}                 
        />    
        <Container 
          component="main" 
          maxWidth="md" 
          sx={{ 
            mb: 4,
            pb: { xs: "80px", md: 0 },
          }}
        >
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography component="h1" variant="h4" align="center">
                Application Details 
              </Typography>
              <ReactToPrint              
                trigger={() => <Button
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Print
                </Button>}
                content={() => printRef.current}
                pageStyle="@page { size: auto; } @media print { body { -webkit-print-color-adjust: exact; } }"
                documentTitle={`${application?.firstName} ${application?.lastName} - Application Details.pdf`}
              />              
            </Stack>

            <Box
              mt={4}
              ref={printRef}
            >
              <ApplicationDetails
                personal={[
                  { label: "Full Name", value: formatName(application?.title, application?.firstName, application?.middleName, application?.lastName) || "" },
                  { label: "Mobile", value: application?.mobile || "" },
                  { label: "Emergency Contact", value: application?.emergencyContact || "" },
                  { label: "Email", value: application?.email || "" },
                  { label: "Martial Status", value: application?.martialStatus || "" },
                  { label: "Gender", value: application?.gender || "" },
                  { label: "Date of Birth", value: application?.dob ? moment(new Date(application?.dob)).format("MMMM Do YYYY") : "" },
                ]}   
                address={[
                  { label: "City", value: application?.city || "" },
                  { label: "State", value: application?.state || "" },
                  { label: "Country", value: application?.country || "" },
                  { label: "Pincode", value: application?.pincode || "" },
                  { label: "Passport Number", value: application?.passportNumber || "" },
                  { label: "Passport Expiry", value: application?.passportExpiry ? moment(new Date(application?.passportExpiry)).format("MMMM Do YYYY") : "" },
                ]}   
                academic={[
                  { label: "Interested Country", value: application?.intrerestedCountry || "" },
                  { label: "English Proficiency Test", value: application?.englishProficiencyTest ? "Yes" : "No" },
                  { label: "English Proficiency Test Score", value: application?.englishProficiencyTestScore || "N/A" },
                ]}    
                education={application?.Education?.map((item, index) => ({
                  label: `Education ${index + 1}`,
                  value: `${item?.qualification} - ${item?.university} - ${item?.percentage}% - ${item?.passingYear} - ${item?.country}`
                }))}
                background={[
                  { label: "Visa Rejected", value: application?.visaRejected ? "Yes" : "No" },
                  { label: "Gap in Education", value: application?.gapInEducation ? "Yes" : "No" },
                ]}
                documents={application?.Documents?.map((item, index) => ({
                  label: item?.label,
                  status: item?.url ? "Uploaded" : "Not Uploaded",
                  url: item?.url ? generatePublicURL(item?.url) : "#",
                }))}
              />
            </Box>
          </Paper>
        </Container>
      </Box>}
    </>
  )
}

export default RegisterDetail;