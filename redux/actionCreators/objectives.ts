import axios from "util/axios";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";

import config from "config/config";

export const clearAlreadyExists = () => (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.CLEAR_OBJECTIVES_ALREADY_EXIST,
  });
};

export const getAllObjectives =
  (gradeId: number, subjectId: number, order_by?: string, sort_by?: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.GET_OBJECTIVES_LOADING,
    });
    try {
      let url =  order_by ? `${config.defaults.api_url}/admin/objectives/${gradeId}/${subjectId}?sort_by=${sort_by}&order_by=${order_by}`: `${config.defaults.api_url}/admin/objectives/${gradeId}/${subjectId}`
      let response = await axios.get(
        url,
        {
          headers: {
            apiKey: config.defaults.api_key!,
          },
        }
      );
      console.log(response.data, "................OBJECTIVES...............");
      dispatch({
        type: ActionType.GET_OBJECTIVES_SUCCESS,
        payload: response.data?.data,
      });
    } catch (e) {
      dispatch({
        type: ActionType.GET_OBJECTIVES_ERROR,
        payload: e,
      });
    }
  };

export const addObjective =
  (data: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.ADD_OBJECTIVES_LOADING,
    });

    try {
      let response = await axios.post(
        `${config.defaults.api_url}/admin/objectives`,
        data,
        {
          headers: {
            apiKey: config.defaults.api_key!,
          },
        }
      );
      console.log(response.data, "ADD Objective..........");
      setModal(false, data);
      dispatch({
        type: ActionType.ADD_OBJECTIVES_SUCCESS,
        payload: response.data,
      });
      return true;
    } catch (e: any) {
      dispatch({
        type: ActionType.ADD_OBJECTIVES_ERROR,
        payload: e.response.data.message,
      });
    }
  };

export const deleteObjective =
  (objectiveId: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_OBJECTIVES_LOADING,
    });
    try {
      await axios.delete(
        `${config.defaults.api_url}/admin/objectives/${objectiveId}`,
        {
          headers: {
            apiKey: config.defaults.api_key!,
          },
        }
      );
      setModal(false);
      dispatch({
        type: ActionType.DELETE_OBJECTIVES_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: ActionType.DELETE_OBJECTIVES_ERROR,
        payload: e,
      });
    }
  };

export const updateObjective =
  (objectiveId: any, data: any, setModal: any) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_OBJECTIVES_LOADING,
    });
    try {
      await axios.put(
        `${config.defaults.api_url}/admin/objectives/${objectiveId}`,
        data,
        {
          headers: {
            apiKey: config.defaults.api_key!,
          },
        }
      );
      setModal(false, data);

      dispatch({
        type: ActionType.UPDATE_OBJECTIVES_SUCCESS,
      });
    } catch (e: any) {

      dispatch({
        type: ActionType.UPDATE_OBJECTIVES_ERROR,
        payload: e.response.data.message,
      });
    }
  };

  export function resetObjectives() {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: ActionType.RESET_OBJECTIVES,
        });
    };
}