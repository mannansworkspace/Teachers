import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionType from "redux/actionTypes";
import {
  downLoadStlReport
} from "redux/actionCreators/management";
import React from "react";

const StlSchoolButton = () => {
  const [loading, setLoading] = useState(false); 
  const { management } = useSelector((state: any) => state);
  const dispatch = useDispatch();
     
  const download = async() => {
    if (management.stlSchoolLoading) {
      setLoading(true)
      await downLoadStlReport('SCHOOL_ADMIN');
      dispatch({
        type: ActionType.SET_STL_SCHOOL_LOADING,
        payload: false,
      });
      setLoading(false)
    }
  };

  return (
    <div className="download-report">
      <button
        onClick={download}
        className={`download-report__btn ${
          management.stlSchoolLoading ? "change-color" : ""
        }`}
      >
        Download STL Report
        {loading && (
          <div className="download-report__btn-flashing"></div>
        )}
        <span
          className="download-report__btn-text"
          onClick={(e) => {
            dispatch({
              type: ActionType.SET_STL_SCHOOL_LOADING,
              payload: false,
            });
            e.stopPropagation();
          }}
        >
          <span className="download-report__btn-close">&times;</span>
        </span>
      </button>
    </div>
  );
};

export default StlSchoolButton;
