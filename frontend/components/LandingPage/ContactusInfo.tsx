
export const ContactUsInfo = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full h-fit">
      <h1 className="font-bold font-montserrat tracking-[1.7px] text-[17px] text-black">
        {title}
      </h1>
      <p className="pl-4 font-montserrat tracking-[1.7px] text-[14px] text-black">
        {description}
      </p>
    </div>
  );
};
