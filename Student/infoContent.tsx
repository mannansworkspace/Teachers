const InfoContent = () => {

    return <>
        <div className='StudentSummativeReport__uperRow__centerText'>
            <span>Click a question number to review in the assessment.</span>
        </div>
        <div className="StudentSummativeReport__uperRow__score">
            <div className='StudentSummativeReport__uperRow__colorBox'>
                <div className='StudentSummativeReport__uperRow__colorBox__correct'>
                    <div className='greenBox'></div>
                    <span>Correct</span>
                </div>
                <div className='StudentSummativeReport__uperRow__colorBox__Incorrect'>
                    <div className='redBox'></div>
                    <span>Incorrect</span>
                </div>

            </div>
        </div>
    </>
}
export default InfoContent