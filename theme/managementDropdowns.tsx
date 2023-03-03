/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  DistrictDropDown,
} from "./headerDropdowns";

interface RootState {
  auth: any;
  activity: any;
  classCsvImport: any;
  management: any;
}

const ManagementDropDowns = ({
  districts,
  loadDistrictOptions,
  onDistrictChange,
  userRole,
  isOtherScreen,
  districtId,
  isDisabled,
}: any) => {
  const app = useSelector((state: RootState) => state);

  useEffect(() => {
    if (districts.length) {
      const isOnlyOneDistrict = districts.length === 1;
      if (isOnlyOneDistrict) {
        onDistrictChange({ id: districts[0].id });
      }
    }
  }, [districts]);


  return (
    <>
      {districts.length === 1 && userRole === "District Admin" &&
          <div className="muskogee-box">
          {app?.management.district_logo ? (
            <img src={app?.management.district_logo} alt="District Logo" />
          ) : (
            ""
          )}
        </div>
        }
      <div
        className={
          userRole === "Classroom Admin" ? "d-none" : "header__dropdown-wrapper"
        }
      >
        { userRole === "District Admin" && districts.length === 1 ? '' :
          <li className="header__dropdown-item header__dropdown-itemSchool active">
            <span>
              <DistrictDropDown
                isDisabled={districts.length && !isDisabled ? false : true}
                onDistrictChange={onDistrictChange}
                loadDistrictOptions={loadDistrictOptions}
                districts={districts || []}
                isClearable={true}
                selectedDistrict={
                  districtId > 0
                    ? districts.find((item: any) => item.value === districtId)
                    : { label: "Select a District", value: 0 }
                }
                isOtherScreen={isOtherScreen}
              />
            </span>
          </li>
        }
      </div>
    </>
  );
};

export default ManagementDropDowns;
