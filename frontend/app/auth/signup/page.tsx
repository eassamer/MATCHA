import Image from "next/image";

function Signup(){
    return (
        <div className="flex flex-row h-full w-full">
            <div className="items-center justify-center flex flex-col w-[350px]">
                <Image src='/couple.svg' height={215} width={379} alt='' />
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="text-black font-montserrat font-bold text-2xl mb-[60px]">Signup to continue</div>
                <button className="btn-forward w-full">Continue with email</button>
                <div className="flex flex-row items-center justify-cente w-full mt-[30px]">
                    <div className="bg-slate-500 h-[1px] mx-[30px] w-[100px]"></div>
                    <div className=" text-slate-500 text-center">or sign up with</div>
                    <div className="bg-slate-500 h-[1px] mx-[30px] w-[100px]"></div>
                </div>
                <div className="flex flex-row items-center justify-cente w-full">
                    <Image src='/facebook.svg' height={100} width={100} alt=""></Image>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <a href="/policy/privacy" className="text-pink-500">Terms of use</a>
                    <div className="w-[50px]"></div>
                    <a href="/policy/termsofuse" className="text-pink-500">Privacy Policy</a>
                </div>
            </div>
        </div>
    )
}

export default Signup;