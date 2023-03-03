import ActionType from "redux/actionTypes"
import { RootState } from "./combine"

interface InitialState {
    isPrinted: boolean
}
const initialState: InitialState = {
    isPrinted: false
}

const PrintReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case ActionType.SET_LAST_REPORT_PRINT_COUNT:
            return {
                ...state,
                isPrinted: action.payload
            }
        default:
            return state
    }
}

export default PrintReducer

export const isPrintedSelector = (state: RootState) => state.print.isPrinted