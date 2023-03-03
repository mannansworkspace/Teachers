import axios from "util/axios";
import FormData from "form-data";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";
import config from "config/config";
import { v4 as uuidv4 } from 'uuid';

export const uploadCsv = (file: any, district_id: number) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.UPLOAD_CSV_LOADING,
  });
  let data = new FormData();
  data.append("file", file);
  try {
    let response = await axios.post(
      `${config.defaults.api_url}/import/clever/${district_id}`,
      data,
      {
        headers: {
          apiKey: config.defaults.api_key!,
          "content-type": "multipart/form-data",
        },
      }
    );
    let newData = response.data?.data?.students.map(
      (student: any, i: number) => {
        const index = uuidv4();
        let studentCopy = { ...student, index };
        return studentCopy;
      }
    );
    dispatch({
      type: ActionType.UPLOAD_CSV_SUCCESS,
      payload: {
        fileName: file.name,
        results: newData,
        errors: response.data?.data?.errors,
        url: response.data?.data?.url,
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

export const updateStudentClever = 
  (index: any, data: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_CLEVER_LOCAL,
      payload: { index, data },
    });
    setModal(false);
  };

export const deleteStudentClever =
  (index: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_CLEVER_LOCAL,
      payload: { index },
    });
    setModal(false);
  };

export const importData =
  (data: any, district_id: number) => async (dispatch: Dispatch) => {
    data = data.map((ele: any) => {
      if (ele.hasOwnProperty("studentError")) {
        delete ele["studentError"]
      }
      if (ele.hasOwnProperty("cleverError")) {
        delete ele["cleverError"]
      }
      return ele;
    })
    const finalData = {
      data,
    }
    dispatch({
      type: ActionType.IMPORT_DATA_LOADING,
    });
    try {
      let response = await axios.post(
        `${config.defaults.api_url}/import/clever/${district_id}?confirm=true`,
        finalData,
        {
          headers: {
            apiKey: config.defaults.api_key!,
          },
        }
      );
      if (response.data?.data?.errors?.length) {
        let newData = response.data?.data?.students.map(
          (student: any, i: number) => {
            let studentCopy = { ...student, index: i };
            return studentCopy;
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
        dispatch({
          type: ActionType.IMPORT_DATA_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      dispatch({
        type: ActionType.IMPORT_DATA_ERROR,
        payload: e,
      });
    }
  };
