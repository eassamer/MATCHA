export const NavItemD = ({
  Icon,
  index,
  showNotif,
  active,
  setActive,
  variant,
  title,
}: {
  Icon: any;
  active: number;
  setActive: any;
  index: number;
  showNotif: boolean;
  variant: string;
  title: string;
}) => {
  return (
    <div
      onClick={() => setActive(index)}
      className=" cursor-pointer w-full h-fit flex items-center py-1 justify-start gap-5 relative"
    >
      <Icon
        className={`size-[20px] ${
          active === index ? "text-primary" : "text-[#ADAFBB]"
        }`}
        variant={variant}
      />
      <p
        className={` ${
          active === index ? "text-primary" : "text-[#ADAFBB]"
        } font-poppins font-medium tracking-[1.1px] text-[16px]`}
      >
        {title}
      </p>
      <div
        className={`w-[5px] ${
          active === index ? "h-[80%]" : "h-0"
        } bg-primary absolute right-0 rounded-full transition-all ease-in-out duration-300`}
      ></div>
    </div>
  );
};
