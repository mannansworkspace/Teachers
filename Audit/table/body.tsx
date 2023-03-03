import { FC } from "react";
import CheackGreen from 'assets/img/checked-green.svg'
import WarrningIcon from 'assets/img/warning-icon.png'

const TableBody: FC<{student:any}> = ({student}) => {

    const {student_name ,student_id,tested,last_test_date,isDuplicate } = student
    return <tr>
        <td className="auditStudentReport__table__row__studenttName">
            <span className="ellipsis-animated">
                <p className={`ellipsis-animated-text ${student_name.length > 17 && 'animated ellipsis-animation'}`}>
                    {student_name} {isDuplicate && <span className="warning-icon-print"> <img src={WarrningIcon}  alt="warning" /></span>}
                </p>
            </span>
        </td>
        <td className="auditStudentReport__table__row__studentId">{student_id}</td>
        <td className="auditStudentReport__table__row__assessment">{tested ? <img src={CheackGreen} alt="check" /> : ''}</td>
        <td className="auditStudentReport__table__row__lastTestDate">{last_test_date || ''}</td>
    </tr>
}
export default TableBody
