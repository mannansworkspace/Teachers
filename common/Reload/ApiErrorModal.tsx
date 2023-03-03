import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { showApiErrorModalSelector } from "redux/actionCreators/classroom"
import ActionType from "redux/actionTypes"

const ApiResponseModal = () => {

    const isShow = useSelector(showApiErrorModalSelector)
    const dispatch = useDispatch()
    const setIsShow = () => {
        dispatch({
            type: ActionType.SET_SHOW_API_ERROR_MODAl,
            payload: false
        })
    }



    return <Modal centered show={isShow} onHide={setIsShow} onEscapeKeyDown={setIsShow}>

        <div className="modal__header">
            <h6 className="modal__header-title">
                Something went wrong
            </h6>
        </div>
        <div className="modal__body">
            {/* <p className="modal__body-text">
                Somethinng went wrong
            </p> */}
        </div>
        <div className="modal__footer">
            <button
                className="btn success-btn"
                onClick={setIsShow}
            >
                Try Again
            </button>
        </div>
    </Modal>
}
export default ApiResponseModal