import axios from "util/axios";
import FormData from "form-data";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";

import config from "config/config";

export const getAllResources =
  (gradeId: number, subjectId: number) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.GET_RESOURCES_LOADING
    });
    try {
      let response = await axios.get(
        `${config.defaults.api_url}/activity/admin/resources/${gradeId}/${subjectId}`,
        {
          headers: {
            apiKey: config.defaults.api_key!
          }
        }
      );
      console.log(response.data, "................RESOURCES...............");
      dispatch({
        type: ActionType.GET_RESOURCES_SUCCESS,
        payload: response.data?.data
      });
    } catch (e) {
      dispatch({
        type: ActionType.GET_RESOURCES_ERROR,
        payload: e
      });
    }
  };

export const addResource =
  (data: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.ADD_RESOURCES_LOADING
    });
    let finalData = new FormData();
    for (var key in data) {
      finalData.append(key, data[key]);
    }
    try {
      let response = await axios.post(
        `${config.defaults.api_url}/admin/management/resources`,
        finalData,
        {
          headers: {
            apiKey: config.defaults.api_key!,
            "content-type": "multipart/form-data"
          }
        }
      );
      console.log(response.data, "ADD RESOURCE..........");
      setModal(false);
      dispatch({
        type: ActionType.ADD_RESOURCES_SUCCESS,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: ActionType.ADD_RESOURCES_ERROR,
        payload: e
      });
    }
  };

export const deleteResource =
  (resourceId: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_RESOURCES_LOADING
    });
    try {
      await axios.delete(
        `${config.defaults.api_url}/admin/management/resources/${resourceId}`,
        {
          headers: {
            apiKey: config.defaults.api_key!
          }
        }
      );
      setModal(false);
      dispatch({
        type: ActionType.DELETE_RESOURCES_SUCCESS
      });
    } catch (e) {
      dispatch({
        type: ActionType.DELETE_RESOURCES_ERROR,
        payload: e
      });
    }
  };

export const updateResource =
  (resourceId: any, data: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_RESOURCES_LOADING
    });
    // let finalData = new FormData();
    // for (var key in data) {
    //   finalData.append(key, data[key]);
    // }
    try {
    await axios.put(
        `${config.defaults.api_url}/admin/management/resources/${resourceId}`,
        data,
        {
          headers: {
            apiKey: config.defaults.api_key!,
            // "content-type": "multipart/form-data"
          }
        }
      );
      setModal(false);
      dispatch({
        type: ActionType.UPDATE_RESOURCES_SUCCESS
      });
    } catch (e) {
      dispatch({
        type: ActionType.UPDATE_RESOURCES_ERROR,
        payload: e
      });
    }
  };

export const sortResource =
  (resources: any, data: any, category: any) => async (dispatch: Dispatch) => {
    // dispatch({
    //   type: ActionType.SORT_RESOURCES_LOADING
    // });
    dispatch({
      type: ActionType.SORT_RESOURCES_SUCCESS,
      payload: resources
    });
    try {
      let finalData = {
        category_type: category,
        resource_ids: data.map((item: any) => item.id)
      };
      let response = await axios.put(
        `${config.defaults.api_url}/admin/management/resources`,
        finalData,
        {
          headers: {
            apiKey: config.defaults.api_key!
          }
        }
      );
      console.log(response.data, "SORT......................");
    } catch (e) {
      dispatch({
        type: ActionType.SORT_RESOURCES_ERROR,
        payload: e
      });
    }
  };

  export function resetResources() {
    return async function (dispatch: Dispatch) {
      dispatch({
        type: ActionType.RESET_RESOURCES,
      });
    };
  }
