import { SignUp } from "@/components/auth/Signup/Signup";
import { TermsAndPolicy } from "@/components/auth/Signup/TermsAndPolicy";


function Signup() {
    return(
        <div className="h-full w-screen">
            <SignUp />
            {/* <TermsAndPolicy /> */}
        </div>
    )
}

export default Signup;