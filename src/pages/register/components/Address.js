import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Formik } from "formik";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import * as Yup from "yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Stack, Typography } from "@mui/material";

import { AppInputDate, AppInput, AutocompleteSelect } from "components";

export const Address = ({
  activeStep,
  handleBack,
  handleNext,
  steps,
  data,
  setData
}) => {

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });    
  }, []);  

  useEffect(() => {    
    if(data?.address?.country){
      let id = countriesList.find((country) => country.id === data?.address?.country?.id)?.id;
      GetState(id).then((result) => {
        setStateList(result);
      });
    }
  }, [data?.address?.country, countriesList]);

  useEffect(() => {
    if(data?.address?.state){
      let stateId = stateList.find((state) => state.id === data?.address?.state?.id)?.id;
      let countryId = countriesList.find((country) => country.id === data?.address?.country?.id)?.id;
      GetCity(countryId, stateId).then((result) => {
        setCityList(result);
      });
    }
  }, [data?.address?.state, stateList, countriesList]);

  const onSubmit = async (values, { setSubmitting }) => {            
    setSubmitting(true);  
    setData({
      ...data,
      address: values
    })      
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
                country: data?.address?.country || null,
                state: data?.address?.state || null,
                city: data?.address?.city || null,
                pincode: data?.address?.pincode || "",
                passportNumber: data?.address?.passportNumber || "",
                passportExpiry: data?.address?.passportExpiry ? dayjs(data?.address?.passportExpiry) : null,                  
              }}
              validationSchema={
                Yup.object().shape({
                  city: Yup.object().required("City is required"),
                  state: Yup.object().required("State is required"),
                  country: Yup.object().required("Country is required"),
                  pincode: Yup.string().max(255).required("Pincode is required"),                    
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
                    <Accordion
                      defaultExpanded
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`address-form`}
                        id={`address-form`}
                      >
                        <Typography
                          variant="h5"
                          color="primary"                          
                        >
                          Address Information
                        </Typography>                                   
                      </AccordionSummary>
                      <AccordionDetails>                        
                        <Stack                        
                          spacing={2}
                        >  
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                          >
                            <AutocompleteSelect
                              id="country"
                              name="country"
                              options={countriesList?.map((option) => ({
                                value: option.name,
                                label: option.name,
                                id: option.id
                              }))}
                              label="Country*"
                              value={values.country}
                              onChange={(e, value) => {                              
                                setFieldValue("country", value);
                                setFieldValue("state", null);
                                setFieldValue("city", null);
                                setFieldValue("pincode", "");
                                if(!value) return;
                                let id = value?.id;
                                if(!id){
                                  id = countriesList.find((country) => country.name === value.value)?.id;                              
                                }                                
                                GetState(id).then((result) => {
                                  setStateList(result);
                                });                                
                              }}
                              touched={touched.country}
                              errors={errors.country}
                              required={true}
                            />    
                            <AutocompleteSelect
                              id="state"
                              name="state"
                              options={stateList?.map((option) => ({
                                value: option.name,
                                label: option.name,
                                id: option.id
                              }))}
                              label="State*"
                              value={values.state}
                              onChange={(e, value) => {
                                setFieldValue("state", value);
                                setFieldValue("city", null);
                                setFieldValue("pincode", "");
                                if(!value) return;
                                let stateId = value?.id;
                                if(!stateId){
                                  stateId = stateList.find((state) => state.name === value.value)?.id;
                                }
                                let countryId = values.country?.id;
                                if(!countryId){
                                  countryId = countriesList.find((country) => country.name === values.country.value)?.id;
                                }
                                GetCity(countryId, stateId).then((result) => {
                                  setCityList(result);
                                });                               
                              }}
                              touched={touched.state}
                              errors={errors.state}
                              required={true}
                              disabled={stateList.length === 0 || !values.country}
                            />                      
                          </Stack>
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                          >
                            <AutocompleteSelect
                              id="city"
                              name="city"
                              options={cityList?.map((option) => ({
                                value: option.name,
                                label: option.name,
                                id: option.id
                              }))}
                              label="City*"
                              value={values.city}
                              onChange={(e, value) => {                                
                                setFieldValue("city", value);
                              }}
                              touched={touched.city}
                              errors={errors.city}
                              required={true}
                              disabled={cityList.length === 0 || !values.state}
                            />
                            <AppInput
                              id="pincode"
                              name="pincode"
                              label="Pincode"
                              type="text"
                              value={values.pincode}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                              touched={touched.pincode}
                              errors={errors.pincode}
                              required={true}
                            />
                          </Stack>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>                      

                    <Accordion
                      defaultExpanded={values.passportNumber || values.passportExpiry}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`passport-form`}
                        id={`passport-form`}
                      >
                        <Typography
                          variant="h5"
                          color="primary"                          
                        >
                          Passport Information
                        </Typography>                                   
                      </AccordionSummary>
                      <AccordionDetails>                          
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={2}
                        >
                          <AppInput
                            id="passportNumber"
                            name="passportNumber"
                            label="Passport Number"
                            type="text"
                            value={values.passportNumber}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.passportNumber}
                            errors={errors.passportNumber}
                            required={false}
                          />  
                          <AppInputDate
                            id="passportExpiry"
                            name="passportExpiry"
                            label="Passport Expiry"
                            value={values.passportExpiry}
                            handleBlur={handleBlur}
                            handleChange={(val) => setFieldValue("passportExpiry", val)}                      
                            touched={touched.passportExpiry}
                            errors={errors.passportExpiry}                            
                          />                    
                        </Stack>                        
                      </AccordionDetails>
                    </Accordion>                      
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