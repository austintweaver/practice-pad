
import { useState, FormEvent } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip } from "lucide-react";

// Sample messages for the client
const sampleMessages = [
  {
    id: 1,
    sender: "attorney",
    content: "Hello Mr. Doe, I've reviewed the settlement offer from the other party.",
    timestamp: "10:15 AM",
    read: true,
  },
  {
    id: 2,
    sender: "client",
    content: "Thanks for letting me know. What do you think about it?",
    timestamp: "10:20 AM",
    read: true,
  },
  {
    id: 3,
    sender: "attorney",
    content: "I believe we can negotiate for better terms. The offer is about 25% lower than what we'd expect based on similar cases.",
    timestamp: "10:22 AM",
    read: true,
  },
  {
    id: 4,
    sender: "client",
    content: "I see. What's our next step then?",
    timestamp: "10:25 AM",
    read: true,
  },
  {
    id: 5,
    sender: "attorney",
    content: "I'll draft a counter-offer and send it to you for review before submitting it. I think we should aim for at least a 15% increase from their initial offer.",
    timestamp: "10:28 AM",
    read: true,
  },
];

export default function ClientMessages() {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here we would send the message to the backend
      // For now, we'll just clear the input
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16)-theme(spacing.12))]">
      <div className="mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">
          Communicate securely with your legal team.
        </p>
      </div>

      <div className="flex-1 bg-white border rounded-lg overflow-hidden flex flex-col">
        {/* Attorney Info */}
        <div className="p-4 border-b flex items-center space-x-4">
          <Avatar>
            <AvatarFallback className="bg-legal-navy text-white">AT</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Attorney Name</h3>
            <p className="text-sm text-muted-foreground">attorney@example.com</p>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {sampleMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "attorney" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "attorney"
                      ? "bg-gray-100"
                      : "bg-legal-navy text-white"
                  }`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "attorney"
                        ? "text-muted-foreground"
                        : "text-white/70 text-right"
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <form className="flex space-x-2" onSubmit={handleSendMessage}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Textarea
              className="min-h-10 max-h-40"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button type="submit" size="icon" className="shrink-0 bg-legal-navy hover:bg-legal-navy/80">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
