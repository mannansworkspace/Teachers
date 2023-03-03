/* eslint-disable no-loop-func */
import { FC, useMemo, useRef } from "react"
import Header from "components/common/report/Print/header";
import InfoContent from '../infoContent'
import TableHeader from "../Table/header";
import Records from "../Table/records";
import { isFirefox ,isChrome, isSafari } from "util/index";

const StudentSummativeDetailsPrint: FC<{ test_name: string, answers: any, studentName: string, answerRowsHeights: Array<any> }> = ({ test_name, answers, studentName, answerRowsHeights }) => {

    const indexRef = useRef<number>(0)

    const PrintContent = useMemo(() => {


        const AnswersContent = () => {

            const PageHeight = () =>{
                if(isFirefox || isSafari)
                    return 850
                
                else if(isChrome)
                    return 1000
                
                return 1000
            }
            let pageHeight = PageHeight();
            const rowHeight = 37;
    
            const answersToPrint = []
            while (pageHeight >= rowHeight) {

                if (indexRef.current >= answers.length) {
                    break
                }

                const answer = answers[indexRef.current]
                if (answer) {
                    answersToPrint.push(
                        <Records key={indexRef.current} singleAnswer={answer} currentPage={pageNumber} index={indexRef.current} isPrint={true}/>
                    )
                }
                
                pageHeight-=answerRowsHeights[indexRef.current] * 0.68;
                indexRef.current++;
            }
            return answersToPrint
        }



        indexRef.current = 0
        let pageNumber = 0
        const toPrint = []
        while (indexRef.current < answers.length) {
            toPrint.push(
                <div key={indexRef.current} className={`${pageNumber ? 'add-page-break' : ''}`}>
                    <Header
                        title={`Student ${test_name?.split('-').pop()} Summative Report`}
                        test_name={`Student: ${studentName}`}
                        class_name={test_name}
                    />

                    {
                        !pageNumber && <div className='StudentSummativeReport__uperRow'>
                            <InfoContent />
                        </div>
                    }
                    <div className='StudentSummativeReport__tableContainer'>
                        <table>
                            <TableHeader />
                            <tbody className='StudentSummativeReport__tableContainer__body'>
                                { AnswersContent()}
                            </tbody>
                        </table>

                    </div>
                </div>
            )
            pageNumber++;
        }
        return toPrint

    }, [test_name, studentName , answers , answerRowsHeights])



    return <div className='StudentSummativeReport'>
        {PrintContent}
    </div>
}
export default StudentSummativeDetailsPrint