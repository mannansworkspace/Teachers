import { FC } from "react";
import WarrningIcon from 'assets/img/warning-icon.png'

interface Props {
    totalStudents: number,
    totalTestedStudents: number
}

const InfoSection: FC<Props> = ({ totalStudents, totalTestedStudents }) => {

    return <>
        <div className=" d-flex  auditStudentReport__center__text">
            <div className="d-flex justify-content-center centerData">
            <div className="auditStudentReport__centerParagraph__total-students d-flex flex-column justify-content-center align-items-center text-align--center">
                <p className="auditStudentReport__centerParagraph__total-students__numbers">{totalStudents}</p>
                <p className="auditStudentReport__centerParagraph__total-students__text m-0">Total Students</p>
            </div>
            
            <div className="auditStudentReport__centerParagraph__total-students d-flex flex-column justify-content-center align-items-center text-align--center">
                <p className="auditStudentReport__centerParagraph__total-students__numbers">{totalTestedStudents}</p>
                <p className="auditStudentReport__centerParagraph__total-students__text m-0">Students Tested</p>
            </div>
            </div>
            <div className="d-flex justify-content-center mt-2 auditStudentReport__warning ">
            <img src={WarrningIcon} alt="warning" />
            <p className="auditStudentReport__warning__text">Duplicate student name</p>
        </div>
        </div>
       
       
    </>
}
export default InfoSection