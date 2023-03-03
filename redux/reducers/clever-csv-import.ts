import { ActionType } from "../actionTypes/index";

const initialState: any = {
  clientErrors: false,
  csvLoading: false,
  csvUploadError: null,
  csvUploadSuccess: false,
  csvName: "",
  csvResults: null,
  csvUrl: null,
  importDataLoading: false,
  importDataError: null,
  importDataSuccess: false
};

const cleverCsvImportReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case ActionType.UPLOAD_CSV_LOADING:
      return {
        ...state,
        clientErrors: false,
        csvLoading: true,
        csvUploadError: null,
        csvUploadSuccess: false,
        csvName: "",
        csvResults: null
      };
    case ActionType.UPLOAD_CSV_ERROR:
      return {
        ...state,
        clientErrors: false,
        csvLoading: false,
        csvUploadError: action.payload,
        csvUploadSuccess: false,
        csvName: "",
        csvResults: null
      };
    case ActionType.UPLOAD_CSV_SUCCESS:
      return {
        ...state,
        clientErrors: action.payload.errors.length ? true : false,
        csvLoading: false,
        csvUploadError: null,
        csvUploadSuccess: true,
        csvName: action.payload.fileName,
        csvResults: action.payload.results,
        csvUrl: action.payload.url
      };
    case ActionType.IMPORT_DATA_LOADING:
      return {
        ...state,
        importDataLoading: true,
        importDataError: null,
        importDataSuccess: false
      };
    case ActionType.IMPORT_DATA_SUCCESS:
      return {
        ...state,
        importDataLoading: false,
        importDataError: null,
        importDataSuccess: true,
        clientErrors: false,
        csvUploadSuccess: false,
        csvName: null,
        csvResults: null,
        csvUrl: null
      };
    case ActionType.IMPORT_DATA_ERROR:
      return {
        ...state,
        importDataLoading: false,
        importDataError: action.payload
      };
    case ActionType.IMPORT_DATA_VALIDATION_ERROR:
      return {
        ...state,
        importDataLoading: false,
        importDataError: null,
        clientErrors: action.payload.errors.length ? true : false,
        csvResults: action.payload.results
      };

    case ActionType.CANCEL_CSV_UPLOAD:
      return {
        ...state,
        csvLoading: false,
        csvUploadError: null,
        csvUploadSuccess: false,
        csvName: "",
        csvResults: null
      };
    case ActionType.DELETE_CLEVER_LOCAL:
      let csvResultsDeleteCopy = [...state.csvResults];
      return {
        ...state,
        csvResults: csvResultsDeleteCopy.filter((student: any, i: any) => student.index !== action.payload.index)
      };
    case ActionType.UPDATE_CLEVER_LOCAL:
      let csvResultsUpdateCopy = [...state.csvResults];
      return {
        ...state,
        csvResults: csvResultsUpdateCopy.map((student: any) => {
      
          if (student.index === action.payload.index) {
            student = action.payload.data;
          }
          return student;
        })
      }
      case ActionType.RESET_CLEVER_CSV_REDUCER:
        return {
          ...initialState
      }; 
      case ActionType.CLOSE_MODAL:
        return {
          ...state,
  
          importDataSuccess: false,
        };
    default:
      return state;
  }
};

export default cleverCsvImportReducer;
