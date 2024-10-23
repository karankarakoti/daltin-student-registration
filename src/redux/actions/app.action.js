import { appConstants } from "redux/constants";
import Axios from "utils/axios";

export const registerStudent = (form) => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.REGISTER_STUDENT_REQUEST });
      const { data } = await Axios.post(`/daltin`, form);
      dispatch({ 
        type: appConstants.REGISTER_STUDENT_SUCCESS,
        payload: { 
          message: data?.message,
        }
      });
      if(data?.data){        
        dispatch({ 
          type: appConstants.SET_REDIRECT, 
          payload: `/register/${data?.data?.id}?success=true` 
        });
      }
    }catch(error){
      dispatch({ 
        type: appConstants.REGISTER_STUDENT_FAILURE,
        payload: error.response.data.error 
      });
    }
  }
}

export const getApplicationDetails = (id) => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.GET_APPLICATION_DETAILS_REQUEST });
      const { data } = await Axios.get(`/daltin/${id}`);
      dispatch({ 
        type: appConstants.GET_APPLICATION_DETAILS_SUCCESS,
        payload: { 
          data: data?.data,
        }
      });
    }catch(error){
      dispatch({ 
        type: appConstants.GET_APPLICATION_DETAILS_FAILURE,
        payload: error.response.data.error 
      });
    }
  }
}