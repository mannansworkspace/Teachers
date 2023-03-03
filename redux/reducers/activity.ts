import { ActionType } from "../actionTypes/index";

const initialState = {
  district_id: 0,
  school_id: 0,
  grade_id: 0,
  teacher_id: 0,
  subject_id: 0,
  classroom_id:0,
  applyFilters: false,
  district_logo:"",
  welcome_message: "",
  welcome_title: "",
  districtsList: [],
  schoolsList: [],
  teachersList: [],
  gradsList: [],
  schoolProgressReport: null
};

const activityReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case ActionType.GET_TEACHER_GRADE_BY_SCHOOL_ID:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
        teachersList: action.payload.teachers,
        gradsList: action.payload.subject_grades
      };
    case ActionType.GET_TEACHER_GRADE_BY_SCHOOL_ID_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
        teachersList:[],
        gradsList: []
      };
    case ActionType.SET_SCHOOL_ID:
      return {
        ...state,
        type: action.type,
        school_id: parseInt(action.school_id),
      };
    case ActionType.SET_DISTRICT_ID:
      return {
        ...state,
        type: action.type,
        district_id: parseInt(action.district_id),
      };
    case ActionType.SET_TEACHER_ID:
      return {
        ...state,
        type: action.type,
        teacher_id: parseInt(action.teacher_id),
      };
    case ActionType.SET_GRADE_ID:
      return {
        ...state,
        type: action.type,
        grade_id: parseInt(action.grade_id),
      };
    case ActionType.SET_SUBJECT_ID:
      return {
        ...state,
        type: action.type,
        subject_id: parseInt(action.subject_id),
      };  
    case ActionType.SET_ACTIVITY_CLASSROOM_ID:
      return {
        ...state,
        type: action.type,
        classroom_id: parseInt(action.classroom_id),
      };    
    case ActionType.GET_WELCOME_ACTIVITY_STATS:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.GET_WELCOME_ACTIVITY_STATS_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.GET_ACTIVITY_PROGRESS:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.GET_ACTIVITY_PROGRESS_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.SET_FILTERS:
      return {
        ...state,
        type: action.type,
        applyFilters: action.applyFilters,
      };
    case ActionType.GET_ACTIVITY_STATS:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.GET_ACTIVITY_STATS_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.GET_SCHOOLS_BY_DISTRICT:
        return {
          ...state,
          type: action.type,
          payload: action.payload,
        };
    case ActionType.GET_SCHOOLS_BY_DISTRICT_FAIL:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ActionType.SET_DISTRICT_LOGO:
      return {
        ...state,
        type: action.type,
        district_logo: action.logo,
      };
    case ActionType.SET_WELCOME_MESSAGE:
      return {
        ...state,
        type: action.type,
        welcome_message: action.payload?.message,
        welcome_title: action.payload?.title
      };
    case ActionType.SET_WELCOME_MESSAGE_FAIL:
      return {
        ...state,
        type: action.type,
        welcome_message: '',
        welcome_title: '',
      };  

    case ActionType.GET_DISTRICTS:
      return {
        ...state,
        type: action.type,
        districtsList: action.payload.districts,
        schoolsList: action.payload.schools
    };

    case ActionType.GET_DISTRICTS_FAIL:
      return {
        ...state,
        type: action.type,
        districtsList: [],
        schoolsList: [],
    };

    case ActionType.GET_TEACHERS_AND_GRADS:
      return {
        ...state,
        type: action.type,
        teachersList: action.payload.data.data.teachers,
        gradsList: action.payload.data.data.gradeSubjectsArray
    };
    
    case ActionType.GET_TEACHERS_AND_GRADS_FAIL:
      return {
        ...state,
        type: action.type,
        teachersList: [],
        gradsList: []
    };
    case ActionType.SET_ACTIVITY_INDICATOR:
      return {
        ...state,
        type: action.type,
        active: action.active,
        completed: action.completed,
        link: action.link,
    };

    case ActionType.RESET_TEACHERS:
      return {
        ...state,
        teachersList: [],
    };

    case ActionType.RESET_GRADES:
      return {
        ...state,
        gradsList: [],
    };
    
    case ActionType.RESET_REDUCER_ACTIVITY:
      return {
        ...initialState
    };

    case ActionType.SET_SCHOOL_PROGRESS_REPORT:
      return {
        ...state,
        schoolProgressReport: action.payload.data.average_data,
    };

    case ActionType.RESET_SCHOOL_PROGRESS_REPORT:
      return {
        ...state,
        schoolProgressReport: null,
    };

    default:
      return state;
  }
};

export default activityReducer;
