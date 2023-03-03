import axios from "util/axios";
import FormData from "form-data";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";
import config from "config/config";

export const uploadCsv = (file: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.UPLOAD_CSV_LOADING,
  });
  let data = new FormData();
  data.append("file", file);
  try {
    let response = await axios.post(
      `${config.defaults.api_url}/import/district/school?confirm=false`,
      data,
      {
        headers: {
          apiKey: config.defaults.api_key!,
          "content-type": "multipart/form-data",
        },
      }
    );
    const csvData: any = response.data?.data?.data.map((data: any) => {
      data.admins.sort(
        (a: any, b: any) => a.admin_last_name.localeCompare(b.admin_last_name)
        // &&
        // b.is_super_principal
        //   .toUpperCase()
        //   .localeCompare(a.is_super_principal.toUpperCase())
      );

      let newArray = data.admins.filter(
        (admin: any) => admin.is_super_principal.toUpperCase() !== "Y"
      );
      const filteredY = data.admins.filter(
        (admin: any) => admin.is_super_principal.toUpperCase() === "Y"
      );
      return {
        ...data,
        admins: [...filteredY, ...newArray],
      };
    });
    dispatch({
      type: ActionType.UPLOAD_CSV_SUCCESS,
      payload: {
        fileName: file.name,
        results: csvData,
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

export const importData =
  (data: any, url: string) => async (dispatch: Dispatch) => {
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
        `${config.defaults.api_url}/import/district/school?confirm=true`,
        finalData,
        {
          headers: {
            apiKey: config.defaults.api_key!,
          },
        }
      );
      console.log(
        response.data?.data?.data,
        "FINAL DATA.........................."
      );
      if (
        response.data?.data?.errors?.length &&
        !response.data?.data?.success
      ) {
        dispatch({
          type: ActionType.IMPORT_DATA_VALIDATION_ERROR,
          payload: {
            results: response.data?.data?.data,
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

export const updateSchoolAdmin =
  (data: any, indexes: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_SCHOOL_ADMIN_LOCAL,
      payload: { data, indexes },
    });
    setModal(false);
  };

export const deleteDistrictAdmin =
  (index: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_DISTRICT_ADMIN_LOCAL,
      payload: index,
    });
    setModal(false);
};

export const deleteSchoolAdmin =
  (indexes: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_SCHOOL_ADMIN_LOCAL,
      payload: indexes,
    });
    setModal(false);
  };

export const updateSchool =
  (data: any, index: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_SCHOOL_LOCAL,
      payload: { data, index },
    });
    setModal(false);
  };

export const deleteSchool =
  (index: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.DELETE_SCHOOL_LOCAL,
      payload: index,
    });
    setModal(false);
  };

export const updateDistrict =
  (data: any, setModal: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_DISTRICT_LOCAL,
      payload: data,
    });
    setModal(false);
  };

// export const updateDistrictAdmin =
//   (data: any, index: number, setModal: any) => async (dispatch: Dispatch) => {
//     console.log("isndied functions..");
//     dispatch({
//       type: ActionType.UPDATE_DISTRICT_ADMIN_LOCAL,
//       payload: { data, index },
//     });
//     setModal(false);
//   };
