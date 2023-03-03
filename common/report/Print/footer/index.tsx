import { FC, ReactElement } from "react"

interface Props {
    text?: ReactElement<any>,
}

const PrintFooter: FC<Props> = ({ text }) => {
    return <div
        style={{
            position: 'static',
            bottom: '0px',
            left: '0',
            width: '100%',
        }}
    >
        <div style={{ position: 'relative', width: '100%', }}>
            <p className="footer__content-copyright proficiency">
                <span >
                    &copy; {new Date().getFullYear()} Alpha Plus Systems, Inc.
                </span>
                {
                    text && <span className="benchmark">
                        {text}
                    </span>
                }
            </p>
        </div>
    </div>
}
export default PrintFooter
