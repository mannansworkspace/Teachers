import { FC, useMemo } from "react"

interface Props {
    objectives: any;
    tabIndex: number;
    onTabChange: (tabIndex: number) => void;
    objectivesPerPage: number;
	customClassName?: string;
}

const ReportTabs: FC<Props> = (props) => {
    const {objectives, tabIndex, onTabChange, objectivesPerPage, customClassName} = props;

    const reportTabs = useMemo(() => {
		const tabs = []
		if (!!objectives.length) {
			const totalTabs = Math.ceil(objectives.length / objectivesPerPage)

			for (let i = 0; i < totalTabs; i++) {
				tabs.push(
					<>
						<input
							type="radio"
							className="report-switch-radio"
							id={`radio-${i + 1}`}
							name="report"
							checked={tabIndex === i}
							onChange = {()=>{}}
							onClick={(e: any) => onTabChange(i)}
						/>
						<label htmlFor={`radio-${i + 1}`} className="report-switch-tab">
							<span className="ellipsis-animated animated-padding">
							<p className={`${objectives[i * objectivesPerPage].objective_number.length + (objectives[(i * objectivesPerPage + objectivesPerPage) - 1]?.objective_number.length || objectives[(objectives.length) - 1]?.objective_number.length) > 17 ? 'ellipsis-animated-text animated ellipsis-animation' : 'ellipsis-animated-text'} overflow `}
								>
								{`
									${objectives[i * objectivesPerPage].objective_number}-${objectives[(i * objectivesPerPage + objectivesPerPage) - 1]?.objective_number
									||
									objectives[(objectives.length) - 1]?.objective_number
									}
								`}
							</p>
							</span>
						</label>
					</>
				)
			}
		}
		return tabs
	}, [objectives, tabIndex, onTabChange, objectivesPerPage])

    return (
        <>
        {reportTabs.length > 1 && (
            <div className={`report-switch aog-switch animated-fade ${customClassName}`}>
                {reportTabs}
                <span className="report-switch-slider"></span>
            </div>
        )}
        </>
    )

}

export default ReportTabs