"use client";
import { Chat, Message } from "@/components/messages/Chat";
import { messages } from "@/components/messages/recent-messages";
import { useState } from "react";

export default function MessagePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [msgs, setMsgs] = useState<Message[]>([
    { id: 1, text: "Hi Jake, how are you?", sender: "other", time: "2:55 PM" },
    {
      id: 2,
      text: "Haha truly! Nice to meet you!",
      sender: "user",
      time: "3:02 PM",
      read: true,
    },
    { id: 3, text: "Sure, let's do it! 😊", sender: "other", time: "3:10 PM" },
    {
      id: 4,
      text: "Great! I'll send the details later.",
      sender: "user",
      time: "3:12 PM",
      read: true,
    },
    {
      id: 5,
      text: "Hey Grace, how was your day?",
      sender: "user",
      time: "4:30 PM",
      read: true,
    },
    {
      id: 6,
      text: "Pretty good! Just finished work and now relaxing.",
      sender: "other",
      time: "4:35 PM",
    },
    {
      id: 7,
      text: "Same here, had a busy day but excited for later!",
      sender: "user",
      time: "4:40 PM",
      read: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  return (
    <Chat
      messages={msgs}
      setMessages={setMsgs}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      user={messages[Number(params.id) - 1].sender}
    />
  );
}
