export const ContactusInput = ({
  placeholder,
  type,
}: {
  placeholder: string;
  type: string;
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[50px] bg-transparent text-black font-bold outline-none tracking-[1.7px] placeholder-black font-montserrat"
      />
      <div className="w-full h-[1px] bg-black"></div>
    </div>
  );
};
