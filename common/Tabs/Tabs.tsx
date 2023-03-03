import React, {Fragment} from "react";
const Tabs: React.FC<{ options: any; onChangeTab: any; currentTab: any,customClass?: string }> = ({
  options,
  onChangeTab,
  currentTab,
  customClass
}) => {
  return (
    <div className="tabs-switch">
      {options.map((item: any, i:number) => {
        return (
          <Fragment key={i}>
            <input type="radio" className={"tabs-switch-radio "  + (customClass && i === 0 ? customClass:'')}
            id={`radio-${i + 1}`} name="tabs" 
            checked={currentTab === item ? true : false} />
            <label className="tabs-switch-tab" htmlFor={`radio-${i + 1}`} 
            onClick={() => onChangeTab(item)}>{item}</label>
          </Fragment>
        );
      })}
      <span className="tabs-switch-slider"></span>
    </div>
  );
};

export default Tabs;