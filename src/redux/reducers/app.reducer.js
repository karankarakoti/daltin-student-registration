import { appConstants } from "redux/constants"

const initState = {      
  error: null,  
  loading: false,  
  message: null,
}

export const appReducer = (state = initState, action) => {
  switch(action.type){        
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