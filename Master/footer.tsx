import moment from "moment"
import { FC } from "react";
import { MasterFooterSkeleton } from 'components/common/skeleton/ReportsSkeleton';

interface Props {
    tests: any,
    isLoading?: boolean
}

const Footer = {
    tested: <td className='result__col1'>Tested</td>,
    non_proficient: <td className='result__col1'>Non Proficient</td>,
    passed: <td className='result__col1'>Passed</td>,
    proficient: <td className='result__col1'>Proficient%</td>,
    test_start_date: <td className='result__col1'>Test Start Date</td>,

}

type FooterKey = keyof typeof Footer

const ReportFooter: FC<Props> = ({ tests, isLoading }) => {

    return (
        <>
            {
                Object.keys(Footer).map((footer) => (
                    <tr className={`${isLoading && 'background-dark'}`}>
                        {Footer[footer as FooterKey]}
                        {!isLoading ? tests.map((test:any) => (
                                <td className='result__col'>{footer!=='test_start_date' ? test[footer] : test.test_start_date ? moment(test.test_start_date).format('l') : '-'}</td>
                            ))

                            : <MasterFooterSkeleton />
                        }
                    </tr>
                ))
            }
        </>

    )

}
export default ReportFooter
