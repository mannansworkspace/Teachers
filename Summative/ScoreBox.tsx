import { FC, useMemo } from 'react'
import Tooltip from 'components/common/Tooltip'
import { isNumber } from 'lodash'
interface Props {
    showScore: boolean;
    showObjectiveColumn: string;
    objectiveInfo: any
}

const ScoreBox: FC<Props> = (props) => {
    const { showScore, objectiveInfo, showObjectiveColumn } = props
    const { percentage } = objectiveInfo

    const proficiencyLevel = useMemo(() => {
        if (percentage >= 85)
            return "bg-194792"
        else if (percentage >= 70 && percentage <= 84)
            return "bg-3b792f"
        else if (percentage >= 52 && percentage <= 69)
            return 'bg-eadb4a'
        else
            return "bg-c44538"
    }, [percentage])


    const isRounded = useMemo(() => {
        if (objectiveInfo?.formative_given && objectiveInfo?.percentage > 33)
            return 'rounded-circle'
        return ''
    }, [objectiveInfo])

    return (
        <Tooltip
            display={!showScore}
            content={objectiveInfo?.percentage}
        >
            <td className="report__table-data">
                {
                    <span className={`
                        report__table-numbers 
                        ${showObjectiveColumn && showObjectiveColumn !== objectiveInfo.objective_number ? 'hidden' : ''} 
                        ${proficiencyLevel} ${isRounded}
                    `}>
                        <b >{showScore && (isNumber(objectiveInfo?.percentage) ? objectiveInfo?.percentage : '-') }</b>
                    </span>
                }
            </td>
        </Tooltip>
    )
}

export default ScoreBox;