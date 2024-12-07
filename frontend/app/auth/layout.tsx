export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className='
            bg-[rgb(252,175,183)] bg-[radial-gradient(circle,_rgba(252,175,183,1)_5%,_rgba(178,110,230,1)_100%)]'>
            {children}
        </section>
    )
}