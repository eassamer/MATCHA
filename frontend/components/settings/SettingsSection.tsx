export const SettingsSection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white w-full h-full  lg:h-[90%] rounded-none lg:rounded-3xl p-6 md:p-10 shadow-sm">
      {children}
    </div>
  );
};
