
const InfoSection = () => {
    return (
        <div className="report-content">
            <div className="report__performance">
                <div className="report__performance-performance summative-print">
                    <p className="report__performance-title">
                        Performance Level (Percentage Score Range*)
                    </p>
                    <div className="report__performance-percentage">
                        <div className="report__performance-row">
                            <div className="d-flex align-items-center">
                                <div className="report__performance-level summative-border-advanced rectangle"></div>
                                <p>Advanced</p>
                            </div>
                            <p>( 85% - 100%)</p>
                        </div>
                        <div className="report__performance-row">
                            <div className="d-flex align-items-center">
                                <div className="report__performance-level summative-border-proficient"></div>
                                <p>Proficient</p>
                            </div>
                            <p>( 70% - 84%)</p>
                        </div>
                        <div className="report__performance-row">
                            <div className="d-flex align-items-center">
                                <div className="report__performance-level summative-border-basic"></div>
                                <p>Basic</p>
                            </div>
                            <p>( 52% - 69%)</p>
                        </div>
                        <div className="report__performance-row">
                            <div className="d-flex align-items-center">
                                <div className="report__performance-level summative-border-belowBasic"></div>
                                <p>Below Basic</p>
                            </div>
                            <p>( 0% - 51%)</p>
                        </div>
                    </div>
                    <p className="report__performance-paragraph">
                        *Percentage of questions answered correctly
                    </p>
                    <div className="report__performance-indicator">
                        <div className="color-3e3e3e summative-border-advanced rounded-circle circle-nn">
                            %
                        </div>
                        <p className="report__performance-indicatorText">
                            Circle indicates the formative has been assessed for objective
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default InfoSection;