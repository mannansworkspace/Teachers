import { selectStyles } from "./dropdownStyles";
import Select from "react-select";

export const DistrictDropDown = ({
  isDisabled,
  onDistrictChange,
  districts,
  selectedDistrict,
  isFromActivity,
  isOtherScreen,
  shouldNotShowAll
}: any) => {
  const isOnlyOneDistrict = districts.length === 1;
  let options = districts;
  options = shouldNotShowAll ? [...options] : isFromActivity 
    ? [{ label: "All Districts", value: 0, id: 0 }, ...options]
    : [{ label: "Select a District", value: 0, id: 0 }, ...options]
  
  return (
    <Select
      isDisabled={isDisabled || isOnlyOneDistrict || isOtherScreen}
      onChange={onDistrictChange}
      options={options}
      className="dropdown-diabled"
      value={selectedDistrict}
      classNamePrefix="react-select"
      styles={selectStyles}
      isClearable={true}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export const SchoolDropDown = ({
  isFromActivity,
  districtSchools,
  isDisabled,
  onSchoolChange,
  isSearchable,
  selectedSchool,
  isClearable,
  isOtherScreen,
  shouldNotShowAll
}: any) => {
  let options = districtSchools.map((x: any) => {
    x.label = x.school_name || x.name;
    x.value = x.id;
    return x;
  });
  options = shouldNotShowAll ? [...options] : isFromActivity
    ? [{ label: "All Schools", value: 0, id: 0 }, ...options]
    : [{ label: "Select a School", value: 0, id: 0 }, ...options];
  const isOnlyOneSchool = districtSchools.length === 1;
  return (
    <Select
      isDisabled={isDisabled || isOnlyOneSchool || isOtherScreen}
      onChange={(e: any) => onSchoolChange(e, true)}
      isSearchable={isSearchable}
      isClearable={isClearable}
      value={selectedSchool}
      options={options}
      className="dropdown-diabled"
      classNamePrefix="react-select"
      styles={selectStyles}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export const TeacherDropDown = ({
  teachers,
  school_id,
  setTeacherId,
  selectedTeacher,
  isOtherScreen,
}: any) => {
  const options = [
    { label: "All Teachers", value: 0, id: 0 },
    ...teachers.map((x: any) => {
      x.label = x.first_name + " " + x.last_name;
      x.value = x.id;
      return x;
    }),
  ];
  return (
    <Select
      isDisabled={
        teachers.length === 0 || school_id === 0 ? true : false || isOtherScreen
      }
      onChange={setTeacherId}
      isSearchable={true}
      value={selectedTeacher}
      options={options}
      className="dropdown-diabled"
      classNamePrefix="react-select"
      styles={selectStyles}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export const ClassroomDropDown = ({
  selectedClassroom,
  onChangeClassroom,
  classrooms,
  isDisabled,
  isOtherScreen,
  disbledDefualt,
  shouldNotShowAll,
  hideOption
}: any) => {
  let options = classrooms.map((x: any) => {
    x.label = x.name;
    x.value = x.id;
    return x;
  });
  options = hideOption ? options.filter((item:any) => item.fk_grade_id !== 9 &&  item.students_count > 0) : options
  options = shouldNotShowAll ? [...options]:[{ label: "Select a Classroom", value: 0, id: 0, isDisabled: disbledDefualt }, ...options];
  const isOnlyOneClass = shouldNotShowAll ? options.length === 1 :  options.length === 2;
  return (
    <Select
      isDisabled={isDisabled || isOtherScreen || isOnlyOneClass}
      onChange={(e: any) => {
        onChangeClassroom(e, true);
      }}
      isSearchable={true}
      options={options}
      value={selectedClassroom}
      className="dropdown-diabled"
      classNamePrefix="react-select"
      styles={selectStyles}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export const GradeDropDown = ({
  isDisabled,
  setGradeId,
  selectedGrade,
  grades,
  isOtherScreen
}: any) => {
  const options = [
    { label: "All Grades", value: 0, id: 0 },
    ...(grades?.map((x: any) => {
      x.label = x.name;
      x.value = x.grade_id + "" + x.subject_id;
      x.id = x.grade_id;
      return x;
    }) || []),
  ];
  return (
    <Select
      isDisabled={isDisabled || isOtherScreen}
      onChange={setGradeId}
      isSearchable={true}
      value={selectedGrade}
      options={options}
      className="dropdown-diabled"
      classNamePrefix="react-select"
      styles={selectStyles}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};
