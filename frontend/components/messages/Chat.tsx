import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical, Send, Check } from "lucide-react";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoCall, IoVideocam } from "react-icons/io5";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ActionMenu } from "./action-menu";

export interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  time: string;
  read?: boolean;
}

export const Chat = ({
  user,
  messages,
  setMessages,
  newMessage,
  setNewMessage,
}: {
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      read: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col size-full mx-auto bg-white [box-shadow:0px_1px_50px_-11px_rgba(0,0,0,0.25)] rounded-0 lg:rounded-[15px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              router.push("/messages");
            }}
            className="lg:hidden bg-transparent rounded-[11px] border-2 border-[#E8E6EA] p-2"
          >
            <ArrowLeft size="20" className="text-primary" />
          </button>
          <Avatar className="h-12 w-12">
            <AvatarImage
              className="object-cover"
              src={user.avatar}
              alt="Grace"
            />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg font-poppins">{user.name}</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-muted-foreground font-poppins">
                Online
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-pink-500 hover:text-pink-600"
          >
            <IoCall className="text-[24px] text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-pink-500 hover:text-pink-600"
          >
            <IoVideocam className="text-[24px] text-primary" />
          </Button>
          <ActionMenu />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <span className="font-normal font-poppins text-sm text-muted-foreground px-3 py-1 rounded-full">
            Today
          </span>
        </div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === "user" ? "bg-gray-100" : "bg-pink-50"
              }`}
            >
              <p className="text-sm font-poppins">{message.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs text-muted-foreground font-poppins">
                  {message.time}
                </span>
                {message.sender === "user" && message.read && (
                  <Check className="h-3 w-3 text-primary" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Your message"
            className="flex-1 rounded-[11px] border-2 border-[#E8E6EA] p-2 focus:outline-none font-poppins tracking-wide text-[14px]"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button variant="ghost" size="icon">
            <RiEmojiStickerLine className="text-5 text-muted-foreground" />
          </Button>
          <button
            onClick={handleSendMessage}
            className="bg-transparent border-2 border-[#E8E6EA] text-white rounded-[11px] p-3"
          >
            <Send className="h-4 w-4 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};
