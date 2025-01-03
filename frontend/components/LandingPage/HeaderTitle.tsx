export const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-start justify-center group cursor-pointer">
      <h1 className="lg:text-md xl:text-lg tracking-[1.7px] font-bold font-montserrat text-black">
        {title}
      </h1>
      <div className="h-1 w-0 bg-primary transition-all duration-300 group-hover:w-[90%]"></div>
    </div>
  );
};
