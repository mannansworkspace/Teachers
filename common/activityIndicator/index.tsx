import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setActivityReportIndicator} from "redux/actionCreators/activity";
import {RootState} from "redux/reducers/combine";

interface Props {
    completed: boolean;
}

const ActivityIndicator: React.FC<Props> = (props) => {
    const {completed} = props;
    const [isCrossed, setIsCrossed] = useState(false);
    const dispatch = useDispatch();
    const {activity} = useSelector((state: RootState) => state);

    const closeIndicatorPermanently = () => {

        let link = localStorage.getItem('link');

        if (link) {
            activity.link = link;
        }

        if (activity.link) {
            const link = document.createElement("a");
            link.href = activity.link;
            link.download = "activity-report.csv";
            link.click();
            dispatch(setActivityReportIndicator(false, false));
            localStorage.removeItem('active');
            localStorage.removeItem('completed');
            localStorage.removeItem('link');
        }
    };

    const status_text = completed
        ? "Download Activity Report"
        : "Preparing Activity Report";

    return (
        <div className={`download-report ${isCrossed ? 'closed' : ''}`}>
            <button
                    onClick={closeIndicatorPermanently}
                    className={`download-report__btn ${completed ? 'change-color' : ''}`}
            >
                {status_text}
                {!completed && <div className="download-report__btn-flashing"></div>}
                <span
                    className="download-report__btn-text"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setActivityReportIndicator(false, false));
                        localStorage.removeItem('active');
                        localStorage.removeItem('completed');
                        localStorage.removeItem('link');
                        setIsCrossed(true);
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

export default ActivityIndicator;
