import React, { useEffect, useState } from "react";
import { FieldArray, Formik } from "formik";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, CircularProgress, Collapse, FormHelperText, Grid, Stack, Typography } from "@mui/material";

import { AppInputSelect, LinkWrapper } from "components";
import Axios from "utils/axios";
import { generatePublicURL, scrollToTop } from "utils/utilities";

const docs = [
  { label: "10th Marksheet", value: "10th", required: true, type: ["PDF", "JPG", "PNG"], maxSize: 1 },
  { label: "12th Marksheet", value: "12th", required: true, type: ["PDF", "JPG", "PNG"], maxSize: 1 },
  { label: "Passport", value: "passport", required: true, type: ["PDF", "JPG", "PNG"], maxSize: 1 },
  { label: "English Proficiency Test Certificate", value: "english", required: false, type: ["PDF"], maxSize: 1 },
  { label: "SOP", value: "sop", required: false, type: ["PDF"], maxSize: 1 },
  { label: "CV", value: "cv", required: false, type: ["PDF"], maxSize: 1 },
  { label: "Experience Letter", value: "experience", required: false, type: ["PDF"], maxSize: 1 },
  { label: "Bachelor's Degree(for Master's Applicant)", value: "bachelor", required: false, type: ["PDF", "JPG", "PNG"], maxSize: 1 },
]

export const Document = ({
  activeStep,
  handleBack,
  handleNext,
  steps,
  data,
  setData
}) => {

  useEffect(() => {
    scrollToTop(window);
  }, []);

  const onSubmit = async (values, { setSubmitting }) => {            
    setSubmitting(true);    
    setData({
      ...data,
      documents: values.docs
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
                currentSelection: "",                                  
                docs: data.documents || []
              }}
              validationSchema={
                Yup.object().shape({
                  docs: Yup.array().of(
                    Yup.object().shape({
                      file: Yup.mixed().required("File is required"),
                      url: Yup.string().required("Please Upload the Document"),
                      label: Yup.string().required("Label is required"),
                      value: Yup.string().required("Value is required"),
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
                    spacing={{ xs: 2, md: 1.5 }}
                  >
                    <Typography
                      variant="h5"
                      color="primary"                      
                    >
                      Upload Documents
                    </Typography> 
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      Required Documents
                    </Typography>
                    {docs?.filter(doc => doc.required).map((doc, index) => (
                      <Typography variant="caption" key={index}>
                        ✅{doc?.label}
                      </Typography>
                    ))}
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems={"center"}
                    >
                      <AppInputSelect
                        id="currentSelection"
                        name="currentSelection"
                        value={values.currentSelection}
                        label="Select Document to Upload"
                        handleChange={(e) => setFieldValue("currentSelection", e.target.value)}
                        handleBlur={handleBlur}
                        options={docs?.filter(doc => !values.docs.find(d => d.value === doc.value)).map(doc => ({
                          label: `${doc.label} ${doc.required ? "(Required)*" : ""}`,
                          value: doc.value 
                        }))}
                        placeholder="Select Document"
                        touched={touched.currentSelection}
                        errors={errors.currentSelection}                        
                      />
                      <Button
                        variant="contained"
                        color="success"
                        type="button"   
                        sx={{
                          minHeight: "53px",
                          minWidth: "100px",
                        }}
                        onClick={() => {
                          const doc = docs.find(d => d.value === values.currentSelection);
                          if (doc) {                           
                            setFieldValue("docs", [
                              ...values.docs,
                              { ...doc, file: null, url: null }
                            ]);
                            setFieldValue("currentSelection", "");
                          }
                        }}
                      >
                        + Add
                      </Button>
                    </Stack>                                                                             
                    <Stack                        
                      spacing={2}
                    >
                      <FieldArray
                        name="docs"
                        render={(arrayHelpers) => (
                          <Stack
                            spacing={2}
                            direction="column"
                            mt={2}
                          >
                            {values.docs?.map((item, index) => (
                              <DocumentForm
                                key={index}
                                index={index}
                                doc={item}
                                setFieldValue={setFieldValue}
                                onDelete={() => arrayHelpers.remove(index)}
                                values={values}
                                data={data}
                                setData={setData}
                                errors={errors}
                              />
                            ))}
                          </Stack>
                        )}
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

const DocumentForm = ({
  index,
  setFieldValue,
  onDelete,
  doc,  
  values,
  data,
  setData,
  errors
}) => {

  const [ render, setRender ] = useState(false);
  const [ progress, setProgress ] = useState(0);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    setData({
      ...data,
      documents: values?.docs
    });
  }, [doc]);

  const handleUpload = async (file) => {    
    try{
      setLoading(true);
      let formData = new FormData();
      formData.append("file", file);
      const { data } = await Axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      })
      if(data?.data){
        setFieldValue(`docs.${index}.url`, data.data);        
        setLoading(false);
      }      
    }catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

  return(
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
            fontSize={14}
            color="primary"
          >
            {doc?.label} {doc?.maxSize ? `(Max Size: ${doc.maxSize}MB)` : ""}
          </Typography>
          {doc?.required ? <Typography
            variant="caption"
            color="error"
          >
            Required*
          </Typography> : <Stack
            alignItems={"center"}
            justifyContent={"center"}
          >
            <DeleteOutline
              onClick={onDelete}
              sx={{ cursor: "pointer" }}  
              color="error"
              size="small"
            />
          </Stack>}
        </Stack>

        {values?.docs[index]?.url ? <LinkWrapper
          url={generatePublicURL(values?.docs[index]?.url)}
        >
          <Button
            variant="outlined"
            color="primary"
            type="button"  
            sx={{
              width: "fit-content"
            }}        
          >
            View Uploaded Document
          </Button>
        </LinkWrapper> : <Box>
          <Stack            
            spacing={1.5}            
          >
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={1.5}              
            >
              <FileUploader 
                handleChange={(file) => setFieldValue(`docs.${index}.file`, file)} 
                name={`docs.${index}.value`}
                types={doc?.type}
                maxSize={doc?.maxSize}
                onSizeError={(size) => toast.error(`File size should be less than ${size}MB`)}
                required={doc?.required}
                label={doc?.file ? doc?.file?.name : " Choose File/Drag & Drop"}                
                classes="file-uploader"
              />
              {progress > 0 && <CircularProgressWithLabel
                value={progress} 
              />}
            </Stack>
            <Button
              variant="contained"
              color="success"
              type="button"
              size="small"
              sx={{
                width: "fit-content"
              }}
              disabled={!values?.docs[index]?.file || loading}
              onClick={() => handleUpload(values?.docs[index]?.file)}
            >
              Upload Document
            </Button>            
        </Stack>
        </Box>}
        {errors && (
        <FormHelperText 
          error 
          id={`standard-weight-helper-text}`}
        >
          {errors?.docs?.[index]?.url || errors?.docs?.[index]?.file}
        </FormHelperText>
      )}
      </Stack>
    </Collapse>
  )
}

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}