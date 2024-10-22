import React, { useEffect, useState } from "react";
import { FieldArray, Formik } from "formik";
import { GetCountries } from "react-country-state-city";
import * as Yup from "yup";
import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, Collapse, Grid, Stack, Typography } from "@mui/material";

import { AppInput, AutocompleteSelect } from "components";

export const Education = ({
  activeStep,
  handleBack,
  handleNext,
  steps,
  data,
  setData
}) => {

  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });    
  }, []);  

  const onSubmit = async (values, { setSubmitting }) => {            
    setSubmitting(true);         
    setData({
      ...data,
      education: values.data
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
                data: data?.education || "",
              }}
              validationSchema={
                Yup.object().shape({
                  data: Yup.array().of(
                    Yup.object().shape({
                      qualification: Yup.string().required("Qualification is required"),
                      university: Yup.string().required("University is required"),
                      percentage: Yup.number().required("Percentage is required"),
                      passingYear: Yup.number().required("Passing Year is required"),
                      country: Yup.object().required("Country is required")
                    })
                  )
                })
              }
              onSubmit={onSubmit}
              enableReinitialize={true}
            >          
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Stack
                    spacing={2}
                  >
                    <Stack
                      direction="row"
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      spacing={2}
                    >
                      <Typography
                        variant="h5"
                        color="primary"                        
                      >
                        Education Information
                      </Typography> 
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => {
                          const education = values.data || [];
                          education.push({
                            "qualification": "",
                            "university": "",
                            "percentage": "",
                            "passingYear": "",
                            "country": null,
                          });
                          setFieldValue("data", education);
                        }}
                      >
                        + Add Education
                      </Button>
                    </Stack>   
                    <FieldArray
                      name="data"
                      render={(arrayHelpers) => (
                        <Stack
                          spacing={2}
                          direction="column"                          
                        >
                          {values.data?.map((item, index) => (
                            <EducationForm
                              key={index}
                              index={index}                              
                              setFieldValue={setFieldValue}
                              onDelete={() => arrayHelpers.remove(index)}
                              item={item}
                              countriesList={countriesList}
                              handleBlur={handleBlur}                              
                              handleChange={handleChange}
                              touched={touched}
                              errors={errors}
                            />
                          ))}
                        </Stack>
                      )}
                    />                                                                           
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

const EducationForm = ({
  index,
  setFieldValue,
  onDelete,
  item,
  countriesList,
  handleBlur,
  handleChange,
  touched,
  errors,
}) => {

  const [ render, setRender ] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <Collapse 
      in={render}      
    >
      <Stack
        spacing={2}
        boxShadow="0 2px 10px 0 rgb(0 0 0 / 10%)"
        p={2}
        borderRadius={2}
      >
        <Stack
          direction="row"
          alignItems={"center"}   
          justifyContent={"space-between"}       
          spacing={2}
        >
          <Typography
            variant="h5"            
          >
            Education {index + 1}
          </Typography>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
          >
            <DeleteOutline
              onClick={onDelete}
              sx={{ cursor: "pointer" }}  
              color="error"
              size="small"
            />
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
        >          
          <AppInput
            id={`data.${index}.qualification`}
            name={`data.${index}.qualification`}
            label="Qualification"
            type="text"
            value={item.qualification}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched?.data?.[index]?.qualification}
            errors={errors?.data?.[index]?.qualification}
            required={true}
          />
          <AppInput
            id={`data.${index}.university`}
            name={`data.${index}.university`}
            label="University/Institute/Board"
            type="text"
            value={item.university}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched?.data?.[index]?.university}
            errors={errors?.data?.[index]?.university}
            required={true}
          />
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
        >          
          <AppInput
            id={`data.${index}.percentage`}
            name={`data.${index}.percentage`}
            label="Percentage"
            type="number"
            value={item.percentage}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched?.data?.[index]?.percentage}
            errors={errors?.data?.[index]?.percentage}
            required={true}
          />
          <AppInput
            id={`data.${index}.passingYear`}
            name={`data.${index}.passingYear`}
            label="Passing Year"
            type="number"
            value={item.passingYear}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched?.data?.[index]?.passingYear}
            errors={errors?.data?.[index]?.passingYear}
            required={true}
          />
        </Stack>
        <AutocompleteSelect
          id={`data.${index}.country`}
          name={`data.${index}.country`}
          options={countriesList?.map((option) => ({
            value: option.name,
            label: option.name,
            id: option.id
          }))}
          label="Country"
          value={item.country}
          onChange={(e, value) => {                              
            setFieldValue(`data.${index}.country`, value);
          }}
          touched={touched?.data?.[index]?.country}
          errors={errors?.data?.[index]?.country}
          required={true}
        />                       
      </Stack>
    </Collapse>
  )
}