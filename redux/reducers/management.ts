import { ActionType } from "../actionTypes/index";

const initialState = {
  currentsuperAdminsCount: 0,
  superAdminsCount: 0,
  superAdminsLoading: false,
  superAdmins: null,
  superAdminsError: null,
  superAdminsDeleteLoading: false,
  superAdminsUpdateLoading: false,
  superAdminsAddLoading: false,
  superAdminsFlag: false,
  lastAddedSuperAdminId: 0,
  superAdminPageNumber: 0,

  currentdistrictAdminsCount: 0,
  districtAdminsCount: 0,
  districtAdminsLoading: false,
  districtAdmins: null,
  districtAdminsError: null,
  districtAdminsDeleteLoading: false,
  districtAdminsUpdateLoading: false,
  districtAdminsAddLoading: false,
  districtAdminsFlag: false,
  lastAddedDistrictAdminId: 0,
  districtAdminPageNumber: 0,

  currentdistrictsCount: 0,
  districtsCount: 0,
  districtsLoading: false,
  districts: null,
  districtsError: null,
  districtDeleteLoading: false,
  districtUpdateLoading: false,
  districtAddLoading: false,
  districtFlag: false,
  lastAddedDistrictId: 0,
  districtPageNumber: 0,

  currentschoolsCount: 0,
  schoolsCount: 0,
  schoolsLoading: false,
  schools: null,
  schoolsError: null,
  schoolDeleteLoading: false,
  schoolAddLoading: false,
  schoolUpdateLoading: false,
  schoolFlag: false,
  currentSchoolLoading: false,
  currentSchoolError: null,
  currentSchool: null,
  lastAddedSchoolId: 0,
  schoolPageNumber: 0,

  currentclassesCount: 0,
  classesCount: 0,
  classesLoading: false,
  classes: null,
  classesError: null,
  classAddLoading: false,
  classDeleteLoading: false,
  classUpdateLoading: false,
  classFlag: false,
  lastAddedClassId: 0,
  classPageNumber: 0,

  currentclassAdminsCount: 0,
  classAdminsCount: 0,
  classAdminsLoading: false,
  classAdmins: null,
  classAdminsError: null,
  classAdminsDeleteLoading: false,
  classAdminsAddLoading: false,
  classAdminsUpdateLoading: false,
  classAdminsFlag: false,
  lastAddedClassAdminId: 0,
  classAdminPageNumber: 0,

  currentstudentsCount: 0,
  studentsCount: 0,
  studentsLoading: false,
  students: null,
  studentsError: null,
  studentDeleteLoading: false,
  studentUpdateLoading: false,
  studentUpdateError: null,
  studentAddLoading: false,
  studentAddError: null,
  studentFlag: false,
  lastAddedStudentId: 0,
  studentPageNumber: 0,

  currentschoolAdminsCount: 0,
  schoolAdminsCount: 0,
  schoolAdminsLoading: false,
  schoolAdmins: null,
  schoolAdminsError: null,
  schoolAdminDeleteLoading: false,
  schoolAdminAddLoading: false,
  schoolAdminUpdateLoading: false,
  schoolAdminFlag: false,
  lastAddedSchoolAdminId: 0,
  schoolAdminPageNumber: 0,

  studentDetailsLoading: false,
  studentDetails: null,
  studentDetailsError: null,
  allStudentsDetails: [],

  district_logo: null,
  breadcrumbsLoaidng: false,
  breadcrumbs: null,
  breadcrumbsError: null,
  adminGrades: [],
  adminSubjects: [],

  resetPwLoading: false,

  stlLoading: false,
  stlLoaded: false,
  stlUrl: null,
  StlId: null,
  stlSingleLoading: false,
  stlSingleLoaded: false,
  stlSingleUrl: null,
  StlSingleId: null,

  stlSchoolLoading: false,
  stlClassLoading: false,

  superAdminsAddError: null,

  adminUpdateLoading: false,
  adminsError: null,

  districtDetails: null,
  summativeAnalysisReport: null,
  auditReport: null,
  schoolAuditReport: null,

  studentSummativeReport: null,

  isReportLoading: true,

  classroom_m_id: 0,
  school_m_id: 0,
  district_m_id: 0,

  mergeStudentData: null,
  mergeStudentError: null,

  addStudentConflict: null,
};

const managementReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case ActionType.SET_STL_LOADING:
      return {
        ...state,
        stlLoading: action.payload
      };
    case ActionType.SET_STL_LOADED:
      return {
        ...state,
        stlLoaded: action.payload
      };
    case ActionType.SET_STL_URL:
      return {
        ...state,
        stlUrl: action.payload
      };
    case ActionType.SET_STL_ID:
      return {
        ...state,
        StlId: action.payload
      };

    case ActionType.SET_SINGLE_STL_LOADING:
      return {
        ...state,
        stlSingleLoading: action.payload
      };
    case ActionType.SET_SINGLE_STL_LOADED:
      return {
        ...state,
        stlSingleLoaded: action.payload
      };
    case ActionType.SET_SINGLE_STL_URL:
      return {
        ...state,
        stlSingleUrl: action.payload
      };
    case ActionType.SET_SINGLE_STL_ID:
      return {
        ...state,
        StlSingleId: action.payload
      };

    case ActionType.SET_STL_SCHOOL_LOADING:
      return {
        ...state,
        stlSchoolLoading: action.payload
      };

    case ActionType.SET_STL_CLASS_LOADING:
      return {
        ...state,
        stlClassLoading: action.payload
      };

    case ActionType.GET_SUPER_ADMIN_LOADING:
      return {
        ...state,
        superAdminsLoading: true,
        superAdminsError: null,
        district_logo: null
      };
    case ActionType.GET_SUPER_ADMIN_ERROR:
      return {
        ...state,
        superAdminsLoading: false,
        superAdminsError: action.payload
      };
    case ActionType.GET_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        superAdminsLoading: false,
        superAdminsError: null,
        superAdmins: action.payload?.super_admins,
        superAdminsCount: action.payload?.count,
        lastAddedSuperAdminId: 0,
        superAdminPageNumber: action.payload?.page || 0,
      };

    case ActionType.DELETE_SUPER_ADMIN_LOADING:
      return {
        ...state,
        superAdminsDeleteLoading: true
      };
    case ActionType.DELETE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        superAdminsDeleteLoading: false
      };
    case ActionType.DELETE_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        superAdminsDeleteLoading: false,
        // superAdminsFlag: !state.superAdminsFlag
      };

    case ActionType.UPDATE_SUPER_ADMIN_LOADING:
      return {
        ...state,
        superAdminsUpdateLoading: true
      };
    case ActionType.UPDATE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        superAdminsError: action.payload,
        superAdminsUpdateLoading: false
      };
    case ActionType.UPDATE_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        superAdminsUpdateLoading: false,
        superAdminsFlag: !state.superAdminsFlag
      };

    case ActionType.ADD_SUPER_ADMIN_LOADING:
      return {
        ...state,
        superAdminsAddLoading: true,
        superAdminsAddError: null,
      };
    case ActionType.ADD_SUPER_ADMIN_ERROR:
      return {
        ...state,
        superAdminsAddLoading: false,
        superAdminsAddError: action.payload
      };
    case ActionType.ADD_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        superAdminsAddLoading: false,
        superAdminsAddError: null,
        lastAddedSuperAdminId: action.payload.data.id,
        superAdminPageNumber: 0
      };
    case ActionType.GET_DISTRICT_ADMIN_LOADING:
      return {
        ...state,
        districtAdminsLoading: true,
        districtAdminsError: null
      };
    case ActionType.GET_DISTRICT_ADMIN_ERROR:
      return {
        ...state,
        districtAdminsLoading: false,
        districtAdminsError: action.payload
      };
    case ActionType.GET_DISTRICT_ADMIN_SUCCESS:
      return {
        ...state,
        districtAdminsLoading: false,
        districtAdminsError: null,
        districtAdmins: action.payload?.district_admins,
        districtAdminsCount: action.payload?.count,
        currentdistrictAdminsCount: action.payload?.district_admins.length,
        districtAdminPageNumber: action.payload?.page || 0,
        lastAddedDistrictAdminId: 0
      };

    case ActionType.DELETE_DISTRICT_ADMIN_LOADING:
      return {
        ...state,
        districtAdminsDeleteLoading: true
      };
    case ActionType.DELETE_DISTRICT_ADMIN_ERROR:
      return {
        ...state,
        districtAdminsDeleteLoading: false
      };
    case ActionType.DELETE_DISTRICT_ADMIN_SUCCESS:
      return {
        ...state,
        districtAdminsDeleteLoading: false,
        // districtAdminsFlag: !state.districtAdminsFlag
      };

    case ActionType.UPDATE_DISTRICT_ADMIN_LOADING:
      return {
        ...state,
        districtAdminsUpdateLoading: true
      };
    case ActionType.UPDATE_DISTRICT_ADMIN_ERROR:
      return {
        ...state,
        districtAdminsError: action.payload,
        districtAdminsUpdateLoading: false
      };
    case ActionType.UPDATE_DISTRICT_ADMIN_SUCCESS:
      return {
        ...state,
        districtAdminsUpdateLoading: false,
        districtAdminsFlag: !state.districtAdminsFlag
      };
    case ActionType.UPDATE_ADMIN_IS_SUPERINTENDENT_SUCCESS:
      return {
        ...state,
        districtAdminsUpdateLoading: false,
        districtAdminsFlag: !state.districtAdminsFlag
      };
    case ActionType.UPDATE_ADMIN_IS_SUPERINTENDENT_ERROR:
      return {
        ...state,
        districtAdminsError: action.payload
      };
    case ActionType.ADD_DISTRICT_ADMIN_LOADING:
      return {
        ...state,
        districtAdminsAddLoading: true
      };
    case ActionType.ADD_DISTRICT_ADMIN_ERROR:
      return {
        ...state,
        districtAdminsAddLoading: false,
        districtAdminsError: action.payload
      };
    case ActionType.ADD_DISTRICT_ADMIN_SUCCESS:
      return {
        ...state,
        districtAdminsAddLoading: false,
        lastAddedDistrictAdminId: action.payload.data.id,
        districtAdminPageNumber: 0
      };

    case ActionType.ADD_DISTRICT_LOADING:
      return {
        ...state,
        districtAddLoading: true
      };
    case ActionType.ADD_DISTRICT_ERROR:
      return {
        ...state,
        districtAddLoading: false,
        districtsError: action.payload
      };
    case ActionType.ADD_DISTRICT_SUCCESS:
      return {
        ...state,
        districtAddLoading: false,
        lastAddedDistrictId: action.payload.data?.id,
        districtPageNumber: 0,
      };

    case ActionType.GET_DISTRICT_LOADING:
      return {
        ...state,
        districtsLoading: true,
        districtsError: null
      };
    case ActionType.GET_DISTRICT_ERROR:
      return {
        ...state,
        districtsLoading: false,
        districtsError: action.payload
      };
    case ActionType.GET_DISTRICT_SUCCESS:
      return {
        ...state,
        districtsLoading: false,
        districtsError: null,
        districts: action.payload?.districts,
        districtsCount: action.payload?.count,
        currentdistrictsCount: action.payload?.districts.length,
        lastAddedDistrictId: 0,
        districtPageNumber: action.payload?.page || 0
      };
    case ActionType.DELETE_DISTRICT_LOADING:
      return {
        ...state,
        districtDeleteLoading: true
      };
    case ActionType.DELETE_DISTRICT_ERROR:
      return {
        ...state,
        districtDeleteLoading: false
      };
    case ActionType.DELETE_DISTRICT_SUCCESS:
      return {
        ...state,
        districtDeleteLoading: false,
        // districtFlag: !state.districtFlag
      };
    case ActionType.UPDATE_DISTRICT_LOADING:
      return {
        ...state,
        districtUpdateLoading: true
      };
    case ActionType.UPDATE_DISTRICT_ERROR:
      return {
        ...state,
        districtUpdateLoading: false,
        districtsError: action.payload
      };
    case ActionType.UPDATE_DISTRICT_SUCCESS:
      return {
        ...state,
        districtUpdateLoading: false,
        districtFlag: !state.districtFlag
      };

    case ActionType.GET_SCHOOLS_LOADING:
      return {
        ...state,
        schoolsLoading: true,
        schoolsError: null
      };
    case ActionType.GET_SCHOOLS_ERROR:
      return {
        ...state,
        schoolsLoading: false,
        schoolsError: action.payload
      };
    case ActionType.GET_SCHOOLS_SUCCESS:
      return {
        ...state,
        schoolsLoading: false,
        schoolsError: null,
        schools: action.payload?.schools,
        schoolsCount: action.payload?.count,
        currentschoolsCount: action.payload?.schools.length,
        lastAddedSchoolId: 0,
        schoolPageNumber: action.payload?.page,
      };

    case ActionType.GET_SINGLE_SCHOOL_LOADING:
      return {
        ...state,
        currentSchoolLoading: true,
        currentSchoolError: null,
        currentSchool: null
      };
    case ActionType.GET_SINGLE_SCHOOL_ERROR:
      return {
        ...state,
        currentSchoolLoading: false,
        currentSchoolError: action.payload,
        currentSchool: null
      };
    case ActionType.GET_SINGLE_SCHOOL_SUCCESS:
      return {
        ...state,
        currentSchoolLoading: false,
        currentSchoolError: null,
        currentSchool: action.payload?.school_details
      };

    case ActionType.UPDATE_SCHOOLS_LOADING:
      return {
        ...state,
        schoolUpdateLoading: true
      };
    case ActionType.UPDATE_SCHOOLS_ERROR:
      return {
        ...state,
        schoolUpdateLoading: false,
        schoolsError: action.payload
      };
    case ActionType.UPDATE_SCHOOLS_SUCCESS:
      return {
        ...state,
        schoolUpdateLoading: false,
        schoolFlag: !state.schoolFlag
      };
    case ActionType.UPDATE_SCHOOL_RESOURCE_PERMISSION:
      return {
        ...state,
        schoolUpdateLoading: false,
        schoolFlag: !state.schoolFlag
      };
    case ActionType.UPDATE_SCHOOL_RESOURCE_ERROR:
      return {
        ...state,
        schoolUpdateLoading: false
      };
    case ActionType.DELETE_SCHOOLS_LOADING:
      return {
        ...state,
        schoolDeleteLoading: true
      };
    case ActionType.DELETE_SCHOOLS_ERROR:
      return {
        ...state,
        schoolDeleteLoading: false
      };
    case ActionType.DELETE_SCHOOLS_SUCCESS:
      return {
        ...state,
        schoolDeleteLoading: false,
        // schoolFlag: !state.schoolFlag
      };

    case ActionType.ADD_SCHOOL_LOADING:
      return {
        ...state,
        schoolAddLoading: true
      };
    case ActionType.ADD_SCHOOL_ERROR:
      return {
        ...state,
        schoolAddLoading: false,
        schoolsError: action.payload
      };
    case ActionType.ADD_SCHOOL_SUCCESS:
      return {
        ...state,
        schoolAddLoading: false,
        lastAddedSchoolId: action.payload?.data?.id,
        schoolPageNumber: 0
      };

    case ActionType.GET_CLASSES_LOADING:
      return {
        ...state,
        classesLoading: true,
        classesError: null
      };
    case ActionType.GET_CLASSES_ERROR:
      return {
        ...state,
        classesLoading: false,
        classesError: action.payload
      };
    case ActionType.GET_CLASSES_SUCCESS:
      return {
        ...state,
        classesLoading: false,
        classesError: null,
        classes: action.payload?.classrooms,
        classesCount: action.payload?.count,
        currentclassesCount: action.payload?.classrooms.length,
        lastAddedClassId: 0,
        classPageNumber: action.payload?.page
      };

    case ActionType.GET_CLASSADMINS_LOADING:
      return {
        ...state,
        classAdminsLoading: true,
        classAdminsError: null
      };
    case ActionType.GET_CLASSADMINS_ERROR:
      return {
        ...state,
        classAdminsLoading: false,
        classAdminsError: action.payload
      };
    case ActionType.GET_CLASSADMINS_SUCCESS:
      return {
        ...state,
        classAdminsLoading: false,
        classAdminsError: null,
        classAdmins: action.payload?.classroom_admins,
        classAdminsCount: action.payload?.count,
        currentclassAdminsCount: action.payload?.classroom_admins.length,
        lastAddedClassAdminId: 0,
        classAdminPageNumber: action.payload?.page,
      };
    case ActionType.DELETE_CLASSADMINS_LOADING:
      return {
        ...state,
        classAdminsDeleteLoading: true
      };
    case ActionType.DELETE_CLASSADMINS_ERROR:
      return {
        ...state,
        classAdminsDeleteLoading: false
      };
    case ActionType.DELETE_CLASSADMINS_SUCEESS:
      return {
        ...state,
        classAdminsDeleteLoading: false,
        // classAdminsFlag: !state.classAdminsFlag
      };

    case ActionType.UPDATE_CLASSADMINS_LOADING:
      return {
        ...state,
        classAdminsUpdateLoading: true
      };
    case ActionType.UPDATE_CLASSADMINS_ERROR:
      return {
        ...state,
        classAdminsError: action.payload,
        classAdminsUpdateLoading: false
      };
    case ActionType.UPDATE_CLASSADMINS_SUCCESS:
      return {
        ...state,
        classAdminsUpdateLoading: false,
        classAdminsFlag: !state.classAdminsFlag
      };

    case ActionType.ADD_CLASSADMINS_LOADING:
      return {
        ...state,
        classAdminsAddLoading: true
      };
    case ActionType.ADD_CLASSADMINS_ERROR:
      return {
        ...state,
        classAdminsError: action.payload,
        classAdminsAddLoading: false
      };
    case ActionType.ADD_CLASSADMINS_SUCCESS:
      return {
        ...state,
        classAdminsAddLoading: false,
        lastAddedClassAdminId: action.payload?.data?.id,
        classAdminPageNumber: 0,
      };

    case ActionType.UPDATE_CLASSES_LOADING:
      return {
        ...state,
        classUpdateLoading: true
      };
    case ActionType.UPDATE_CLASSES_ERROR:
      return {
        ...state,
        classUpdateLoading: false
      };
    case ActionType.UPDATE_CLASSES_SUCCESS:
      return {
        ...state,
        classUpdateLoading: false,
        classFlag: !state.classFlag
      };

    case ActionType.ADD_CLASS_LOADING:
      return {
        ...state,
        classAddLoading: true
      };
    case ActionType.ADD_CLASS_ERROR:
      return {
        ...state,
        classAddLoading: false
      };
    case ActionType.ADD_CLASS_SUCCESS:
      return {
        ...state,
        classAddLoading: false,
        lastAddedClassId: action.payload?.data?.id,
        classPageNumber: 0
      };

    case ActionType.DELETE_CLASSES_LOADING:
      return {
        ...state,
        classDeleteLoading: true
      };
    case ActionType.DELETE_CLASSES_ERROR:
      return {
        ...state,
        classDeleteLoading: false
      };
    case ActionType.DELETE_CLASSES_SUCCESS:
      return {
        ...state,
        classDeleteLoading: false,
        // classFlag: !state.classFlag
      };

    case ActionType.GET_STUDENTS_LOADING:
      return {
        ...state,
        studentsLoading: true,
        studentsError: null
      };
    case ActionType.GET_STUDENTS_ERROR:
      return {
        ...state,
        studentsLoading: false,
        studentsError: action.payload
      };
    case ActionType.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        studentsLoading: false,
        studentsError: null,
        students: action.payload?.students,
        studentsCount: action.payload?.count,
        studentPageNumber: action.payload?.page || 0,
        currentstudentsCount: action.payload?.students.length,
        lastAddedStudentId: 0
      };

    case ActionType.DELETE_STUDENTS_LOADING:
      return {
        ...state,
        studentDeleteLoading: true
      };
    case ActionType.DELETE_STUDENTS_ERROR:
      return {
        ...state,
        studentDeleteLoading: false
      };
    case ActionType.DELETE_STUDENTS_SUCCESS:
      return {
        ...state,
        studentDeleteLoading: false,
        // studentFlag: !state.studentFlag
      };

    case ActionType.ADD_STUDENT_LOADING:
      return {
        ...state,
        studentAddLoading: true
      };
    case ActionType.ADD_STUDENT_ERROR:
      return {
        ...state,
        studentAddError: action.payload,
        studentAddLoading: false
      };
    case ActionType.ADD_STUDENT_SUCCESS:
      return {
        ...state,
        studentAddLoading: false,
        lastAddedStudentId: action.payload.data.id || action.payload.data?.student?.id,
        addStudentConflict: action.payload,
        studentPageNumber: 0,
      };

    case ActionType.UPDATE_STUDENTS_LOADING:
      return {
        ...state,
        studentUpdateLoading: true,
        studentUpdateError: null
      };
    case ActionType.UPDATE_STUDENTS_ERROR:
      return {
        ...state,
        studentUpdateLoading: false,
        studentUpdateError: action.payload
      };
    case ActionType.UPDATE_STUDENTS_SUCCESS:
      return {
        ...state,
        studentUpdateLoading: false,
        studentUpdateError: null,
        studentFlag: !state.studentFlag
      };

    case ActionType.ADD_SCHOOL_ADMIN_LOADING:
      return {
        ...state,
        schoolAdminAddLoading: true
      };
    case ActionType.ADD_SCHOOL_ADMIN_ERROR:
      return {
        ...state,
        schoolAdminAddLoading: false,
        schoolAdminsError: action.payload
      };
    case ActionType.ADD_SCHOOL_ADMIN_SUCCESS:
      return {
        ...state,
        schoolAdminAddLoading: false,
        lastAddedSchoolAdminId: action.payload?.data?.id,
        schoolAdminPageNumber: 0
      };

    case ActionType.GET_SCHOOL_ADMIN_LOADING:
      return {
        ...state,
        schoolAdminsLoading: true,
        schoolAdminsError: null
      };
    case ActionType.GET_SCHOOL_ADMIN_ERROR:
      return {
        ...state,
        schoolAdminsLoading: false,
        schoolAdminsError: action.payload
      };
    case ActionType.GET_SCHOOL_ADMIN_SUCCESS:
      return {
        ...state,
        schoolAdminsLoading: false,
        schoolAdminsError: null,
        schoolAdmins: action.payload?.school_admins,
        schoolAdminsCount: action.payload?.count,
        currentschoolAdminsCount: action.payload?.school_admins.length,
        schoolAdminPageNumber: action.payload?.page,
        lastAddedSchoolAdminId: 0,
      };

    case ActionType.UPDATE_SCHOOL_ADMIN_LOADING:
      return {
        ...state,
        schoolAdminUpdateLoading: true
      };
    case ActionType.UPDATE_SCHOOL_ADMIN_ERROR:
      return {
        ...state,
        schoolAdminsError: action.payload,
        schoolAdminUpdateLoading: false
      };
    case ActionType.UPDATE_SCHOOL_ADMIN_SUCCESS:
      return {
        ...state,
        schoolAdminUpdateLoading: false,
        schoolAdminFlag: !state.schoolAdminFlag
      };
    case ActionType.DELETE_SCHOOL_ADMIN_LOADING:
      return {
        ...state,
        schoolAdminDeleteLoading: true
      };
    case ActionType.DELETE_SCHOOL_ADMIN_ERROR:
      return {
        ...state,
        schoolAdminDeleteLoading: false
      };
    case ActionType.DELETE_SCHOOL_ADMIN_SUCCESS:
      return {
        ...state,
        schoolAdminDeleteLoading: false,
        // schoolAdminFlag: !state.schoolAdminFlag
      };

    case ActionType.GET_STUDENT_DETAIL_LOADING:
      return {
        ...state,
        studentDetailsLoading: true,
        studentDetailsError: null,
        studentDetails: null
      };
    case ActionType.GET_STUDENT_DETAIL_ERROR:
      return {
        ...state,
        studentDetailsLoading: false,
        studentDetailsError: action.payload,
        studentDetails: null
      };
    case ActionType.GET_STUDENT_DETAIL_SUCCESS:
      return {
        ...state,
        studentDetailsLoading: false,
        studentDetailsError: null,
        studentDetails: action.payload,
        breadcrumbs: action.payload.breadcrumb
      };
    case ActionType.GET_BREADCRUMB_LOADING:
      return {
        ...state,
        breadcrumbsLoaidng: true,
        breadcrumbs: null,
        breadcrumbsError: null
      };
    case ActionType.GET_BREADCRUMB_ERROR:
      return {
        ...state,
        breadcrumbsLoaidng: false,
        breadcrumbs: null,
        breadcrumbsError: action.payload
      };
    case ActionType.GET_BREADCRUMB_SUCCESS:
      return {
        ...state,
        breadcrumbsLoaidng: false,
        breadcrumbs: action.payload?.breadcrumbs,
        district_logo: action.payload?.logo,
        breadcrumbsError: null
      };
    case ActionType.GET_ADMIN_GRADES:
      return {
        ...state,
        type: action.type,
        adminGrades: action.payload
      };
    case ActionType.GET_ADMIN_SUBJECTS:
      return {
        ...state,
        type: action.type,
        adminSubjects: action.payload
      };
    case ActionType.SET_NEW_DISTRICT_LOGO:
      return {
        ...state,
        district_logo: action.payload
      };
    case ActionType.RESET_PASSWORD_ADMIN_LOADING:
      return {
        ...state,
        resetPwLoading: true
      };
    case ActionType.RESET_PASSWORD_ADMIN_SUCCESS:
      return {
        ...state,
        resetPwLoading: false
      };
    case ActionType.RESET_PASSWORD_ADMIN_ERROR:
      return {
        ...state,
        resetPwLoading: false
      };
    case ActionType.UPDATE_IS_PRINCIPAL_SUCCESS:
      return {
        ...state,
        schoolAdminFlag: !state.schoolAdminFlag
      };
    case ActionType.UPDATE_IS_PRINCIPAL_SUCCESS_ERROR:
      return {
        ...state,
        studentUpdateError: action.payload
      };
    case ActionType.UPDATE_ADMIN_DETAILS_LOADING:
      return {
        ...state,
        adminUpdateLoading: true
      };
    case ActionType.UPDATE_ADMIN_DETAILS_ERROR:
      return {
        ...state,
        adminsError: action.payload,
        adminUpdateLoading: false
      };
    case ActionType.UPDATE_ADMIN_DETAILS_SUCCESS:
      return {
        ...state,
        adminUpdateLoading: false,
      };
    case ActionType.SET_SUPER_ADMIN_FLAG:
      return {
        ...state,
        superAdminsFlag: !state.superAdminsFlag
      };
    case ActionType.SET_DISTRICT_ADMIN_FLAG:
      return {
        ...state,
        districtAdminsFlag: !state.districtAdminsFlag
      };
    case ActionType.SET_STUDENT_FLAG:
      return {
        ...state,
        studentFlag: !state.studentFlag
      };
    case ActionType.SET_SCHOOL_ADMIN_FLAG:
      return {
        ...state,
        schoolAdminFlag: !state.schoolAdminFlag
      };
    case ActionType.SET_CLASS_ADMIN_FLAG:
      return {
        ...state,
        classAdminsFlag: !state.classAdminsFlag
      };
    case ActionType.SET_DISTRICT_FLAG:
      return {
        ...state,
        districtFlag: !state.districtFlag
      };
    case ActionType.SET_SCHOOL_FLAG:
      return {
        ...state,
        schoolFlag: !state.schoolFlag
      };
    case ActionType.SET_CLASS_FLAG:
      return {
        ...state,
        classFlag: !state.classFlag
      };
    case ActionType.SET_DISTRICT_DETAILS:
      return {
        ...state,
        districtDetails: action.payload
      }
    case ActionType.SET_SUMMATIVE_ANALYSIS_REPORT:
      return {
        ...state,
        summativeAnalysisReport: action.payload
      }
    case ActionType.SET_AUDIT_REPORT:
      return {
        ...state,
        auditReport: action.payload
      }
    case ActionType.SET_SCHOOL_AUDIT_REPORT:
      return {
        ...state,
        schoolAuditReport: action.payload
      }
    case ActionType.SET_IS_REPORT_LOADING:
      return {
        ...state,
        isReportLoading: action.payload
      }
    case ActionType.SET_DISTRICT_M_ID:
      return {
        ...state,
        district_m_id: action.payload
      }
    case ActionType.SET_SCHOOL_M_ID:
      return {
        ...state,
        school_m_id: action.payload
      }
    case ActionType.SET_CLASS_M_ID:
      return {
        ...state,
        classroom_m_id: action.payload
      }

    case ActionType.GET_MERGE_STUDENT_SUCCESS:
      return {
        ...state,
        mergeStudentData: action.payload.data,
        mergeStudentError: null
      };
    case ActionType.GET_MERGE_STUDENT_ERROR:
      return {
        ...state,
        mergeStudentError: action.payload,
        mergeStudentData: null
      };

    case ActionType.RESET_MANAGEMENT_REDUCER:
      return {
        ...initialState
      }
    case ActionType.SET_ALL_STUDENTS_DETAILS:
      return {
        ...state,
        allStudentsDetails: action.payload
      }
    default:
      return state;
  }
};

export default managementReducer;