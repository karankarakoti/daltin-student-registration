import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Stack, Tooltip } from "@mui/material";

export const AppInputRadio = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  touched,
  errors,
  info
}) => {
  return (
    <Stack 
      spacing={0.5}
      width={"100%"}
    >        
      <FormControl fullWidth>
        <Stack
          direction="row"
          spacing={1}
          alignItems={"center"}
        >
          <FormLabel 
            id={`${id}-label`}
          >
            {label}
          </FormLabel>
          {info && <Tooltip title={info} placement="right-start">
            <InfoOutlinedIcon
              fontSize="small"
              sx={{
                cursor: "pointer"
              }}
            />
          </Tooltip>}
        </Stack>
        <RadioGroup
          aria-labelledby={`${id}-label`}
          defaultValue={value}
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <FormControlLabel 
              key={index}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}          
        </RadioGroup>
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