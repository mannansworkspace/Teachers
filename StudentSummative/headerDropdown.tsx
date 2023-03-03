import { TableSelectCommon } from "components/common/selectComponent"
import {  useMemo, useState } from "react"
import {  useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {  studentSummativeReportSelector } from "redux/actionCreators/classroom"
import LeftArrowIcon from "assets/img/arrow-left.png"
import RightArraowIcon from  "assets/img/arrow-right.png"

const HeaderDropDown = () => {
    const [show, setShow] = useState<boolean>(false)
    const report = useSelector(studentSummativeReportSelector)
    const { studentId, classroomId, summativeId } = useParams()
    const navigate = useNavigate()
    const [currentStudentIndex, setCurrentStudentIndex] = useState<number>(null!)
    // const dispatch = useDispatch()

    const { studentOptions, studentName } = useMemo(() => {

        if (report) {
            const { students } = report
            const currentStudentIndex = students.findIndex((student: any) => student.student_id === studentId)
            setCurrentStudentIndex(currentStudentIndex > -1 ? currentStudentIndex : 0)

            return {
                studentOptions: students?.map((student: any, index: number) => ({
                    value: { id: student.student_id, index: index },
                    label: student.student_name
                })),
                studentName: students[currentStudentIndex > -1 ? currentStudentIndex : 0].student_name
            }
        }
        return {
            studentOptions: [], studentName: ''
        }
    }, [report, studentId])

    const onChangeStudent = (studentDetail: any) => {
        const { id } = studentDetail
        studentDetailReport(id)
    }

    const onLeftClick = () => {
        const { value } = studentOptions[currentStudentIndex - 1]
        if( currentStudentIndex - 1 >= 0){
            studentDetailReport(value.id)
        }
    }

    const onRightClick = () => {
        const length = studentOptions?.length

        if (currentStudentIndex + 1 < length) {
            const { value } = studentOptions[currentStudentIndex + 1]
            studentDetailReport(value.id)
        }
    }

    const studentDetailReport = (studentId: number) => {
        navigate(`/classroom/report/summative/student/${classroomId}/${summativeId}/${studentId}`, { replace: true })
    }

    return <div className="table-dropdown-container">
        <button type="button" className="text-btn" onClick={onLeftClick} disabled={currentStudentIndex === 0}>
            <img src={LeftArrowIcon} alt="LeftArrow" />
        </button>
        <TableSelectCommon
            isOpen={show}
            toggleSelect={() => setShow(!show)}
            options={studentOptions || []}
            onChange={onChangeStudent}
            name={studentName}
        />
        <button type="button" className="text-btn" onClick={onRightClick} disabled={currentStudentIndex + 1 > studentOptions?.length - 1}>
            <img src={RightArraowIcon} alt="RightArraow" />
        </button>
    </div>
}
export default HeaderDropDown