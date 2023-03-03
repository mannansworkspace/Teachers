/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "assets/img/AlphaPlusLogo.png";
import { ReactComponent as ClassRoomIconBlue } from "assets/img/classroom-icon-blue.svg";
import { ReactComponent as HomeIconWhite } from "assets/img/home-icon-white.svg";
import { ReactComponent as ManagementIconBlue } from "assets/img/management-icon-blue.svg";
import UserDropdown from "./UserDropdown";
import { getDistrictLogoSelector } from "redux/actionCreators/management";

interface RootState {
  auth: any;
  activity: any;
  classroom: any;
  management: any;
}

const HeaderTopbar: React.FC<{
  has_kindergarten: boolean;
  has_zero_students_classrooms: boolean;
  customClass: string;
  userLogout: (event: any) => void;
  userRole: string;
}> = ({
  customClass,
  userLogout,
  userRole,
  has_kindergarten
}) => {
  const app = useSelector((state: RootState) => state);
  const { pathname }: any = useLocation();
  const districtLogo = useSelector(getDistrictLogoSelector);

  const classrooms = app.classroom.classrooms;
  const districts = app.activity.districtsList;
  const districtSchools = app.activity.schoolsList;
  
  let district_logo = app.activity.districtsList?.find(
    (item: any) =>
      item.id ===
      Number(
        sessionStorage.getItem(
          pathname.indexOf("activity") === 1 ? "district_id" : "c_district_id"
        )
      )
  )?.logo_filename;
  const addClassRadious =
    pathname.indexOf("activity") === -1 && pathname.indexOf("classroom") === -1;
  district_logo = addClassRadious ? districtLogo : district_logo;
  const navigate = useNavigate();
  const allAreNoStudents =
    app.classroom.classrooms?.filter((item: any) => item.students_count === 0)
      ?.length === app.classroom.classrooms?.length;

  const hideActivity =  userRole === "Classroom Admin" && allAreNoStudents && app.classroom.classrooms.length > 0 

  useEffect(() => {
    if (hideActivity && pathname.includes("/activity")) {
      navigate("/classroom");
    }
  }, [app.classroom.classrooms]);
  
  const classRoomArrowPosition = (idx:number) => {
    // const links = document.getElementsByClassName('nav-item nav-link') as any
    // const linkActive = document.getElementsByClassName('nav-item nav-link active') as any
    // if(linkActive.length){
    //   linkActive[0].classList.remove("active")
    // }
    // links[idx].classList.add("active")
  };

  const managementArrow = (pathname.includes("/management") && userRole === "District Admin" && districts.length > 1) || (pathname.includes("/management") && districtSchools.length > 1 && userRole === "School Admin") || (pathname.includes("/management") && userRole === "Classroom Admin" && classrooms.length > 1);

  const activityArrow = pathname.includes("/activity");

  const classrromArrow = pathname.includes("/classroom");

  return (
    <div className="header__top">
      <nav
        className={`navbar navbar-expand-lg navbar-light header__navbar ${
          addClassRadious ? "" : "radious"
        } ${customClass}`}
      >
        <div className="header-wrapper">
          <div className="header__logo">
            <Link
              to={{ pathname: "/activity" }}
              className="navbar-brand header__navbar-brand"
            >
              <div className="header__navbar-logo">
                <img src={logo} alt="" />
              </div>
            </Link>

            {app.activity.districtsList.length > 1 && (
              <div className="district-logo">
                {district_logo ? (
                  <img src={district_logo} alt="District Logo" />
                ) : (
                  ""
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="navbar-toggler header__navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar-main header__menu"
            id="navbarCollapse"
          >
            <div className={`navbar-main-wrapper`}>
              <div className={`navbar-nav `}>
                <Link
                  onMouseDown={()=>classRoomArrowPosition(0)}
                  to={{ pathname: "/activity" }}
                  className={`nav-item nav-link 
                    ${
                      (pathname === "/activity" ||
                      pathname.indexOf("activity") > -1) 
                        ? "active"
                        : ""
                    } ${
                      hideActivity
                      ? "d-none"
                      : ""
                  }`}
                
                >
                  <HomeIconWhite />
                  <span>Activity</span>
                </Link>
                <Link onMouseDown={()=>classRoomArrowPosition(1)}
                  to={{ pathname: "/classroom" }}
                  className={`nav-item nav-link ${pathname.indexOf("classroom") > -1  ? 'active' : ''}`}
                >
                  <ClassRoomIconBlue />
                  <span>Classroom</span>
                </Link>

                <Link
                 onMouseDown={()=>classRoomArrowPosition(2)}
                  to={{ pathname: "/management" }}
                  className={`nav-item nav-link 
                    ${pathname.includes("management") ? "active" : ""}
                  `}
                >
                  <ManagementIconBlue />
                  <span>Management</span>
                </Link>

                {districts.length > 0 && <div className={`${activityArrow ||  classrromArrow || managementArrow ? 'header__top-arrow-animation': 'header__top-arrow'} ${activityArrow ? 'activity_width': classrromArrow ?  'classroom_width' : managementArrow ? 'management_width': ''} `}></div>}
              </div>
            </div>

            <UserDropdown userLogout={userLogout} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderTopbar;
