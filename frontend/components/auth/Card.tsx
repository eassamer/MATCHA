import Link from "next/link"
import { IconType } from "react-icons"

export const Card = ({
  Icon,
  href
} : {
  Icon: IconType,
  href: string
}) => {
  return (
    <Link href={href} className="p-4 rounded-[13px] border border-[#E8E6EA]">
      <Icon className=" text-primary text-[30px] transition-all duration-300 ease-in-out hover:text-pink-500" />
    </Link>
  );
}