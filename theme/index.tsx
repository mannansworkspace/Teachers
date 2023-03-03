/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./header";
import Footer from "./footer";
import cookie from "js-cookie";
import { useNavigate } from "react-router";
// import {io } from "socket.io-client";
// import config from "config/config";
import {
  getDistrictsAndSchools,
} from "redux/actionCreators/activity";
import ChangePasswordModal from "components/change-password/change-password-modal";

const Theme: React.FC<{}> = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = cookie.get("role");
  const token = cookie.get("token");
  const [changeModal, setChangeModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      const callDistrictsApi = window.location.href.includes('management') && !window.location.href.includes('import/class') && userRole === 'Super Admin' 
      if (token && !callDistrictsApi) {
        await dispatch(getDistrictsAndSchools());
      }
    };
    init();
  },[]);


  useEffect(() => {

    if(!token){

      navigate("/");
    }

  },[token,navigate]);

  useEffect(() => {
    const forgot = cookie.get("forgot_password");

    if (forgot === "true") {
      //! show change password modal and force
      setChangeModal(true);
    }
  }, []);

  return (
    <div className="container-xl page-wrapper">
      <Header />
       {props.children}
      <Footer />
      {changeModal && (
          <ChangePasswordModal
            isShow={changeModal}
            closeModal={() => setChangeModal(false)}
            force={true}
          />
        )}
    </div>
  );
};

export default Theme;
