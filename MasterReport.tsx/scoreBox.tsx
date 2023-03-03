import { FC } from "react"

interface Props {
    student : any,
    index : number,
}

const ProficiencyMap = {
    Advanced : "A",
    BelowBasic : "BB",
    Basic : "B",
    Proficient : "P"
}

type Proficiency = keyof typeof ProficiencyMap

const ScoreBox : FC<Props> = ({student , index}) => {

    if(!student){
        return (
            <td className={`d-flex master-report__table-marks__data ${index % 2!==0 && 'color537AB7'}`}>
            <span className='master-report__table-marks__no-value'>-</span>
        </td>
        )
    }

    const {proficient} = student 
    const proficiencyLevel = proficient >= 85 ? 'Advanced' : proficient >= 70 && proficient <= 84
        ? "Proficient" : proficient >= 52 && proficient <= 69
            ? 'Basic' : "BelowBasic"


    return (
        <td className={`d-flex master-report__table-marks__data ${index % 2!==0 && 'color537AB7'}`}>
            <div className={`master-report__table-marks__box ${proficiencyLevel}`}></div>
            <span className='master-report__table-marks__value'>{`(${ProficiencyMap[proficiencyLevel as Proficiency ]}) ${proficient}`}</span>
        </td>
    )
}
export default ScoreBox