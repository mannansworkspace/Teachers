import { ActionType } from "../actionTypes/index";

const initialState = {
  allObjectivesLoading: false,
  allObjectives: null,
  allObjectivesError: null,
  objectiveFlag: false,
  addObjectiveLoading: false,
  addObjectiveError: null,
  deleteObjectiveLoading: false,
  deleteObjectiveError: null,
  updateObjectiveLoading: false,
  updateObjectiveError: null,
  objectiveAlreadyExist: null
};

const objectivesReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case ActionType.GET_OBJECTIVES_LOADING:
      return {
        ...state,
        allObjectivesLoading: true,
        allObjectives: null,
        allObjectivesError: null
      };
    case ActionType.GET_OBJECTIVES_ERROR:
      return {
        ...state,
        allObjectivesLoading: false,
        allObjectives: null,
        allObjectivesError: action.payload
      };
    case ActionType.GET_OBJECTIVES_SUCCESS:
      return {
        ...state,
        allObjectivesLoading: false,
        allObjectives: action.payload,
        allObjectivesError: null
      };
    case ActionType.ADD_OBJECTIVES_LOADING:
      return {
        ...state,
        addObjectiveLoading: true,
        addObjectiveError: null
      };
    case ActionType.ADD_OBJECTIVES_ERROR:
      return {
        ...state,
          addObjectiveLoading:false,
        addObjectiveError: action.payload,
        objectiveAlreadyExist: action.payload
      };
    case ActionType.ADD_OBJECTIVES_SUCCESS:
      return {
        ...state,
        addObjectiveLoading: false,
        addObjectiveError: action.payload,
        objectiveFlag: !state.objectiveFlag,
        objectiveAlreadyExist: null
      };
    case ActionType.DELETE_OBJECTIVES_LOADING:
      return {
        ...state,
        deleteObjectiveLoading: true,
        deleteObjectiveError: null
      };
    case ActionType.DELETE_OBJECTIVES_ERROR:
      return {
        ...state,
        deleteObjectiveLoading: false,
        deleteObjectiveError: action.payload
      };
    case ActionType.DELETE_OBJECTIVES_SUCCESS:
      return {
        ...state,
        deleteObjectiveLoading: false,
        deleteObjectiveError: null,
        objectiveFlag: !state.objectiveFlag
      };

    case ActionType.UPDATE_OBJECTIVES_LOADING:
      return {
        ...state,
        updateObjectiveLoading: true,
        updateObjectiveError: null
      };
    case ActionType.UPDATE_OBJECTIVES_ERROR:
      return {
        ...state,
        updateObjectiveLoading: false,
        updateObjectiveError: action.payload,
        objectiveAlreadyExist: action.payload
      };
    case ActionType.UPDATE_OBJECTIVES_SUCCESS:
      return {
        ...state,
        updateObjectiveLoading: false,
        updateObjectiveError: null,
        objectiveFlag: !state.objectiveFlag,
        objectiveAlreadyExist: null
      };
    case ActionType.CLEAR_OBJECTIVES_ALREADY_EXIST:
      return {
        ...state,
        objectiveAlreadyExist: false
      }
    case ActionType.RESET_OBJECTIVES:
      return {
        ...state,
        allObjectives: null,
        allObjectivesError: null
      }  
    case ActionType.RESET_OBJECTIVE_REDUCER:
      return {
        ...initialState
      }   
    default:
      return state;
  }
};

export default objectivesReducer;
