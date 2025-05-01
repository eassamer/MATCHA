"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  unread: boolean;
}

export const messages: Message[] = [
  {
    id: "1",
    sender: {
      name: "Rene Wells",
      avatar: "/User1.svg",
      initials: "RW",
    },
    content: "This is my message to abo",
    timestamp: "7:21AM",
    unread: false,
  },
  {
    id: "2",
    sender: {
      name: "Joshua Wilson",
      avatar: "/User2.svg",
      initials: "JW",
    },
    content: "Randomly thought about c.",
    timestamp: "7:08AM",
    unread: false,
  },
  {
    id: "3",
    sender: {
      name: "Lori Bryan",
      avatar: "/User3.svg",
      initials: "LB",
    },
    content: "I'd like to visit in Novemb",
    timestamp: "Yesterday",
    unread: true,
  },
  {
    id: "4",
    sender: {
      name: "Anaiah Williams",
      avatar: "/User4.svg",
      initials: "AW",
    },
    content: "Do you have any heating?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "5",
    sender: {
      name: "Noah Pierre",
      avatar: "/User1.svg",
      initials: "NP",
    },
    content: "Yes",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "6",
    sender: {
      name: "Katherine Moss",
      avatar: "/User5.svg",
      initials: "KM",
    },
    content: "No I would like to add that into",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "7",
    sender: {
      name: "Edward Franz",
      avatar: "/User6.svg",
      initials: "EF",
    },
    content: "Cool I will book now!",
    timestamp: "3/26/23",
    unread: true,
  },
  {
    id: "8",
    sender: {
      name: "Alec Whitten",
      avatar: "/User7.svg",
      initials: "AW",
    },
    content: "I just have a shower with a cur",
    timestamp: "3/26/23",
    unread: false,
  },
  {
    id: "9",
    sender: {
      name: "Rene Wells",
      avatar: "/User1.svg",
      initials: "RW",
    },
    content: "This is my message to abo",
    timestamp: "7:21AM",
    unread: false,
  },
  {
    id: "10",
    sender: {
      name: "Joshua Wilson",
      avatar: "/User2.svg",
      initials: "JW",
    },
    content: "Randomly thought about c.",
    timestamp: "7:08AM",
    unread: false,
  },
  {
    id: "11",
    sender: {
      name: "Lori Bryan",
      avatar: "/User3.svg",
      initials: "LB",
    },
    content: "I'd like to visit in Novemb",
    timestamp: "Yesterday",
    unread: true,
  },
  {
    id: "12",
    sender: {
      name: "Anaiah Williams",
      avatar: "/User4.svg",
      initials: "AW",
    },
    content: "Do you have any heating?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "13",
    sender: {
      name: "Noah Pierre",
      avatar: "/User8.svg",
      initials: "NP",
    },
    content: "Yes",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "14",
    sender: {
      name: "Katherine Moss",
      avatar: "/User5.svg",
      initials: "KM",
    },
    content: "No I would like to add that into",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "15",
    sender: {
      name: "Edward Franz",
      avatar: "/User9.svg",
      initials: "EF",
    },
    content: "Cool I will book now!",
    timestamp: "3/26/23",
    unread: true,
  },
  {
    id: "16",
    sender: {
      name: "Alec Whitten",
      avatar: "/User10.svg",
      initials: "AW",
    },
    content: "I just have a shower with a cur",
    timestamp: "3/26/23",
    unread: false,
  },
];

export default function RecentMessages() {
  const router = useRouter();
  return (
    <Card className="w-full  mx-auto shadow-none border-none lg:border-2  rounded-xl overflow-y-scroll">
      <CardHeader className="py-2 hidden lg:block border-gray-100 border-b-2">
        <CardTitle className="font-poppins text-[14.4px] font-semibold">
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => {
                router.push("/messages/" + message.id);
              }}
              className="flex items-center px-4 py-6 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="relative mr-3">
                {message.unread && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C13D88]" />
                )}
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    className="object-cover"
                    src={message.sender.avatar}
                    alt={message.sender.name}
                  />
                  <AvatarFallback>{message.sender.initials}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-poppins font-medium text-gray-900 truncate">
                    {message.sender.name}
                  </p>
                  <p className="font-poppins text-sm text-gray-500 ml-2 whitespace-nowrap">
                    {message.timestamp}
                  </p>
                </div>
                <p className="font-poppins text-sm text-gray-500 truncate">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
