import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { ApplicationDetails, ConfirmationDialog } from "components";
import { registerStudent } from "redux/actions";
import { formatName, generatePublicURL } from "utils/utilities";
import { scrollToTop } from "utils/utilities";

export const Review = ({
  activeStep,
  handleBack,  
  data
}) => {

  const { personal, address, academic, education, background, documents } = data;
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.app);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    scrollToTop(window);
  }, []);

  const handleSubmit = () => {
    let form = {
      personal,
      address,
      academic,
      education,
      background,
      documents: documents.map(item => ({ 
        label: item.label, 
        value: item.value,
        url: item.url,
      }))
    }
    dispatch(registerStudent(form));
  }

  return (
    <>
      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid item xs={12}>                              
          <Stack 
            sx={{ p: 3 }}
            spacing={2}
          >
            <Typography
              variant="h5"
              color="primary"                      
            >
              Review your application
            </Typography> 
            <Box>
              <ApplicationDetails
                personal={[
                  { label: "Full Name", value: formatName(personal?.title, personal?.firstName, personal?.middleName, personal?.lastName) || "" },
                  { label: "Mobile", value: personal?.mobile || "" },
                  { label: "Emergency Contact", value: personal?.emergencyContact || "" },
                  { label: "Email", value: personal?.email || "" },
                  { label: "Martial Status", value: personal?.martialStatus || "" },
                  { label: "Gender", value: personal?.gender || "" },
                  { label: "Date of Birth", value: personal?.dob ? moment(new Date(personal?.dob)).format("MMMM Do YYYY") : "" },
                ]}   
                address={[
                  { label: "City", value: address?.city?.value || "" },
                  { label: "State", value: address?.state?.value || "" },
                  { label: "Country", value: address?.country?.value || "" },
                  { label: "Pincode", value: address?.pincode || "" },
                  { label: "Passport Number", value: address?.passportNumber || "" },
                  { label: "Passport Expiry", value: address?.passportExpiry ? moment(new Date(address?.passportExpiry)).format("MMMM Do YYYY") : "" },
                ]}   
                academic={[
                  { label: "Interested Country", value: academic?.intrerestedCountry?.value || "" },
                  { label: "English Proficiency Test", value: academic?.englishProficiencyTest ? "Yes" : "No" },
                  { label: "English Proficiency Test Score", value: academic?.englishProficiencyTestScore || "N/A" },
                ]}    
                education={education?.map((item, index) => ({
                  label: `Education ${index + 1}`,
                  value: `${item?.qualification} - ${item?.university} - ${item?.percentage}% - ${item?.passingYear} - ${item?.country?.value}`
                }))}
                background={[
                  { label: "Visa Rejected", value: background?.visaRejected ? "Yes" : "No" },
                  { label: "Gap in Education", value: background?.gapInEducation ? "Yes" : "No" },
                ]}
                documents={documents?.map((item, index) => ({
                  label: item?.label,
                  status: item?.url ? "Uploaded" : "Not Uploaded",
                  url: item?.url ? generatePublicURL(item?.url) : "#",
                }))}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
              {activeStep !== 0 && (
                <Button 
                  onClick={handleBack} 
                  sx={{ mt: 3, ml: 1 }}
                  type="button"
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"                          
                type="submit"
                sx={{ mt: 3, ml: 1 }}    
                onClick={() => setShowConfirmationDialog(true)}          
                disabled={loading}
              >
                Submit Application
              </Button>
            </Box> 
          </Stack>
        </Grid>        
      </Grid>  

      <ConfirmationDialog        
        title="Submit Application"
        content={`All the information provided will be submitted for review. Do you want to proceed?`}
        cancelText="Cancel"
        confirmText="Confirm"
        open={showConfirmationDialog}
        handleClose={() => setShowConfirmationDialog(false)}        
        handleConfirm={() => {
          handleSubmit();
          setShowConfirmationDialog(false);
        }}        
      />    
    </>
  )
}