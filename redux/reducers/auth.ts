import { ActionType } from "../actionTypes/index";

const initialState = {
  currentUser:null,
  payload: null
};

const authReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case ActionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        type: action.type,
        currentUser:action.payload
      };
    case ActionType.USER_LOGIN_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.USER_LOGOUT:
      return {
        ...state,
        type: action.type,
        currentUser: null,
      };
    case ActionType.USER_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        type: action.type,
        payload:action.payload
    }; 
    case ActionType.USER_CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        type: action.type,
        payload: null
    }; 
    case ActionType.USER_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        type: action.type,
        payload:action.payload
    }; 
    case ActionType.USER_FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload
    };   
    default:
      return state;
  }
};

export default authReducer;
