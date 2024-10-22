import React from "react";
import { Autocomplete, FormControl, FormHelperText, Stack, TextField } from "@mui/material";

export const AutocompleteSelect = ({
  id,
  name,
  options,
  label,
  value,
  onChange,
  touched,
  errors,
  disabled=false,
  ...rest
}) => {
  return (
    <Stack 
      spacing={0.5}
      width={"100%"}
    >        
      <FormControl fullWidth>
        <Autocomplete
          id={id}
          name={name}          
          options={options}                            
          value={value}
          onChange={onChange}
          autoHighlight
          getOptionLabel={(option) => option.label}                              
          errors={Boolean(touched && errors)}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                },
              }}
            />            
          )}
          {...rest}
        />
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