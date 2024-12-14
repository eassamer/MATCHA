import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="
            h-screen
            w-screen
            flex
            flex-col
            items-center
            justify-center
            bg-[rgb(252,175,183)]
            bg-[radial-gradient(circle,_rgba(252,175,183,1)_5%,_rgba(178,110,230,1)_100%)]
        ">
            <div className="hidden lg:block lg:absolute lg:top-0">
                <Image src="/logo.png" width={276} height={112} alt="Logo" />
            </div>
            <div
                className="
                h-full
                w-full
                lg:w-[758px]
                lg:h-[461px]
                bg-white
                lg:rounded-[15px]"
            >
                {children}
            </div>
        </div>
    )
}