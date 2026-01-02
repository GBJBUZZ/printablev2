"use client"; // Ensures client-side execution

import Pusher, { Channel } from "pusher-js";

Pusher.logToConsole = true;

class PusherClient {
  private pusher: Pusher | null = null;
  private isConnected = false;

  constructor() {
    if (typeof window === "undefined") return;

    const PUSHER_KEY =
      process.env.NEXT_PUBLIC_PUSHER_KEY || "7e1f499e8a4730060fd6";
    const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2";

    if (!PUSHER_KEY || !PUSHER_CLUSTER) {
      throw new Error("Pusher environment variables are missing.");
    }

    this.pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });

    this.pusher.connection.bind("connected", () => {
      console.log("Pusher connected!");
      this.isConnected = true;
    });

    this.pusher.connection.bind("disconnected", () => {
      console.log("Pusher disconnected!");
      this.isConnected = false;
    });

    this.pusher.connection.bind("error", (err: any) => {
      console.error("Pusher error:", err);
      this.isConnected = false;
    });
  }

  public subscribe(channelName: string): Channel | null {
    if (!this.pusher) return null;
    if (!this.isConnected) {
      this.pusher.connect();
    }
    return this.pusher.subscribe(channelName);
  }

  public unsubscribe(channelName: string) {
    if (!this.pusher) return;
    this.pusher.unsubscribe(channelName);
  }

  public disconnect() {
    if (!this.pusher) return;
    this.pusher.disconnect();
  }
}

// Export only on client side
const pusherClient: PusherClient | null =
  typeof window !== "undefined" ? new PusherClient() : null;

export default pusherClient;
