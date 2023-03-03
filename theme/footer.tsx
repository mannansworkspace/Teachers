import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from 'hooks/useQuery'

const Footer: React.FC<{}> = (props) => {
  const { pathname } = useLocation();
  const query = useQuery();
  const print = query.get("print")

  if(print){
    return null
  }

  return (
    <>
      <footer className="footer" id="footer-content">

          <div className={`footer__content ${pathname === '/login' || pathname === '/' || pathname === '/reset-password' ? 'login-page-footer' : ''}`}>
            <p className="footer__content-copy">
              &copy; {new Date().getFullYear()} Alpha Plus Systems, Inc.
            </p>
            <p className="footer__content-description">
            NOTICE: School staff privacy, security of computer systems, and protection of student information is important to Alpha Plus. In order to maintain privacy and security at all times, Alpha Plus Systems, Inc. does not collect student identification information other than first and last names and identification code, which are provided by school district authorities. Alpha Plus does not share this information with any external entities. School officials must consider the age and functionality of devices students use in terms of privacy and confidentiality laws and regulations, including the Children’s Internet Protection Act at Children's Internet Protection Act at <a href="https://www.fcc.gov/consumers/guides/childrens-internet-protection-act" target="_blank" rel="noopener noreferrer">FCC Children’s Internet Protection Act (CIPA)</a>. By using this website, any educator, parent, staff member or other authorized user downloading personally identifiable student data agrees to protect the information as required by applicable state and federal laws including the Family Educational Rights and Privacy Act (FERPA - 20 U.S.C. &#167; 1232g; 34 CFR Part 99). ALL online and downloadable content protected by &copy; {new Date().getFullYear()} Alpha Plus Systems, Inc.
            </p>
          </div>
      </footer>
    </>
  );
};

export default Footer;
