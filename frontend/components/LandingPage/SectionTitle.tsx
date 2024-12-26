export const SectionTitle = ({title} : {
    title: string
}) => {
    return (<h1 className="font-bold font-montserrat tracking-[1.7px] text-[30px] lg:text-[45px] text-black">
        {title}
      </h1>)
}