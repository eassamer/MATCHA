export const NavItem = ({
  Icon,
  index,
  showNotif,
  active,
  setActive,
}: {
  Icon: any;
  active: number;
  setActive: any;
  index: number;
  showNotif: boolean;
}) => {
  return (
    <div className="w-fit h-full flex items-center justify-center relative">
      <div
        className={` absolute top-0 ${
          active === index ? "w-[150%]" : "w-0"
        } h-[1.6px] bg-primary transition-all ease-in-out duration-300`}
      ></div>
      <div className="w-fit h-fit realtive">
        {showNotif && active != index && (
          <div className="size-2 rounded-full absolute  right-0 bg-primary"></div>
        )}
        <Icon
          onClick={() => setActive(index)}
          className={`text-3xl  ${
            active === index ? "text-primary" : "text-[#ADAFBB]"
          } mb-2`}
        />
      </div>
    </div>
  );
};
