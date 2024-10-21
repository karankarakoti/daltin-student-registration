import React from "react";
import { FormControl, FormHelperText, MenuItem, Stack, TextField } from "@mui/material";

export const AppInputSelect = ({
  id,
  value,
  name,
  label,
  placeholder,
  options,
  handleChange=()=>{},
  handleBlur=()=>{},
  touched=false,
  errors=false,
  disabled=false,
  helperText,
  required=false,
  ...rest
}) => {
  return (
    <Stack 
      spacing={0.5}
      width={"100%"}
    >        
      <FormControl fullWidth>
        <TextField
          select          
          id={id}
          value={value}
          name={name}
          label={label}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          helperText={helperText}
          error={Boolean(touched && errors)}
          required={required}
          {...rest}
        >
          {placeholder && <MenuItem value="">
            <em>{placeholder}</em>
          </MenuItem>}
          {options?.map((option) => (
            <MenuItem key={option?.value} value={option?.value}>                
              {option?.label}
            </MenuItem>
          ))}        
        </TextField>
      </FormControl>
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