/* eslint-disable react-hooks/exhaustive-deps */

import { FC, useMemo, useState, useRef, useEffect, Fragment } from 'react'
import SearchIconGray from 'assets/img/search-icon-gray.svg'
import ReportHeader from 'components/common/report/header'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getStudentSummativeReport, studentSummativeReportSelector } from 'redux/actionCreators/classroom'
import InfoContent from './infoContent'
import StudentSummativeDetailsPrint from './Print'
import TableHeader from './Table/header'
import Records from './Table/records'
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { useQuery } from 'hooks/useQuery'

const StudentSummativeReport: FC = () => {
    const report = useSelector(studentSummativeReportSelector)
    const { studentId, summativeId , classroomId } = useParams()
    const componentRef = useRef(null);
    const [search, setSearch] = useState<string>("")
    const [answerRowsHeights, setAnswerRowsHeights] = useState<number[]>([])
    const answerRef = useRef<any>(null)
    const dispatch = useDispatch()
    const query = useQuery();
    const print = query.get("print")

    const { answers, testName, studentName } = useMemo(() => {
        if (report) {
            const student = report.students?.find((student: any) => student.student_id === studentId)

            return {
                ...report,
                testName: report.test_name,
                answers: student.answers,
                studentName: student.student_name
            }
        }
        return {
            answers: [],
            testName: '',
            studentName: ''
        }
    }, [report, studentId])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `StudentSummativeReport_${testName?.split('-').pop() || ""}_${studentName}_${moment(new Date()).format("M/DD/YY hh:mmA")}`,
        removeAfterPrint: true,
        onAfterPrint: () => {
            print && window.close()
        }
    });


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (classroomId && summativeId) {
            dispatch(getStudentSummativeReport(parseInt(classroomId), parseInt(summativeId)))
        }
    }, [classroomId, summativeId, dispatch])

    const filteredAnswered = useMemo(() => {
        if (search) {
            return answers.filter((ans: any) => (
                ans.description.toLowerCase().includes(search.toLowerCase()) || ans.objective_number.toLowerCase().includes(search.toLowerCase())
            ))
        }

        return answers;
    }, [search, answers])


    useEffect(() => {
        if(answers.length && answerRef?.current) { 
            setAnswerRowsHeights([...answerRef.current.childNodes].map((node: any) => node.offsetHeight) )
        }  
        
    }, [answers, answerRef?.current])

    useEffect(() => {
        if (report && print && answerRowsHeights) {
            handlePrint()
        }
    }, [report, print, handlePrint, componentRef, answerRowsHeights])


    return (<>
        <div className='StudentSummativeReport '>
        <div className={`hide-on-print ${print && 'hide'}`}>
                <ReportHeader
                    reportTitle='Student Summative'
                    reportSubTitle={`${testName?.split('-').pop() || ""} Report`}
                    setPrint={handlePrint}
                    testName={testName}
                    showDropdown={true}
                />
           
                <div className="StudentSummativeReport-content">
                    <div className="StudentSummativeReport__uperRow">
                        <div className="StudentSummativeReport__uperRow__searchbar">
                            <img src={SearchIconGray} alt="search" />
                            <input
                                type="text"
                                placeholder='Search Objectives'
                                className='form-control'
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <InfoContent />
                    </div>
                    <div className='StudentSummativeReport__tableContainer'>
                        <table>
                            <TableHeader />
                            <tbody ref={answerRef} className='StudentSummativeReport__tableContainer__body'>
                                {
                                    filteredAnswered?.map((answer: any, index: number) =>
                                        <Fragment key={index}>
                                        <Records
                                            index={index}
                                            summativeId={summativeId}
                                            singleAnswer={answer}
                                            currentPage={0}
                                        />
                                        </Fragment>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {
                report &&
                <div className='printData' ref={componentRef}>
                    <StudentSummativeDetailsPrint
                        answers={answers}
                        test_name={testName}
                        studentName={studentName}
                        answerRowsHeights={answerRowsHeights}
                    />
                </div>
            }
        </div>
    </>
    )
}
export default StudentSummativeReport