import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { GetCountries } from "react-country-state-city";
import * as Yup from "yup";
import { Box, Button, Collapse, Grid, Stack, Typography } from "@mui/material";

import { AppInput, AppInputSelect, AutocompleteSelect } from "components";
import { scrollToTop } from "utils/utilities";

export const Academic = ({
  activeStep,
  handleBack,
  handleNext,
  steps,
  data,
  setData
}) => {

  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    scrollToTop(window);
    GetCountries().then((result) => {
      setCountriesList(result);
    });    
  }, []);  

  const onSubmit = async (values, { setSubmitting }) => {            
    setSubmitting(true);  
    setData({
      ...data,
      academic: values
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
                intrerestedCountry: data?.academic?.intrerestedCountry || null,
                englishProficiencyTest: data?.academic.englishProficiencyTest,
                englishProficiencyTestScore: data?.academic?.englishProficiencyTestScore || "",                
              }}
              validationSchema={
                Yup.object().shape({
                  intrerestedCountry: Yup.object().required("Interested Country is required"),
                  englishProficiencyTest: Yup.boolean().required("English Proficiency Test is required"),                  
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
                      Academic Information
                    </Typography>                                                                              
                    <Stack                        
                      spacing={2}
                    > 
                      <AutocompleteSelect
                        id="intrerestedCountry"
                        name="intrerestedCountry"
                        options={countriesList?.map((option) => ({
                          value: option.name,
                          label: option.name,
                          id: option.id
                        }))}
                        label="Interested Country"
                        value={values.intrerestedCountry}
                        onChange={(e, value) => {                              
                          setFieldValue("intrerestedCountry", value);
                        }}
                        touched={touched.intrerestedCountry}
                        errors={errors.intrerestedCountry}
                        required={true}
                      />                       
                      <AppInputSelect
                        id="englishProficiencyTest"
                        name="englishProficiencyTest"
                        value={values.englishProficiencyTest}
                        label="English Proficiency Test"
                        handleChange={(e) => setFieldValue("englishProficiencyTest", e.target.value)}
                        handleBlur={handleBlur}
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                        placeholder="Select English Proficiency Test"
                        touched={touched.englishProficiencyTest}
                        errors={errors.englishProficiencyTest}
                      />  
                      <Collapse 
                        orientation="vertical"
                        in={values.englishProficiencyTest || false}                          
                      >
                        <AppInput
                          id="englishProficiencyTestScore"
                          name="englishProficiencyTestScore"
                          label="English Proficiency Test Score"
                          type="number"
                          value={values.englishProficiencyTestScore}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          touched={touched.englishProficiencyTestScore}
                          errors={errors.englishProficiencyTestScore}                            
                        />                          
                      </Collapse>                                              
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