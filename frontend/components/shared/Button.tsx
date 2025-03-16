import React from "react";

export const Button = ({
  type,
  disabled = false,
  className,
  onClick,
  children,
  buttonType,
}: {
  type: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  buttonType?: "submit" | "reset" | "button";
  children: React.ReactNode;
}) => {
  return (
    <button
      className={`
      ${type ? "bg-primary text-white" : "bg-white text-primary"}
      shadow-md
      hover:bg-pink-500
      hover:text-white
      transition-all
      duration-300
      ease-in-out
      justify-center
      font-montserrat
      text-[16px]
      h-[50px]
      w-full
      lg:rounded-[15px]
      rounded-[12px]
      tracking-[1px]
      ${className}
        `}
      disabled={disabled}
      onClick={onClick}
      type={buttonType}
    >
      {children}
    </button>
  );
};
