import RecentMessages from "@/components/messages/recent-messages";

export default function Message() {
  return (
    <div className="bg-white size-full flex items-center justify-center">
      <h1 className="font-poppins text-black text-3xl text-center font-bold hidden lg:block">
        Click on a conversation<br></br> to start messaging
      </h1>
      <div className="size-full lg:hidden flex flex-col  items-start justify-start gap-4  pt-4">
        <h1 className="font-poppins text-[34px] font-bold px-4">Messages</h1>
        <div className="w-full flex flex-grow  overflow-y-scroll">
          <RecentMessages />
        </div>
      </div>
    </div>
  );
}
