/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DistrictDropDown,
  SchoolDropDown,
  ClassroomDropDown,
  TeacherDropDown,
  GradeDropDown
} from "./headerDropdowns";
import {
  setSchoolId,
  setDistrictId,
  getTeachersBySchools,
} from "redux/actionCreators/activity";
import { fetchClassrooms } from "redux/actionCreators/classroom";
interface RootState {
  auth: any;
  activity: any;
  classroom: any;
  management: any;
}

const ActivtyDropDowns: React.FC<{}> = ({
  onDistrictChange,
  onSchoolChange,
  userRole,
  teachers,
  setTeacherId,
  grades,
  setGradeId,
  classrooms,
  onChangeClassroom,
  applyFilters,
  isOtherScreen
}: any) => {
  const app = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const districts = app.activity.districtsList;
  const districtSchools = app.activity.schoolsList;
  const classroom_id = app.activity.classroom_id;
  const school_id = app.activity.school_id;
  const district_id = app.activity.district_id;
  const teacher_id = app.activity.teacher_id;
  const grade_id = app.activity.grade_id;
  const subject_id = app.activity.subject_id;
  
  useEffect(() => {
    const setSingleData = async() => {
      if (districts.length && districtSchools.length) {
        const isOnlyOneDistrict = districts.length === 1;
        if (isOnlyOneDistrict && district_id === 0) {
          sessionStorage.setItem(
            "district_id",
            JSON.stringify(districts[0].id)
          );
          const isOnlyOneSchool = districtSchools.length === 1;
          if (isOnlyOneSchool && school_id === 0) {
            sessionStorage.setItem(
              "school_id",
              JSON.stringify(districtSchools[0].id)
            );
          }
          dispatch(setDistrictId(districts[0].id))
          isOnlyOneSchool && school_id === 0 && dispatch(setSchoolId(districtSchools[0].id))
          if (userRole === "Classroom Admin") {
            await dispatch(fetchClassrooms(districtSchools[0].id));
          }
          else{
            await dispatch(
              getTeachersBySchools({
                params: {
                  school_id: districtSchools[0].id,
                },
              })
            );
          }
        }
      }
    };
    setSingleData();
  }, [districts]);

  useEffect(() => {
    const classroomsActivity = classrooms?.filter((item:any) => item.fk_grade_id !== 9 &&  item.students_count > 0) || []
    if (districts.length && districtSchools.length && district_id > 0 && school_id > 0 && classroomsActivity.length && userRole === "Classroom Admin") {
      const isOnlyOneClass = classroomsActivity.length === 1;
      if(isOnlyOneClass && classroom_id === 0){
        sessionStorage.setItem(
          "classroom_id",
          JSON.stringify(classroomsActivity[0].id)
        );
        onChangeClassroom({
          id: classroomsActivity[0].id,
          fk_grade_id: classroomsActivity[0].fk_grade_id,
          fk_subject_id: classroomsActivity[0].fk_subject_id,
        })
      }
      classroom_id === 0 && applyFilters(true)
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
      <div className="header__dropdown-wrapper">
        {userRole !== "Super Admin" && districts.length === 1 ? (
          ""
        ) : (
          <li className="header__dropdown-item header__dropdown-itemSchool active">
            <span>
              <small>Districts</small>
              <DistrictDropDown
                isDisabled={districts.length ? false : true}
                onDistrictChange={onDistrictChange}
                districts={districts || []}
                selectedDistrict={
                  district_id > 0
                    ? districts.find((item: any) => item.value === district_id)
                    : { label: "All Districts", value: 0 }
                }
                isFromActivity={true}
                isOtherScreen={isOtherScreen}
              />
            </span>
          </li>
        )}
        {(userRole === "School Admin" || userRole === "Classroom Admin") && districtSchools.length === 1 ? (
          ""
        ) : (
          <li className="header__dropdown-item header__dropdown-itemSchool active">
            <span>
              <small className={districtSchools.length === 0 ? "disabled" : ""}>
                School
              </small>
              <SchoolDropDown
                isDisabled={
                  districtSchools.length && district_id > 0 ? false : true
                }
                onSchoolChange={onSchoolChange}
                isSearchable={true}
                isClearable={true}
                isFromActivity={true}
                selectedSchool={
                  school_id > 0
                    ? districtSchools.find(
                        (item: any) => item.value === school_id
                      )
                    : { label: "All Schools", value: 0 }
                }
                districtSchools={districtSchools.filter(
                  (school: any) => school.fk_district_id === district_id
                )}
                isOtherScreen={isOtherScreen}
              />
            </span>
          </li>
        )}
      </div>
      <div
        className={
          userRole === "Classroom Admin" ? "d-none" : "header__dropdown-wrapper"
        }
      >
        <li className="header__dropdown-item header__dropdown-itemTeacher">
          <span>
            <small
              className={
                teachers.length === 0 || school_id === 0 ? "disabled" : ""
              }
            >
              Teacher
            </small>
            <TeacherDropDown
              teachers={teachers}
              school_id={school_id}
              setTeacherId={setTeacherId}
              teacher_id={teacher_id}
              selectedTeacher={
                teacher_id > 0
                  ? teachers.find((item: any) => item.value === teacher_id)
                  : { label: "All Teachers", value: 0 }
              }
              isOtherScreen={isOtherScreen}
            />
          </span>
        </li>
        <li className="header__dropdown-item header__dropdown-itemGrade">
          <span>
            <small
              className={
                grades?.length === 0 || school_id === 0 ? "disabled" : ""
              }
            >
              Grade
            </small>
            <GradeDropDown
              isDisabled={
                grades?.length === 0 || school_id === 0 ? true : false
              }
              setGradeId={setGradeId}
              grades={grades}
              selectedGrade={
                grade_id > 0
                  ? grades.find(
                      (item: any) => item.value === grade_id + "" + subject_id
                    )
                  : { label: "All Grades", value: 0 }
              }
              isOtherScreen={isOtherScreen}
            />
          </span>
        </li>
      </div>
      <div
        className={
          userRole === "Classroom Admin" ? "header__dropdown-wrapper" : "d-none"
        }
      >
        <li className="header__dropdown-item header__dropdown-itemTeacher">
          <span>
            <small className={classrooms.length === 0 ? "disabled" : ""}>
              Classroom
            </small>
            <ClassroomDropDown
              isDisabled={
                classrooms.length && school_id && district_id ? false : true
              }
              onChangeClassroom={onChangeClassroom}
              selectedClassroom={
                classroom_id > 0
                  ? classrooms.find((item: any) => item.value === classroom_id)
                  : { label: "Select a Classroom", value: 0 }
              }
              classrooms={classrooms}
              isOtherScreen={isOtherScreen}
              hideOption={true}
            />
          </span>
        </li>
      </div>
    </>
  );
};

export default ActivtyDropDowns;
