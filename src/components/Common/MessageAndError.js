import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Loading } from "components";
import { appConstants } from "redux/constants";

export const MessageAndError = () => {

  const dispatch = useDispatch();  
  const { error: appError, loading: appLoading, message: appMessage } = useSelector((state) => state.app);

  useEffect(() => {    
    if(appMessage){
      toast.success(appMessage)
      dispatch({ type: appConstants.RESET_ERROR_AND_MESSAGE })
    }
    if(appError){
      toast.error(appError)
      dispatch({ type: appConstants.RESET_ERROR_AND_MESSAGE })
    }    
  }, [
    appError, 
    appMessage, 
    dispatch
  ])

  return (
    <>
      <ToastContainer         
        style={{ fontSize: "12px" }}  
        position="top-right"      
      />
      <Loading
        loading={appLoading}
      />
    </>
  )
}