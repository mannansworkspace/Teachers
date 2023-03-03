/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  DistrictDropDown,
  SchoolDropDown,
  ClassroomDropDown,
} from "./headerDropdowns";
import {
  setClassroomSchoolId,
  setDistrictId
} from "redux/actionCreators/classroom";
interface RootState {
  auth: any;
  activity: any;
  classroom: any;
  management: any;
}

const ClassroomDropDowns: React.FC<{}> = ({
  onDistrictChange,
  onSchoolChange,
  userRole,
  classrooms,
  onChangeClassroom,
  isOtherScreen,
}: any) => {
  const app = useSelector((state: RootState) => state);
  const districtSchools = app.activity.schoolsList;
  const classroomId = app.classroom.classroomId;
  const school_id = app.classroom.classroomSchoolId;
  const district_id = app.classroom.districtId;
  const districts = app.activity.districtsList;
  const dispatch = useDispatch();

  useEffect(() => {
    const setSingleData = async() => {
      if (districts.length && districtSchools.length) {
        const isOnlyOneDistrict = districts.length === 1;
        if (isOnlyOneDistrict && district_id === 0) {
          sessionStorage.setItem(
            "c_district_id",
            JSON.stringify(districts[0].id)
          );
          const isOnlyOneSchool = districtSchools.length === 1;
          if (isOnlyOneSchool && school_id === 0) {
            sessionStorage.setItem(
              "c_school_id",
              JSON.stringify(districtSchools[0].id)
            );
          }
          dispatch(setDistrictId(districts[0].id))
          isOnlyOneSchool && school_id === 0 && dispatch(setClassroomSchoolId(districtSchools[0].id))
        }
      }
    };
    setSingleData();
  }, [districts]);

  useEffect(() => {
    if (
      districts.length &&
      districtSchools.length &&
      district_id > 0 &&
      school_id > 0
    ) {
      const isOnlyOneClass = classrooms.length === 1;
      if (isOnlyOneClass && classroomId === 0) {
        sessionStorage.setItem(
          "c_classroom_id",
          JSON.stringify(classrooms[0].id)
        );
        onChangeClassroom({
          id: classrooms[0].id,
          fk_grade_id: classrooms[0].fk_grade_id,
          fk_subject_id: classrooms[0].fk_subject_id,
        });
      }
    }
  }, [classrooms]);

  return (
    <>
      {districts.length === 1 && userRole === "District Admin" && (
        <div className="muskogee-box">
          {app?.management.district_logo ? (
            <img src={app?.management.district_logo} alt="District Logo" />
          ) : (
            ""
          )}
        </div>
      )}
      <div
        className={
          userRole === "Classroom Admin" ? "d-none" : "header__dropdown-wrapper"
        }
      >
        {userRole !== "Super Admin" && districts.length === 1 ? (
          ""
        ) : (
          <li className="header__dropdown-item header__dropdown-itemSchool active">
            <span>
              <small>Districts</small>
              <div
                className={district_id === 0 ? `header__dropdown-flashing` : ``}
              >
                <DistrictDropDown
                  isDisabled={districts.length ? false : true}
                  onDistrictChange={onDistrictChange}
                  districts={districts || []}
                  isClearable={!_.isEmpty(app.classroom.filters) === false}
                  selectedDistrict={
                    district_id > 0
                      ? districts.find(
                          (item: any) => item.value === district_id
                        )
                      : { label: "Select a District", value: 0 }
                  }
                  isOtherScreen={isOtherScreen}
                />
              </div>
            </span>
          </li>
        )}
        {(userRole === "School Admin" || userRole === "Classroom Admin") &&
        districtSchools.length === 1 ? (
          ""
        ) : (
          <li className="header__dropdown-item header__dropdown-itemSchool classroom-arrow active">
            <span>
              <small className={districtSchools.length === 0 ? "disabled" : ""}>
                School
              </small>
              <div
                className={
                  (school_id === 0 &&
                    ((userRole === "District Admin" &&
                    districts.length === 1) ||
                  (userRole === "School Admin" && districtSchools.length > 1)))
                    ? `header__dropdown-flashing`
                    : ""
                }
              >
                <SchoolDropDown
                  isDisabled={
                    districtSchools.length && district_id > 0 ? false : true
                  }
                  onSchoolChange={onSchoolChange}
                  isSearchable={true}
                  isClearable={true}
                  selectedSchool={
                    school_id > 0
                      ? districtSchools.find(
                          (item: any) => item.value === school_id
                        )
                      : { label: "Select a School", value: 0 }
                  }
                  districtSchools={districtSchools.filter(
                    (school: any) => school.fk_district_id === district_id
                  )}
                  isOtherScreen={isOtherScreen}
                />
              </div>
            </span>
          </li>
        )}
      </div>
      <div className="header__dropdown-wrapper">
        <li className="header__dropdown-item header__dropdown-itemClass">
          <span>
            <small className={classrooms.length === 0 ? "disabled" : ""}>
              Classroom
            </small>
            <div
              className={
                classroomId === 0 &&
                ((userRole === "School Admin" &&
                  districtSchools.length === 1) ||
                  userRole === "Classroom Admin")
                  ? `header__dropdown-flashing`
                  : ""
              }
            >
              <ClassroomDropDown
                isDisabled={
                  classrooms.length && school_id && district_id ? false : true
                }
                onChangeClassroom={onChangeClassroom}
                classrooms={classrooms}
                selectedClassroom={
                  classroomId > 0
                    ? classrooms.find((item: any) => item.value === classroomId)
                    : { label: "Select a Classroom", value: 0 }
                }
                isOtherScreen={isOtherScreen}
              />
            </div>
          </span>
        </li>
      </div>
    </>
  );
};

export default ClassroomDropDowns;
