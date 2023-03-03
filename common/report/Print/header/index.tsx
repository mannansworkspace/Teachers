import { FC } from "react"
import moment from "moment";


interface Props {
    class_name?: string,
    test_name?: string,
    title: string,
    customClass?: string,
}

const Header: FC<Props> = (props) => {
    const { class_name, test_name, title, customClass } = props

    return (
        <div className="print-report__header">
            <div className="d-flex align-items-end justify-content-between">
                <div>
                    <h3 className={`title ${customClass}`}>{title}</h3>
                    {title !== "Audit Report" && <p className={`print-report__header-text ${customClass}`}>{test_name || ""}</p>}
                </div>

                <div className="text-right">
                    <h3 className={`title ${customClass}`}>{moment(new Date()).format('M/DD/YY')}</h3>
                    <p className={`print-report__header-text text-right ${customClass}`}>{title !== "Audit Report" ? class_name : moment(new Date()).format("HH:mm A")}</p>
                </div>
            </div>
        </div>
    )
}

export default Header;