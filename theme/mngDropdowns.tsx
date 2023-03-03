/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DistrictDropDown,
  SchoolDropDown,
  ClassroomDropDown,
} from "./headerDropdowns";
import ActionType from "redux/actionTypes";

interface RootState {
  auth: any;
  activity: any;
  classroom: any;
  management: any;
}

const MngDropdowns: React.FC<{}> = ({
  onDistrictChange,
  onSchoolChange,
  userRole,
  classrooms,
  onChangeClassroom,
}: any) => {
  const app = useSelector((state: RootState) => state);
  const districts = app.activity.districtsList;
  const districtSchools = app.activity.schoolsList;
  const classroom_m_id = app.management?.classroom_m_id || classrooms[0]?.id;
  const school_m_id = app.management?.school_m_id || districtSchools[0]?.id;
  const district_m_id = app.management?.district_m_id || districts[0]?.id;
  const dispatch = useDispatch();

  const requestStlSchool = () => {
    dispatch({
      type: ActionType.SET_STL_SCHOOL_LOADING,
      payload: true,
    });
  };

  const requestStlClass = () => {
    dispatch({
      type: ActionType.SET_STL_CLASS_LOADING,
      payload: true,
    });
  };

  const classInfo = app.classroom.classrooms?.find((item:any) => item.id  === Number(classroom_m_id))
  const isOnlyResourcesClass = classInfo?.students_count === 0 || classInfo?.fk_grade_id === 9

  return (
    <>
      {districts.length > 1 && userRole === "District Admin" && (
        <li className="header__dropdown-item header__dropdown-itemSchool">
          <span>
            <small>Districts</small>
            <DistrictDropDown
              isDisabled={districts.length ? false : true}
              onDistrictChange={onDistrictChange}
              districts={districts || []}
              selectedDistrict={
                district_m_id > 0
                  ? districts.find((item: any) => item.value === district_m_id)
                  : null
              }
              shouldNotShowAll={true}
            />
          </span>
        </li>
      )}
      {districtSchools.length > 1 && userRole === "School Admin" && (
        <li className="header__dropdown-item header__dropdown-itemSchool management-dropdown">
          <span>
            <small>School</small>
            <SchoolDropDown
              isDisabled={
                districtSchools.length && district_m_id > 0 ? false : true
              }
              onSchoolChange={onSchoolChange}
              selectedSchool={
                school_m_id > 0
                  ? districtSchools.find((item: any) => item.value === school_m_id)
                  : null
              }
              districtSchools={districtSchools}
              shouldNotShowAll={true}
            />
          </span>
        </li>
      )}
      {userRole === "Classroom Admin" && classrooms.length > 1 && (
        <li className="header__dropdown-item header__dropdown-itemSchool management-dropdown">
        <span>
          <small>Classroom</small>
          <ClassroomDropDown
            isDisabled={
              classrooms.length && school_m_id && district_m_id ? false : true
            }
            onChangeClassroom={onChangeClassroom}
            selectedClassroom={
              classroom_m_id > 0
                ? classrooms.find((item: any) => item.value === classroom_m_id)
                : null
            }
            classrooms={classrooms}
            disbledDefualt={true}
            shouldNotShowAll={true}
          />
         </span>
        </li>
      )}
      {userRole === "School Admin" && districtSchools.length > 1 && (
        <button
          className="btn outline-btn outline-btn-lg btn-test-log"
          onClick={requestStlSchool}
        >
          Summative Test Log
        </button>
      )}
      {userRole === "Classroom Admin" && classrooms.length > 1 && !isOnlyResourcesClass && (
        <button
          className="btn outline-btn outline-btn-lg btn-test-log"
          onClick={requestStlClass}
        >
          Summative Test Log
        </button>
      )}
    </>
  );
};

export default MngDropdowns;
