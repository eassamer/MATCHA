import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="w-[100vw] relative h-[100vh] flex items-center justify-center bg-[rgb(252,175,183)] bg-[radial-gradient(circle,_rgba(252,175,183,1)_5%,_rgba(178,110,230,1)_100%)]
  "
    >
      <Image
        src="/logo-white.svg"
        alt="logo"
        width={200}
        height={200}
        className="hidden md:block absolute top-12"
      />
      <div className="w-full h-full md:w-[758px] rounded-none md:h-[461px] bg-white md:rounded-[13px] [shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        {children}
      </div>
    </div>
  );
}
