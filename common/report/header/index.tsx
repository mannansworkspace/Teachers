import ArrowIcon from "assets/img/accordian-box-icon.png";
import { FC } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import DistrictDropdowns from 'components/SummativeObjectiveReport/Dropdowns/index'
import StudentSummativeDropdown from 'components/StudentSummative/headerDropdown'
import { isSafari } from "util/index";
import { useDispatch, useSelector } from "react-redux";
import { setIsPrinted } from "redux/actionCreators/print";
import { isPrintedSelector,  } from "redux/reducers/print";
interface Props {
  classroomName?: string;
  headerClassName?: string;
  testName?: string;
  showDropdown?: boolean,
  onBack?: () => void;
  reportTitle: string;
  reportSubTitle?: string;
  setPrint: () => void;
  setENPrint?: () => void;
  setESPrint?: () => void;
  reportGuide?: string,
  managementDistrictDetails?: any
  districtId?: number
  downloadPdf?: () => void;
  handleReviewTest?: () => void;
  DropDowns?: number,
  schoolId?: number,
  standardBasedDetails?: any
}

const ReportHeader: FC<Props> = ({
  classroomName,
  headerClassName,
  reportTitle,
  reportSubTitle,
  reportGuide,
  testName,
  setPrint,
  onBack,
  setENPrint,
  setESPrint,
  districtId,
  downloadPdf,
  handleReviewTest,
  showDropdown,
  schoolId,
  standardBasedDetails
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const isPrinted = useSelector(isPrintedSelector)

  const onClickBack = () => {
    if (onBack) {
      onBack()
      return
    }
    if (window.history.state && window.history.state.idx > 1) {
      navigate(-1)
    }
    else {

      if (pathname.includes('classroom'))
        navigate('/classroom')
      else if (pathname.includes('management'))
        navigate('/management')
      else
        navigate('/activity')
    }
  };


  const isStudentSummative = reportTitle.startsWith("Student Summative") && showDropdown

  const addPrintCount = () => {
    !isPrinted && dispatch(setIsPrinted(true))
  }

  return (
    <div className={`report__header ${headerClassName}`}>
      <div className="d-flex align-items-center">
        <span className="report__header-link" onClick={onClickBack}>
          <img src={ArrowIcon} alt="" className="report__header-icon" />
        </span>
        <div>
          <h3 className="report__header-title">{`${classroomName || ""
            } ${reportTitle}`} {reportSubTitle ? <span className="sub-title">{reportSubTitle}</span>: ''}</h3>
          {testName && <p className="report__header-text">{testName || ""}</p>}
        </div>
      </div>
      {
        isStudentSummative && <StudentSummativeDropdown />
      }
      {
        reportTitle === 'Summative Objective Analysis' && <DistrictDropdowns id={districtId as number} school_id={schoolId as number} />
      }
      {reportTitle === "Standard Based Report" ? (
        onBack ? (
          <div className="d-flex align-items-center based-buttons">
            <div className="report__header-buttons me-3">
              <button className="btn outline-btn" onClick={downloadPdf}>Download PDF</button>
            </div>
            {
              isSafari && isPrinted ?
                <Link className="mx-2" to={`${pathname}?print=true&lang=${standardBasedDetails.lang}&detailId=${standardBasedDetails.id}`} target="_blank">
                  <button className="btn outline-btn" >Print</button>
                </Link>
                :
                <div className="report__header-buttons">
                  <button className="btn outline-btn" onClick={() => { addPrintCount(); setPrint() }}>Print</button>
                </div>
            }

          </div>
        ) : (
          <div className="d-flex align-items-center based-buttons">
            {

              isSafari && isPrinted ?
                <div>
                  <Link className="mx-2" to={`${pathname}?print=true&lang=en`} target="_blank">
                    <button className="btn outline-btn" >Print All English</button>
                  </Link>

                  <Link to={`${pathname}?print=true&lang=es`} target="_blank">
                    <button className="btn outline-btn" >Print All Spanish</button>
                  </Link>
                </div>

                :
                <>
                  <div className="report__header-buttons me-3">
                    <button className="btn outline-btn" onClick={() => {
                      addPrintCount()
                      setENPrint && setENPrint()
                    }
                    }>Print All English</button>
                  </div>
                  <div className="report__header-buttons">
                    <button className="btn outline-btn" onClick={() => {
                      addPrintCount()
                      setESPrint && setESPrint()}}
                      >Print All Spanish</button>
                  </div>
                </>
            }
          </div>
        )
      ) : (
        <>
          <p className="report__header-guide text-gray">{reportGuide}</p>
          <div className="report__header-buttons based-buttons">
            {handleReviewTest &&
              <button onClick={handleReviewTest} className="btn outline-btn mx-3">
                Review Test
              </button>
            }
            {isSafari && isPrinted ?
              <Link to={`${pathname}?print=true`} target="_blank">
                <button className="btn outline-btn" >Print</button>
              </Link>
              :
              <button onClick={() => {
                addPrintCount()
                setPrint()
                }} className="btn outline-btn">
                Print
              </button>
            }
          </div>
        </>
      )}
    </div>
  );
};
export default ReportHeader;