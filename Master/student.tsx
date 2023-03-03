import { FC } from "react"
import ScoreBox from "./scoreBox"

interface Props {
    student: any,
    tests: any,
    index : number,
}



const Student: FC<Props> = ({ student, tests , index }) => {
    const { last_name, first_name, school_student_id } = student;
    return <tr className="master-report__table-row">
        <div className='d-flex'>
            <td className='master-report__table-studentId'>{school_student_id.slice(-5)}</td>
            <td className='master-report__table-studentName'>
                <span className="ellipsis-animated">
                    <p className={`ellipsis-animated-text ${last_name.concat(first_name).length > 13 ? 'animated ellipsis-animation' : ''}`}>{`${last_name}, ${first_name}`}</p>
                </span>
            </td>
        </div>
        <div className={`master-report__table-marks column-${tests.length}`}>
            {
                tests.map((test: any) => {
                    const studentTest = test.studentsArr.find((studentInTest: any) => studentInTest.id === parseInt(student.id))
                    return (
                        <ScoreBox 
                            student={studentTest}
                            index = {index}
                        />
                    )

                })
            }
        </div>
    </tr>
}
export default Student