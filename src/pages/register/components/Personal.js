import React from "react";
import dayjs from "dayjs";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { AppInput, AppInputDate, AppInputSelect } from "components";
import { Genders, MartialStatus, Titles } from "utils/constant-data";

export const Personal = ({
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
      personal: values
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
                title: data?.personal?.title || "",
                firstName: data?.personal?.firstName || "",
                middleName: data?.personal?.middleName || "",
                lastName: data?.personal?.lastName || "",
                mobile: data?.personal?.mobile || "",
                emergencyContact: data?.personal?.emergencyContact || "",
                email: data?.personal?.email || "",
                martialStatus: data?.personal?.martialStatus || "",
                gender: data?.personal?.gender || "",
                dob: data?.personal?.dob ? dayjs(data?.personal?.dob) : null,                
              }}
              validationSchema={
                Yup.object().shape({
                  title: Yup.string().max(255).required("Title is required"),
                  firstName: Yup.string().max(255).required("First name is required"),
                  mobile: Yup.string().max(255).required("Mobile number is required"),
                  emergencyContact: Yup.string().max(255).required("Emergency contact is required"),
                  email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
                  dob: Yup.date().required("Date of birth is required"),
                  gender: Yup.string().max(255).required("Gender is required"),
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
                      Personal Information
                    </Typography>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                    >
                      <Box
                        flex={0.5}
                        minWidth={100}
                      >
                        <AppInputSelect
                          id="title"
                          name="title"
                          value={values.title}
                          label="Title"
                          handleChange={(e) => setFieldValue("title", e.target.value)}
                          handleBlur={handleBlur}
                          options={Titles}
                          placeholder="Select Title"
                          touched={touched.title}
                          errors={errors.title}
                          required={true}
                        />
                      </Box>
                      <AppInput
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        type="text"
                        value={values.firstName}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.firstName}
                        errors={errors.firstName}
                        required={true}
                      />
                      <AppInput
                        id="middleName"
                        name="middleName"
                        label="Middle Name"
                        type="text"
                        value={values.middleName}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.middleName}
                        errors={errors.middleName}                        
                      />
                      <AppInput
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        value={values.lastName}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.lastName}
                        errors={errors.lastName}                        
                      />
                    </Stack>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                    >
                      <AppInput
                        id="mobile"
                        name="mobile"
                        label="Mobile"
                        type="text"
                        value={values.mobile}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.mobile}
                        errors={errors.mobile}
                        required={true}
                      />
                      <AppInput
                        id="emergencyContact"
                        name="emergencyContact"
                        label="Emergency Contact"
                        type="text"
                        value={values.emergencyContact}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.emergencyContact}
                        errors={errors.emergencyContact}
                        required={true}
                      />
                      <AppInput
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.email}
                        errors={errors.email}
                        required={true}
                      />
                    </Stack>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                    >
                      <AppInputSelect
                        id="gender"
                        name="gender"
                        value={values.gender}
                        label="Gender"
                        handleChange={(e) => setFieldValue("gender", e.target.value)}
                        handleBlur={handleBlur}
                        options={Genders}
                        placeholder="Select Gender"
                        touched={touched.gender}
                        errors={errors.gender}
                        required={true}
                      />
                      <AppInputSelect
                        id="martialStatus"
                        name="martialStatus"
                        value={values.martialStatus}
                        label="Martial Status"
                        handleChange={(e) => setFieldValue("martialStatus", e.target.value)}
                        handleBlur={handleBlur}
                        options={MartialStatus}
                        placeholder="Select Martial Status"
                        touched={touched.martialStatus}
                        errors={errors.martialStatus}
                      />  
                      <AppInputDate
                        id="dob"
                        name="dob"
                        label="Date of Birth*"
                        value={values.dob}
                        handleBlur={handleBlur}
                        handleChange={(val) => setFieldValue("dob", val)}                      
                        touched={touched.dob}
                        errors={errors.dob}
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
                        {activeStep === steps.length - 1 ? "Save Details" : "Next"}
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