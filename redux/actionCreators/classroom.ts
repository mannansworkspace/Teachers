import axios from "util/axios";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";
import config from "config/config";
import Cookies from "js-cookie";
import { RootState } from "redux/reducers/combine";

export function getAdminSchools() {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(`${config.defaults.api_url}/admin/schools`, {
                    params: {
                        limit: 200,
                    },
                })
                .then((res) => {
                   
                    dispatch({
                        type: ActionType.GET_ALL_SCHOOLS,
                        payload: res,
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_ALL_SCHOOLS_FAIL,
                payload: {
                    message: "unable to get schools",
                },
            });
        }
    };
}

export async function assignSummatives(params: any, switchFlag: any) {
    const result = await axios.post(
        `${config.defaults.api_url}/classroom/summatives/assignments`,
        params
    );
    switchFlag();
    return result;
}

export async function assignFormatives(params: any, switchFlag: any) {
    const result = await axios.post(
        `${config.defaults.api_url}/classroom/formatives/assignments`,
        params
    );
    switchFlag();
    return result;
}

export async function monitorSummatives(params: any) {
    return axios.post(
        `${config.defaults.api_url}/classroom/monitor/summative/`,
        params
    );
}

export async function monitorFormatives(params: any) {
    return axios.post(
        `${config.defaults.api_url}/classroom/monitor/formative/`,
        params
    );
}

export async function getModalStudents(params: any) {
    return axios.get(
        `${config.defaults.api_url}/classroom/modal/students`,
        params
    );
}

export async function summativeClearAnswers(params: any) {
    return axios.put(
        `${config.defaults.api_url}/classroom/monitor/summative/clear-answers`,
        params
    );
}

export async function FormativeClearAnswers(params: any) {
    return await axios.put(
        `${config.defaults.api_url}/classroom/monitor/formative/clear-answers`,
        params
    );
}

export async function summativeForceSubmit(params: any) {
    return axios.put(
        `${config.defaults.api_url}/classroom/monitor/summative/force-submit`,
        params
    );
}

// Reports

export async function standardBaseReportDownload(classroomId: any) {
    return axios({
        url: `${config.defaults.api_url}/admin-reports/standard-base-report/${classroomId}/download?language=en`, //your url
        method: "GET",
        responseType: "blob",
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `standard-base-report-${classroomId}.pdf`);
        document.body.appendChild(link);
        link.click();
    });
}

export async function getStandardBaseReport(classroomId: any) {
    return await axios.get(`${config.defaults.api_url}/admin-reports/standard-base-report/${classroomId}`)
}

export async function objectiveGraphReport(classroomId: any) {
    return axios({
        url: `${config.defaults.api_url}/admin-reports/objective-graph/${classroomId}/download?language=en`, //your url
        method: "GET",
        responseType: "blob",
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `objective-graph-report-${classroomId}.pdf`);
        document.body.appendChild(link);
        link.click();
    });
}

export async function FormativeForceSubmit(params: any) {
    return axios.put(
        `${config.defaults.api_url}/classroom/monitor/formative/force-submit`,
        params
    );
}

export async function summativePauseAndResume(params: any) {
    return axios.put(
        `${config.defaults.api_url}/classroom/monitor/summative/pause-resume`,
        params
    );
}

export async function FormativePauseAndResume(params: any) {
    return axios.put(
        `${config.defaults.api_url}/classroom/monitor/formative/pause-resume`,
        params
    );
}

export async function getFormatives(params: any) {
    return await axios.get(`${config.defaults.api_url}/classroom/formatives`, params)
}

export function getClassroomFormatives(params: any) {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(`${config.defaults.api_url}/classroom/formatives`, params)
                .then((res) => {
                   
                    dispatch({
                        type: ActionType.GET_ALL_FORMATIVES,
                        payload: res,
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_ALL_FORMATIVES_FAIL,
                payload: {
                    message: "unable to get formatives",
                },
            });
        }
    };
}

export function getClassroomSummatives(params: any) {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(`${config.defaults.api_url}/classroom/summatives`, params)
                .then((res) => {
                   
                    dispatch({
                        type: ActionType.GET_ALL_SUMMATIVES,
                        payload: res,
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_ALL_SUMMATIVES_FAIL,
                payload: {
                    message: "unable to get formatives",
                },
            });
        }
    };
}

export function fetchClassrooms(school_id: any) {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(`${config.defaults.api_url}/admin/classroom/${school_id}`)
                .then((res) => {
                   
                    dispatch({
                        type: ActionType.GET_CLASSROOMS_LIST,
                        payload: res,
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_CLASSROOMS_LIST_FAIL,
                payload: {
                    message: "unable to get schools",
                },
            });
        }
    };
}

export function resetClassrooms() {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.RESET_CLASSROOMS_ARRAYS,
        });
    };
}

export function getClassroomsBySchoolId(school_id: any) {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(
                    `${config.defaults.api_url}/admin/schools/${school_id}/classrooms`
                )
                .then((res) => {
                   
                    dispatch({
                        type: ActionType.GET_CLASSROOMS_BY_SCHOOL_ID,
                        payload: res,
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_CLASSROOMS_BY_SCHOOL_ID_FAIL,
                payload: {
                    message: "unable to get schools",
                },
            });
        }
    };
}

export function setClassroomSchoolId(id: number) {
    sessionStorage.setItem("c_school_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_CLASSROOM_SCHOOL_ID,
            classroomSchoolId: id,
        });
    };
}

export const updateStudents = (data: any) => async (dispatch: Dispatch) => {
    dispatch({
        type: ActionType.UPDATE_AVAILIBILTY_LOADING,
    });
    try {
        let response = await axios.put(
            `${config.defaults.api_url}/classroom/modal/test`,
            data,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );
        dispatch({
            type: ActionType.UPDATE_AVAILIBILTY_SUCCESS,
            payload: response.data,
        });
    } catch (e) {
        dispatch({
            type: ActionType.UPDATE_AVAILIBILTY_ERROR,
            payload: e,
        });
    }
};

export function setGrade(id: number) {
    sessionStorage.setItem("c_grade_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_GRADE,
            grade: id,
        });
    };
}

export function setSubject(id: number) {
    sessionStorage.setItem("c_subject_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_SUBJECT,
            subject: id,
        });
    };
}

export function setClassroomId(id: number) {
    sessionStorage.setItem("c_classroom_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_CLASSROOM_ID,
            classroomId: id,
        });
    };
}

export function setDistrictId(id: number) {
    sessionStorage.setItem("c_district_id", JSON.stringify(id))
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_LAST_DISTRICT_ID,
            districtId: id,
        });
    };
}

export function setFilterValues(data: any) {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.SET_SELECTED_FILTERS,
            payload: data.filters,
            classroomId: data.classroomId,
            classroomSchoolId: data.classroomSchoolId,
            grade: data.grade,
            subject: data.subject,
        });
    };
}

export function resetFilterValues() {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.RESET_SELECTED_FILTERS,
        });
    };
}

export async function getAddEditAnswersSummative(
    classroom_id: number,
    summative_id: number
) {
    return axios.get(
        `${config.defaults.api_url}/classroom/options/add-edit-answers/summatives/${summative_id}/${classroom_id}`
    );
}

export async function getAddEditAnswersFormative(
    classroom_id: number,
    formative_id: number
) {
    return axios.get(
        `${config.defaults.api_url}/classroom/options/add-edit-answers/formatives/${formative_id}/${classroom_id}`
    );
}

export const updateSummativeAnswers =
    (data: any) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.UPDATE_ANSWERS_LOADING,
        });
        try {
            let response = await axios.put(
                `${config.defaults.api_url}/classroom/options/edit-answers/student/summative`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            dispatch({
                type: ActionType.UPDATE_ANSWERS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.UPDATE_ANSWERS_ERROR,
                payload: e,
            });
        }
    };

export const clearStudentAssessment =
    (data: any, assessmentType: string) => async (dispatch: Dispatch) => {
        try {
            let response = await axios.put(
                `${config.defaults.api_url}/classroom/monitor/${assessmentType}/clear-answers`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            dispatch({
                type: ActionType.UPDATE_ANSWERS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.UPDATE_ANSWERS_ERROR,
                payload: e,
            });
        }
    };

export const submitStudentAssessment =
    (data: any, assessmentType: string) => async (dispatch: Dispatch) => {
        try {
            let response = await axios.put(
                `${config.defaults.api_url}/classroom/monitor/${assessmentType}/force-submit`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            dispatch({
                type: ActionType.UPDATE_ANSWERS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.UPDATE_ANSWERS_ERROR,
                payload: e,
            });
        }
    };

export const addSummativeAnswers =
    (data: any) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_ANSWERS_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/classroom/options/add-answers/student/summative`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            dispatch({
                type: ActionType.ADD_ANSWERS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.UPDATE_ANSWERS_ERROR,
                payload: e,
            });
        }
    };

export const updateFormativeAnswers =
    (data: any) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.UPDATE_ANSWERS_LOADING,
        });
        try {
            let response = await axios.put(
                `${config.defaults.api_url}/classroom/options/edit-answers/student/formative`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            dispatch({
                type: ActionType.UPDATE_ANSWERS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.UPDATE_ANSWERS_ERROR,
                payload: e,
            });
        }
    };

export const getSummativeReport =
    (classroom_id: number, summative_id: number) =>
        async (dispatch: Dispatch) => {
            try {
                const { data } = await axios.get(
                    `${config.defaults.api_url}/admin-reports/classroom-summative-report/${classroom_id}/${summative_id}`,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                dispatch({
                    type: ActionType.SET_SUMMATIVE_REPORT,
                    payload: data,
                });
            } catch (error) {
                console.log({ error });
            }
        };

export const addFormativeAnswers =
    (data: any) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_ANSWERS_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/classroom/options/add-answers/student/formative`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            dispatch({
                type: ActionType.ADD_ANSWERS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.ADD_ANSWERS_ERROR,
                payload: e,
            });
        }
    };
export const getClassroom = async (id: number) => {
    try {
        let response = await axios.get(
            `${config.defaults.api_url}/admin/classroom/${id}/details`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );
        return response;
    } catch (e) {
    }
};

export const checkIfClassroomHasTests = async (classroom_id: number) => {
    try {
        let response = await axios.get(
            `${config.defaults.api_url}/classroom/${classroom_id}/has-tests`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.error(e)
    }
}

export const unenrollStudentFormClassroom = async (class_id: number, student_id: number) => {
    try {
        let response = await axios.delete(
            `${config.defaults.api_url}/admin/students/${student_id}/unenroll/${class_id}`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );
        return response;
    } catch (e) {
    }
};

export const getGradeFrequencySummativeReport = (classroom_id: number) => async (dispatch: Dispatch) => {
    try {
        let response = await axios.get(
            `${config.defaults.api_url}/admin-reports/grade-frequency-distribution/${classroom_id}`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );

        dispatch({
            type: ActionType.SET_GRADE_FREGUENCY_SUMMATIVE_REPORT,
            payload: response.data,
        });

    } catch (error) {
        console.log({ error })
    }
}

export const deleteSummativeScore =
    (score_summative_id: number, summative_id: number, student_id: number) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.DELETE_ANSWERS_SCORE_LOADING,
            });
            try {
                let response = await axios.delete(
                    `${config.defaults.api_url}/classroom/monitor/summative/${summative_id}/${score_summative_id}/${student_id}`,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                dispatch({
                    type: ActionType.DELETE_ANSWERS_SCORE_SUCCESS,
                    payload: response.data,
                });
            } catch (e) {
                dispatch({
                    type: ActionType.DELETE_ANSWERS_SCORE_ERROR,
                    payload: e,
                });
            }
        };


export const deleteFormativeScore =
    (score_formative_id: number, formative_id: number, student_id: number) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.DELETE_ANSWERS_SCORE_LOADING,
            });
            try {
                let response = await axios.delete(
                    `${config.defaults.api_url}/classroom/monitor/formative/${formative_id}/${score_formative_id}/${student_id}`,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                dispatch({
                    type: ActionType.DELETE_ANSWERS_SCORE_SUCCESS,
                    payload: response.data,
                });
            } catch (e) {
                dispatch({
                    type: ActionType.DELETE_ANSWERS_SCORE_ERROR,
                    payload: e,
                });
            }
        };


export const sendNewAttemptRequest =
    (data: any, assessmentType: string) => async (dispatch: Dispatch) => {
        try {
            await axios.put(
                `${config.defaults.api_url}/classroom/monitor/${assessmentType}/re-enable-test`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            dispatch({
                type: ActionType.RE_ENABLE_TEST,
                payload: data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.RE_ENABLE_TEST,
                payload: e,
            });
        }
    };

export const getItemResponseReport = (classroom_id: number, summative_id: number) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            `${config.defaults.api_url}/admin-reports/irr-summative-report/${classroom_id}/${summative_id}`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );
        Cookies.set('test_name', response.data?.data?.test_name);
        dispatch({
            type: ActionType.SET_IRR_SUMMATIVE,
            payload: response.data,
        });
    } catch (error) {
        console.log({ error });
    }
};

export function resetGradeFrequencySummativeReport() {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.RESET_GRADE_FREGUENCY_SUMMATIVE_REPORT,
        });
    };
}

export const getOAGReport = (classroom_id: number) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            `${config.defaults.api_url}/admin-reports/objective-graph/${classroom_id}`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );

        dispatch({
            type: ActionType.SET_OBJECTIVE_ACCOUNTABILITY_GRAPH_REPORT,
            payload: response.data,
        });
    } catch (error) {
        console.log({ error });
    }
}


export const getIRRFormative = (objective_id: number, classroom_id: number) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            `${config.defaults.api_url}/admin-reports/irr-report/${objective_id}/${classroom_id}`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );

        dispatch({
            type: ActionType.SET_IRR_FORMATIVE,
            payload: response.data,
        });
    } catch (error) {
        console.log({ error });
    }
}

export const getMasterReport = (classroom_id: number) => async (dispatch: Dispatch) => {
    try {
        const { data } = await axios.get(
            `${config.defaults.api_url}/admin-reports/classroom-master-report/${classroom_id}`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );

        dispatch({
            type: ActionType.SET_MASTER_REPORT,
            payload: data,
        });
    } catch (error) {
        console.log({ error });
    }
}

export function resetReportData(action: string) {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType[action],
        });
    };
}

export const getStandardRiskReport = (classroom_id: number, summative_id: number) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            `${config.defaults.api_url}/admin-reports/standards-at-risk/${classroom_id}/${summative_id}`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );

        dispatch({
            type: ActionType.SET_STANDARD_RISK_REPORT,
            payload: response.data,
        });
    } catch (error) {
        console.log({ error });
    }
}


export const getStudentSummativeReport =
    (classroomId: number, summativeId: number) =>
        async (dispatch: Dispatch) => {
            try {
                const { data } = await axios.get(
                    `${config.defaults.api_url}/admin-reports/student-test-report/${classroomId}/${summativeId}`);

                if (data) {
                    dispatch({
                        type: ActionType.SET_STUDENT_SUMMATIVE_REPORT,
                        payload: { ...data.data }
                    })
                }

            } catch (error) {
                console.log(error)
            }
        }

//// selectors
export const studentSummativeReportSelector = (state:RootState) =>{
    return state.classroom.summativeStudentsReport
}

export const showModalSafariSelector = (state:RootState) =>{
    return state.classroom.showModalSafari
}


export const showApiErrorModalSelector = (state:RootState) =>{
    return state.classroom.showApiErrorModal
}

export function getWelcomeMessageClassroom(params: any) {
    let urlString = `${config.defaults.api_url}/activity/welcome-messages?grade_id=${params.grade_id}&subject_id=${params.subject_id}&type=${params.type}&role_id=${params.role_id}`;
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(urlString)
                .then((res) => {
                    dispatch({
                        type: ActionType.SET_WELCOME_MESSAGE_CLASSROOM,
                        payload: res.data.data.welcome_messages,
                    });
                });
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.SET_WELCOME_MESSAGE_CLASSROOM_FAIL,
                payload: {
                    message: "unable to fetch welcome message",
                },
            });
        }
    }
}
