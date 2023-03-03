import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionType from "redux/actionTypes";

const StlSingleButton = () => {
  const { management } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const status_text = management.stlSingleLoaded
    ? "Download STL Report"
    : "Preparing STL Report";

  const download = () => {
    if (management.stlSingleUrl) {
      const link = document.createElement("a");
      link.href = management.stlSingleUrl;
      link.download = "stlSinglereport.xlsx";
      link.click();
      dispatch({
        type: ActionType.SET_SINGLE_STL_LOADING,
        payload: false,
      });
      dispatch({
        type: ActionType.SET_SINGLE_STL_LOADED,
        payload: false,
      });
      localStorage.removeItem("stlSingleLoading");
    }
  };
  useEffect(() => {
    console.log(1);
  }, [management.stlSingleLoaded]);

  return (
    <div className="download-report">
      <button
        onClick={download}
        className={`download-report__btn ${
          management.stlSingleLoaded ? "change-color" : ""
        }`}
      >
        {status_text}
        {!management.stlSingleLoaded && (
          <div className="download-report__btn-flashing"></div>
        )}
        <span
          className="download-report__btn-text"
          onClick={(e) => {
            localStorage.removeItem("stlSingleLoading");
            dispatch({
              type: ActionType.SET_SINGLE_STL_LOADING,
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

export default StlSingleButton;
