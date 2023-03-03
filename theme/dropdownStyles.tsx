export const selectStyles = {
  placeholder: (defaultStyles: any, state: any) => {
    return {
      ...defaultStyles,
      color: "#4788ff",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    };
  },

  control: (defaultStyles: any, state: any) => {
    return {
      ...defaultStyles,
      height: "0px",
      minHeight: "31px",
      border: "none",
      opacity: state.isDisabled ? "0.58" : "1",
      cursor: "pointer",
    };
  },
  singleValue: (defaultStyles: any, state: any) => {
    return {
      ...defaultStyles,
      color: "#4788FF",
    };
  },
  valueContainer: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    height: "31px",
    maxHeight: "31px",
    fontSize: "16px",
    padding: "0 8px",
  }),
  indicatorsContainer: (defaultStyles: any, state: any) => {
    return {
      ...defaultStyles,
      width: "30px",
      color: "#4788FF",
    };
  },
  dropdownIndicator: (defaultStyles: any, state: any) => {
    return {
      ...defaultStyles,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "31px",
      color: "#4788FF",
      padding: "0",
    };
  },
};
