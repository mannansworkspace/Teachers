import axios from "util/axios";
import FormData from "form-data";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";
import config from "config/config";

export const uploadCsv =
  (file: any, district_id: number) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPLOAD_CSV_LOADING,
    });
    let data = new FormData();
    data.append("file", file);
    try {
      let response = await axios.post(
        `${config.defaults.api_url}/import/${district_id}/school/classrooms`,
        data,
        {
          headers: {
            apiKey: config.defaults.api_key!,
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data, "FILE DATA..........................");
      let newData = response.data?.data?.data.map((school: any, i: number) => {
        let schoolCopy = { ...school, index: i };
        let newClasses = schoolCopy?.classrooms.map((item: any, j: number) => {
          let classCopy = { ...item, index: j };
          let newStudents = classCopy.students.map((std: any, k: number) => {
            return { ...std, index: k };
          });
          classCopy.students = newStudents;
          return classCopy;
        });
        schoolCopy.classrooms = newClasses;
        return schoolCopy;
      });
      dispatch({
        type: ActionType.UPLOAD_CSV_SUCCESS,
        payload: {
          fileName: file.name,
          results: newData,
          errors: response.data?.data?.errors,
          url: response.data?.data?.url,
          statusId: response.data?.data?.status_id,
        },
      });
    } catch (e: any) {
      dispatch({
        type: ActionType.UPLOAD_CSV_ERROR,
        payload:
          e.response && e?.response.data
            ? e?.response.data.error
            : "Some Server Error",
      });
    }
  };

export const cancelCsv = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.CANCEL_CSV_UPLOAD,
  });
};

export const updateClass =
  (classIndex: any, data: any, setModal: any) => async (dispatch: Dispatch) => {
    console.log(classIndex, "...................again");
    dispatch({
      type: ActionType.UPDATE_CLASS_LOCAL,
      payload: { indexes: classIndex, data },
    });
    setModal(false);
  };
export const deleteClass =
  (classIndex: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_CLASS_LOCAL,
      payload: { indexes: classIndex },
    });
    setModal(false);
  };

export const deleteSchool =
  (schoolIndex: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_SCHOOL_LOCAL,
      payload: schoolIndex,
    });
    setModal(false);
  };

export const updateStudent =
  (indexes: any, data: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_STUDENT_LOCAL,
      payload: { indexes, data },
    });
    setModal(false);
  };

export const deleteStudent =
  (indexes: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_STUDENT_LOCAL,
      payload: { indexes },
    });
    setModal(false);
  };

export const importData =
  (data: any, url: string, districtId: number, statusId: number) =>
  async (dispatch: Dispatch) => {
    let finalData = {
      url,
      data,
    };
    console.log(finalData, "FINAL.............................");
    dispatch({
      type: ActionType.IMPORT_DATA_LOADING,
    });
    try {

      let response = await axios.post(
        `${config.defaults.api_url}/import/${districtId}/school/classrooms?confirm=true&status_id=${statusId}`,
        finalData,
        {
          headers: {
            apiKey: config.defaults.api_key!,
          },
        }
      );

      if (response.data?.data?.errors?.length) {
        let newData = response.data?.data?.data.map(
          (school: any, i: number) => {
            let schoolCopy = { ...school, index: i };
            let newClasses = schoolCopy?.classrooms.map(
              (item: any, j: number) => {
                let classCopy = { ...item, index: j };
                let newStudents = classCopy.students.map(
                  (std: any, k: number) => {
                    return { ...std, index: k };
                  }
                );
                classCopy.students = newStudents;
                return classCopy;
              }
            );
            schoolCopy.classrooms = newClasses;
            return schoolCopy;
          }
        );
        dispatch({
          type: ActionType.IMPORT_DATA_VALIDATION_ERROR,
          payload: {
            results: newData,
            errors: response.data?.data?.errors,
          },
        });
      } else {
        // dispatch({
        //   type: ActionType.IMPORT_DATA_SUCCESS,
        //   payload: response.data,
        // });
      }
    } catch (e) {
      dispatch({
        type: ActionType.IMPORT_DATA_ERROR,
        payload: e,
      });
    }
  };

  export const importDataStatus =
  (statusId: number) =>
  async (dispatch: Dispatch) => {
    try {
      let response = await axios.get(
        `${config.defaults.api_url}/import/school/classrooms/status/${statusId}`,
        {
          headers: {
            apiKey: config.defaults.api_key!,
          },
        }
      );

      const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
      if (response.data?.data?.status==='success') {
        dispatch({
          type: ActionType.IMPORT_DATA_SUCCESS_STATUS,
          payload: { status:'success',},
        });
        for (let i = 1; i < interval_id; i++) {
          window.clearInterval(i);
        }
      } else if(response.data?.data?.status==='error') {
        dispatch({
          type: ActionType.IMPORT_DATA_ERROR_STATUS,
          payload: { status:'error',},
        });
        for (let i = 1; i < interval_id; i++) {
          window.clearInterval(i);
        }
      }else if(response.data?.data?.status==='pending'){
        dispatch({
          type: ActionType.IMPORT_DATA_PENDING,
          payload: { status:'pending',},
        });
      }
    } catch (e) {
      dispatch({
        type: ActionType.IMPORT_DATA_ERROR,
        payload: e,
      });
    }
  };
