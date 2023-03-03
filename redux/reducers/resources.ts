import { ActionType } from "../actionTypes/index";

const initialState = {
  allResourcesLoading: false,
  allResources: null,
  allResourcesError: null,
  resourceFlag: false,
  addResourceLoading: false,
  addResourceError: null,
  deleteResourceLoading: false,
  deleteResourceError: null,
  updateResourceLoading: false,
  updateResourceError: null
};

const resourcesReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case ActionType.GET_RESOURCES_LOADING:
      return {
        ...state,
        allResourcesLoading: true,
        allResources: null,
        allResourcesError: null
      };
    case ActionType.GET_RESOURCES_ERROR:
      return {
        ...state,
        allResourcesLoading: false,
        allResources: null,
        allResourcesError: action.payload
      };
    case ActionType.GET_RESOURCES_SUCCESS:
      return {
        ...state,
        allResourcesLoading: false,
        allResources: action.payload,
        allResourcesError: null
      };
    case ActionType.RESET_RESOURCES:
      return {
        ...state,
        allResources: null,
      };
    case ActionType.ADD_RESOURCES_LOADING:
      return {
        ...state,
        addResourceLoading: true,
        addResourceError: null
      };
    case ActionType.ADD_RESOURCES_ERROR:
      return {
        ...state,
        addResourceLoading: false,
        addResourceError: action.payload
      };
    case ActionType.ADD_RESOURCES_SUCCESS:
      return {
        ...state,
        addResourceLoading: false,
        addResourceError: null,
        resourceFlag: !state.resourceFlag
      };
    case ActionType.DELETE_RESOURCES_LOADING:
      return {
        ...state,
        deleteResourceLoading: true,
        deleteResourceError: null
      };
    case ActionType.DELETE_RESOURCES_ERROR:
      return {
        ...state,
        deleteResourceLoading: false,
        deleteResourceError: action.payload
      };
    case ActionType.DELETE_RESOURCES_SUCCESS:
      return {
        ...state,
        deleteResourceLoading: false,
        deleteResourceError: null,
        resourceFlag: !state.resourceFlag
      };

    case ActionType.UPDATE_RESOURCES_LOADING:
      return {
        ...state,
        updateResourceLoading: true,
        updateResourceError: null
      };
    case ActionType.UPDATE_RESOURCES_ERROR:
      return {
        ...state,
        updateResourceLoading: false,
        updateResourceError: action.payload
      };
    case ActionType.UPDATE_RESOURCES_SUCCESS:
      return {
        ...state,
        updateResourceLoading: false,
        updateResourceError: null,
        resourceFlag: !state.resourceFlag
      };
    case ActionType.SORT_RESOURCES_SUCCESS:
      return {
        ...state,
        allResources: action.payload
      };
    case ActionType.RESET_RESOURCES_REDUCER:
        return {
          ...initialState
    };   
    default:
      return state;
  }
};

export default resourcesReducer;
