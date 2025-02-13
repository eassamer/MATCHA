"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Video, MoreVertical, Send, Check } from "lucide-react";
import { RiEmojiStickerLine } from "react-icons/ri";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  time: string;
  read?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi Jake, how are you? I saw on the app that we've crossed paths several times this week 😊",
      sender: "other",
      time: "2:55 PM",
    },
    {
      id: 2,
      text: "Haha truly! Nice to meet you Grace! What about a cup of coffee today evening? ☕",
      sender: "user",
      time: "3:02 PM",
      read: true,
    },
    {
      id: 3,
      text: "Sure, let's do it! 😊",
      sender: "other",
      time: "3:10 PM",
    },
    {
      id: 4,
      text: "Great I will write later the exact time and place. See you soon!",
      sender: "user",
      time: "3:12 PM",
      read: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

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
    <div className="w-full h-full flex items-center">
      <div className="flex flex-col h-[600px] w-[800px] mx-auto bg-white [box-shadow:0px_1px_50px_-11px_rgba(0,0,0,0.25)] rounded-[15px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/grace.jpg" alt="Grace" />
              <AvatarFallback>GR</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">Grace</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-pink-500 hover:text-pink-600"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-pink-500 hover:text-pink-600"
            >
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center">
            <span className="text-sm text-muted-foreground bg-gray-50 px-3 py-1 rounded-full">
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
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {message.time}
                  </span>
                  {message.sender === "user" && message.read && (
                    <Check className="h-3 w-3 text-pink-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Your message"
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button variant="ghost" size="icon">
              <RiEmojiStickerLine className="text-5 text-muted-foreground" />
            </Button>
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
