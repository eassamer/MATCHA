import RecentMessages from "@/components/messages/recent-messages";

export default function Message() {
  return (
    <div className="bg-white size-full flex items-center justify-center">
      <h1 className="text-black text-3xl font-bold hidden lg:block">
        Click on a conversation
      </h1>
      <div className="size-full lg:hidden block">
        <RecentMessages />
      </div>
    </div>
  );
}
