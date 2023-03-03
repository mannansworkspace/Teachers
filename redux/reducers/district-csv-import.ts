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
  importDataSuccess: false,
  district_info: null,
};

const districtCsvImporttReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case ActionType.UPLOAD_CSV_LOADING:
      return {
        ...state,
        clientErrors: false,
        csvLoading: true,
        csvUploadError: null,
        csvUploadSuccess: false,
        csvName: "",
        csvResults: null,
      };
    case ActionType.UPLOAD_CSV_ERROR:
      return {
        ...state,
        clientErrors: false,
        csvLoading: false,
        csvUploadError: action.payload,
        csvUploadSuccess: false,
        csvName: "",
        csvResults: null,
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
        csvUrl: action.payload.url,
      };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,

        importDataSuccess: false,
      };
    case ActionType.IMPORT_DATA_LOADING:
      return {
        ...state,
        importDataLoading: true,
        importDataError: null,
        importDataSuccess: false,
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
        csvUrl: null,
        district_info: action.payload?.data?.district_info,
      };
    case ActionType.IMPORT_DATA_ERROR:
      return {
        ...state,
        importDataLoading: false,
        importDataError: action.payload,
      };
    case ActionType.IMPORT_DATA_VALIDATION_ERROR:
      console.log(action.payload, "REDUCER...................");
      return {
        ...state,
        importDataLoading: false,
        importDataError: null,
        clientErrors: action.payload.errors.length ? true : false,
        csvResults: action.payload.results,
      };
    case ActionType.CANCEL_CSV_UPLOAD:
      return {
        ...state,
        csvLoading: false,
        csvUploadError: null,
        csvUploadSuccess: false,
        csvName: "",
        csvResults: null,
      };
    case ActionType.UPDATE_SCHOOL_ADMIN_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((result: any, i: any) => {
          if (i === action.payload.indexes.schoolIndex) {
            let resultCopy = { ...result };
            resultCopy.admins[action.payload.indexes.schoolAdminIndex] =
              action.payload.data;
            resultCopy.admins.sort((a: any, b: any) =>
              a.admin_last_name.localeCompare(b.admin_last_name)
            );
            let newArray = resultCopy.admins.filter(
              (admin: any) => admin.is_super_principal.toUpperCase() !== "Y"
            );
            const filteredY = resultCopy.admins.filter(
              (admin: any) => admin.is_super_principal.toUpperCase() === "Y"
            );
            resultCopy.admin = [...filteredY, ...newArray];

            return resultCopy;
          }
          return result;
        }),
      };
    case ActionType.DELETE_DISTRICT_ADMIN_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((result: any, i: any) => {
          if (i === 0) {
            let resulCopy = { ...result };
            resulCopy.admins = resulCopy.admins.filter((item:any, index:number) => index !== action.payload);
            return resulCopy;
          }
          return result;
        }),
    };  
    case ActionType.DELETE_SCHOOL_ADMIN_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((result: any, i: any) => {
          if (i === action.payload.schoolIndex) {
            let resultCopy = { ...result };
            let newAdmins = resultCopy.admins.filter(
              (admin: any, j: number) => j !== action.payload.schoolAdminIndex
            );
            resultCopy.admins = newAdmins;
            return resultCopy;
          }
          return result;
        }),
      };
    case ActionType.UPDATE_SCHOOL_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((result: any, i: any) => {
          if (i === action.payload.index) {
            let resulCopy = action.payload.data;
            return resulCopy;
          }
          return result;
        }),
      };

    case ActionType.UPDATE_DISTRICT_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((result: any, i: any) => {
          if (i === 0) {
            let resulCopy = action.payload;
            return resulCopy;
          }
          result.district_name = action.payload.district_name
          return result;
        }),
      };
    case ActionType.UPDATE_DISTRICT_ADMIN_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((result: any, i: any) => {
          if (i === 0) {
            let resulCopy = { ...result };
            resulCopy.admins[action.payload.index] = action.payload.data;
            if(action.payload.data.is_super_principal === 'Y'){
              resulCopy.admins = resulCopy.admins.map((item:any,index:number) => {
                if(action.payload.index === index){
                  return item
                }
                item.is_super_principal = 'N'
                return item
              })
            }
            resulCopy.admins.sort((a: any, b: any) =>
              a.admin_last_name.localeCompare(b.admin_last_name)
            );
            let newArray = resulCopy.admins.filter(
              (admin: any) => admin.is_super_principal.toUpperCase() !== "Y"
            );
            const filteredY = resulCopy.admins.filter(
              (admin: any) => admin.is_super_principal.toUpperCase() === "Y"
            );
            resulCopy.admin = [...filteredY, ...newArray];
            return resulCopy;
          }
          return result;
        }),
      };

    case ActionType.DELETE_SCHOOL_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.filter(
          (result: any, i: any) => i !== action.payload
        ),
        csvUploadSuccess:
          state.csvResults.filter((result: any, i: any) => i !== action.payload)
            .length > 1
            ? true
            : false,
      };
      case ActionType.RESET_DISTRICT_CSV_REDUCER:
        return {
          ...initialState
      };   
    default:
      return state;
  }
};

export default districtCsvImporttReducer;
