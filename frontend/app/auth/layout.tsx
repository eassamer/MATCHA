import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="
            min-h-screen
            w-full
            flex
            flex-col
            items-center
            justify-center
            bg-[rgb(252,175,183)]
            bg-[radial-gradient(circle,_rgba(252,175,183,1)_5%,_rgba(178,110,230,1)_100%)]
        ">
            <div className="absolute top-0">
                <Image src="/logo.png" width={276} height={112} alt="Logo" />
            </div>
            <div
                className="
                flex
                flex-col
                items-center
                justify-center
                w-[758px] h-[461px]
                bg-white
                rounded-[15px]"
            >
                {children}
            </div>
        </section>
    )
}