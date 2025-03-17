import Image from "next/image";

export const Media = () => {
    return (
        <div className="w-fit h-fit lg:w-full flex flex-col justify-end items-center">
            <div className="lg:hidden py-5 flex items-center justify-center">
                <Image src="/logo.png" width={172} height={70} alt="Logo" />
            </div>
            <div className="items-center justify-center flex md:w-[300px] w-[250px] lg:w-fit">
                <Image src="/couple.svg" className="md:w-[300px] w-[250px]" height={215} width={300} alt="" />
            </div>
        </div>
    );
}