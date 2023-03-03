/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import cookie from "js-cookie";
import { logout } from "redux/actionCreators/auth";
import {
  getTeachersBySchools,
  setTeacherId as setTeacherIdState,
  setSchoolId,
  setGradeId as setGradeIdState,
  setDistrictId as setDistrictIdState,
  setFilters,
  setSubjectId,
  setActivityClassroomId,
} from "redux/actionCreators/activity";
import {
  fetchClassrooms,
  setClassroomSchoolId,
  setClassroomId,
  setGrade as setClassroomGrade,
  setSubject as setClassroomSubject,
  setDistrictId,
} from "redux/actionCreators/classroom";
import {
  setDistrictMId,
  setSchoolMId,
  setClassroomMId,
} from "redux/actionCreators/management";
import HeaderTopbar from "./headerTopbar";
import ActivityDropDowns from "./activityDropdowns";
import ClassroomDropDowns from "./classroomDropDowns";
import ManagementDropDowns from "./mngDropdowns";
import { useQuery } from "hooks/useQuery";

interface RootState {
  auth: any;
  activity: any;
  classroom: any;
  management: any;
}

const Header: React.FC<{}> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state);
  const { pathname } = useLocation();
  const [isLogout, setLogout] = useState(false);
  const userRole = cookie.get("role");
  const has_kindergarten = cookie.get("has_kindergarten");
  const has_zero_students_classrooms = cookie.get(
    "has_zero_students_classrooms"
  );
  const isActivityScreen = pathname.indexOf("activity") > -1;
  const isClassroomScreen = pathname.indexOf("classroom") > -1;
  const isManagementScreen = pathname.indexOf("management") > -1;
  const query = useQuery();
  const print = query.get("print");

  const isOtherScreen =
    pathname.indexOf("monitor") > -1 ||
    pathname.indexOf("answer") > -1 ||
    pathname.indexOf("report") > -1;
  const districts = app.activity.districtsList;
  const districtSchools = app.activity.schoolsList;
  const teachers = app.activity.teachersList;
  const teacher_id = app.activity.teacher_id;
  const classrooms = app.classroom.classrooms;
  let grades = teacher_id
    ? app.activity.gradsList.filter((item) => item.teacher_id === teacher_id)
    : app.activity.gradsList;
  grades = _.uniqBy(grades, function (e: any) {
    return e.name;
  });

  useEffect(() => {
    isActivityScreen && setActivityScreenData();
    isClassroomScreen && setClassroomScreenData();
    isManagementScreen && setManagementData();
  }, [pathname]);

  useEffect(() => {
    if (isLogout) {
      navigate({ pathname: "/" }, { replace: true });
    }
  }, [isLogout]);

  const applyFilters = () => {
    dispatch(setFilters(true));
  };

  const setManagementData = async () => {
    const district_id = Number(sessionStorage.getItem("district_m_id"));
    const school_id = Number(sessionStorage.getItem("school_m_id"));
    const classroom_id = Number(sessionStorage.getItem("classroom_m_id"));

    if (district_id > 0) {
      dispatch(setDistrictMId(district_id));
    }
    if (school_id > 0) {
      dispatch(setSchoolMId(school_id));
    }
    if (classroom_id > 0) {
      await dispatch(
        fetchClassrooms(Number(sessionStorage.getItem("school_id")))
      );
      dispatch(setClassroomMId(classroom_id));
    }
  };

  const setActivityScreenData = async () => {
    const district_id = Number(sessionStorage.getItem("district_id"));
    const school_id = Number(sessionStorage.getItem("school_id"));
    const teacher_id = Number(sessionStorage.getItem("teacher_id"));
    const grade_id = Number(sessionStorage.getItem("grade_id"));
    const subject_id = Number(sessionStorage.getItem("subject_id"));
    const classroom_id = Number(sessionStorage.getItem("classroom_id"));
    if (district_id > 0) {
      dispatch(setDistrictIdState(district_id));
      userRole !== "Classroom Admin" &&
        district_id &&
        !school_id &&
        !classroom_id &&
        !teacher_id &&
        applyFilters();
    } else {
      applyFilters();
    }
    if (school_id > 0) {
      dispatch(setSchoolId(school_id));
      if (userRole === "Classroom Admin") {
        await dispatch(fetchClassrooms(school_id));
      } else {
        await dispatch(
          getTeachersBySchools({
            params: {
              school_id: school_id,
            },
          })
        );
        district_id &&
          school_id &&
          !classroom_id &&
          !teacher_id &&
          !grade_id &&
          !subject_id &&
          applyFilters();
      }
    }
    if (teacher_id > 0) {
      dispatch(setTeacherIdState(teacher_id));
      userRole !== "Classroom Admin" &&
        district_id &&
        school_id &&
        teacher_id &&
        !grade_id &&
        !subject_id &&
        applyFilters();
    }
    if (grade_id > 0) {
      dispatch(setGradeIdState(grade_id));
      dispatch(setSubjectId(subject_id));
      userRole !== "Classroom Admin" &&
        district_id &&
        school_id &&
        teacher_id &&
        grade_id &&
        subject_id &&
        applyFilters();
    }
    if (classroom_id > 0) {
      dispatch(setGradeIdState(grade_id));
      dispatch(setSubjectId(subject_id));
      dispatch(setActivityClassroomId(classroom_id));
      applyFilters();
    }
  };

  const setClassroomScreenData = async () => {
    const district_id = Number(sessionStorage.getItem("c_district_id"));
    const school_id = Number(sessionStorage.getItem("c_school_id"));
    const c_classroom_id = Number(sessionStorage.getItem("c_classroom_id"));
    const grade_id = Number(sessionStorage.getItem("c_grade_id"));
    const subject_id = Number(sessionStorage.getItem("c_subject_id"));
    if (district_id > 0) {
      dispatch(setDistrictId(district_id));
      district_id && !school_id && !c_classroom_id && applyFilters();
    }
    if (school_id > 0) {
      dispatch(setClassroomSchoolId(school_id));
      await dispatch(fetchClassrooms(school_id));
      district_id && school_id && !c_classroom_id && applyFilters();
    }

    if (c_classroom_id && c_classroom_id) {
      dispatch(setClassroomGrade(grade_id));
      dispatch(setClassroomSubject(subject_id));
      dispatch(setClassroomId(c_classroom_id));
      district_id && school_id && c_classroom_id && applyFilters();
    }
  };

  const userLogout = (event: any) => {
    event.preventDefault();
    dispatch(logout());
    setLogout(true);
  };

  const onDistrictChangeActivity = async (e) => {
    const inputValue = parseInt(e.id);
    dispatch(setSchoolId(0));
    dispatch(setTeacherIdState(0));
    dispatch(setGradeIdState(0));
    dispatch(setSubjectId(0));
    dispatch(setActivityClassroomId(0));
    dispatch(setDistrictIdState(!inputValue ? 0 : inputValue));
    applyFilters();
    await setAutoSelectSchool(inputValue);
  };

  const onDistrictChangeClassroom = async (e: any) => {
    const inputValue = parseInt(e.id);
    dispatch(setClassroomSchoolId(0));
    dispatch(setClassroomId(0));
    dispatch(setClassroomGrade(0));
    dispatch(setClassroomSubject(0));
    dispatch(setDistrictId(!inputValue ? 0 : inputValue));
    applyFilters();
    setAutoSelectSchool(inputValue);
  };

  const onDistrictChangeManagement = (e: any) => {
    const inputValue = parseInt(e.id);
    dispatch(setDistrictMId(inputValue));
  };

  const onSchoolChangeManagement = (e: any) => {
    const inputValue = parseInt(e.id);
    dispatch(setSchoolMId(inputValue));
  };

  const onClassChangeManagement = (e: any) => {
    const inputValue = parseInt(e.id);
    dispatch(setClassroomMId(inputValue));
  };

  const setAutoSelectSchool = async (inputValue) => {
    /* If only one school is there then it should auto select*/
    if (
      districtSchools.filter((scl) => scl.district_id === inputValue).length ===
      1
    ) {
      isClassroomScreen
        ? await onSchoolChangeClassroom({
            id: districtSchools.find((scl) => scl.fk_district_id === inputValue)
              ?.id,
          })
        : await onSchoolChangeActivity({
            id: districtSchools.find((scl) => scl.fk_district_id === inputValue)
              ?.id,
          });
    }
  };

  const onSchoolChangeActivity = async (event: any) => {
    dispatch(setTeacherIdState(0));
    dispatch(setGradeIdState(0));
    dispatch(setSubjectId(0));
    dispatch(setActivityClassroomId(0));
    dispatch(setSchoolId(event.id === 0 ? 0 : event.id));
    applyFilters();
    if (event.id > 0) {
      userRole === "Classroom Admin"
        ? await dispatch(fetchClassrooms(event.id))
        : await dispatch(
            getTeachersBySchools({
              params: {
                school_id: event.id,
              },
            })
          );
    }
  };

  const setTeacherId = (event: any) => {
    dispatch(setGradeIdState(0));
    dispatch(setSubjectId(0));
    dispatch(setActivityClassroomId(0));
    dispatch(setTeacherIdState(event.id === 0 ? 0 : event.id));
    applyFilters();
  };

  const setGradeId = (event: any) => {
    if (event.id === 0) {
      dispatch(setGradeIdState(0));
      dispatch(setSubjectId(0));
      dispatch(setGradeIdState(0));
    }
    dispatch(setGradeIdState(event.id));
    dispatch(setSubjectId(event.id === 0 ? 0 : event.subject_id));
    applyFilters();
  };

  const onSchoolChangeClassroom = async (e: any) => {
    const inputValue = parseInt(e.id);
    dispatch(setClassroomId(0));
    dispatch(setClassroomGrade(0));
    dispatch(setClassroomSubject(0));
    dispatch(setClassroomSchoolId(!inputValue ? 0 : inputValue));
    inputValue && (await dispatch(fetchClassrooms(inputValue)));
    applyFilters();
  };

  const onChangeClassroom = (e) => {
    const inputValue = parseInt(e.id);
    if (!inputValue) {
      dispatch(setClassroomId(0));
      dispatch(setClassroomGrade(0));
      dispatch(setClassroomSubject(0));
      applyFilters();
      return;
    }
    const gradeId = parseInt(e.fk_grade_id);
    const subjectId = parseInt(e.fk_subject_id);
    dispatch(setClassroomGrade(gradeId));
    dispatch(setClassroomSubject(subjectId));
    dispatch(setClassroomId(inputValue));
    applyFilters();
  };

  const onChangeClassroomActivity = (e) => {
    const inputValue = parseInt(e.id);
    if (!inputValue) {
      dispatch(setActivityClassroomId(0));
      dispatch(setGradeIdState(0));
      dispatch(setSubjectId(0));
      return;
    }
    const gradeId = parseInt(e.fk_grade_id);
    const subjectId = parseInt(e.fk_subject_id);
    dispatch(setGradeIdState(gradeId));
    dispatch(setSubjectId(subjectId));
    dispatch(setActivityClassroomId(inputValue));
    applyFilters();
  };

  if (print) {
    return null;
  }

  return (
    <>
      <header className="header">
        <div className="header-container">
          <HeaderTopbar
            has_kindergarten={has_kindergarten === "true"}
            has_zero_students_classrooms={has_zero_students_classrooms === 'true'}
            userLogout={userLogout}
            userRole={userRole}
            applyFilters={applyFilters}
            customClass={
              (userRole === "Classroom Admin" && classrooms.length > 1) ||
              (userRole === "District Admin" && districts.length > 1) ||
              (userRole === "School Admin" && districtSchools.length > 1)
                ? "radious"
                : ""
            }
          />
          <div
            className={
              (isActivityScreen ||
                isClassroomScreen ||
                (userRole === "Classroom Admin" && classrooms.length > 1) ||
                (userRole === "District Admin" && districts.length > 1) ||
                (userRole === "School Admin" && districtSchools.length > 1)) &&
              districts.length > 0
                ? "header__dropdown"
                : "d-none"
            }
          >
            <div className="header__dropdown-inner-admin">
              <div className="d-flex flex-column flex-sm-row flex-md-row  justify-content-between align-items-center header__dropdown-list">
                <ul className="management-list">
                  {isClassroomScreen && (
                    <ClassroomDropDowns
                      onDistrictChange={onDistrictChangeClassroom}
                      onSchoolChange={onSchoolChangeClassroom}
                      userRole={userRole}
                      classrooms={classrooms}
                      onChangeClassroom={onChangeClassroom}
                      isOtherScreen={isOtherScreen}
                    />
                  )}
                  {isActivityScreen && (
                    <ActivityDropDowns
                      onDistrictChange={onDistrictChangeActivity}
                      setTeacherId={setTeacherId}
                      setGradeId={setGradeId}
                      onSchoolChange={onSchoolChangeActivity}
                      onChangeClassroom={onChangeClassroomActivity}
                      applyFilters={applyFilters}
                      userRole={userRole}
                      teachers={teachers}
                      grades={grades}
                      classrooms={classrooms}
                      isOtherScreen={isOtherScreen}
                    />
                  )}
                  {isManagementScreen && userRole !== "Super Admin" && (
                    <ManagementDropDowns
                      onDistrictChange={onDistrictChangeManagement}
                      onSchoolChange={onSchoolChangeManagement}
                      onChangeClassroom={onClassChangeManagement}
                      userRole={userRole}
                      classrooms={classrooms}
                    />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
