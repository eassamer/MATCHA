import React from "react"

export const Button = (
    {
      type,
      disabled = false,
      className,
      onClick,
      children,
    }: {
      type: boolean,
      disabled?: boolean,
      className?: string,
      onClick?: () => void,
      children: React.ReactNode,
    }) => {
  return (
    <button
      className={
        `
        ${className}
        ${type? 'bg-primary text-white' : 'bg-white text-primary'}
        shadow-md
        hover:bg-pink-500
        transition-all
        duration-300
        ease-in-out
        justify-center
        font-montserrat
        text-[16px]
        h-[58px]
        w-full
        rounded-[15px]
        tracking-[1px]
        `
      }
      disabled={disabled}
      onClick={onClick}
    >
        {children}
      </button>
  )
}