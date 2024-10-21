import React, { useEffect, useState } from "react";
import axios from "axios";

import { Loader, PageError } from "components";
import { apiConfig } from "config";

export const PingWrapper = ({
  children
}) => {

  const [ loading, setLoading ] = useState(true);
  const [ ping, setPing ] = useState(false);

  useEffect(() => {
    async function ping() {
      try {
        const { data } = await axios.get(apiConfig.BASE_URL+"/ping");
        setPing(data?.success);        
      }catch(e) {
        setPing(false);
      }      
      setLoading(false);      
    }
    ping();    
  }, []);

  return (
    <>
      {loading ? <Loader/> : ping ? children : <PageError
        title="Service Unavailable"
        description="The server is currently unavailable. Please try again later."
        buttonText="Try Again"
        onClick={() => window.location.reload()}
        buttonType="Button"
      />}
    </>    
  )
}