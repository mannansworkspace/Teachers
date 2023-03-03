import { FC } from 'react'
import { formatName } from "util/index"
import ScoreBox from './ScoreBox';

interface Props {
    student: any;
    index: number;
    showScore: boolean;
    showObjectiveColumn: string;
    objectives: any;
}
const evaluatePerfomanceLevel = (percentage: number) => {
    if (percentage >= 85)
        return "bg-194792";
    else if (percentage >= 70 && percentage <= 84)
        return "bg-3b792f"
    else if (percentage >= 52 && percentage <= 69)
        return "bg-eadb4a";
    else return "bg-c44538";
}

const Student: FC<Props> = (props) => {
    const { student, index, showScore, showObjectiveColumn,objectives } = props;
    // const {objectives} = student
    return (
        <tr className={`summative-row ${index % 2 !== 0 ? "dark-gray" : ''} ${index === 0 ? 'first-row' : ''}`} >
            <td className={`report__table-name summative-table-name report__data-height ${index % 2 !== 0 ? "dark-name" : ''}`}>
                <span className="ellipsis-animated">
                    <p className={`ellipsis-animated-text ${student.student_Name.length > 16 ? 'animated ellipsis-animation' : ''}`}>
                        {formatName(student.student_Name)}
                    </p>
                </span>
            </td>

            {objectives?.map((objective: any, index: number) => {
                const objectiveInfo = student.objectives?.find((studentObjective: any) => studentObjective?.objective_number === objective.objective_number)
                return (
                    <ScoreBox
                        showScore={showScore}
                        showObjectiveColumn={showObjectiveColumn}
                        objectiveInfo={objectiveInfo}
                    />

                )
            })
            }
            <td className="report__table-empty report__data-height"></td>
            <td className="report__table-benchmark report__data-height">
                <div className="d-flex align-items-center justify-content-end">
                    <span className="report__table-questions">{`(${student?.benchmark_given_formatives}/${student?.benchmark_total_formatives})`}</span>
                    <span className={`${evaluatePerfomanceLevel(student?.benchmark_formative_percentage)} report__table-numbers rounded-circle ${student.benchmark_formative_percentage > 99 ? 'fw-12' :''} ${student.benchmark_formative_percentage > 999 ? 'fw-10' :''}`}>{student.benchmark_formative_percentage}</span>
                </div>
            </td>
            <td className="report__table-summative report__data-height">
                <div className="d-flex align-items-center justify-content-end">
                    <span className="report__table-questions">{`(${student.correct_summatives}/${student.total_summatives})`}</span>
                    <span className={`${evaluatePerfomanceLevel(student?.percentage)} report__table-numbers`}>{student.percentage}</span>
                </div>
            </td>
        </tr>
    )
}

export default Student