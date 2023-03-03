/* eslint-disable react-hooks/exhaustive-deps */
import PrintFooter from "components/common/report/Print/footer"
import Header from "components/common/report/Print/header"
import { FC, useMemo, useRef } from "react"
import ReportFooter from "../footer"
import InfoSection from "../infoSection"
import Student from "../student"
import { isFirefox, isChrome, isSafari, browserHeights } from "util/index";


interface Props {
    students: any,
    tests: any,
    testNames: any
    class_name: string,
}

const MasterPrint: FC<Props> = ({ students, tests, testNames, class_name }) => {
    const indexRef = useRef<number>(0)

    const reportContent = useMemo(() => {
        const toPrint: any = [];
        let pageNumber = 0
        indexRef.current = 0

        const studentsContent = () => {
            const PageHeight = () => {
                if (isFirefox || isSafari)
                    return 850

                else if (isChrome)
                    return 1000

                return 1000
            }
            let pageSize = PageHeight();
            const rowHeight = 27
            const infoHeight = 100
            const footerHeight = rowHeight * 5

            // add infoHeight only for first page.
            pageSize = pageNumber ? pageSize - footerHeight : pageSize - infoHeight - footerHeight

            const studentRows = []
            while (pageSize >= rowHeight) {
                const student = students[indexRef.current]
                if (student) {
                    studentRows.push(
                        <Student
                            student={student}
                            tests={tests}
                            index={indexRef.current}
                        />
                    )
                }
                indexRef.current = indexRef.current + 1
                pageSize -= rowHeight
            }
            return studentRows
        }

        while (indexRef.current < students.length) {
            toPrint.push(
                <div className={`${pageNumber && 'next_page_break'}`}>
                    <Header
                        title={`Master Report`}
                        class_name={class_name}
                    />
                    {
                        !pageNumber && <InfoSection />

                    }
                    <div className={`master-report-body master-report-print column-${testNames.length}`}>
                        <div className={`${!pageNumber ? 'withHeaderPrint' : 'withoutHeaderPrint'} ${browserHeights}`}>
                        <div className={`master-report__selects tabel-outside-header ${pageNumber && 'mt-5'}`}>

                            <div className='master-report__table-header'>
                                <span className="master-report__table-id">
                                    Student ID <br /> Last 5
                                </span>
                                <span className="master-report__table-name">
                                    Student
                                </span>
                            </div>
                            <div className={`master-report__selects-classes column-${testNames.length}`}>
                                {
                                    testNames.map((name: string, index: number) => (
                                        <div className="studentTests__test">
                                            {'Summ ' + name.split(' ').pop()}
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        <div className='master-report__table-container'>
                            <table className="master-report__table">

                                <tbody className="master-report__body__table__body">
                                    {
                                        studentsContent()
                                    }
                                </tbody>
                            </table>
                        </div>
                        <table className={`master-report__results column-${testNames.length}`}>
                            <div className={`result column-${testNames.length}`}>
                                <tbody>
                                    {
                                        <ReportFooter
                                            tests={tests}
                                        />
                                    }
                                </tbody>
                            </div>
                        </table>
                        </div>
                    </div>
                    <PrintFooter />
                </div>
            )
            pageNumber++;
        }
        return toPrint
    }, [students])


    return <>
        <div className="master-report__body">
            {reportContent}
        </div>

    </>
}
export default MasterPrint