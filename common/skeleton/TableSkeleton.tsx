import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const TableSkeleton: React.FC<{columns: number; count: number; height: number;}> = ({
    columns,
    count,
    height,
}) => {
    return (
        <SkeletonTheme baseColor="#2a539143" highlightColor="#5371b732" width={'100%'}>
            <tr>
                {[...new Array(columns)].map((item: any, i:number) => {
                    return (
                        <td key={i} style={{padding: '0px 1px 0px 0px'}}>
                            <Skeleton count={count} height={height} duration={2} borderRadius={0} inline={true} />
                        </td>
                    )
                })}
            </tr>
        </SkeletonTheme>
    );
};

// Skeleton for Progress Table Label
export const TableLabelSekelton = () => {
    return (
        <SkeletonTheme baseColor="#2a5391" highlightColor="#2a5391" width={'100%'}>
            <tr className="progress__table-badge" style={{height: '100%', zIndex: '99'}}>
                <td className="progress__table-badgeContent" style={{height: '100%'}}>
                <Skeleton count={1} height="100%" duration={0} enableAnimation={false} borderRadius={0} inline={true} />
                </td>
            </tr>
        </SkeletonTheme>
    )
}
