import ReportHeader from "components/common/report/header"
import SearchIconGray from 'assets/img/search-icon-gray.svg';
import { FC, useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSchoolAuditReport, schoolAuditReportSelector } from "redux/actionCreators/management";
import InfoSection from "./infoSection";
import TableHeader from "./table/header";
import TableBody from "./table/body";
import SchoolAuditPrint from "./Print";
import ActionType from "redux/actionTypes";
import { AuditReportBodySkeleton } from "components/common/skeleton/ReportsSkeleton";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { useQuery } from "hooks/useQuery";

const SchoolAuditReport: FC = () => {

   const dispatch = useDispatch()
   const { id } = useParams()
   const report = useSelector(schoolAuditReportSelector)
   const [search, setSearch] = useState<string>('')
   const [isLoading, setIsLoading] = useState<boolean>(true)
   const componentRef = useRef(null);

   const query = useQuery();
   const print = query.get("print")

   const { students, school_name, total_students, total_students_tested } = useMemo(() => {
      if (report) {
         const { students } = report
         const filteredStudents = !search.length ? students : students.filter((student: any) => student.student_name.toLowerCase().includes(search.toLowerCase()))
         setIsLoading(false)
         return {
            ...report,
            students: filteredStudents.map((student: any) => {
               return {
                  ...student,
                  isDuplicate: students.filter((st: any) => st.student_name === student.student_name).length > 1
               }
            })
         }
      }
      return {
         students: [], total_students: 0, total_students_tested: 0, school_name: ''
      }
   }, [report, search])

   console.log(school_name)

   useEffect(() => {
      id && dispatch(getSchoolAuditReport(parseInt(id)))
      return () => {
         dispatch({
            type: ActionType.SET_SCHOOL_AUDIT_REPORT,
            payload: null
         })
      }
   }, [id, dispatch]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: `SchoolAuditReport_${school_name}_${moment(new Date()).format("M/DD/YY hh:mmA")}`,
      removeAfterPrint: true,
      onAfterPrint: () => {
         print && window.close()
      }
   });

   useEffect(() => {
      if (report && print) {
         handlePrint()
      }
   }, [report, handlePrint, print])
   return <div className="auditStudentReport">
      {
         !print &&
         <>
            <ReportHeader
               reportTitle="School Audit Report"
               setPrint={handlePrint}
               testName={school_name}
            />

            <div className="auditStudentReport__mainContainer">
               <div className="auditStudentReport__center">

                  <div className="auditStudentReport__search">
                     <div className="auditStudentReport__search-bar d-flex">
                        <img src={SearchIconGray} className="report__search-icon animated-fade" alt="" />
                        <input
                           className="auditStudentReport__search-input"
                           type="search"
                           name="Search"
                           placeholder="Search Students"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                        />
                     </div>
                  </div>

                  <InfoSection
                     totalStudents={total_students}
                     totalTestedStudents={total_students_tested}
                  />
               </div>

               <div className="auditStudentReport__overflow mx-auto">
                  <table className="auditStudentReport__table">
                     <thead className={`auditStudentReport__table__head`}>
                        <TableHeader />
                     </thead>
                     {
                        isLoading ?
                           <AuditReportBodySkeleton
                              rows={20}
                              columns={4}
                           /> :
                           <tbody>
                              {
                                 students?.map((student: any) => <TableBody student={student} />)
                              }
                           </tbody>
                     }
                  </table>
                  {
                     !students.length &&
                     <div className="mt-4 mb-4">
                        <div className="dark-gray rounded-3">
                           <div className="report__table-notFound d-flex rounded-3 justify-content-center">No Records Found</div>
                        </div>
                     </div>
                  }
               </div>


            </div>
         </>
      }
      {students && <div className="printData" ref={componentRef}>
         <SchoolAuditPrint
            total_students={total_students}
            total_students_tested={total_students_tested}
            students={students}
            school_name={school_name}
         />
      </div>
      }
   </div>
}
export default SchoolAuditReport 