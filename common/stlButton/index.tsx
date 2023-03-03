import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionType from "redux/actionTypes";

// interface Props {
//   completed: boolean;
//   loading: string;
//   setLoading: any;
//   url: any;
// }

const StlButton = () => {
  const { management } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  //   const { completed } = props;
  //   const [isCrossed, setIsCrossed] = useState(false);
  //   useEffect(() => {
  //     setIsCrossed(props.loading === "true" ? false : true);
  //   }, [props.loading]);

  const status_text = management.stlLoaded
    ? "Download STL Report"
    : "Preparing STL Report";

  const download = () => {
    if (management.stlUrl) {
      const link = document.createElement("a");
      link.href = management.stlUrl;
      link.download = "stlreport.xlsx";
      link.click();
      dispatch({
        type: ActionType.SET_STL_LOADING,
        payload: false,
      });
      dispatch({
        type: ActionType.SET_STL_LOADED,
        payload: false,
      });
      localStorage.removeItem("stlLoading");
    }
  };
  useEffect(() => {
    console.log(1);
  }, [management.stlLoaded]);

  return (
    <div className='download-report'>
      <button onClick={download}  className={`download-report__btn ${management.stlLoaded ? 'change-color':'' }`}>
        {status_text}
        {!management.stlLoaded && <div className="download-report__btn-flashing"></div>}
        <span
          className="download-report__btn-text"
          onClick={(e) => {
            localStorage.removeItem("stlLoading");
            dispatch({
              type: ActionType.SET_STL_LOADING,
              payload: false,
            });
            e.stopPropagation();
          }}
        >
          <span className="download-report__btn-close">
            &times;
          </span>
        </span>
      </button>
    </div>
  );
};

export default StlButton;
