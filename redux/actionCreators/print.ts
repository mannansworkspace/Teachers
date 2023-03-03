import { Dispatch } from "redux";
import ActionType from "redux/actionTypes";

export const setIsPrinted = (count:boolean) =>async(dispatch:Dispatch) =>{
    dispatch({
        type:ActionType.SET_LAST_REPORT_PRINT_COUNT,
        payload:count
    })
}