// components/GlobalPusherListener.tsx
"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import pusherClient from "@/pusher/pusher";

export default function GlobalPusherListener() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user?.id || !pusherClient) return;

    const channel = pusherClient.subscribe(`chat-userid-${user.id}`);
    console.log("Pusher initialized for user:", user.id);

    channel?.bind("order-status", (data: any) => {
      toast.success("you order has been accepted!!");
    });
    channel?.bind("chat", (data: any) => {
      toast.success("received new message");
    });


    return () => {
      console.log("Cleaning up Pusher subscription");
      channel?.unbind_all();
      pusherClient?.unsubscribe(`user-${user.id}`);
    };
  }, [isLoaded, user?.id]);

  return null;
}
