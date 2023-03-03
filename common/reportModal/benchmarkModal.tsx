/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { Modal } from "react-bootstrap";
import QuestionMarkIcon from "assets/img/question-mark-tooltip-icon.svg";

interface Props {
    isShow: boolean;
    closeModal: () => void;
}

const BenchmarkModal: React.FC<Props> = ({
    isShow,
    closeModal,
}) => {
    return (
        <Modal centered show={isShow} onHide={closeModal} onEscapeKeyDown={closeModal}>

            <div className="modal__header">
                <img src={QuestionMarkIcon} className="modal__header-icon" alt="" />
                <h6 className="modal__header-title">{'Benchmarked Column'}</h6>
            </div>
            <div className="modal__body">
                <div className="modal__body-benchmark">
                    <p className="modal__body-tex mb-0">(18/19)</p>
                    <span>95</span>
                </div>
                <p className="modal__body-text">
                    The <b> Benchmarked column</b> shows you the performance of the student on all summative questions aligned to an objective for which the student has completed the formative assessments (indicated by a circle). In the above example, there were 19 of these questions. The student answered 18 correctly resulting in a score of 95%.
                </p>
                <p className="modal__body-text mb-0">
                    This benchmark allows you to compare the performance of those questions on the summative where the student has taken the formatives aligned to the question’s objective to those questions where the formatives were not completed.
                </p>


            </div>
            <div className="modal__footer">
                <button
                    className="btn success-btn"
                    onClick={closeModal}
                >
                    Got it
                </button>
            </div>

        </Modal>
    );
};

export default BenchmarkModal;