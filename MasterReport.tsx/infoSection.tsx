
const InfoSection = () => {

    return (
        <div className="master-report__info">
            <div className="master-report__info-box">
                <p>
                    The Master Report shows the results of all summative assessments
                    for the classroom. The scores are color categorized by performance
                    level, accompanied by the state performance level abbreviations.
                    Click on the summative name dropdowns to view related reports.
                </p>
            </div>

            <div className="master-report__info-score">
                <h6 className="master-report__info-title">
                    Performance Level (Percentage Score Range*)
                </h6>
                <div className="master-report__info-row">
                    <div className="d-flex">
                        <div className="master-report__info-item advance"></div>
                        <p className="text-dark mb-0">Advanced</p>
                    </div>
                    <div>( 85% - 100%)</div>
                </div>
                <div className="master-report__info-row">
                    <div className="d-flex">
                        <div className="master-report__info-item proficient"></div>
                        <p className="text-dark mb-0">Proficient</p>
                    </div>
                    <div>( 70% - 84%)</div>
                </div>
                <div className="master-report__info-row">
                    <div className="d-flex">
                        <div className="master-report__info-item basic"></div>
                        <p className="text-dark mb-0">Basic</p>
                    </div>
                    <div>( 52% - 69%)</div>
                </div>
                <div className="master-report__info-row">
                    <div className="d-flex">
                        <div className="master-report__info-item belowBasic"></div>
                        <p className="text-dark mb-0">Below Basic</p>
                    </div>
                    <div>( 0% - 51%)</div>
                </div>
                <div className="master-report__info-subtitle mt-2">
                    <p className="text-dark mb-0">
                        *Percentage of questions answered correctly
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfoSection;