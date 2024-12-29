import Link from "next/link";

export const TermsAndPolicy = () => {
  return (
      <div className="h-auto w-full flex lg:justify-center lg:items-center">
          <Link href="/policy/privacy" className="text-primary text-[15px] font-montserrat">
              Terms of use
          </Link>
          <div className="w-[50px]"></div>
          <Link href="/policy/termsofuse" className="text-primary text-[15px] font-montserrat">
              Privacy Policy
          </Link>
      </div>
  );
}