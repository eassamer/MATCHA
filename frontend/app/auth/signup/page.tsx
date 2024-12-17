import { SignUp } from "@/components/auth/Signup/Signup";
import Link from "next/link";


const TermsAndPolicy = () => {
    return (
        <div className="h-auto w-fit flex absolute bottom-2">
            <Link href="/policy/privacy" className="text-pink-500">
                Terms of use
            </Link>
            <div className="w-[50px]"></div>
            <Link href="/policy/termsofuse" className="text-pink-500">
                Privacy Policy
            </Link>
        </div>
    );
}

function Signup() {
    return(
        <div className="h-screen w-screen flex flex-col items-center">
            <SignUp />
            <TermsAndPolicy />
        </div>
    )
}

export default Signup;