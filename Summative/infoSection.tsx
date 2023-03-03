const InfoSection = () => {

    return (
        <div className="report__performance-performance">
            <p className="report__performance-title">Performance Level (Percentage Score Range*)</p>
            <div className="report__performance-percentage">
                <div className="report__performance-row">
                    <div className="d-flex align-items-center">
                        <div className="report__performance-level advanced"></div>
                        <p>Advanced</p>
                    </div>
                    <p>( 85% - 100%)</p>
                </div>
                <div className="report__performance-row">
                    <div className="d-flex align-items-center">
                        <div className="report__performance-level proficient"></div>
                        <p>Proficient</p>
                    </div>
                    <p>( 70% - 84%)</p>
                </div>
                <div className="report__performance-row">
                    <div className="d-flex align-items-center">
                        <div className="report__performance-level basic"></div>
                        <p>Basic</p>
                    </div>
                    <p>( 52% - 69%)</p>
                </div>
                <div className="report__performance-row">
                    <div className="d-flex align-items-center">
                        <div className="report__performance-level below"></div>
                        <p>Below Basic</p>
                    </div>
                    <p>( 0% - 51%)</p>
                </div>
            </div>
            <p className="report__performance-paragraph text-center">*Percentage of questions answered correctly</p>
            <div className="report__performance-indicator">
                <div className="report__performance-circle">
                    %
                </div>
                <p className="report__performance-indicatorText">Circle indicates the formative has been assessed for objective</p>
            </div>
        </div>

    )
}
export default InfoSection