/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { Modal } from "react-bootstrap";
import CheckCircle from 'assets/img/marked-dark.svg';
import QuestionMarkIcon from "assets/img/question-mark-tooltip-icon.svg";

interface Props {
  isShow: boolean;
  closeModal: () => void;
}

const FormativeAssessedModal: React.FC<Props> = ({
  isShow,
  closeModal,
}) => {
  return (
    <Modal centered show={isShow} onHide={closeModal} onEscapeKeyDown={closeModal}>

      <div className="modal__header">
        <img src={QuestionMarkIcon} className="modal__header-icon" alt="" />
        <h6 className="modal__header-title">{'Formative Assessed'}</h6>
      </div>
      <div className="modal__body">
        <div className="modal__body-objective">
          <div className="modal__body-objectiveTitle">
            <p>Objective Question Count</p>
            <p>Formative Asessed</p>
          </div>

          <div className="modal__body-objectiveData">
            <span className="modal__body-objectiveQuestions">
              <span>6.N.1.4</span>
            </span>
            <span className="modal__body-objectiveNumber">3</span>
            <span className="modal__body-objectiveIcon">
              <img className="" src={CheckCircle} alt="check" />
            </span>
          </div>

        </div>
        <p className="modal__body-text">
          Each question on the summative assessment is aligned to an OAS objective. Objective Question Count indicates the number of questions on the summative aligned to the objective. Formative Assessed indicates that one or more students have completed the formative assessment specific to the objective.
        </p>
        <p className="modal__body-text mb-0"> Each student who has completed the formative assessment for the objective will have their score or performance level shown in a circle instead of a square as shown below.</p>

        <div className="modal__body-row">
          <span className="modal__body-circle">100</span>
          <p>
            Student has taken the formative and scored 33% correct for all questions for the objective on the summative
          </p>
        </div>

        <div className="modal__body-row">
          <span className="modal__body-rectangle">50</span>
          <p>
            Student has not taken the formative and scored 68% correct for all questions for the objective on the summativ
          </p>
        </div>

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

export default FormativeAssessedModal;