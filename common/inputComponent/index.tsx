/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import classnames from "classnames";

interface InputProps {
  fieldName: string;
  isSubmitError: boolean;
  errorPresentBefore: boolean;
  value: any;
  type: string;
  label: string;
  onChange: (name: string, value: any) => void;
  error?: string;
  margin?: boolean;
  autoFocus?:boolean;
}

interface CustomInputProps {
  fieldName: string;
  isSubmitError: boolean;
  errorPresentBefore: boolean;
  value: any;
  type: string;
  label: string;
  onChange: (name: string, value: any) => void;
  error: string;
  autoFocus?:boolean;
  errorMessage: string;
  overlayClick: () => void;
}

interface SelectInputProps {
  fieldName: string;
  isSubmitError: boolean;
  errorPresentBefore: boolean;
  value: any;
  options: any[];
  label: string;
  onChange: (name: string, value: any) => void;
  error: string;
  defaultTitle: string;
  notDisableFirst?: boolean;
  disabled?: boolean;
}

interface TextAreaInputProps {
  fieldName: string;
  isSubmitError: boolean;
  errorPresentBefore: boolean;
  value: any;
  label: any;
  onChange: (name: string, value: any) => void;
  error: string;
  autoFocus?:boolean;
  customClass?: string;
  isReadOnly?: boolean;
  customLabel?:boolean;
}

export const ValidationHint = ({
  isSubmitError,
  extraClass,
}: {
  isSubmitError: boolean;
  extraClass?: string;
}) => {
  return (
    <div className={classnames(isSubmitError ? "error-hint" : "d-none", extraClass ? extraClass : '')}>
      <span className="red_dot me-2" />
      <span>Required Field</span>
    </div>
  );
};

export const ValidationHintWithMsg = ({
  isError,
  message,
  extraClass,
}: {
  isError: boolean;
  message: string;
  extraClass?: string;
}) => {
  return (
    <div className={classnames(isError ? "error-hint" : "d-none", extraClass ? extraClass : '')}>
      <span className="red_dot me-2" />
      <span>{message}</span>
    </div>
  );
};

export const Input: React.FC<InputProps> = ({
  fieldName,
  isSubmitError,
  errorPresentBefore,
  value,
  type,
  label,
  onChange,
  error,
  autoFocus
}) => {
  return (
    <div
      className={`modal__form-row ${
        isSubmitError && errorPresentBefore ? "custom-padding" : ""
      }`}
    >
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        autoFocus={autoFocus}
      />
      <span
        className={
          isSubmitError && errorPresentBefore
            ? error
              ? "red-circle"
              : "green-circle"
            : "d-none"
        }
      />
    </div>
  );
};

export const CustomInput: React.FC<CustomInputProps> = ({
  fieldName,
  isSubmitError,
  errorPresentBefore,
  value,
  type,
  label,
  onChange,
  errorMessage,
  error,
  autoFocus,
  overlayClick,
}) => {
  return (
    <div
      className={`modal__form-row ${isSubmitError &&  errorPresentBefore  ? "custom-padding" : ""} ${
        isSubmitError && errorPresentBefore && error === errorMessage && errorMessage !== 'required' && errorMessage !== ''
          ? "overlay-input"
          : ""
      }`}
    >
      <label>{label}</label>
      {isSubmitError && errorPresentBefore && error === errorMessage  && errorMessage !== 'required'  && errorMessage !== ''? (
        <>
          <input value={errorMessage} placeholder="" readOnly />
          <span className="close-overlay" onClick={overlayClick}>
            &times;
          </span>
        </>
      ) : (
        <input
          type={type}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(fieldName, e.target.value)}
          placeholder=""
        />
      )}
      {isSubmitError && errorPresentBefore && (
        <span className={error ? "red-circle" : "green-circle"} />
      )}
    </div>
  );
};

export const SelectInput: React.FC<SelectInputProps> = ({
  fieldName,
  isSubmitError,
  errorPresentBefore,
  value,
  options,
  defaultTitle,
  label,
  onChange,
  error,
  notDisableFirst,
  disabled,
}) => {
  return (
    <div
      className={`modal__form-row ${
        isSubmitError && errorPresentBefore ? "custom-padding" : ""
      } ${disabled ? 'disabled-item':''}`}
    >
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        placeholder=""
        disabled={disabled}
        className={`${isSubmitError && errorPresentBefore ? 'select-with-error' : ''}`}
      >
        <option value="0" disabled={!notDisableFirst}>
          {defaultTitle}
        </option>
        {options &&
          options.map((item: any) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
      </select>
      <span
        className={
          isSubmitError && errorPresentBefore
            ? error
              ? "red-circle"
              : "green-circle"
            : "d-none"
        }
      />
    </div>
  );
};

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  fieldName,
  isSubmitError,
  errorPresentBefore,
  value,
  label,
  onChange,
  error,
  autoFocus,
  customClass = "",
  isReadOnly,
  customLabel
}) => {
  return (
    <div
      className={`modal__form-row mt-2 ${customClass} ${
        isSubmitError && errorPresentBefore ? "custom-padding" : ""
      }`}
    >
      <label className={customLabel ? 'custom-label': ''}>{label}</label>
      <textarea
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(fieldName, e.target.value)}
        readOnly={isReadOnly}
        className={`${isReadOnly} ? "cursor-none" : "" ${customLabel ? 'area-min-height':''}`}
        disabled={isReadOnly}
      />
      <span
        className={
          isSubmitError && errorPresentBefore
            ? error
              ? "red-circle"
              : "green-circle"
            : "d-none"
        }
      />
    </div>
  );
};