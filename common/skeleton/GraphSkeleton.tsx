import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const SchoolProgressSkeleton = ({columns, width, height, customClass }: any) => {
    return (
        <SkeletonTheme baseColor="#ADADAD" highlightColor="#91919191" width={'100%'}>
            <div className="d-flex">
                {[...new Array(columns)].map((item: any, i: number) => {
                    return (
                        <div key={i} className={customClass}>
                            <Skeleton count={1} width={width} height={height} duration={2} borderRadius={0} inline={true} />
                        </div>
                    )
                })}
            </div>
        </SkeletonTheme>
    );
};