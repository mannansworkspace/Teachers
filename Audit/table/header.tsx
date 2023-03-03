
export const TableHeader = () =>  {
    return <tr className="auditStudentReport__table__row">
        <th className="auditStudentReport__table__row__studenttName fontBold ">Student Name</th>
        <th className="auditStudentReport__table__row__studentId fontBold ">Student ID</th>
        <th className="auditStudentReport__table__row__assessment fontBold">Assessment Taken</th>
        <th className="auditStudentReport__table__row__lastTestDate fontBold">Last Test Date</th>
    </tr>
}
export default TableHeader