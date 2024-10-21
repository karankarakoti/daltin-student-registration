import React from "react";
import { FormHelperText, Stack, TextField } from "@mui/material";

export const AppInput = ({
  id,
  type,
  value,
  name,
  label,
  handleBlur=()=>{},
  handleChange=()=>{},
  touched=false,
  errors=false,
  disabled=false,
  multiline=false,  
  variant="outlined",
  required=false,
  ...rest
}) => {
  return (
    <Stack 
      spacing={0.5}
      width="100%"
    >        
      <TextField 
        id={id}
        type={type}
        value={value}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}            
        label={label}
        fullWidth
        error={Boolean(touched && errors)}
        variant={variant}
        disabled={disabled} 
        multiline={multiline}
        required={required}
        {...rest}
      />        
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