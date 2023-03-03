/* eslint-disable no-loop-func */

import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "redux/reducers/combine"
import { formatName, isSafari ,browserHeights } from "util/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import Header from "components/common/report/Print/header";
import { isNumber } from 'lodash'
import InfoSection from './infoSection'
import PrintFooter from "components/common/report/Print/footer";

interface Props {
    test_name: string, students: Array<any>, objectives: Array<any>, classroom_name: string
}

const Print: FC<Props> = ({ test_name, students, objectives, classroom_name }) => {
    let report = useSelector((state: RootState) => state.classroom.summativeReport);
    const objectivesPerPage = 21
    const totalTabs = Math.ceil(objectives.length / objectivesPerPage)

    const studentsPerPage = useMemo(() => {
        if (isSafari) {
            return 23
        }

        return 30
    }, [])

    const evaluatePerfomanceLevel = (percentage: number) => {
        if (percentage >= 85)
            return "summative-border-advanced";
        else if (percentage >= 70 && percentage <= 84)
            return "summative-border-proficient"
        else if (percentage >= 52 && percentage <= 69)
            return "summative-border-basic";
        else return "summative-border-belowBasic";
    }

    const reportFooter: any = {
        total: <div className="report__tested-title">Total Students Tested</div>,
        A: <div className="report__tested-title">
            <div className="d-flex justify-content-end align-items-center">
                <span className="report__tested-rectangle advanced"></span>
                <span className="report__tested-text">Advanced</span>
            </div>
        </div>,
        P: <div className="report__tested-title">
            <div className="d-flex justify-content-end align-items-center">
                <span className="report__tested-rectangle proficient"></span>
                <span className="report__tested-text">Proficient</span>
            </div>
        </div>,
        B: <div className="report__tested-title">
            <div className="d-flex justify-content-end align-items-center">
                <span className="report__tested-rectangle basic"></span>
                <span className="report__tested-text">Basic</span>
            </div>
        </div>,
        BB: <div className="report__tested-title below" style={{ marginRight: '5px' }}>
            <div className="d-flex justify-content-end align-items-center">
                <span className="report__tested-rectangle below"></span>
                <span className="report__tested-text" >Below Basic</span>
            </div>
        </div>
    }

    const contentGenerator = useMemo(() => {
        let toPrint: any;

        if (!students) {
            return
        }

        const studentsOnFirstPage = studentsPerPage - 7

        return Array.from(Array(totalTabs).keys()).map((_, tabIndex) => {

            toPrint = []
            const slicedObjectives = objectives?.slice(tabIndex * objectivesPerPage, (tabIndex * objectivesPerPage + objectivesPerPage))

            for (let startIndex = 0, endIndex = tabIndex ? studentsPerPage : studentsOnFirstPage; startIndex === 0 || endIndex <= students.length;) {
                const slicedStudents = students?.slice(startIndex, endIndex)

                toPrint.push(
                    <div className={`class-summative-report-print report__data ${(tabIndex || startIndex) && 'next_page_break'}`}>
                        <div className={`${browserHeights}`}>
                            <Header
                                title={`Classroom ${test_name?.split('-').pop()} Summative Report`}
                                class_name={classroom_name || ""}
                                test_name={test_name || ""}
                            />

                            {
                                !tabIndex && !startIndex && <InfoSection />
                            }
                            <div className={`report__data-header summitive-data-header ${(tabIndex || startIndex) && 'mt-5'}`}>
                                <div className="report__data-objective summitive-objective-width">
                                    <p>Objective Question Count</p>
                                    <p>
                                        Formative Assessed
                                    </p>
                                </div>
                                {
                                    slicedObjectives.map((info: any, index: number) => {
                                        return <div key={index} className="report__data-questions">
                                            <span className="report__data-text">
                                                <span>{info.objective_number}</span>
                                            </span>
                                            <span className="report__data-count">{info.num_of_question}</span>
                                            {
                                                info?.fomativeGiven && <span className="report__data-count">
                                                    <FontAwesomeIcon icon={faCircleCheck} />
                                                </span>
                                            }
                                        </div>
                                    }
                                    )
                                }
                                <div className="report__data-benchmark">
                                    <p className="report__data-benchmarkTitle">
                                        <span>*Benchmarked</span>
                                    </p>
                                    <p className="report__data-score">(# Correct) <br /> Score</p>
                                </div>

                                <div className="report__data-summative">
                                    <p className="report__data-summativeTitle">*Summative</p>
                                    <p className="report__data-score">(# Correct) <br /> Score</p>
                                </div>
                            </div>

                            <div className="report-table-container">

                                <table className="report__table">
                                    <tbody>
                                        {
                                            slicedStudents.map((student: any, index: number) => {

                                                const benchmarkProficiency = evaluatePerfomanceLevel(student?.benchmark_formative_percentage)
                                                const summativeProficiency = evaluatePerfomanceLevel(student?.percentage)
                                                return (
                                                    <tr className={`${index % 2 !== 0 ? "dark-gray" : ''} ${index === 0 ? 'first-row' : ''}`} >
                                                        <td className="report__table-name">{formatName(student.student_Name)}</td>

                                                        {
                                                            objectives?.slice(tabIndex * objectivesPerPage, (tabIndex * objectivesPerPage + objectivesPerPage)).map((info: any, index: number) => {
                                                                const objectiveInfo = student.objectives?.find((objective: any) => objective?.objective_number === info.objective_number)
                                                                const proficiency = evaluatePerfomanceLevel(objectiveInfo?.percentage)
                                                                return (
                                                                    <td key={index} data-tip={objectiveInfo?.percentage} className={`report__table-data summative-report-print`}>
                                                                        {
                                                                            <span className={`color-3e3e3e ${proficiency} report__table-numbers ${(objectiveInfo?.formative_given && objectiveInfo?.percentage > 33) ? 'rounded-circle' : ''}`}>
                                                                                <b  >{isNumber(objectiveInfo?.percentage) ? objectiveInfo?.percentage : '-'}</b>
                                                                            </span>
                                                                        }
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                        <td className="report__table-empty"></td>
                                                        <td className="report__table-benchmark">
                                                            <div className="d-flex align-items-center justify-content-end">
                                                                <span className="report__table-questions">{`(${student?.benchmark_given_formatives}/${student?.benchmark_total_formatives})`}</span>
                                                                <span className={`color-3e3e3e ${benchmarkProficiency} report__table-numbers rounded-circle`}>{student.benchmark_formative_percentage}</span>
                                                            </div>
                                                        </td>
                                                        <td className="report__table-summative">
                                                            <div className="d-flex align-items-center justify-content-end">
                                                                <span className="report__table-questions">{`(${student.correct_summatives}/${student.total_summatives})`}</span>
                                                                <span className={`color-3e3e3e ${summativeProficiency} report__table-numbers`}>{student.percentage}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {
                                Object.keys(reportFooter).map((row, index) => {
                                    return (
                                        <div className={`${index % 2 !== 0 ? "dark-gray" : ''} report__tested`} >
                                            {reportFooter[row]}
                                            {
                                                objectives?.slice(tabIndex * objectivesPerPage, (tabIndex * objectivesPerPage + objectivesPerPage)).map((info: any) => {
                                                    if (row !== 'BB')
                                                        return (

                                                            <span className={`report__tested-data`}>
                                                                <span>{info[row]}</span>
                                                            </span>
                                                        )
                                                    else
                                                        return (
                                                            <div className="print-report-last-row report__tested-questions summative-questions">
                                                                <span className={`report__tested-belowData basic-no `}>{info[row]}</span>
                                                                <span className={`report__tested-objective`}>
                                                                    <span className={`report__tested-objectiveData summative`}>{info.objective_number}</span>
                                                                </span>
                                                            </div>
                                                        )
                                                })

                                            }
                                            <div className="report__data-benchmark print-summative"></div>
                                            <div className="report__data-summative"></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <PrintFooter
                            text={<>
                                *Benchmarked and Summative totals/proficiency<br /> include all objectives, not just those on this page
                            </>
                            }
                        />
                    </div>
                )

                startIndex = endIndex;
                endIndex += Math.min(Math.max(1, students.length - (endIndex)), studentsPerPage);
            }

            return toPrint
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [report, totalTabs])


    return (
        <div className="report">
            {report && contentGenerator}
        </div >
    )

}
export default Print