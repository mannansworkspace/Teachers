import { FC } from "react"
import { Link } from "react-router-dom"

interface Props {
    currentPage: number;
    singleAnswer: any, 
    summativeId?: string ,  
    index:number,
    isPrint? : boolean 
}

const Records: FC<Props> = (props) => {
    const { currentPage, singleAnswer, summativeId , index ,isPrint} = props;
    const { answer, correct, description, objective_number, question } = singleAnswer
    const AnswerMap = {
        '0': 'A',
        '1': 'B',
        '2': 'C',
        '3': 'D'
    }

    type AnswerKey = keyof typeof AnswerMap

    return (
        <tr key={index} className='StudentSummativeReport__tableContainer__body__row'>
            <td className='text-right'>
                <span className="questionContent">
                    <Link className={'text-dark'} to={`/preview/summatives/${summativeId}/${question}`} target={'_blank'}>
                        {isPrint ? (index+1) : (currentPage*20) + (index+1)  }
                    </Link>
                </span>
            </td>
            <td className='textAlignmentTableContent'>
                <span className={`square ${correct ? 'correct' : answer?.length && 'incorrect'}`}>{AnswerMap[answer as AnswerKey]}</span>
            </td>
            <td>{description}</td>
            <td>
                <span className="objective-data">{objective_number}</span>
            </td>
        </tr >
    )
}
export default Records