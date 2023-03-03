import { HeaderSkeleton } from "components/common/skeleton/ReportsSkeleton";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import ToolTip from "components/common/Tooltip";

interface Props {
    objectiveClickHandler: Function,
    isLoading: boolean,
    objectives: any,
    students: any
    isIsolated: (objective_number: string) => boolean
}


const TableHeader: FC<Props> = ({ objectiveClickHandler, isLoading, objectives, isIsolated }) => {

    if (isLoading)
        return <HeaderSkeleton rowColumns={21} height={88} />


    return <>{objectives?.map((info: any, index: number) => {

        return (
            <div>

                <div className="report__data-questions">

                    <span
                        className={`report__data-text ${isIsolated(info.objective_number) && 'objective-isolation'}`}
                        onClick={() => objectiveClickHandler(info.objective_number)}
                    >
                        <ToolTip content={info.objective_number}>
                            <span className="report__data-objectiveData">
                                {info.objective_number}
                            </span>
                        </ToolTip>


                    </span>

                    <span className="report__data-count">{info.num_of_question}</span>
                    {
                        info?.fomativeGiven && <span className="report__data-count">
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </span>
                    }

                </div>
            </div>
        )
    })
    }</>
}

export default TableHeader