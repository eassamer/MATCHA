import Link from "next/link";

export const TermsAndPolicy = () => {
  return (
      <div className="h-auto w-full flex bottom-2 lg:justify-center lg:items-center">
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