import { ActionType } from "redux/actionTypes/index";

const initState = {
  classroomSchoolId: 0,
  classroomId: 0,
  districtId: 0,
  filters: {},
  grade: 0,
  subject: 0,
  classrooms: [],
  formativeName: "",
  summativeName: "",
  updateAnswerLoading: false,
  updateStudentsAvailibility: false,
  summativeReport: {},
  gradeFrequencySummativeReport: null,
  irrSummative: null,
  irrFormative: null,
  oagReport: null,
  masterReport: null,
  standardRiskReport: null,
  summativeStudentsReport: null,
  showModalSafari: false,
  showApiErrorModal: false,
  welcome_message: "",
  welcome_title: "",
};

export default function classroomReducer(state = initState, action: any) {
  switch (action.type) {
    case ActionType.GET_ALL_SCHOOLS:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.FORMATIVE_NAME:
      return {
        ...state,
        formativeName: action.payload,
      };
    case ActionType.SUMMATIVE_NAME:
      return {
        ...state,
        summativeName: action.payload,
      };
    case ActionType.GET_ALL_SCHOOLS_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.GET_CLASSROOMS_BY_SCHOOL_ID:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.GET_CLASSROOMS_BY_SCHOOL_ID_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.GET_CLASSROOMS_LIST:
      return {
        ...state,
        type: action.type,
        classrooms: action.payload.data.data.classrooms,
      };
    case ActionType.GET_CLASSROOMS_LIST_FAIL:
      return {
        ...state,
        type: action.type,
        classrooms: [],
      };
    case ActionType.GET_ALL_FORMATIVES:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };

    case ActionType.GET_ALL_FORMATIVES_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };

    case ActionType.GET_ALL_SUMMATIVES:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };

    case ActionType.GET_ALL_SUMMATIVES_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };

    case ActionType.SET_GRADE:
      return {
        ...state,
        grade: action.grade,
      };
    case ActionType.SET_SUBJECT:
      return {
        ...state,
        subject: action.subject,
      };

    case ActionType.SET_CLASSROOM_SCHOOL_ID:
      return {
        ...state,
        classroomSchoolId: action.classroomSchoolId,
      };
    case ActionType.SET_CLASSROOM_ID:
      return {
        ...state,
        classroomId: action.classroomId,
      };
    case ActionType.SET_LAST_DISTRICT_ID:
      return {
        ...state,
        districtId: action.districtId,
      };

    case ActionType.SET_SELECTED_FILTERS:
      return {
        ...state,
        type: action.type,
        filters: action.payload,
        classroomSchoolId: action.classroomSchoolId,
        classroomId: action.classroomId,
        subject: action.subject,
        grade: action.grade,
      };
    case ActionType.RESET_SELECTED_FILTERS:
      return {
        ...state,
        type: action.type,
        filters: action.payload,
      };
    case ActionType.RESET_CLASSROOMS_ARRAYS:
      return {
        ...state,
        classrooms: [],
      };
    case ActionType.UPDATE_ANSWERS_LOADING:
      return {
        ...state,
        updateAnswerLoading: true
      };
    case ActionType.UPDATE_ANSWERS_SUCCESS:
      return {
        ...state,
        updateAnswerLoading: false
      };
    case ActionType.UPDATE_ANSWERS_ERROR:
      return {
        ...state,
        updateAnswerLoading: false
      };
    case ActionType.ADD_ANSWERS_LOADING:
      return {
        ...state,
        updateAnswerLoading: true
      };
    case ActionType.ADD_ANSWERS_SUCCESS:
      return {
        ...state,
        updateAnswerLoading: false
      };
    case ActionType.ADD_ANSWERS_ERROR:
      return {
        ...state,
        updateAnswerLoading: false
      };
    case ActionType.DELETE_ANSWERS_SCORE_LOADING:
      return {
        ...state,
        updateAnswerLoading: true
      };
    case ActionType.DELETE_ANSWERS_SCORE_SUCCESS:
      return {
        ...state,
        updateAnswerLoading: false
      };
    case ActionType.DELETE_ANSWERS_SCORE_ERROR:
      return {
        ...state,
        updateAnswerLoading: false
      };
    case ActionType.UPDATE_ADMIN_DETAILS_ERROR:
      return {
        ...state,
        updateAnswerLoading: false,
      };
    case ActionType.UPDATE_ADMIN_DETAILS_SUCCESS:
      return {
        ...state,
        updateAnswerLoading: false,
      };
    case ActionType.UPDATE_AVAILIBILTY_LOADING:
      return {
        ...state,
        updateStudentsAvailibility: true,
      };
    case ActionType.UPDATE_AVAILIBILTY_ERROR:
      return {
        ...state,
        updateStudentsAvailibility: false,
      };
    case ActionType.UPDATE_AVAILIBILTY_SUCCESS:
      return {
        ...state,
        updateStudentsAvailibility: false,
      };
    case ActionType.SET_SUMMATIVE_REPORT:
      return {
        ...state,
        summativeReport: action.payload,
      };
    case ActionType.SET_GRADE_FREGUENCY_SUMMATIVE_REPORT:
      return {
        ...state,
        gradeFrequencySummativeReport: action.payload,
      };
    case ActionType.RESET_GRADE_FREGUENCY_SUMMATIVE_REPORT:
      return {
        ...state,
        gradeFrequencySummativeReport: null,
      };
    case ActionType.SET_IRR_SUMMATIVE:
      return {
        ...state,
        irrSummative: action.payload
      }
    case ActionType.RESET_REDUCER_CLASSROOMS:
      return {
        ...initState
      };
    case ActionType.SET_OBJECTIVE_ACCOUNTABILITY_GRAPH_REPORT:
      // let t;
      const modifiedData = {
        ...action.payload,
        data: {
          ...action.payload?.data,
          students: action.payload?.data?.students.map((student: any) => {
            const ob: any = {};
            student.objectives.map((obj: any) => {
              return ob[obj.objective_number] = obj;
            })

            return {
              ...student,
              objectives: ob
            }

          })
        }
      }
      // console.log('t',t)
      return {
        ...state,
        oagReport: {
          ...modifiedData,
          data: {
            ...modifiedData.data,
            students: [...modifiedData.data.students]
          }
        },
      };
    case ActionType.SET_IRR_FORMATIVE:
      return {
        ...state,
        irrFormative: action.payload,
      };
    case ActionType.SET_MASTER_REPORT:
      return {
        ...state,
        masterReport: action.payload
      }
    case ActionType.RESET_MASTER_REPORT:
      return {
        ...state,
        masterReport: null
      }
    case ActionType.SET_STANDARD_RISK_REPORT:
      return {
        ...state,
        standardRiskReport: action.payload
      }
    case ActionType.RESET_STANDARD_RISK_REPORT:
      return {
        ...state,
        standardRiskReport: null
      }
    case ActionType.SET_STUDENT_SUMMATIVE_REPORT:
      return {
        ...state,
        summativeStudentsReport: action.payload
      }
    case ActionType.SET_SHOW_MODAL_SAFARI:
      return {
        ...state,
        showModalSafari: action.payload
      }
    case ActionType.SET_SHOW_API_ERROR_MODAl:
      return {
        ...state,
        showApiErrorModal: action.payload
      }
    case ActionType.SET_WELCOME_MESSAGE_CLASSROOM:
      return {
        ...state,
        type: action.type,
        welcome_message: action.payload?.message,
        welcome_title: action.payload?.title
      };
    case ActionType.SET_WELCOME_MESSAGE_CLASSROOM_FAIL:
      return {
        ...state,
        type: action.type,
        welcome_message: '',
        welcome_title: '',
      };    
    default:
      return state;
  }
}
