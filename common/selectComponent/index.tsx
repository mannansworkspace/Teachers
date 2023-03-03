import { useEffect, useState } from "react";
import Select from "react-select";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ordinal_suffix_of } from "util/index";

const customFilter = (option:any, searchText:string) => {
    if (
      option.data.item.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.item.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
      (option.data.item.first_name + ' ' + option.data.item.last_name).toLowerCase().includes(searchText.toLowerCase()) ||
      (option.data.label).toLowerCase().includes(searchText.toLowerCase()) 
    ) {
      return true;
    } else {
      return false;
    }
}


export const AdminsSelect = ({ onSave, open, setOpen, isId, options , disableHandler, onChangeHandler, noOptionsMessage }: any) => {
    const adminsOptions = options?.map((item:any) => {
        return { id: item.id, value: item.id , label: `${item?.last_name}, ${item?.first_name}`, item: item }
    })
   
    const onKeyDown = (event:any) => {
        if (event.key === 'Enter' && !open && !event.target.value && !isId) {
            setOpen(true)
        }
        else if (event.key === 'Enter' && !open && isId){
            onSave()
        }
        else if((event.target.value || event.key ===  'ArrowDown') && !open){
            setOpen(true)
        }
    };
    
    const onClick = () => {
       setOpen(!open)
    } 
   
    return (
        <div className="admin-selects" onClick={onClick}>
            <Select
                isDisabled={disableHandler}
                isSearchable={true}
                options={adminsOptions}
                placeholder="Select or Type Name"
                onChange={onChangeHandler}
                menuIsOpen={open}
                className="admin-selects__wrapper"
                classNamePrefix="admin-selects"
                filterOption={customFilter}
                autoFocus={true}
                onKeyDown={onKeyDown}
                noOptionsMessage={()=>noOptionsMessage}
                components={{
                    IndicatorSeparator: () => null,
                }}
            />  
        </div>
    )
};

export const AdminsSelectClass = ({ id, open, setOpen, isId, options , disableHandler, onChangeHandler, noOptionsMessage, isSubmitError, errorPresentBefore, error }: any) => {
    const adminsOptions = options?.map((item:any) => {
        return { id: item.id, value: item.id , label: `${item?.last_name}, ${item?.first_name}`, item: item }
    })
    const defaultValue = adminsOptions?.find((item:any) => item.id === id);

    const onKeyDown = (event:any) => {
        if (event.key === 'Enter' && !open && !event.target.value && !isId) {
            setOpen(true)
        }
        else if (event.key === 'Enter' && !open && isId){
            // onSave()
        }
        else if((event.target.value || event.key ===  'ArrowDown') && !open){
            setOpen(true)
        }
    };
    
    const onClick = () => {
       setOpen(!open)
    } 

    
    return (
        <div className="admin-selects" onClick={onClick}>
            <Select
                isDisabled={disableHandler}
                isSearchable={true}
                options={adminsOptions}
                filterOption={customFilter}
                placeholder={<div><span
                    className={
                      isSubmitError && errorPresentBefore
                        ? error
                          ? "red-circle"
                          : "green-circle"
                        : "d-none"
                    }
                  ></span><span className={ isSubmitError && errorPresentBefore ? 'margin-helptext':''}>Select or Type Name</span></div>}
                onChange={onChangeHandler}
                menuIsOpen={open}
                defaultValue={defaultValue}
                className="admin-selects__wrapper"
                classNamePrefix="admin-selects"
                autoFocus={true}
                onKeyDown={onKeyDown}
                noOptionsMessage={()=>noOptionsMessage}
                components={{
                    IndicatorSeparator: () => null,
                }}
            />  
        </div>
    )
};

export const LimitSelect = ({ disableHandler, onChangeHandler }: any) => {
    const limitOptions = [
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 30, label: 30 }
    ];

    return (
        <div className="limit-selects">
            <Select
                isDisabled={disableHandler}
                isSearchable={false}
                options={limitOptions}
                defaultValue={limitOptions[0]}
                onChange={onChangeHandler}
                className="limit-selects__wrapper"
                classNamePrefix="limit-selects"
                components={{
                    IndicatorSeparator: () => null,
                }}
            />
        </div>
    )
};

export const ProgressLimitSelect = ({ disableHandler, onChangeHandler }: any) => {
    const limitOptions = [
        { value: 10, label: 10 },
        { value: 50, label: 50 },
        { value: 100, label: 100 }
    ];

    return (
        <div className="limit-selects">
            <Select
                isDisabled={disableHandler}
                isSearchable={false}
                options={limitOptions}
                defaultValue={limitOptions[0]}
                onChange={onChangeHandler}
                className="limit-selects__wrapper"
                classNamePrefix="limit-selects"
                components={{
                    IndicatorSeparator: () => null,
                }}
            />
        </div>
    )
};

export const GradeSelect = ({ onChangeHandler, isDisabled, options, selected }: any) => {

    const optionsData = options?.map((item:any) => {
        return {...item, value: item.id ,label: item.id !== 9 ? `${ordinal_suffix_of(Number(item.id))} Grade`: item.name}
    })

    return (
        <Select
            isDisabled={isDisabled}
            isSearchable={false}
            options={optionsData}
            value={optionsData?.find((item:any) => item.id === selected)}
            defaultValue={optionsData?.find((item:any) => item.id === Number(JSON.parse(sessionStorage.getItem("c_grade_id") ?? '0')))}
            onChange={onChangeHandler}
            className="grade-selects__wrapper"
            classNamePrefix="grade-selects"
            components={{
                IndicatorSeparator: () => null,
            }}
        />
    )
}

export const AssessmentSelect = ({ onChangeHandler, isDisabled }: any) => {

    const options = [
        { value: '1', label: 'All Formatives' },
        { value: '2', label: 'Active' },
        { value: '3', label: 'Inactive' },
    ];

    return (
        <Select
            isDisabled={isDisabled}
            isSearchable={false}
            options={options}
            defaultValue={options[0]}
            onChange={onChangeHandler}
            className='assessment-selects__wrapper'
            classNamePrefix='assessment-selects'
            components={{
                IndicatorSeparator: () => null,
            }}
        />
    )
}

export const TableSelectCommon = ({ isOpen, toggleSelect, options, onChange, isReport, customClassName, name, resetName }: any) => {
    const [label, setLabel] = useState(isReport ? 'Select Report' : `Select Option`);
    const handleOnClick = (option: { value: string, label: string }) => {
        onChange(option.value)
        if (!name) {
            setLabel(option.label)
        }
    }
    useEffect(() => {
        name && setLabel(name)
    }, [name])

    return (
        <Dropdown className="table-dropdown" isOpen={isOpen} toggle={toggleSelect}>
            <DropdownToggle className="table-dropdown-toggle">
                <div className={`${name && 'studentTests__test__name'}`}>{resetName ?  `Select Option` : label}</div>
            </DropdownToggle>
            <DropdownMenu className={`table-dropdown-menu ${customClassName}`}>
                {options.map((option: { value: string, label: string, disabled?: boolean }, index: number) => {
                    return <DropdownItem key={index} className="table-dropdown-item" disabled={option?.disabled} onClick={() => handleOnClick(option)}>{option.label}</DropdownItem>
                })}
            </DropdownMenu>
        </Dropdown>
    )
};

// below component is used in summative objective analysis report
export const CustomTableSelectCommon = ({ isOpen, toggleSelect, options, onChange, customClassName, name, placeholder }: any) => {
    const [label, setLabel] = useState<string>('');

    const handleOnClick = (option: { value: string, label: string }) => {
        console.log({ option })
        onChange(option.value)
        setLabel(option.label)
    }

    useEffect(() => {
        // this logic is for Summative objective analysis report where we have to find the option with {has_data:true} and call the api against it
        if (options?.length) {
            if (name === "grade_classes") {
                const filteredOption = options.find((option: any) => option?.value?.has_data)
                // if any of grade-subject is with { has_data:true } will be filtered and so on
                if (filteredOption) {
                    setLabel(filteredOption?.label)
                    handleOnClick(filteredOption)
                }
                // if non of any grade-subject is with { has_data:true }, then the label for this scnerio is no
                else {
                    setLabel(options[0]?.label)
                    handleOnClick(options[0])
                }
            } else if (name === "summatives") {
                setLabel(options[0]?.label)
                handleOnClick(options[0])
            }
        }
        else {
            setLabel(placeholder || 'No-options')
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [options])


    return (
        <Dropdown className="table-dropdown" isOpen={isOpen} toggle={toggleSelect}>
            <DropdownToggle className="table-dropdown-toggle">
                <div className={`${name && 'studentTests__test__name'}`}>{label}</div>
            </DropdownToggle>

            <DropdownMenu className={`table-dropdown-menu ${customClassName}`}>
                {options?.map((option: { value: string, label: string, disabled?: boolean }) => (
                    <DropdownItem
                        className="table-dropdown-item"
                        disabled={option?.disabled}
                        onClick={() => handleOnClick(option)}
                    >
                        {option.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
};
