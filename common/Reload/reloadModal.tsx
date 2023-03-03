import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showModalSafariSelector } from "redux/actionCreators/classroom";
import ActionType from "redux/actionTypes";

const ReloadModal = () => {

    const showSafariModal = useSelector(showModalSafariSelector)
    const dispatch = useDispatch()

    const onCloseModal = () =>{
            dispatch({
                type:ActionType.SET_SHOW_MODAL_SAFARI,
                payload:false
            })        
    }

    return (
        <>
            <Modal
                centered
                show={showSafariModal}
                onEscapeKeyDown={() => onCloseModal()}
                className="modal-black-progress text-white"
                contentClassName="modal-content-blackProgress "
            >
                {/* <div className="modal__header">
              <img className="black__progress-icon" src={BlackSmithImg} alt="" />
              <h3 className="modal__header-title">{studentName}</h3>
            </div> */}
                <div className="modal__body">
                    <div className="black__progress">
                        Please Refresh to Print

                        Due to an issue in Safari, you will need to refresh this screen if you want to print again now that you've cancelled the print dialog.
                    </div>
                </div>
                <div className="modal__footer">
                    <button
                        type="button"
                        className="btn success-btn"
                        onClick={() => onCloseModal()}
                    >
                        Okay
                    </button>
                </div>
            </Modal>
        </>
    );

}
export default ReloadModal