import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Box } from "@mui/material";

import { LinkPrefix } from "utils/constant-data";

export const LinkWrapper = ({
  url,
  children,
  onClick=null,  
  type="normal"  
}) => {
  return (
    <>               
      {url?.startsWith("/") ? (
        <>
          {type === "nav" ? <NavLink 
            to={url} 
            onClick={onClick ? onClick : () => {}}
            style={{
              textDecoration: "none",            
            }}
          >
            {children}
          </NavLink> : <Link
            to={url}
            onClick={onClick ? onClick : () => {}}
            style={{
              textDecoration: "none",            
            }}          
          >
            {children}
          </Link>}
        </>
      ) : LinkPrefix?.some((e) => url?.startsWith(e)) ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none"
          }}          
        >
          {children}
        </a>
      ) : <Box
        sx={{ cursor: "pointer" }}
        onClick={onClick ? onClick : () => {}}
      >
        {children}
      </Box>}
    </>
  )
}