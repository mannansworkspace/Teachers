/* eslint-disable react-hooks/exhaustive-deps */
import SearchIconGray from 'assets/img/search-icon-gray.svg'
import ReportHeader from 'components/common/report/header'
import { TableSelectCommon } from 'components/common/selectComponent'
import { useEffect, useMemo, useState, useRef } from 'react'
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { getMasterReport, resetReportData } from 'redux/actionCreators/classroom'
import { RootState } from 'redux/reducers/combine'
import ReportFooter from './footer'
import InfoSection from './infoSection'
import MasterPrint from './Print'
import Student from './student'
import { MasterHeaderSkeleton, MasterBodySkeleton } from 'components/common/skeleton/ReportsSkeleton';
import { useQuery } from 'hooks/useQuery';

const options = [
  { value: 'Grade Frequency and Distribution', label: 'Grade Frequency and Distribution' },
  { value: 'itemResponseReport', label: 'Item Response Report' },
  { value: 'Standards at Risk', label: 'Standards at Risk' },
  { value: 'summative', label: 'Classroom Summative Report' },
  { value: 'Student Summative Report', label: 'Student Summative Report' },
];

const Report = () => {

  const dispatch = useDispatch()
  const report = useSelector((state: RootState) => state.classroom.masterReport)
  const { classroom_id }: any = useParams();
  const [search, setSearch] = useState<string>('')
  const [dropdownIndex, setdropdownIndex] = useState<number>(null!)
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef(null);

  const query = useQuery();
  const print = query.get("print")

  useEffect(() => {
    return () => {
      dispatch(resetReportData('RESET_MASTER_REPORT'));
    };
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { students, test_stats, testNames, class_name } = useMemo(() => {
    if (report?.data) {

      //// remove this after work
      const students = report.data.students.sort((a: any, b: any) => {
        return a.last_name.localeCompare(b.last_name)
      })

      const testNamesData = report.data.test_stats
      setIsLoading(false);
      return {
        ...report.data,
        students: students,
        testNames: _.orderBy(testNamesData, ['test_type'], ['asc']).map((test: any) => test.test_name)
      }
    }
    return {
      students: [],
      test_stats: [],
      testNames: []
    }
  }, [report]);

  const Students = useMemo(() => {
    if (!students)
      return

    if (search) {
      return students.filter((student: any) => {
        return `${student.last_name + student.first_name}`.toLowerCase().includes(search.toLowerCase()) || student.id?.toString().includes(search.toLowerCase())
      })
    }
    return students

  }, [search, students])

  useEffect(() => {
    dispatch(getMasterReport(parseInt(classroom_id)))
    setIsLoading(true);
  }, [dispatch, classroom_id])

  const selectReport = (reportName: string, summativeId: number) => {

    if (reportName === 'summative') {
      window.open(`/classroom/report/summative/${summativeId}/${classroom_id}`, '_blank')
    }
    if (reportName === 'Grade Frequency and Distribution') {
      window.open(`/classroom/report/grade-frequency-distribution/${classroom_id}`, '_blank')
    }

    if (reportName === 'Standards at Risk') {
      window.open(`/classroom/report/standard-at-risk/${classroom_id}/${summativeId}`);
    }

    if (reportName === 'itemResponseReport') {
      window.open(`/classroom/report/item-response-report-summative/${summativeId}/${classroom_id}`, '_blank');
    }

    if (reportName === 'Student Summative Report') {
      window.open(`/classroom/report/summative/student/${classroom_id}/${summativeId}`, '_blank');
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `MasterReport_${class_name}_${moment(new Date()).format("M/DD/YY hh:mmA")}`,
    removeAfterPrint: true,
    onAfterPrint: () => {
      print && window.close()
    }
  });

  useEffect(() => {
    if (report && print) {
      handlePrint()
    }
  }, [report])

  return (
    <>
      {
        !print &&
          <div className="master-report hide-on-print">
            <ReportHeader
              reportTitle='Master Report'
              reportGuide=''
              testName='Summatives'
              setPrint={handlePrint}
            />
            <div className="master-report-content">
              <InfoSection />

              <div className="master-report__search">
                <div className="master-report__search-bar">
                  {!isLoading &&
                    <img src={SearchIconGray} className="report__search-icon animated-fade" alt="" />
                  }
                  <input
                    className={`form-control report__search-input ${isLoading ? 'margin-left' : ''}`}
                    type="search"
                    name="Search"
                    placeholder="Search Students"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className={`master-report-body column-${testNames.length}`}>

                <div className="master-report__selects tabel-outside-header">

                  <div className='master-report__table-header'>
                    <span className="master-report__table-id">
                      Student ID <br/> Last 5 
                    </span>
                    <span className="master-report__table-name">
                      Student
                    </span>
                  </div>
                  <div className="master-report__selects-wrapper">
                    {!isLoading ? testNames.map((name: string, index: number) => (
                      <div className='master-report__selects-select' key={index}>
                        <TableSelectCommon
                          isOpen={dropdownIndex !== null && dropdownIndex === index}
                          toggleSelect={() => {
                            if (dropdownIndex !== null) {
                              if (dropdownIndex !== index) {
                                setdropdownIndex(index)
                                return
                              }
                              setdropdownIndex(null!)
                            }
                            else {
                              setdropdownIndex(index)
                            }
                          }}
                          options={options}
                          onChange={(value: any) => selectReport(value, _.orderBy(test_stats, ['test_type'], ['asc'])[index].id)}
                          isReport={true}
                          name={'Summ ' + name.split(' ').pop()}
                        />
                      </div>
                    ))
                      : <MasterHeaderSkeleton rowColumns={3} borderRadius={0} />
                    }
                  </div>

                </div>

                <div className={`master-report__table-container ${Students.length > 15 && !isLoading ? 'increase-height' : ''}`}>
                  <table className="master-report__table">

                    <tbody className="master-report__body__table__body">
                      {!Students.length && !isLoading &&
                        <tr className="dark-gray text-center">
                          <td className="report__table-notFound">No Students Found</td>
                        </tr>
                      }
                      {!isLoading ? Students.map((student: any, index: number) => (
                        <Student
                          student={student}
                          tests={_.orderBy(test_stats, ['test_type'], ['asc'])}
                          index={index}
                        />
                      ))
                        : <MasterBodySkeleton rows={15} />
                      }
                    </tbody>
                  </table>
                </div>

                <table className={`master-report__results ${Students.length > 15 && !isLoading ? 'move-up' : ''}`}>
                  <div className="result">
                    <tbody>
                      {
                        <ReportFooter
                          tests={_.orderBy(test_stats, ['test_type'], ['asc'])}
                          isLoading={isLoading}
                        />
                      }
                    </tbody>
                  </div>
                </table>
              </div>

            </div>
          </div>
      }
      <div className='printData' ref={componentRef}>
        <MasterPrint
          students={students}
          tests={_.orderBy(test_stats, ['test_type'], ['asc'])}
          testNames={testNames}
          class_name={class_name || ""}
        />
      </div>
    </>
  )
}
export default Report
