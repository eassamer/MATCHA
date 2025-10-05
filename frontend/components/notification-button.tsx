"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Custom theme colors
const customColors = {
  primary: "#C13D88",
  radius: "11px",
};

type NotificationType = "view" | "like" | "unlike";

interface Notification {
  id: string;
  type: NotificationType;
  username: string;
  time: string;
  read: boolean;
}

export default function NotificationButton() {
  // Sample notifications data
  const pathname = usePathname();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "view",
      username: "sophia_23",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "unlike",
      username: "alex_design",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "view",
      username: "james_t",
      time: "3 hours ago",
      read: false,
    },
    {
      id: "4",
      type: "like",
      username: "emma_dev",
      time: "Yesterday",
      read: true,
    },
    {
      id: "5",
      type: "like",
      username: "emma_dev",
      time: "Yesterday",
      read: true,
    },
    {
      id: "6",
      type: "like",
      username: "emma_dev",
      time: "Yesterday",
      read: true,
    },
    {
      id: "7",
      type: "unlike",
      username: "emma_dev",
      time: "Yesterday",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <div
      className={`${
        pathname === "/likes" || pathname === "/profile" || pathname.startsWith("/messages/")
          ? "hidden lg:block"
          : ""
      } fixed z-10 top-6 right-6`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-[11px]"
            style={{
              backgroundColor: customColors.primary,
              borderColor: customColors.primary,
              color: "white",
            }}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#C13D88]">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-0"
          style={{ borderRadius: customColors.radius }}
        >
          <div className="flex items-center justify-between border-b p-3">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-[#C13D88]"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onRead={() => markAsRead(notification.id)}
                />
              ))
            ) : (
              <div className="flex h-20 items-center justify-center text-sm text-muted-foreground">
                No notifications
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface NotificationCardProps {
  notification: Notification;
  onRead: () => void;
}

function NotificationCard({ notification, onRead }: NotificationCardProps) {
  const { type, username, time, read } = notification;

  const getIcon = () => {
    switch (type) {
      case "view":
        return "👁️";
      case "like":
        return "❤️";
      case "unlike":
        return "👎";
      default:
        return "📣";
    }
  };

  const getMessage = () => {
    switch (type) {
      case "view":
        return ` has viewed your profile`;
      case "like":
        return ` has liked you`;
      case "unlike":
        return ` has unliked you`;
      default:
        return "New notification";
    }
  };

  return (
    <Card
      className={cn(
        "border-0 rounded-none hover:bg-muted/50 cursor-pointer transition-colors",
        !read && "bg-[#C13D88]/5"
      )}
      onClick={onRead}
    >
      <CardContent className="p-3 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: read ? "#f3f4f6" : "#f9e6f2" }}
        >
          <span className="text-lg">{getIcon()}</span>
        </div>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">
            <span className="font-black">{username}</span>
            {getMessage()}
          </p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        {!read && (
          <div className="ml-auto">
            <div className="h-2 w-2 rounded-full bg-[#C13D88]" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
