import { useState } from "react";
import cookie from "js-cookie";
import SelectDropdown from "assets/img/profile-dropdown-icon.svg";
import ChangePasswordModal from "../change-password/change-password-modal";
import { ContactSupportModal } from "../ContactSupport/ContactSupportModal";
import SuccessModal from "../common/successModal/index";

interface Props {
    userLogout: (event: any) => void;
    containerClassName?: string
}

const UserDropDown: React.FC<Props> = (props) => {
    const { userLogout, containerClassName='header__user' } = props;
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showSupportModal, toggleSupportModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const fullName: any = `${cookie.get("first_name")} ${cookie.get(
        "last_name"
    )}`;

    const initials = fullName.match(/\b(\w)/g).join("");
    const userRole = cookie.get("role");

    return (
        <div className={containerClassName}>
            <div className="login-account-info dropdown">
                <a
                    href="!#"
                    className="text-decoration-none dropdown-toggle login-account-profile"
                    id="loginuser"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <span className="username-box">{initials}</span>

                    <div className="login-user-info">
                        <p className="login-user-name">{fullName}</p>
                        <p className="login-user-detail">{userRole}</p>
                    </div>
                    <span className="user-dropdown-icon">
                        <img src={SelectDropdown} alt="selectDropdown" />
                    </span>
                </a>
                <ul
                    className="dropdown-menu text-small login-user-dropdown"
                    aria-labelledby="loginuser"
                >
                    <li>
                        <a className="dropdown-item" href="https://docs.aplustesting.org/" target="_blank" rel="noopener noreferrer">
                            Help
                        </a>
                    </li>
                    <li onClick={() => setShowChangePassword(true)}>
                        <span className="dropdown-item">Change Password</span>
                    </li>
                    <li>
                        <span
                            className="dropdown-item"
                            onClick={() => toggleSupportModal(true)}
                        >
                            Contact Support
                        </span>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="!#" onClick={userLogout}>
                            Log Out
                        </a>
                    </li>
                </ul>

                {showSupportModal &&
                    <ContactSupportModal
                        closeModal={() => toggleSupportModal(false)}
                        isShow={showSupportModal}
                        setShowSuccess={setShowSuccess}
                    />
                }
                <SuccessModal
                    bodyText="Thank you for contacting Alpha Plus Support. We will reach out to you within one business day. If your case is urgent, please call us at (405) 842-8408."
                    headerText="Ticket Submitted"
                    isShow={showSuccess}
                    closeModal={() => setShowSuccess(false)}
                />

                <ChangePasswordModal
                    isShow={showChangePassword}
                    closeModal={() => setShowChangePassword(false)}
                />
            </div>
        </div>
    )
}

export default UserDropDown;