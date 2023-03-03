import { FC, useMemo, useRef } from "react"
import PrintHeader from 'components/common/report/Print/header'
import InfoSection from "../infoSection";
import TableHeader from "../table/header";
import TableBody from "../table/body";
import PrintFooter from "components/common/report/Print/footer";
import { isChrome, isFirefox, isSafari , browserHeights} from "util/index";

interface Props {
    total_students: number,
    total_students_tested: number,
    students: any,
    school_name: string
}

const SchoolAuditPrint: FC<Props> = ({ school_name, total_students, total_students_tested, students }) => {
    const indexRef = useRef<number>(0)

    const PrintContent = useMemo(() => {
        const toPrint = []
        let currentPage = 0
        indexRef.current = 0
        
        const PageHeight = () =>{
            if(isFirefox)
                return 900
            else if(isSafari){
                return 800
            }
            else if(isChrome)
                return 1000
            
            return 900
        }

        const recordGenerator = () => {
            const infoHeight = 125
            const rowHeight = 26
            let pageHeight = PageHeight()
            const recordsToPrint = []

            pageHeight = currentPage ? pageHeight : pageHeight - infoHeight

            while (pageHeight >= rowHeight) {
                const student = students[indexRef.current]
                if (indexRef.current >= students.length) {
                    break
                }
                if (student) {
                    recordsToPrint.push(
                        <TableBody
                            student={student}
                        />
                    )
                }
                indexRef.current++
                pageHeight -= rowHeight
            }
            return recordsToPrint
        }

        while (indexRef.current < students.length) {

            toPrint.push(
                <div className={`${currentPage ? 'add-page-break' : ''} school-audit-report-print`}>
                    <PrintHeader
                        title="School Audit Report"
                        test_name={school_name}
                    />
                    <div className={`auditStudentReport__mainContainer ${browserHeights}`}>
                        <div>
                        {
                            !currentPage && <div className="d-flex auditStudentReport__center">
                                <InfoSection
                                    totalStudents={total_students}
                                    totalTestedStudents={total_students_tested}
                                />

                            </div>
                        }

                        <div className="auditStudentReport__overflow mx-auto">
                            <table className="auditStudentReport__table">
                                <thead className="auditStudentReport__table__head">
                                    <TableHeader />
                                </thead>
                                <tbody>
                                    {recordGenerator()}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    <PrintFooter />
                </div>
            )
            currentPage++;
        }

        return toPrint

    }, [students, total_students, total_students_tested, school_name])

    return <>
        {PrintContent}
    </>

}
export default SchoolAuditPrint