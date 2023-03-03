import axios from "util/axios";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";
import config from "config/config";
import { RootState } from "redux/reducers/combine";
import cookie from "js-cookie";
import moment from "moment";

export const getSuperAdmins =
    (
        offSet: number,
        limit: number,
        searchTerm: string,
        sort_by: string,
        order_by: string,
        new_admin_id?: number
    ) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.GET_SUPER_ADMIN_LOADING,
            });
            try {
                let url = `${config.defaults.api_url}/admin/super-admins?offset=${offSet}&limit=${limit}&search=${searchTerm}&sort_by=${sort_by}&order_by=${order_by}`;
                if (new_admin_id) {
                    url += `&new_admin_id=${new_admin_id}`;
                }
                let response = await axios.get(url, {
                    headers: {
                        apiKey: config.defaults.api_key!!,
                    },
                });
                // console.log(response.data, "................SUPER ADMINS...............");
                dispatch({
                    type: ActionType.GET_SUPER_ADMIN_SUCCESS,
                    payload: response.data?.data,
                });
            } catch (e) {
                dispatch({
                    type: ActionType.GET_SUPER_ADMIN_ERROR,
                    payload: e,
                });
            }
        };

export const deleteSuperAdmin =
    (id: number, setModal: (a: boolean) => void, setPreviousPage: () => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.DELETE_SUPER_ADMIN_LOADING,
            });
            try {
                let response = await axios.delete(
                    `${config.defaults.api_url}/admin/super-admins/${id}`,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                setModal(false);
                dispatch({
                    type: ActionType.DELETE_SUPER_ADMIN_SUCCESS,
                    payload: response.data,
                });
                setPreviousPage();
            } catch (e) {
                dispatch({
                    type: ActionType.DELETE_SUPER_ADMIN_ERROR,
                    payload: e,
                });
            }
        };

export const updateSuperAdmin =
    (id: number, data: any, setModal: (a: boolean) => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.UPDATE_SUPER_ADMIN_LOADING,
            });
            try {
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/super-admin/${id}`,
                    data,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                setModal(false);
                dispatch({
                    type: ActionType.UPDATE_SUPER_ADMIN_SUCCESS,
                    payload: response.data,
                });
            } catch (e: any) {
                const error =
                    e.response && e?.response?.data && e?.response?.data?.message
                        ? e?.response?.data?.message
                        : "Some Server Error";
                dispatch({
                    type: ActionType.UPDATE_SUPER_ADMIN_ERROR,
                    payload: error,
                });
            }
        };

export const addSuperAdmin =
    (data: any, setModal: (a: boolean) => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_SUPER_ADMIN_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/admin`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            dispatch({
                type: ActionType.ADD_SUPER_ADMIN_SUCCESS,
                payload: response.data,
            });
            setModal(false);
        } catch (e: any) {
            setModal(true);
            dispatch({
                type: ActionType.ADD_SUPER_ADMIN_ERROR,
                payload: e.response.data.message,
            });
        }
    };

export const getDistrictAdmins =
    (
        offSet: number,
        limit: number,
        searchTerm: string,
        districtId: string | null = null,
        sort_by?: string,
        order_by?: string,
        new_admin_id?: number
    ) =>
        async (dispatch: Dispatch) => {
            let url = `${config.defaults.api_url}/admin/district-admins?offset=${offSet}&limit=${limit}&search=${searchTerm}`;
            if (districtId) {
                url += `&district_id=${districtId}`;
            }
            if (sort_by) {
                url += `&sort_by=${sort_by}`;
            }
            if (order_by) {
                url += `&order_by=${order_by}`;
            }
            if (new_admin_id) {
                url += `&new_admin_id=${new_admin_id}`;
            }
            dispatch({
                type: ActionType.GET_DISTRICT_ADMIN_LOADING,
            });
            try {
                let response = await axios.get(url, {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                });
                dispatch({
                    type: ActionType.GET_DISTRICT_ADMIN_SUCCESS,
                    payload: response.data?.data,
                });
            } catch (e) {
                dispatch({
                    type: ActionType.GET_DISTRICT_ADMIN_ERROR,
                    payload: e,
                });
            }
        };

export const deleteDistrictAdmins =
    (id: number, setModal: (a: boolean) => void, setPreviousPage: () => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.DELETE_DISTRICT_ADMIN_LOADING,
            });
            try {
                let response = await axios.delete(
                    `${config.defaults.api_url}/admin/district-admin/${id}`,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "DELETE...........");
                setModal(false);
                dispatch({
                    type: ActionType.DELETE_DISTRICT_ADMIN_SUCCESS,
                    payload: response.data,
                });
                setPreviousPage();
            } catch (e) {
                dispatch({
                    type: ActionType.DELETE_DISTRICT_ADMIN_ERROR,
                    payload: e,
                });
            }
        };

export const deleteDistrictAdminFromDistrict =
    (id: number, district_id: number, setModal: (a: boolean) => void, setPreviousPage: () => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.DELETE_DISTRICT_ADMIN_LOADING,
            });
            try {
                let response = await axios.delete(
                    `${config.defaults.api_url}/admin/district/${id}/${district_id}`,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "DELETE...........");
                setModal(false);
                dispatch({
                    type: ActionType.DELETE_DISTRICT_ADMIN_SUCCESS,
                    payload: response.data,
                });
                setPreviousPage();
            } catch (e) {
                dispatch({
                    type: ActionType.DELETE_DISTRICT_ADMIN_ERROR,
                    payload: e,
                });
            }
        };


export const updateDistrictAdmins =
    (id: number, data: any, setModal: (a: boolean) => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.UPDATE_DISTRICT_ADMIN_LOADING,
            });
            try {
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/district-admin/${id}`,
                    data,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "UDPATE..........");
                setModal(false);
                dispatch({
                    type: ActionType.UPDATE_DISTRICT_ADMIN_SUCCESS,
                    payload: response.data,
                });
            } catch (e: any) {
                const error =
                    e.response && e?.response?.data && e?.response?.data?.message
                        ? e?.response?.data?.message
                        : "Some Server Error";
                dispatch({
                    type: ActionType.UPDATE_DISTRICT_ADMIN_ERROR,
                    payload: error,
                });
            }
        };

export const addDistrictAdmin =
    (data: any, setModal: (a: boolean) => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_DISTRICT_ADMIN_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/admin/district-admin`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "UDPATE..........");
            dispatch({
                type: ActionType.ADD_DISTRICT_ADMIN_SUCCESS,
                payload: response.data,
            });
            setModal(false);
        } catch (e: any) {
            setModal(true);
            dispatch({
                type: ActionType.ADD_DISTRICT_ADMIN_ERROR,
                payload: e.response.data.message,
            });
        }
    };
export const getDistricts =
    (
        offSet: number,
        limit: number,
        searchTerm: string,
        sort_by: string,
        order_by: string,
        new_district_id?: number
    ) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.GET_DISTRICT_LOADING,
            });
            try {
                let url = `${config.defaults.api_url}/admin/districts?offset=${offSet}&limit=${limit}&search=${searchTerm}&sort_by=${sort_by}&order_by=${order_by}`;
                if (new_district_id) {
                    url += `&new_district_id=${new_district_id}`;
                }
                let response = await axios.get(url, {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                });
                dispatch({
                    type: ActionType.GET_DISTRICT_SUCCESS,
                    payload: response.data?.data,
                });
            } catch (e) {
                dispatch({
                    type: ActionType.GET_DISTRICT_ERROR,
                    payload: e,
                });
            }
        };
export const deleteDistrict =
    (id: number, setModal: (a: boolean) => void, setPreviousPage: () => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.DELETE_DISTRICT_LOADING,
            });
            try {
                let response = await axios.delete(
                    `${config.defaults.api_url}/admin/district/${id}`,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "DELETE...........");
                setModal(false);
                dispatch({
                    type: ActionType.DELETE_DISTRICT_SUCCESS,
                    payload: response.data,
                });
                setPreviousPage();
            } catch (e) {
                dispatch({
                    type: ActionType.DELETE_DISTRICT_ERROR,
                    payload: e,
                });
            }
        };

export const addDistrict =
    (data: any, setModal: (a: boolean) => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_DISTRICT_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/admin/district`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "UDPATE..........");
            dispatch({
                type: ActionType.ADD_DISTRICT_SUCCESS,
                payload: response.data,
            });
            setModal(false);
        } catch (e: any) {
            setModal(true);
            dispatch({
                type: ActionType.ADD_DISTRICT_ERROR,
                payload: e.response.data.message,
            });
        }
    };
export const updateDistrict =
    (id: number, data: any, setModal: (a: boolean) => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.UPDATE_DISTRICT_LOADING,
            });
            try {
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/district/${id}`,
                    data,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "UDPATE..........");
                dispatch({
                    type: ActionType.UPDATE_DISTRICT_SUCCESS,
                    payload: response.data,
                });
                setModal(false);
            } catch (e: any) {
                setModal(true);
                dispatch({
                    type: ActionType.UPDATE_DISTRICT_ERROR,
                    payload: e.response.data.message,
                });
            }
        };
export const getSchools =
    (
        offSet: number,
        limit: number,
        searchTerm: string,
        districtId: string | null = null,
        order_by: string,
        sort_by: string,
        new_school_id?: number
    ) =>
        async (dispatch: Dispatch) => {
            let url = `${config.defaults.api_url}/admin/schools?offset=${offSet}&limit=${limit}&search=${searchTerm}&sort_by=${sort_by}&order_by=${order_by}`;
            if (districtId) {
                url += `&district_id=${districtId}`;
            }
            if (new_school_id) {
                url += `&new_school_id=${new_school_id}`;
            }
            dispatch({
                type: ActionType.GET_SCHOOLS_LOADING,
            });

            try {
                let response = await axios.get(url, {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                });
                dispatch({
                    type: ActionType.GET_SCHOOLS_SUCCESS,
                    payload: response.data?.data,
                });
            } catch (e) {
                dispatch({
                    type: ActionType.GET_SCHOOLS_ERROR,
                    payload: e,
                });
            }
        };

export const getSingleSchool = (id: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: ActionType.GET_SINGLE_SCHOOL_LOADING,
    });
    try {
        let response = await axios.get(
            `${config.defaults.api_url}/admin/schools/${id}/details`,
            {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            }
        );
        console.log(response.data, "SINGLE SCHOOL");
        dispatch({
            type: ActionType.GET_SINGLE_SCHOOL_SUCCESS,
            payload: response.data?.data,
        });
    } catch (e) {
        dispatch({
            type: ActionType.GET_SINGLE_SCHOOL_ERROR,
            payload: e,
        });
    }
};

export const addSchool =
    (data: any, setModal: (a: boolean) => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_SCHOOL_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/admin/schools`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "ADD..........");
            setModal(false);
            dispatch({
                type: ActionType.ADD_SCHOOL_SUCCESS,
                payload: response.data,
            });
        } catch (e: any) {
            const error =
                e.response && e?.response?.data && e?.response?.data?.message
                    ? e?.response?.data?.message
                    : "Some Server Error";
            dispatch({
                type: ActionType.ADD_SCHOOL_ERROR,
                payload: error,
            });
        }
    };

export const deleteSchool =
    (id: number, setModal: (a: boolean) => void, setPreviousPage: () => void, delete_student: boolean = false) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.DELETE_SCHOOLS_LOADING,
            });

            let url = `${config.defaults.api_url}/admin/schools/${id}`;

            if (delete_student === true) {
                url = `${url}?delete_students=true`
            }

            try {
                let response = await axios.delete(
                    url,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "DELETE...........");
                setModal(false);
                dispatch({
                    type: ActionType.DELETE_SCHOOLS_SUCCESS,
                    payload: response.data,
                });
                setPreviousPage();
            } catch (e) {
                dispatch({
                    type: ActionType.DELETE_SCHOOLS_ERROR,
                    payload: e,
                });
            }
        };

export const updateSchool =
    (id: number, data: any, setModal: (a: boolean) => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.UPDATE_SCHOOLS_LOADING,
            });
            try {
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/schools/${id}`,
                    data,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "UDPATE..........");
                setModal(false);
                dispatch({
                    type: ActionType.UPDATE_SCHOOLS_SUCCESS,
                    payload: response.data,
                });
            } catch (e: any) {
                const error = e?.response?.data?.message ?? "Some Server Error";
                dispatch({
                    type: ActionType.UPDATE_SCHOOLS_ERROR,
                    payload: error,
                });
            }
        };

export const getClassAdmins = (params: any) => async (dispatch: Dispatch) => {
    let {
        offSet,
        limit,
        searchTerm,
        districtId,
        schoolId,
        classId,
        new_admin_id,
        sortBy,
        OrderByColumn,
    } = params;
    let url = `${config.defaults.api_url}/admin/classroom/classroom-admins?offset=${offSet}&limit=${limit}&search=${searchTerm}&sort_by=${sortBy}&order_by=${OrderByColumn}`;
    if (districtId) {
        url += `&district_id=${districtId}`;
    }
    if (schoolId) {
        url += `&school_id=${schoolId}`;
    }
    if (classId) {
        url += `&classroom_id=${classId}`;
    }
    if (new_admin_id) {
        url += `&new_admin_id=${new_admin_id}`;
    }
    dispatch({
        type: ActionType.GET_CLASSADMINS_LOADING,
    });
    try {
        let response = await axios.get(url, {
            headers: {
                apiKey: config.defaults.api_key!,
            },
        });
        console.log(response.data, "..........CLASSES......AMIN...............");
        dispatch({
            type: ActionType.GET_CLASSADMINS_SUCCESS,
            payload: response.data?.data,
        });
    } catch (e) {
        dispatch({
            type: ActionType.GET_CLASSADMINS_ERROR,
            payload: e,
        });
    }
};
export const deleteClassAdmin =
    (classroomId: number, adminId: number, setModal: (a: boolean) => void, setPreviousPage: () => void, from_school: boolean) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.DELETE_CLASSADMINS_LOADING,
            });
            try {
                let response = await axios.delete(
                    `${config.defaults.api_url}/admin/classroom/classroom-admins/${classroomId || 0
                    }/${adminId}?from_school=${from_school}`,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "DELETE...........");
                setModal(false);
                dispatch({
                    type: ActionType.DELETE_CLASSADMINS_SUCEESS,
                    payload: response.data,
                });
                setPreviousPage();
            } catch (e) {
                dispatch({
                    type: ActionType.DELETE_CLASSADMINS_ERROR,
                    payload: e,
                });
            }
        };

export const updateClassAdminIsPrincipal =
    (id: number, classroomId: number, is_teacher: boolean) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.UPDATE_CLASSADMINS_LOADING,
            });
            try {
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/classroom-admin/${id}/${classroomId}`,
                    { is_teacher },
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                dispatch({
                    type: ActionType.UPDATE_CLASSADMINS_SUCCESS,
                    payload: response.data,
                });
            } catch (e) {
                dispatch({
                    type: ActionType.UPDATE_CLASSADMINS_ERROR,
                    payload: e,
                });
            }
        };

export const addClassAdmin =
    (data: any, setModal: (a: boolean) => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_CLASSADMINS_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/admin/classroom-admin`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "UDPATE..........");
            setModal(false);
            dispatch({
                type: ActionType.ADD_CLASSADMINS_SUCCESS,
                payload: response.data,
            });
        } catch (e: any) {
            const error =
                e.response && e?.response?.data && e?.response?.data?.message
                    ? e?.response?.data?.message
                    : "Some Server Error";
            dispatch({
                type: ActionType.ADD_CLASSADMINS_ERROR,
                payload: error,
            });
        }
    };

export const getClasses = (params: any) => async (dispatch: Dispatch) => {
    let {
        offSet,
        limit,
        searchTerm,
        districtId,
        schoolId,
        order_by,
        sort_by,
        new_class_id,
    } = params;
    let url = `${config.defaults.api_url}/admin/classroom?offset=${offSet}&limit=${limit}&search=${searchTerm}&sort_by=${sort_by}&order_by=${order_by}`;
    if (districtId) {
        url += `&district_id=${districtId}`;
    }
    if (schoolId) {
        url += `&school_id=${schoolId}`;
    }
    if (new_class_id) {
        url += `&new_class_id=${new_class_id}`;
    }
    dispatch({
        type: ActionType.GET_CLASSES_LOADING,
    });
    try {
        let response = await axios.get(url, {
            headers: {
                apiKey: config.defaults.api_key!,
            },
        });
        // console.log(response.data, "..........CLASSES.....................");
        dispatch({
            type: ActionType.GET_CLASSES_SUCCESS,
            payload: response.data?.data,
        });
    } catch (e) {
        dispatch({
            type: ActionType.GET_CLASSES_ERROR,
            payload: e,
        });
    }
};

export const deleteClass =
    (id: number, setModal: (a: boolean) => void, setPreviousPage: () => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.DELETE_CLASSES_LOADING,
            });
            try {
                let response = await axios.delete(
                    `${config.defaults.api_url}/admin/classroom/${id}`,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "DELETE...........");
                setModal(false);
                dispatch({
                    type: ActionType.DELETE_CLASSES_SUCCESS,
                    payload: response.data,
                });
                setPreviousPage();
            } catch (e) {
                dispatch({
                    type: ActionType.DELETE_CLASSES_ERROR,
                    payload: e,
                });
            }
        };

export const addClass =
    (data: any, setModal: (a: boolean) => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_CLASS_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/admin/classroom`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "UDPATE..........");
            setModal(false);
            dispatch({
                type: ActionType.ADD_CLASS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.ADD_CLASS_ERROR,
                payload: e,
            });
        }
    };

export const updateClass =
    (id: number, data: any, setModal: (a: boolean) => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.UPDATE_CLASSES_LOADING,
            });
            try {
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/classroom/${id}`,
                    data,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "UDPATE..........");
                setModal(false);
                dispatch({
                    type: ActionType.UPDATE_CLASSES_SUCCESS,
                    payload: response.data,
                });
            } catch (e) {
                dispatch({
                    type: ActionType.UPDATE_CLASSES_ERROR,
                    payload: e,
                });
            }
        };

export const getStudents = (params: any) => async (dispatch: Dispatch) => {
    let {
        offSet,
        limit,
        searchTerm,
        districtId,
        schoolId,
        classId,
        sort_by,
        order_by,
        new_student_id,
    } = params;
    let url = `${config.defaults.api_url}/admin/students?offset=${offSet}&limit=${limit}&search=${searchTerm}`;
    if (districtId) {
        url += `&district_id=${districtId}`;
    }
    if (schoolId) {
        url += `&school_id=${schoolId}`;
    }
    if (classId) {
        url += `&classroom_id=${classId}`;
    }
    if (sort_by) {
        url += `&sort_by=${sort_by}`;
    }
    if (order_by) {
        url += `&order_by=${order_by}`;
    }
    if (new_student_id > 0) {
        url += `&new_student_id=${new_student_id}`;
    }
    dispatch({
        type: ActionType.GET_STUDENTS_LOADING,
    });
    try {
        let response = await axios.get(url, {
            headers: {
                apiKey: config.defaults.api_key!,
            },
        });
        console.log(response.data, "..........STUDENTS.....................");
        dispatch({
            type: ActionType.GET_STUDENTS_SUCCESS,
            payload: response.data?.data,
        });
    } catch (e) {
        dispatch({
            type: ActionType.GET_STUDENTS_ERROR,
            payload: e,
        });
    }
};

export const getStudentsForClass =
    (params: any) => async (dispatch: Dispatch) => {
        let {
            offSet,
            limit,
            searchTerm,
            schoolId,
            classId,
            new_student_id,
            sortBy,
            OrderByColumn,
        } = params;
        let url = `${config.defaults.api_url}/admin/schools/${schoolId}/${classId}/students?offset=${offSet}&limit=${limit}&search=${searchTerm}&sort_by=${sortBy}&order_by=${OrderByColumn}`;
        // if (districtId) {
        //   url += `&district_id=${districtId}`;
        // }
        // if (schoolId) {
        //   url += `&school_id=${schoolId}`;
        // }
        // if (classId) {
        //   url += `&classroom_id=${classId}`;
        // }
        if (new_student_id > 0) {
            url += `&new_student_id=${new_student_id}`;
        }
        dispatch({
            type: ActionType.GET_STUDENTS_LOADING,
        });
        try {
            let response = await axios.get(url, {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            });
            console.log(response.data, "..........STUDENTS.....................");
            dispatch({
                type: ActionType.GET_STUDENTS_SUCCESS,
                payload: response.data?.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.GET_STUDENTS_ERROR,
                payload: e,
            });
        }
    };

export const deleteStudent =
    (data: any, setModal: (a: boolean) => void, setPreviousPage?: () => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.DELETE_STUDENTS_LOADING,
        });
        try {
            let response = await axios.delete(
                `${config.defaults.api_url}/admin/student`,
                {
                    data,
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "..........STUDENTS.....................");
            setModal(false);
            dispatch({
                type: ActionType.DELETE_STUDENTS_SUCCESS,
                payload: response.data,
            });
            setPreviousPage && setPreviousPage();
        } catch (e) {
            dispatch({
                type: ActionType.DELETE_STUDENTS_ERROR,
                payload: e,
            });
        }
    };

export const addStudent =
    (data: any, setModal: (a: boolean) => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_STUDENT_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/admin/students`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(
                response.data,
                ".....ADDDDDDD.....STUDENTS....................."
            );
            setModal(false);
            dispatch({
                type: ActionType.ADD_STUDENT_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.ADD_STUDENT_ERROR,
                payload: e,
            });
        }
    };

export const addStudentToClass =
    (data: any, setModal: (a: boolean) => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_STUDENT_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/classroom/student`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(
                response.data,
                ".....ADDDDDDD.....STUDENTS....................."
            );
            setModal(false);
            dispatch({
                type: ActionType.ADD_STUDENT_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: ActionType.ADD_STUDENT_ERROR,
                payload: e,
            });
        }
    };

export const updateStudent =
    (id: number, data: any, setModal: (a: boolean) => void) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.UPDATE_STUDENTS_LOADING,
            });
            try {
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/students/${id}`,
                    data,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "..........STUDENTS.....................");
                dispatch({
                    type: ActionType.UPDATE_STUDENTS_SUCCESS,
                    payload: response.data,
                });
                setModal(false);
            } catch (e: any) {
                setModal(true);
                console.log(e.response, "UPDATE............");
                const error =
                    e.response && e?.response?.data && e?.response?.data?.message
                        ? e?.response?.data?.message
                        : "Some Server Error";
                dispatch({
                    type: ActionType.UPDATE_STUDENTS_ERROR,
                    payload: error,
                });
            }
        };

export async function updateStudentToggle(id: number, data: any) {
    return await axios.put(
        `${config.defaults.api_url}/admin/students/${id}`,
        data,
        {
            headers: {
                apiKey: config.defaults.api_key!,
            },
        }
    );
}

export const getSchoolAdmins = (params: any) => async (dispatch: Dispatch) => {
    let {
        offSet,
        limit,
        searchTerm,
        districtId,
        schoolId,
        sortBy,
        OrderByColumn,
        new_admin_id,
    } = params;
    let url = `${config.defaults.api_url}/admin/schools/school-admins?offset=${offSet}&limit=${limit}&search=${searchTerm}&sort_by=${sortBy}&order_by=${OrderByColumn}`;
    if (districtId) {
        url += `&district_id=${districtId}`;
    }
    if (schoolId) {
        url += `&school_id=${schoolId}`;
    }
    if (new_admin_id) {
        url += `&new_admin_id=${new_admin_id}`;
    }
    dispatch({
        type: ActionType.GET_SCHOOL_ADMIN_LOADING,
    });
    try {
        let response = await axios.get(url, {
            headers: {
                apiKey: config.defaults.api_key!,
            },
        });
        console.log(
            response.data,
            "..........SCHOOL ADMIN....||||||||....................."
        );
        dispatch({
            type: ActionType.GET_SCHOOL_ADMIN_SUCCESS,
            payload: response.data?.data,
        });
    } catch (e) {
        dispatch({
            type: ActionType.GET_SCHOOL_ADMIN_ERROR,
            payload: e,
        });
    }
};

export const deleteSchoolAdmin =
    (data: any, setModal: (a: boolean) => void, setPreviousPage: () => void, from_district: boolean) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.DELETE_SCHOOL_ADMIN_LOADING,
        });
        try {
            let response = await axios.delete(
                `${config.defaults.api_url}/admin/schools/school-admins/${data?.school_id}/${data?.admin_id}?from_district=${from_district}`,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "..........STUDENTS.....................");
            setModal(false);
            dispatch({
                type: ActionType.DELETE_SCHOOL_ADMIN_SUCCESS,
                payload: response.data,
            });
            setPreviousPage();
        } catch (e) {
            dispatch({
                type: ActionType.DELETE_SCHOOL_ADMIN_ERROR,
                payload: e,
            });
        }
    };

export const updateSchoolAdmin =
    (
        admin_id: number,
        school_id: number,
        data: any,
        setModal: (a: boolean) => void
    ) =>
        async (dispatch: Dispatch) => {
            dispatch({
                type: ActionType.UPDATE_SCHOOL_ADMIN_LOADING,
            });
            try {
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/school-admin/${admin_id}/${school_id}`,
                    data,
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                console.log(response.data, "..........STUDENTS.....................");
                setModal(false);
                dispatch({
                    type: ActionType.UPDATE_SCHOOL_ADMIN_SUCCESS,
                    payload: response.data,
                });
            } catch (e: any) {
                const error =
                    e.response && e?.response?.data && e?.response?.data?.message
                        ? e?.response?.data?.message
                        : "Some Server Error";
                dispatch({
                    type: ActionType.UPDATE_SCHOOL_ADMIN_ERROR,
                    payload: error,
                });
            }
        };

export const addSchoolAdmin =
    (data: any, setModal: (a: boolean) => void) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_SCHOOL_ADMIN_LOADING,
        });
        try {
            let response = await axios.post(
                `${config.defaults.api_url}/admin/school-admin`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "..........STUDENTS.....................");
            dispatch({
                type: ActionType.ADD_SCHOOL_ADMIN_SUCCESS,
                payload: response.data,
            });
            setModal(false);
        } catch (e: any) {
            setModal(true);
            const error =
                e.response && e?.response?.data && e?.response?.data?.message
                    ? e?.response?.data?.message
                    : "Some Server Error";
            dispatch({
                type: ActionType.ADD_SCHOOL_ADMIN_ERROR,
                payload: error,
            });
        }
    };

export const getStudentDetail = (id: string) => async (dispatch: Dispatch) => {
    let url = `${config.defaults.api_url}/admin/students/detail/${id}`;
    dispatch({
        type: ActionType.GET_STUDENT_DETAIL_LOADING,
    });
    try {
        let response = await axios.get(url, {
            headers: {
                apiKey: config.defaults.api_key!,
            },
        });
        console.log(
            response.data,
            "..........STUDENTS_DETAILS....................."
        );
        dispatch({
            type: ActionType.GET_STUDENT_DETAIL_SUCCESS,
            payload: response.data?.data,
        });
    } catch (e) {
        dispatch({
            type: ActionType.GET_STUDENT_DETAIL_ERROR,
            payload: e,
        });
    }
};

export const getClassBreadcrumb =
    (id: number) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.GET_BREADCRUMB_LOADING,
        });
        try {
            let response = await axios.get(
                `${config.defaults.api_url}/admin/classroom/${id}/details`,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "CLASS DETAILS");
            let breadcrumbs = {
                ...response.data?.data,
            };
            dispatch({
                type: ActionType.GET_BREADCRUMB_SUCCESS,
                payload: {
                    breadcrumbs,
                    logo: response.data?.data?.school_details?.district_logo,
                },
            });
        } catch (e) {
            dispatch({
                type: ActionType.GET_BREADCRUMB_ERROR,
                payload: e,
            });
        }
    };

export const getSchoolBreadcrumb =
    (id: number) => async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.GET_BREADCRUMB_LOADING,
        });
        try {
            let response = await axios.get(
                `${config.defaults.api_url}/admin/schools/${id}/details`,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            console.log(response.data, "SCHOOL DETAILS");
            let breadcrumbs = {
                school_name: response.data?.data?.school_details?.school_name,
                district_name: response.data?.data?.school_details?.district_name,
                district_id: response.data?.data?.school_details?.district_id,
            };

            dispatch({
                type: ActionType.GET_BREADCRUMB_SUCCESS,
                payload: {
                    breadcrumbs,
                    logo: response.data?.data?.school_details?.district_logo,
                },
            });
        } catch (e) {
            dispatch({
                type: ActionType.GET_BREADCRUMB_ERROR,
                payload: e,
            });
        }
    };

export const setDistrictLogo = (logo: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ActionType.SET_NEW_DISTRICT_LOGO, payload: logo });
};

export const setFlagForFetch = (type: string) => (dispatch: Dispatch) => {
    dispatch({ type: ActionType[type] });
};

export function getAdminSubjects() {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(`${config.defaults.api_url}/admin/subjects`)
                .then((res) => {

                    dispatch({
                        type: ActionType.GET_ADMIN_SUBJECTS,
                        payload: res,
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_ADMIN_SUBJECTS_FAIL,
                payload: {
                    message: "unable to get admin subjects",
                },
            });
        }
    };
}

export function getAdminGrades() {
    return async function (dispatch: Dispatch) {
        try {
            await axios
                .get(`${config.defaults.api_url}/admin/grades`)
                .then((res) => {

                    dispatch({
                        type: ActionType.GET_ADMIN_GRADES,
                        payload: res,
                    });
                });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ActionType.GET_ADMIN_GRADES_FAIL,
                payload: {
                    message: "unable to get admin grades",
                },
            });
        }
    };
}

export async function getGradeAndSubjectsList() {
    return await axios.get(
        `${config.defaults.api_url}/cms/grade/subject/list`
    );
}

export async function welcomeMessage(params: any) {
    return axios.post(
        `${config.defaults.api_url}/admin/management/welcome-messages`,
        params
    );
}

export async function getWelcomeMessage(params: any) {
    let urlString = `${config.defaults.api_url}/admin/management/welcome-messages?grade_id=${params.grade_id}&subject_id=${params.subject_id}&type=${params.type}&role_id=${params.role_id}`;
    return axios.get(urlString);
}

export async function getTransferInfo(student_id: any) {
    let urlString = `${config.defaults.api_url}/admin/management/${student_id}/transfer-info`;
    return axios.get(urlString);
}

export async function transferStudent(data: any) {
    let urlString = `${config.defaults.api_url}/admin/students/transfer-students`;
    return axios.post(urlString, data, {
        headers: {
            apiKey: config.defaults.api_key!,
        },
    });
}

export async function updateWelcomeMessage(id: any, params: any) {
    return axios.put(
        `${config.defaults.api_url}/admin/management/welcome-messages/${id}`,
        params
    );
}

export const resetPasswordAdmin =
    (data: any, setModal: any) => async (dispatch: Dispatch) => {
        let url = `${config.defaults.api_url}/admin/assign/temporary-password`;
        dispatch({
            type: ActionType.RESET_PASSWORD_ADMIN_LOADING,
        });
        try {
            await axios.post(url, data, {
                headers: {
                    apiKey: config.defaults.api_key!,
                },
            });
            setModal(false);
            dispatch({
                type: ActionType.RESET_PASSWORD_ADMIN_SUCCESS,
            });
        } catch (e) {
            dispatch({
                type: ActionType.RESET_PASSWORD_ADMIN_ERROR,
                payload: e,
            });
        }
    };

export async function requestStlReport(districtId: any = null) {
    if (districtId) {
        return axios.get(
            `${config.defaults.api_url}/admin-reports/summative-test-log-request?district_id=${districtId}`
        );
    }
    return axios.get(
        `${config.defaults.api_url}/admin-reports/summative-test-log-request`
    );
}

export async function downloadAccountsExcel() {
    try {
        return fetch(`${config.defaults.api_url}/admin/accounts/download`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookie.get("token")}`,
                apiKey: config.defaults.api_key,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `admin-accounts_${moment(new Date()).format("YYYYMMDD")}.xlsx`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.remove();

            });
    } catch (e) {
        console.log(e);
    }
}

export async function downLoadStlReport(for_user: string) {
    try {
        return fetch(`${config.defaults.api_url}/admin-reports/summative-test-log-report?for_user=${for_user}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookie.get("token")}`,
                apiKey: config.defaults.api_key,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    for_user === 'SCHOOL_ADMIN' ? `SchoolSTLReport.xlsx` : `ClassSTLReport.xlsx`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.remove();

            });
    } catch (e) {
        console.log(e);
    }
    return axios.get(
        `${config.defaults.api_url}/admin-reports/summative-test-log-report?for_user=${for_user}`
    );

}
export async function beforeMergeStudents(data: any) {
    return axios.get(
        `${config.defaults.api_url}/admin/district/before-merge-students`,
        {
            params: data,
        }
    );
}

export const beforeMergeStudentsNew =
    (data: any) => async (dispatch: Dispatch) => {
        try {
            let response = await axios.get(
                `${config.defaults.api_url}/admin/district/before-merge-students`,
                {
                    params: data,
                }
            );
            dispatch({
                type: ActionType.GET_MERGE_STUDENT_SUCCESS,
                payload: response.data,
            });
        } catch (e: any) {
            let error =
                e.response && e?.response?.data && e?.response?.data?.message
                    ? e?.response?.data?.message
                    : "Some Server Error";
            dispatch({
                type: ActionType.GET_MERGE_STUDENT_ERROR,
                payload: error,
            });
        }
    };

export async function mergeStudents(data: any) {
    return axios.put(
        `${config.defaults.api_url}/admin/district/merge-students`,
        data
    );
}

export async function getStlReport(id: any, district_id: any = null) {
    if (district_id) {
        return axios.get(
            `${config.defaults.api_url}/admin-reports/summative-test-log/${id}/${district_id}`
        );
    }
    return axios.get(
        `${config.defaults.api_url}/admin-reports/summative-test-log/${id}`
    );
}

export const updateIsPrincipalForAdmin =
    (is_principal: boolean, admin_id: number, school_id: number) =>
        async (dispatch: Dispatch) => {
            try {
                // dispatch({
                //     type: ActionType.UPDATE_SCHOOL_ADMIN_LOADING,
                // });
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/school-admin/${admin_id}/${school_id}`,
                    { is_principal },
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                dispatch({
                    type: ActionType.UPDATE_IS_PRINCIPAL_SUCCESS,
                    payload: response.data,
                });
            } catch (e: any) {
                let error =
                    e.response && e?.response?.data && e?.response?.data?.message
                        ? e?.response?.data?.message
                        : "Some Server Error";
                dispatch({
                    type: ActionType.UPDATE_IS_PRINCIPAL_ERROR,
                    payload: error,
                });
            }
        };

export const updateSchoolAdminDetail =
    (admin_id: number, data: any, setModal: (open: boolean) => void) => async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: ActionType.UPDATE_SCHOOL_ADMIN_LOADING,
            });
            let response = await axios.put(
                `${config.defaults.api_url}/admin/${admin_id}`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            setModal(false)
            dispatch({
                type: ActionType.UPDATE_SCHOOL_ADMIN_SUCCESS,
                payload: response.data,
            });
        } catch (e: any) {
            let error =
                e.response && e?.response?.data && e?.response?.data?.message
                    ? e?.response?.data?.message
                    : "Some Server Error";
            dispatch({
                type: ActionType.UPDATE_SCHOOL_ADMIN_ERROR,
                payload: error,
            });
        }
    };

export const updateClassAdminDetail =
    (admin_id: number, data: any, setModal: (open: boolean) => void) => async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: ActionType.UPDATE_CLASSADMINS_LOADING,
            });
            let response = await axios.put(
                `${config.defaults.api_url}/admin/${admin_id}`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            setModal(false)
            dispatch({
                type: ActionType.UPDATE_CLASSADMINS_SUCCESS,
                payload: response.data,
            });
        } catch (e: any) {
            let error =
                e.response && e?.response?.data && e?.response?.data?.message
                    ? e?.response?.data?.message
                    : "Some Server Error";
            dispatch({
                type: ActionType.UPDATE_CLASSADMINS_ERROR,
                payload: error,
            });
        }
    };
export const updateAdminDetail =
    (admin_id: number, data: any) => async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: ActionType.UPDATE_ADMIN_DETAILS_LOADING,
            });
            let response = await axios.put(
                `${config.defaults.api_url}/admin/${admin_id}`,
                data,
                {
                    headers: {
                        apiKey: config.defaults.api_key!,
                    },
                }
            );
            dispatch({
                type: ActionType.UPDATE_ADMIN_DETAILS_SUCCESS,
                payload: response.data,
            });
        } catch (e: any) {
            let error =
                e.response && e?.response?.data && e?.response?.data?.message
                    ? e?.response?.data?.message
                    : "Some Server Error";
            dispatch({
                type: ActionType.UPDATE_ADMIN_DETAILS_ERROR,
                payload: error,
            });
        }
    };

export const updateIsSuperIntendentFlag =
    (is_superintendent: boolean, admin_id: number, district_id: number) =>
        async (dispatch: Dispatch) => {
            try {
                dispatch({
                    type: ActionType.UPDATE_DISTRICT_ADMIN_LOADING,
                });
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/district-admin/${admin_id}/${district_id}`,
                    { is_superintendent },
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                dispatch({
                    type: ActionType.UPDATE_ADMIN_IS_SUPERINTENDENT_SUCCESS,
                    payload: response.data,
                });
            } catch (e: any) {
                let error =
                    e.response && e?.response?.data && e?.response?.data?.message
                        ? e?.response?.data?.message
                        : "Some Server Error";
                dispatch({
                    type: ActionType.UPDATE_ADMIN_IS_SUPERINTENDENT_ERROR,
                    payload: error,
                });
            }
        };

export const getDistrictDetails = (id: number, school_id: number) => async (dispatch: Dispatch) => {
    try {

        let url = `${config.defaults.api_url}/admin/management/class-list-summmative-analysis/${id}/{test_type}`;
        if (school_id) {
            url = url + `?school_id=${school_id}`
        }
        const response = await axios.get(url);
        if (response?.data?.data) {
            dispatch({
                type: ActionType.SET_DISTRICT_DETAILS,
                payload: { ...response.data.data }
            })
        }
    } catch (error) {
        console.log({ error })
    }
}

export const getSummativeAnalysisReport = (district_id: number, grade_id: number, subject_id: number, test_type: string, school_id: number, subject: string) => async (dispatch: Dispatch) => {
    dispatch({
        type: ActionType.SET_IS_REPORT_LOADING,
        payload: true
    })
    try {
        let url = `${config.defaults.api_url}/admin-reports/summative-objective-analysis-data/${district_id}/${grade_id}/${subject_id}/${test_type}`;
        if (school_id) {
            url = url + `?school_id=${school_id}`
        }
        const response = await axios.get(url)
        if (response?.data?.data) {
            dispatch({
                type: ActionType.SET_SUMMATIVE_ANALYSIS_REPORT,
                payload: { ...response.data.data, subject }
            })

        }
    } catch (error) {
        console.log(error)
    }
    finally {
        dispatch({
            type: ActionType.SET_IS_REPORT_LOADING,
            payload: false
        })
    }
}

export const getAuditReport = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            `${config.defaults.api_url}/admin-reports/audit-report`);
        if (response?.data?.data) {
            dispatch({
                type: ActionType.SET_AUDIT_REPORT,
                payload: { ...response.data.data }
            })
        }

    } catch (error) {
        console.log(error)
    }
}

export const getSchoolAuditReport = (schoolId: number) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            `${config.defaults.api_url}/admin-reports/audit-report/${schoolId}`);
        if (response?.data?.data) {
            dispatch({
                type: ActionType.SET_SCHOOL_AUDIT_REPORT,
                payload: { ...response.data.data }
            })
        }

    } catch (error) {
        console.log(error)
    }
}

export const sendWelcomeEmails = async (type: string, id: number, send: boolean) => {
    try {
        const response = await axios.post(
            `${config.defaults.api_url}/admin/management/${type}/welcome-emails/${id}?send=${send}`);
        return response.data.data
    } catch (error) {
        console.log({ error })
        return;
    }
}

export const checkTestInProgress = async (student_id: number, classroom_id: number) => {
    try {
        const response = await axios.get(
            `${config.defaults.api_url}/admin/students/${student_id}/${classroom_id}/has-tests-inprogress`);
        return response.data.data
    } catch (error) {
        console.log({ error })
        return;
    }
}


export const updateResourcesAccess =
    (id: boolean, has_pdf_access: boolean) =>
        async (dispatch: Dispatch) => {
            try {
                dispatch({
                    type: ActionType.UPDATE_SCHOOLS_LOADING,
                });
                let response = await axios.put(
                    `${config.defaults.api_url}/admin/schools/update/access-pdf`,
                    { id, has_pdf_access },
                    {
                        headers: {
                            apiKey: config.defaults.api_key!,
                        },
                    }
                );
                dispatch({
                    type: ActionType.UPDATE_SCHOOL_RESOURCE_PERMISSION,
                    payload: response.data,
                });
            } catch (e: any) {
                let error =
                    e.response && e?.response?.data && e?.response?.data?.message
                        ? e?.response?.data?.message
                        : "Some Server Error";
                dispatch({
                    type: ActionType.UPDATE_SCHOOL_RESOURCE_ERROR,
                    payload: error,
                });
            }
        };

/////  SELECTORS
export const isReportLoadingSelector = (state: RootState) => {
    return state.management.isReportLoading
}

export const auditReportSelectror = (state: RootState) => {
    return state.management.auditReport
}

export const schoolAuditReportSelector = (state: RootState) => {
    return state.management.schoolAuditReport
}


export async function addStudentLicense(data: any) {
    return await axios.put(
        `${config.defaults.api_url}/admin/management/school/update-licenses`,
        data,
        {
            headers: {
                apiKey: config.defaults.api_key!,
            },
        }
    );
}

export const getDistrictLogoSelector = (state: RootState) => {
    return state.management.district_logo
}

export function setDistrictMId(id: boolean) {
    return async function (dispatch: Dispatch) {
        sessionStorage.setItem("district_m_id", JSON.stringify(id))
        dispatch({
            type: ActionType.SET_DISTRICT_M_ID,
            payload: id,
        });
    };
}

export function setSchoolMId(id: boolean) {
    return async function (dispatch: Dispatch) {
        sessionStorage.setItem("school_m_id", JSON.stringify(id))
        dispatch({
            type: ActionType.SET_SCHOOL_M_ID,
            payload: id,
        });
    };
}

export function setClassroomMId(id: boolean) {
    return async function (dispatch: Dispatch) {
        sessionStorage.setItem("classroom_m_id", JSON.stringify(id))
        dispatch({
            type: ActionType.SET_CLASS_M_ID,
            payload: id,
        });
    };
}

export async function getClassAllStudents(school_id: any, classroom_id: any) {
    return axios.get(
        `${config.defaults.api_url}/admin/schools/${school_id}/${classroom_id}/students/pdf`,
    );
}

export const getAllStudentsDetails = (classroomId: string) => async (dispatch: Dispatch) => {
    try {
        const { data: { data } } = await axios.get(`${config.defaults.api_url}/admin/students/classroom/${classroomId}/performance`)
        console.log("Response getAllStudentsDetails", { response: data })
        
        dispatch({
            type: ActionType.SET_ALL_STUDENTS_DETAILS,
            payload: data?.performances?.map((performance: any) => {
                return {
                    ...performance,
                    performance: { 
                        classroom_ids: performance.classroom_ids,
                        level: performance.level, 
                        tests: performance.tests 
                    }
                }
            })
        })
    } catch (error: any) {
        console.log("getAllStudentsDetails", { error })
    }
}

export const getAllStudentsPerformances = (state: RootState) => state.management.allStudentsDetails