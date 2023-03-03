/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import Spinner from "react-bootstrap/Spinner";

interface ButtonProps {
  disabled?: boolean;
  onClick: () => void;
  type: any;
  className: string;
  buttonText: string;
  loading?: boolean;
  id?:string;
}

export const Button: React.FC<ButtonProps> = ({
  disabled,
  onClick,
  type,
  className,
  buttonText,
  loading,
  id
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
      id={id}
    >
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        buttonText
      )}
    </button>
  );
};
