import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const TabsSkeleton = ({ width, customClass }: any) => {
    return (
        <SkeletonTheme baseColor="#adadad" highlightColor="#91919191" width={'100%'}>
            <div className={`report-switch ${customClass}`}>
                <div>
                    <Skeleton count={1} height={27} width={width} duration={2} borderRadius={40} inline={true} />
                </div>
                <div className="ms-1">
                    <Skeleton count={1} height={27} width={width} duration={2} borderRadius={40} inline={true} />
                </div>
            </div>
        </SkeletonTheme>
    );
};

export const HeaderSkeleton = ({ rowColumns, height }: any) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
            <div className="d-flex align-items-center">
                {[...new Array(rowColumns)].map((item: any, i: number) => {
                    return (
                        <div key={i} style={{ width: '28px', margin: '1.5px' }}>
                            <Skeleton count={1} height={height} duration={2} borderRadius={0} inline={true} />
                        </div>
                    )
                })}
            </div>
        </SkeletonTheme>
    );
};

export const BodySkeleton: React.FC<{ circle: boolean; rowColumns: number; circleAttempt: boolean; scoreBox: boolean; scoreColumn: boolean; attemptWidth: string; scoreWidth: string }> = ({
    rowColumns,
    circle,
    circleAttempt,
    scoreBox,
    scoreColumn,
    attemptWidth,
    scoreWidth
}) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
            <tr>
                <td className="report__table-name pe-1 ps-4">
                    <Skeleton count={15} height={35} duration={2} borderRadius={0} inline={true} />
                </td>
                {[...new Array(rowColumns)].map((item: any, i: number) => {
                    return (
                        <td key={i} style={{ width: '31px' }}>
                            <Skeleton count={15} height={29} width={29} borderRadius={0} circle={circle} duration={2} inline={true} style={{ margin: '3.5px 1px' }} />
                        </td>
                    )
                })}
                <td className="report__table-benchmark ms-1">
                    <div className="d-flex align-items-center">
                        <div className="report__table-questions me-1" style={{ width: `${attemptWidth}` }}>
                            <Skeleton count={15} height={35} duration={2} borderRadius={0} inline={true} />
                        </div>

                        {circleAttempt &&
                            <div className="report__table-numbers" style={{ height: '36px' }}>
                                <Skeleton count={15} height={29} width={29} circle={true} duration={2} borderRadius={0} inline={true} style={{ margin: '3.5px 1px' }} />
                            </div>
                        }
                    </div>
                </td>

                {scoreColumn &&
                    <td className="report__table-summative">
                        <div className="d-flex align-items-center">
                            <span className="report__table-questions" style={{ minWidth: `${scoreWidth}` }}>
                                <Skeleton count={15} height={35} duration={2} borderRadius={0} inline={true} />
                            </span>

                            {scoreBox &&
                                <span className="report__table-numbers ms-1" style={{ width: '28px' }}>
                                    <Skeleton count={15} height={35} width={29} duration={2} borderRadius={0} inline={true} />
                                </span>
                            }
                        </div>
                    </td>
                }
            </tr>
        </SkeletonTheme>
    );
}

export const FormativeBodySkeleton = () => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
            <tr className="d-flex">
                <td style={{ minWidth: '230px' }}>
                    <Skeleton count={15} height={35} duration={2} borderRadius={'8px 0 0 8px'} inline={true} />
                </td>
                {[...new Array(5)].map((item: any, i: number) => {
                    return (
                        <td key={i} style={{ width: '31px' }}>
                            <Skeleton count={15} height={29} width={29} borderRadius={0} duration={2} inline={true} style={{ margin: '3.5px 1px' }} />
                        </td>
                    )
                })}
                <td className="report__table-benchmark ps-1">
                    <Skeleton count={15} height={35} width={105} duration={2} borderRadius={0} inline={true} />
                </td>

                <td className="report__table-summative pe-0">
                    <Skeleton count={15} height={35} width={125} duration={2} borderRadius={'0 8px 8px 0'} inline={true} />
                </td>
            </tr>
        </SkeletonTheme>
    );
}

export const FooterSkeleton = ({ rowColumns }: any) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
            <div className="d-flex">
                {[...new Array(rowColumns)].map((item: any, i: number) => {
                    return (
                        <div key={i} style={{ width: '28px', margin: '1.5px' }}>
                            <Skeleton count={1} height={30} duration={2} borderRadius={0} inline={true} />
                        </div>
                    )
                })}
            </div>
        </SkeletonTheme>
    );
}

export const MasterHeaderSkeleton = ({ rowColumns, borderRadius }: any) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
            <div className="master-report__selects-wrapper justify-content-between">
                {[...new Array(rowColumns)].map((item: any, i: number) => {
                    return (
                        <Skeleton count={1} height={28} width={144} duration={2} borderRadius={borderRadius} inline={true} style={{marginRight: '1px'}} />
                    )
                })}
            </div>
        </SkeletonTheme>
    );
};

export const MasterBodySkeleton = ({ rows }: any) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>

            {[...new Array(rows)].map((item: any, i: number) => {
                return (
                    <div className="d-flex justify-content-between" style={{ width: '790px' }}>
                        <Skeleton count={1} height={36} width={126} duration={2} borderRadius={0} inline={true} />
                        <Skeleton count={1} height={36} width={225} duration={2} borderRadius={0} inline={true} />
                        <Skeleton count={1} height={36} width={145} duration={2} borderRadius={0} inline={true} />
                        <Skeleton count={1} height={36} width={145} duration={2} borderRadius={0} inline={true} />
                        <Skeleton count={1} height={36} width={145} duration={2} borderRadius={0} inline={true} />
                    </div>
                )
            })}

        </SkeletonTheme>
    );
}

export const MasterFooterSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#585858" highlightColor="#91919195" width={'100%'}>
            <div className="d-flex">
                <Skeleton count={1} height={36} width={144} duration={2} borderRadius={0} inline={true} style={{ marginLeft: '1px' }} />
                <Skeleton count={1} height={36} width={144} duration={2} borderRadius={0} inline={true} style={{ marginLeft: '1px' }} />
                <Skeleton count={1} height={36} width={144} duration={2} borderRadius={0} inline={true} style={{ marginLeft: '1px' }} />
            </div>
        </SkeletonTheme>
    );
};

export const RiskReportSkeleton = ({ rowColumns }: any) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
            {[...new Array(rowColumns)].map((item: any, i: number) => {
                return (
                    <tr className="d-flex" style={{ marginBottom: '1px' }}>
                        <td className="risk-report__table-objective p-0">
                            <Skeleton count={1} height={40} duration={2} borderRadius={'8px 0 0 8px'} inline={true} />
                        </td>
                        <td className="risk-report__table-description p-0 margin">
                            <Skeleton count={1} height={40} duration={2} borderRadius={0} inline={true} />
                        </td>
                        <td className="risk-report__table-students p-0">
                            <Skeleton count={1} height={40} duration={2} borderRadius={0} inline={true} />
                        </td>
                        <td className="risk-report__table-proficient p-0 margin">
                            <Skeleton count={1} height={40} duration={2} borderRadius={0} inline={true} />
                        </td>
                        <td className="risk-report__table-view p-0">
                            <Skeleton count={1} height={40} duration={2} borderRadius={'0 8px 8px 0'} inline={true} />
                        </td>
                    </tr>
                )
            })}
        </SkeletonTheme>
    );
};

export const BasedSkeleton: React.FC<{ columns: number; count: number; height: number; }> = ({
    columns,
    count,
    height,
}) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
            <tr>
                {[...new Array(columns)].map((item: any, i: number) => {
                    return (
                        <td key={i} style={{ padding: '0px 1px 0px 0px' }}>
                            <Skeleton count={count} height={height} duration={2} borderRadius={0} inline={true} />
                        </td>
                    )
                })}
            </tr>
        </SkeletonTheme>
    );
};

export const DetailSkeleton = ({ rows }: any) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
            {[...new Array(rows)].map((item: any, i: number) => {
                return (
                    <tr className="d-flex" style={{ marginBottom: '1px' }}>
                        <td className="p-0" style={{ width: '209px' }}>
                            <Skeleton count={1} height={41} duration={2} borderRadius={0} inline={true} />
                        </td>
                        <td className="based-report__detail-descriptionData margin p-0">
                            <Skeleton count={1} height={41} duration={2} borderRadius={0} inline={true} />
                        </td>
                        <td className="p-0" style={{ width: '298px' }}>
                            <Skeleton count={1} height={41} duration={2} borderRadius={0} inline={true} />
                        </td>
                    </tr>
                )
            })}
        </SkeletonTheme>
    );
};

export const AuditReportBodySkeleton = ({ rows, columns }: any) => {
    return (
        <SkeletonTheme baseColor="#91919191" highlightColor="#adadad" width={'100%'}>
            <tr>
                {[...new Array(columns)].map((item: any, i: number) => {
                    return (
                        <td key={i} style={{padding: '0 1px 0 0'}}>
                            <Skeleton count={rows} height={36} duration={2} borderRadius={0} inline={true} style={{marginRight: '1px'}} />
                        </td>
                    )
                })}
            </tr>
        </SkeletonTheme>
    );
};
export const ObjavtiveSec = ({ rowColumns, height }: any) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
         <span className="summative-objective-analysis__tested-text" >{'# of Objectives < 33% Proficient'}</span>
        </SkeletonTheme>
    );
};