import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

export const ApplicationDetails = ({
  personal,
  address,
  academic,
  education,
  background,
  documents,  
}) => {
  return (
    <Box>      
      {personal && <DetailTable
        title="Personal Information"
        data={personal}        
      />}
      {address && <DetailTable
        title="Address & Passport Information"
        data={address}
      />}
      {academic && <DetailTable
        title="Academic Interests"
        data={academic}
      />}
      {education && <DetailTable
        title="Educational Background"
        data={education}
      />}
      {background && <DetailTable
        title="Background Information"
        data={background}        
      />}  
      {documents?.length > 0 && <Box 
        mt={2}
      >
        <Typography
          variant="subtitle1"
          fontSize="14px"
          fontWeight={600}              
          textAlign="center"
        >
          Attached Documents
        </Typography>
        <List dense={true}>                                                  
          {documents?.map((doc, index) => (
            <ListItem
              component={doc?.url ? "a" : "div"}
              href={doc?.url}
              target="_blank"
              rel="noreferrer"
              key={index}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "0.5rem",
                mb: 1,
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              <ListItemIcon>
                <FolderIcon
                  color="primary"
                 />
              </ListItemIcon>
              <ListItemText
                primary={doc?.label}
                secondary={doc?.status}
                sx={{
                  textTransform: "capitalize",
                  textDecoration: "none",    
                  ml: 1,                  
                }}
              />                 
            </ListItem>
          ))}
        </List>
      </Box>}     
    </Box>
  )
}

const DetailTable = ({ 
  title,
  data,
  borderRadiusTop, 
  borderRadiusBottom
 }) => {
  return (
    <Box 
      as="table" 
      width="100%"        
      style={{borderCollapse: "collapse"}}
      borderRadius={borderRadiusTop ? "0.5rem 0.5rem 0 0" : borderRadiusBottom ? "0 0 0.5rem 0.5rem" : "0"}
      overflow="hidden"
    >   
      <Box 
        as="thead"
      >      
        <Box 
          as="tr"
        >
          <Box 
            as="th" 
            colSpan={2}
            style={{textAlign: "center"}}
            p={0.8}
            backgroundColor="primary.main"
            color="white"  
            border="1px solid"        
            borderColor="#d9d9d9"
          >
            <Typography
              variant="subtitle1"
              fontSize="14px"
              fontWeight={600}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box 
        as="tbody"       
      >
        {data?.map((item, index) => (
          <Box 
            as="tr" 
            key={index}                             
          >
            <Box 
              as="td" 
              style={{width: "25%"}} 
              p={0.8}
              borderBottom="1px solid"
              borderLeft="1px solid"
              borderColor="#d9d9d9"            
            >
              <Typography
                variant="subtitle2"
                fontSize="12px"
                fontWeight={600}
                color="text.secondary"
              >
                {item?.label}
              </Typography>
            </Box>
            <Box 
              as="td"
              p={0.8}
              borderBottom="1px solid"
              borderLeft="1px solid"
              borderRight="1px solid"
              borderColor="#d9d9d9"
            >            
              <Typography
                variant="subtitle2"
                fontSize="12px"
                color={`${item?.color}.main` || "unset"}                         
              >
                {item?.value}
              </Typography>           
            </Box>            
          </Box>
        ))}
      </Box>
    </Box>
  )
}