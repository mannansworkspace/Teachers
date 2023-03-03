import { combineReducers } from "redux";
import authReducer from "./auth";
import activityReducer from "./activity";
import classroomReducer from "./classroom";
import managementReducer from "./management";
import districtCsvImporttReducer from "./district-csv-import";
import classCsvImporttReducer from "./class-csv-import";
import cmsAssessmentReducer from './cmsAssessment';
import resourcesReducer from "./resources";
import objectivesReducer from "./objectives";
import PrintReducer from "./print";
import cleverCsvImportReducer from "./clever-csv-import";
const reducers = combineReducers({
  auth: authReducer,
  activity: activityReducer,
  classroom: classroomReducer,
  management: managementReducer,
  districtCsvImport: districtCsvImporttReducer,
  classCsvImport:classCsvImporttReducer,
  cleverCsvImport: cleverCsvImportReducer,
  cmsAssessment: cmsAssessmentReducer,
  resources: resourcesReducer,
  objectives:objectivesReducer,
  print:PrintReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
