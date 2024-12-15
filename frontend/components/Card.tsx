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
    <Link href={href} className="p-4 rounded-[13px] border border-slate-300">
      <Icon className=" text-primary text-[30px]" />
    </Link>
  );
}