import { ActionType } from "../actionTypes/index";

const initialState: any = {
  clientErrors: false,
  csvLoading: false,
  csvUploadError: null,
  csvUploadSuccess: false,
  csvName: "",
  csvResults: null,
  csvUrl: null,
  statusId: null,
  status: null,
  importDataLoading: false,
  importDataError: null,
  importDataSuccess: false,
};

const classCsvImporttReducer = (state = initialState, action: any): any => {
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
        statusId: action.payload.statusId,
      };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,
        statusId: null,
        status: null,
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
        csvResults: action.payload?.data?.data?.data,
        csvUrl: null,
        // status: action.payload?.status,
      };
    case ActionType.IMPORT_DATA_SUCCESS_STATUS:
      return {
        ...state,
        importDataLoading: false,
        importDataError: null,
        importDataSuccess: true,
        clientErrors: false,
        csvUploadSuccess: false,
        csvName: null,
        csvUrl: null,
        status: action.payload?.status,
      };
      case ActionType.IMPORT_DATA_PENDING:
      return {
        ...state,
        status: action.payload?.status,
      };
    case ActionType.IMPORT_DATA_ERROR_STATUS:
      return {
        ...state,
        status: action.payload?.status,
      };
    case ActionType.IMPORT_DATA_ERROR:
      return {
        ...state,
        importDataLoading: false,
        importDataError: action.payload,
      };
    case ActionType.IMPORT_DATA_VALIDATION_ERROR:
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

    case ActionType.UPDATE_CLASS_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((school: any) => {
          if (school.index === action.payload.indexes.schoolIndex) {
            let schoolCopy = { ...school };
            schoolCopy.classrooms[action.payload.indexes.classIndex] =
              action.payload.data;
            return schoolCopy;
          }
          return school;
        }),
      };
    case ActionType.DELETE_CLASS_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((school: any) => {
          if (school.index === action.payload.indexes.schoolIndex) {
            let schoolCopy = { ...school };
            let newClasses = schoolCopy.classrooms.filter(
              (item: any) => item.index !== action.payload.indexes.classIndex
            );
            newClasses = newClasses.map((clas: any, i: number) => {
              clas.index = i
              return clas;
            });
            schoolCopy.classrooms = newClasses;
            return schoolCopy;
          }
          return school;
        }),
      };
    case ActionType.DELETE_SCHOOL_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.filter(
          (school: any) => school.index !== action.payload
        ),
      };
    case ActionType.UPDATE_STUDENT_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((school: any) => {
          if (school.index === action.payload.indexes.schoolIndex) {
            let schoolCopy = { ...school };
            schoolCopy.classrooms[action.payload.indexes.classIndex].students[
              action.payload.indexes.stdIndex
            ] = action.payload.data;
            return schoolCopy;
          }
          return school;
        }),
      };
    case ActionType.DELETE_STUDENT_LOCAL:
      return {
        ...state,
        csvResults: state.csvResults.map((school: any) => {
          if (school.index === action.payload.indexes.schoolIndex) {
            let schoolCopy = { ...school };
            let newClasses = schoolCopy.classrooms.map((classroom: any) => {
              if (classroom.index === action.payload.indexes.classIndex) {
                let classCopy = { ...classroom };
                let newStds = classCopy.students.filter(
                  (student: any) =>
                    student.index !== action.payload.indexes.stdIndex
                );
                newStds.map((stud: any, i: number) => {
                  return stud.index === i;
                });
                classCopy.students = newStds;
                return classCopy;
              }
              return classroom;
            });
            schoolCopy.classrooms = newClasses;
            return schoolCopy;
          }
          return school;
        }),
      };
      case ActionType.RESET_CLASS_CSV_REDUCER:
          return {
            ...initialState
      }; 
    default:
      return state;
  }
};

export default classCsvImporttReducer;
