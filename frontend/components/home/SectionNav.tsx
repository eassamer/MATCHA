export const SectionNav = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="w-full h-fit flex flex-col gap-5 items-start justify-start pl-6">
      <h1 className=" font-poppins font-medium text-[#99938F] tracking-[1.1px] text-[16px]">
        {title}
      </h1>
      <div className="pl-2 w-full h-fit flex flex-col items-center justify-start gap-4 relative">
        {children}
      </div>
    </div>
  );
};
