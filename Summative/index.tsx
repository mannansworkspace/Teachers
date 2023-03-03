/* eslint-disable react-hooks/exhaustive-deps */

import BenchmarkModal from "components/common/reportModal/benchmarkModal"
import FormativeAssessedModal from "components/common/reportModal/formativeModal"
import { useEffect, useMemo, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSummativeReport } from "redux/actionCreators/classroom"
import { RootState } from "redux/reducers/combine"
import SearchIconGray from "assets/img/search-icon-gray.svg";
import QuestionIconDark from "assets/img/question-mark-dark.svg";
import NavPrev from "assets/img/nav-prev-icon.png";
import NavNext from "assets/img/nav-next-icon.png";
import Navtop from "assets/img/nav-top-icon.png";
import NavBottom from "assets/img/nav-bottom-icon.png";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import Print from "./Print"
import InfoSection from "./infoSection"
import ReportTabs from "components/common/report/tabs/ReportTabs"
import ReportHeader from "components/common/report/header"
import Student from "./Student"
import { TabsSkeleton, HeaderSkeleton, BodySkeleton, FooterSkeleton } from "components/common/skeleton/ReportsSkeleton";
import TableHeader from "./table/header";
import { useQuery } from "hooks/useQuery"

const SummativeReport = () => {
	const dispatch = useDispatch()
	let report = useSelector((state: RootState) => state.classroom.summativeReport);
	const [showFormativeModal, setShowFormativeModal] = useState(false)
	const [showBenchmarkModal, setShowBenchMarkModal] = useState(false)
	const [showScore, setShowScore] = useState(true)
	const [search, setSearch] = useState('')
	const { id, classroom }: any = useParams();
	const [showObjectiveColumn, setShowObjectiveColumn] = useState<string>(null!)
	const [tabIndex, setTabIndex] = useState<number>(0)
	const objectivesPerPage = 21
	const [isLoading, setIsLoading] = useState(false);
	const [isNavLeftDisabled, setIsNavLeftDisabled] = useState(true);
	const [isNavTopDisabled, setIsNavTopDisabled] = useState(true);
	const contentRef = useRef<HTMLDivElement>(null);
	const componentRef = useRef(null);

	const query = useQuery();
	const print = query.get("print")

	useEffect(() => {
		dispatch(getSummativeReport(classroom, id));
		setIsLoading(true);
	}, [dispatch, classroom, id])


	const { test_name, students, objectives, slicedObject, classroom_name } = useMemo(() => {

		if (report?.data) {

			const students = report.data.students
			const objectives = report.data.objective_info.objective?.map((objective: any, index: number) => {
				let obj: any = {}

				for(let i=0; i<students.length;i++){
					const student = students[i]

					obj = student.objectives.find((studentObjective: any) => (objective.objective_number === studentObjective.objective_number) &&  studentObjective.formative_given)
					if(obj){
						break; 
					}

					student.student_id === "101368" && obj && console.log(objective.objective_number, obj)
				};

				if (obj) {
					return {
						...objective,
						fomativeGiven: obj.formative_given
					}
				}
				return { ...objective }
			})

			const slicedObject: any = objectives?.slice(tabIndex * objectivesPerPage, (tabIndex * objectivesPerPage + objectivesPerPage))
			const sortedStudents = students;
			setIsLoading(false);


			return {
				...report.data,
				objectives: objectives,
				slicedObject,
				students: !search.length ? sortedStudents : sortedStudents?.filter((student: any, index: number) => {
					return student.student_Name.toLowerCase().includes(search.toLowerCase())
				})
			}
		}
		else {
			return { students: [], objectives: [], slicedObject: [], classroom_name: "", test_name: "" }
		}
	}, [report, tabIndex, search])

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: `Class_Summative_Report_${test_name}_${moment(new Date()).format("M/DD/YY hh:mmA")}`,
		removeAfterPrint: true,
		onAfterPrint: () => {
			print && window.close()
		}
	});

	useEffect(() => {
		if (report && print) {
			handlePrint()
		}
	}, [report])
	const reportFooter: any = {
		total: <div className="report__tested-title summative-tested-title">Total Students Tested</div>,
		A: <div className={`report__tested-title summative-tested-title ${!isLoading ? 'dark' : ''}`}>
			<div className="d-flex justify-content-end align-items-center">
				<span className="report__tested-rectangle advanced"></span>
				<span className="report__tested-text">Advanced</span>
			</div>
		</div>,
		P: <div className="report__tested-title summative-tested-title">
			<div className="d-flex justify-content-end align-items-center">
				<span className="report__tested-rectangle proficient"></span>
				<span className="report__tested-text">Proficient</span>
			</div>
		</div>,
		B: <div className={`report__tested-title summative-tested-title ${!isLoading ? 'dark' : ''}`}>
			<div className="d-flex justify-content-end align-items-center">
				<span className="report__tested-rectangle basic"></span>
				<span className="report__tested-text">Basic</span>
			</div>
		</div>,
		BB: <div className="report__tested-title summative-tested-title below">
			<div className="d-flex justify-content-end align-items-center">
				<span className="report__tested-rectangle below"></span>
				<span className="report__tested-text">Below Basic</span>
			</div>
		</div>
	}


	const objectiveClickHandler = (objective: any) => {
		if (objective === showObjectiveColumn) {
			setShowObjectiveColumn(null!)
			return
		}
		setShowObjectiveColumn(objective)
	}

	const onTabChange = (tabIndex: number) => {
		setTabIndex(tabIndex)
		setShowObjectiveColumn(null!)

		if (contentRef.current) {
			contentRef.current.scrollLeft = 0;
		}
	}

	const onScroll = () => {
		if (contentRef.current) {
			const { scrollLeft, clientWidth, scrollWidth } = contentRef.current;
			if (scrollLeft + clientWidth === scrollWidth) {
				setIsNavLeftDisabled(false);
			}
			if (scrollLeft === 0) {
				setIsNavLeftDisabled(true);
			}
		}
	};

	const scrollToTop = () => {
		window.scrollTo(0, 0);
		setTimeout(() => {
			setIsNavTopDisabled(true);
		}, 800)
	}

	const scrollToBottom = () => {
		const target = document.getElementById("footer-content") as any;
		if (target) {
			window.scrollTo(0, target.offsetTop - window.innerHeight);
		}
		setTimeout(() => {
			setIsNavTopDisabled(false);
		}, 800)
	}

	const scrollToLeft = () => {
		if (contentRef.current) {
			contentRef.current.scrollLeft += -800;
		}
		setIsNavLeftDisabled(true);
	}

	const scrollToRight = () => {
		if (contentRef.current) {
			contentRef.current.scrollLeft += 800;
		}
		setIsNavLeftDisabled(false);
	}

	const isIsolated = (objective_number: string) => (
		!!(showObjectiveColumn && showObjectiveColumn !== objective_number)
	)

	return (
		<>
			<div className="report" id="summative__report">
				{
					!print && <div className="hide-on-print">
						<ReportHeader
							classroomName={`Classroom ${test_name?.split('-').pop() || ""}`}
							testName={test_name ? test_name : 'OK'}
							reportTitle="Summative Report"
							reportGuide='Click on an objective to isolate.'
							setPrint={handlePrint}
						/>

						<div className="report-content">
							<div className="report__performance summative-performance">
								<InfoSection />
								<div className="report__performance-objective">
									<div className="report__performance-rectangle">%</div>
									<p>Show Objective Score Percentage</p>
									<div className="switch switch-small mb-0"
										onClick={() => setShowScore(!showScore)}>
										<input
											className="switch-checkbox"
											type="checkbox"
											role="switch"
											id="flexSwitchCheckChecked"
											checked={showScore}
										/>
										<span className="switch-slider switch-slider-small"></span>
									</div>
								</div>

								<div className="report__navigation summative-navigation">
									<p className="mb-0">Navigation</p>
									<div className="report__navigation-buttons">
										<div className="report__navigation-right">
											<button type="button" disabled={isNavLeftDisabled === true ? true : false} onClick={scrollToLeft} className="report__navigation-btn next">
												<img src={NavPrev} alt="icon" />
											</button>
											<button type="button" disabled={isNavLeftDisabled === false ? true : false} onClick={scrollToRight} className="report__navigation-btn next ms-2">
												<img src={NavNext} alt="icon" />
											</button>
										</div>
										{students?.length > 10 && <div className="report__navigation-bottom">
											<button type="button" onClick={scrollToTop}
												disabled={isNavTopDisabled === true ? true : false}
												className="report__navigation-btn mb-2">
												<img src={Navtop} alt="icon" />
											</button>
											<button type="button" onClick={scrollToBottom}
												disabled={isNavTopDisabled === false ? true : false}
												className="report__navigation-btn">
												<img src={NavBottom} alt="icon" />
											</button>
										</div>}
									</div>
								</div>

							</div>


							<div className="report__search tabController">
								<div className="report__search-searcharea">
									{!isLoading &&
										<img src={SearchIconGray} className="report__search-icon animated-fade" alt="" />
									}
									<input
										className={`form-control report__search-input ${isLoading ? 'margin-left' : ''}`}
										type="search"
										name="Search"
										placeholder="Search Students"
										value={search}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
									/>
								</div>
								{!isLoading ?
									<ReportTabs
										objectivesPerPage={objectivesPerPage}
										tabIndex={tabIndex}
										onTabChange={onTabChange}
										objectives={objectives}
									/>
									: <TabsSkeleton customClass={''} width={145} />
								}

							</div>

							<div className="report__data summative-data"
								ref={contentRef} onScroll={onScroll}>

								<div className="report__data-header summitive-data-header">
									<div className="report__data-objective summitive-objective-width">
										<p>Objective Question Count</p>
										<p>
											<span className="report__data-icon"
												onClick={() => setShowFormativeModal(!showFormativeModal)}>
												<img src={QuestionIconDark} alt="" />
											</span>
											Formative Assessed
										</p>
									</div>


									<TableHeader
										objectiveClickHandler={objectiveClickHandler}
										isLoading={isLoading}
										objectives={slicedObject}
										students={students}
										isIsolated={isIsolated}
									/>

									<div className="report__data-benchmark">
										<p className="report__data-benchmarkTitle">
											<span>Benchmarked</span>
											<img src={QuestionIconDark} alt=""
												onClick={() => setShowBenchMarkModal(!showBenchmarkModal)}
											/>
										</p>
										<p className="report__data-score">(# Correct) <br /> Score</p>
									</div>

									<div className="report__data-summative">
										<p className="report__data-summativeTitle">Summative</p>
										<p className="report__data-score">(# Correct) <br /> Score</p>
									</div>
								</div>
								<div className="report-table-container">
									<table className={`report__table report__table-summative-table ${students && students?.length > 15 ? 'report__table-summative-table-height' : ''}`}>
										<tbody>
											{(!students?.length || !objectives.length) && !isLoading &&
												<tr className="summative-row dark-gray">
													<td className="report__table-notFound">No Record Found</td>
												</tr>
											}
											{!isLoading ? students?.map((student: any, index: number) => {
												return (
													<Student
														index={index}
														student={student}
														showScore={showScore}
														showObjectiveColumn={showObjectiveColumn}
														objectives={slicedObject}
													/>
												)
											})
												: <BodySkeleton rowColumns={21} circle={true} circleAttempt={true} scoreBox={true} scoreColumn={true} attemptWidth={'75px'} scoreWidth={'75px'} />
											}
										</tbody>
									</table>
								</div>

								<div className={`report__footer summative-footer ${students && students.length > 15 ? 'move-up summative-move-up' : ''}`}>
									{
										Object.keys(reportFooter).map((row, index) => {
											return (
												<div className={`${!isLoading && index % 2 !== 0 && row !== 'BB' ? "dark-gray" : ''} report__tested gray-bg ${!isLoading && index === 1 ? 'second-child' : ''}`} >
													{reportFooter[row]}
													<div className={`d-flex`}>
														{!isLoading ? slicedObject?.map((info: any) => {
															if (row !== 'BB')
																return (

																	<span className={`${!showObjectiveColumn ? '' : showObjectiveColumn === info.objective_number ? '' : 'hidden'} report__tested-data`}>
																		<span>{info[row]}</span>
																	</span>
																)
															else
																return (
																	<div className="report__tested-questions">
																		<span className={`report__tested-belowData basic-no ${showObjectiveColumn ? showObjectiveColumn === info.objective_number ? '' : 'hidden' : ''}`}>
																			{info[row]}
																		</span>
																		<span
																			onClick={() => objectiveClickHandler(info.objective_number)}
																			className={`${isIsolated(info.objective_number) && 'objective-isolation'} report__tested-objective`}
																		>
																			<span className={`${!isIsolated(info.objective_number) && 'font-bold'} report__tested-objectiveData`}>
																				{info.objective_number}</span>
																		</span>
																	</div>
																)
														})
															: row !== 'BB' ?
																<FooterSkeleton rowColumns={21} />

																: <div style={{ transform: 'translateY(-11px)' }}>
																	<HeaderSkeleton rowColumns={21} height={92} />
																</div>
														}
													</div>
													<div className="report__data-benchmark"></div>
													<div className="report__data-summative"></div>
												</div>
											)
										})
									}
								</div>

							</div>

						</div>


						<FormativeAssessedModal
							isShow={showFormativeModal}
							closeModal={() => setShowFormativeModal(false)}
						/>

						<BenchmarkModal
							isShow={showBenchmarkModal}
							closeModal={() => setShowBenchMarkModal(false)}
						/>
					</div>
				}
			</div >
			{
				report?.data && <div ref={componentRef} className="printData"><Print
					test_name={test_name}
					students={students}
					objectives={objectives}
					classroom_name={classroom_name}
				/></div>
			}
		</>
	)

}
export default SummativeReport