import React from "react";
import { FormHelperText, Grid, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const AppInputDate = ({
  id,
  name,
  label,  
  value,
  handleBlur,
  handleChange,  
  touched,
  errors,
  disabled=false,
  required=false,
}) => {
  return (    
    <Stack 
      spacing={0.5}
      width={"100%"}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>        
        <DatePicker
          id={id}
          name={name}
          label={label}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={disabled}   
          error={Boolean(touched && errors)}
          required={required}
          slotProps={{
            textField: {
              helperText: 'MM/DD/YYYY',
            },
          }}          
        />
      </LocalizationProvider>
      {touched && errors && (
        <FormHelperText 
          error 
          id={`standard-weight-helper-text-${name}`}
        >
          {errors}
        </FormHelperText>
      )}
    </Stack>    
  )
}