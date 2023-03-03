import axios from "util/axios";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";
import config from "config/config";


export function setFilters(isSet: boolean) {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_FILTERS,
            applyFilters: isSet,
        });
    };
}

export function getTeachersBySchools(params: any) {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(
                    `${config.defaults.api_url}/activity/load-teacher-grade-by-school-id`,
                    params
                )
                .then((res) => {
                    let gradeList: any = [];
                    res.data.data.teachers.forEach((x: any) => {
                        x.subject_grades.map((y: any) => {
                            y.teacher_id = x.id;
                            return y;
                        });
                        gradeList = x.subject_grades.concat(gradeList);
                    });
                    dispatch({
                        type: ActionType.GET_TEACHER_GRADE_BY_SCHOOL_ID,
                        payload: { teachers: res.data.data.teachers, subject_grades: gradeList },
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_TEACHER_GRADE_BY_SCHOOL_ID_FAIL,
                payload: {
                    message: "unable to get  school teachers",
                },
            });
        }
    };
}

export function getDistrictsAndSchools() {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(`${config.defaults.api_url}/activity/load-districts-schools`)
                .then((res) => {
                    let schoolsList: any = [];
                    const newDistrictsList = res.data.data.districts.map((x: any) => {
                        x.value = x.id;
                        x.label = x.district_name;
                        return x;
                    });
                    res.data.data.districts.forEach((x: any) => {
                        x.schools.map((y: any) => {
                            y.district_name = x.district_name;
                            y.district_id = x.id;
                            y.name = y.school_name;
                            return y;
                        });
                        schoolsList = x.schools.concat(schoolsList);
                    });
                    dispatch({
                        type: ActionType.GET_DISTRICTS,
                        payload: { districts: newDistrictsList, schools: schoolsList },
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_DISTRICTS_FAIL,
                payload: {
                    message: "unable to get districts",
                },
            });
        }
    };
}

export async function adminDistricts(params: any) {
    return axios.get(`${config.defaults.api_url}/admin/districts`, params)
}

export function getWelcomeMessage(params: any) {
    let urlString = `${config.defaults.api_url}/activity/welcome-messages?grade_id=${params.grade_id}&subject_id=${params.subject_id}&type=${params.type}&role_id=${params.role_id}`;
    // return axios.get(urlString);
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(urlString)
                .then((res) => {
                    dispatch({
                        type: ActionType.SET_WELCOME_MESSAGE,
                        payload: res.data.data.welcome_messages,
                    });
                });
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.SET_WELCOME_MESSAGE_FAIL,
                payload: {
                    message: "unable to fetch welcome message",
                },
            });
        }
    }
}


export function getSchoolsByDistrict(district_id: any, params: any) {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(
                    `${config.defaults.api_url}/admin/district/${district_id}/schools`,
                    params
                )
                .then((res) => {
                   
                    dispatch({
                        type: ActionType.GET_SCHOOLS_BY_DISTRICT,
                        payload: res,
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_SCHOOLS_BY_DISTRICT_FAIL,
                payload: {
                    message: "unable to get district schools",
                },
            });
        }
    };
}

export function getWelcomeActivityStats() {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(`${config.defaults.api_url}/activity/feed-welcome-stats`)
                .then((res) => {
                   
                    dispatch({
                        type: ActionType.GET_WELCOME_ACTIVITY_STATS,
                        payload: res,
                    });

                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_WELCOME_ACTIVITY_STATS_FAIL,
                payload: {
                    message: "unable to get feed welcome stats",
                },
            });
        }
    };
}


export function getActivityProgress(params: any) {
    console.log("Params: ", params)
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(
                    `${config.defaults.api_url}/activity/feed-progress?${Object.keys(params).map(key => key + '=' + params[key]).join('&')}`
                )
                .then((res) => {
                   
                    dispatch({
                        type: ActionType.GET_ACTIVITY_PROGRESS,
                        payload: res,
                    });

                    setFilters(false);
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_ACTIVITY_PROGRESS_FAIL,
                payload: {
                    message: "unable to get feed progress",
                },
            });
        }
    };
}

export async function getActivityProgressExport(params: any) {
    return axios.post(
        `${config.defaults.api_url}/activity/feed-progress/export`,
        params
    );
}

export function getActivityResources(grade_id: any, subject_id: any) {
    return axios.get(
        `${config.defaults.api_url}/activity/resources/${grade_id}/${subject_id}`
    );
}

export function setSchoolId(id: any) {
    sessionStorage.setItem("school_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_SCHOOL_ID,
            school_id: id,
        });
    };
}

export function setDistrictId(id: any) {
    sessionStorage.setItem("district_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_DISTRICT_ID,
            district_id: id,
        });
    };
}


export function getStats(params: any) {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(`${config.defaults.api_url}/admin/management/stats`, params)
                .then((res) => {
                   
                    dispatch({
                        type: ActionType.GET_ACTIVITY_STATS,
                        payload: res,
                    });
                    setFilters(false)
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_ACTIVITY_STATS_FAIL,
                payload: {
                    message: "unable to get activity stats",
                },
            });
        }
    };
}


export function setTeacherId(id: any) {
    sessionStorage.setItem("teacher_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_TEACHER_ID,
            teacher_id: id,
        });
    };
}

export function setGradeId(id: any) {
    sessionStorage.setItem("grade_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_GRADE_ID,
            grade_id: id,
        });
    };
}

export function setSubjectId(id: any) {
    sessionStorage.setItem("subject_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_SUBJECT_ID,
            subject_id: id,
        });
    };
}

export function setActivityClassroomId(id: any) {
    sessionStorage.setItem("classroom_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_ACTIVITY_CLASSROOM_ID,
            classroom_id: id,
        });
    };
}

export function setDistrictLogo(logo: any) {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_DISTRICT_LOGO,
            logo: logo,
        });
    };
}

export function setActivityReportIndicator(active: boolean, completed: boolean, link: any = null) {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_ACTIVITY_INDICATOR,
            active,
            completed,
            link,
        });
    };
}

export function resetTeachers() {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.RESET_TEACHERS,
        });
    };
}

export function resetGrades() {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.RESET_GRADES,
        });
    };
}

export const getSchoolProgressReport = (school_id: number) => async (dispatch: Dispatch) => {
    try {
        let response = await axios.get(
            `${config.defaults.api_url}/admin-reports/school-progress-report/${school_id}`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );

        dispatch({
            type: ActionType.SET_SCHOOL_PROGRESS_REPORT,
            payload: response.data,
        });

    } catch (error) {
        console.log({ error })
    }
}

export const resetSchoolProgressReport = () => {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.RESET_SCHOOL_PROGRESS_REPORT,
        });
    };
}

