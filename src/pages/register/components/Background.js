import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { AppInputRadio, AppInputSelect } from "components";

export const Background = ({
  activeStep,
  handleBack,
  handleNext,
  steps,
  data,
  setData
}) => {

  const onSubmit = async (values, { setSubmitting }) => {            
    setSubmitting(true);
    setData({
      ...data,
      background: values
    });    
    handleNext();
    setSubmitting(false);
  }

  return (
    <>
      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid item xs={12}>                    
          <Box sx={{ p: 3 }}>
            <Formik
              initialValues={{                                  
                visaRejected: data?.background.visaRejected,
                gapInEducation: data?.background.gapInEducation,
              }}
              validationSchema={
                Yup.object().shape({
                  visaRejected: Yup.boolean().required("This field is required"),
                  gapInEducation: Yup.boolean().required("This field is required"),                  
                })
              }
              onSubmit={onSubmit}
              enableReinitialize={true}
            >          
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Stack
                    spacing={{ xs: 2, md: 1.5 }}
                  >
                    <Typography
                      variant="h5"
                      color="primary"                      
                    >
                      Background Information
                    </Typography>                                                                              
                    <Stack                        
                      spacing={2}
                    > 
                      <AppInputRadio
                        id="visaRejected"
                        name="visaRejected"
                        label="Visa Rejected?"
                        value={values.visaRejected}
                        onChange={(e) => setFieldValue("visaRejected", e.target.value)}                        
                        options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]}
                        touched={touched.visaRejected}
                        errors={errors.visaRejected}
                        info="Did you face any visa rejection in the past?"
                      />                       
                      <AppInputSelect
                        id="gapInEducation"
                        name="gapInEducation"
                        value={values.gapInEducation}
                        label="Gap In Education"
                        handleChange={(e) => setFieldValue("gapInEducation", e.target.value)}
                        handleBlur={handleBlur}
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                        placeholder="Did you have any gap in your education?"
                        touched={touched.gapInEducation}
                        errors={errors.gapInEducation}
                        required={true}
                      />                                                                    
                    </Stack>                                                          
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
                        disabled={isSubmitting}
                      >
                        {activeStep === steps.length - 1 ? "Save Details" : "Save & Next"}
                      </Button>
                    </Box> 
                  </Stack>                           
                </form>
              )}
            </Formik>
          </Box>
        </Grid>        
      </Grid>      
    </>
  )
}