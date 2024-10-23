import { appConstants } from "redux/constants"

const initState = {      
  error: null,  
  loading: false,  
  message: null,
  redirect: "",
  application: null
}

export const appReducer = (state = initState, action) => {
  switch(action.type){        
    case appConstants.REGISTER_STUDENT_REQUEST:
    case appConstants.GET_APPLICATION_DETAILS_REQUEST:
      return{
        ...state,
        loading: true
      }

    case appConstants.REGISTER_STUDENT_SUCCESS:
      return{
        ...state,
        loading: false,
        message: action.payload.message,        
      }

    case appConstants.SET_REDIRECT:
      return{
        ...state,
        redirect: action.payload
      }

    case appConstants.GET_APPLICATION_DETAILS_SUCCESS:
      return{
        ...state,
        loading: false,        
        application: action.payload.data
      }

    case appConstants.REGISTER_STUDENT_FAILURE:
    case appConstants.GET_APPLICATION_DETAILS_FAILURE:
      return{
        ...state,
        loading: false,
        error: action.payload
      }

    case appConstants.RESET_ERROR_AND_MESSAGE:
      return{
        ...state,
        error: null,
        message: null        
      } 

    case appConstants.RESET:
      return initState;

    default: return state;
  }  
}