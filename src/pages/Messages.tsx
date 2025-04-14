
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Paperclip, 
  Search, 
  Clock, 
  ChevronDown, 
  Video, 
  Phone,
  MoreHorizontal
} from "lucide-react";

// Sample conversation data
const conversations = [
  {
    id: 1,
    client: "John Smith",
    avatar: null,
    initials: "JS",
    lastMessage: "I've reviewed the settlement offer and...",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    client: "Sarah Johnson",
    avatar: null,
    initials: "SJ",
    lastMessage: "When do we need to file the motion?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    client: "Michael Davis",
    avatar: null,
    initials: "MD",
    lastMessage: "Thank you for the document updates.",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    client: "Emma Wilson",
    avatar: null,
    initials: "EW",
    lastMessage: "I have some questions about the contract.",
    timestamp: "Apr 12",
    unread: false,
  },
  {
    id: 5,
    client: "Robert Brown",
    avatar: null,
    initials: "RB",
    lastMessage: "Let's schedule a meeting next week.",
    timestamp: "Apr 10",
    unread: false,
  },
  {
    id: 6,
    client: "Jennifer Lee",
    avatar: null,
    initials: "JL",
    lastMessage: "I've sent over the requested documents.",
    timestamp: "Apr 8",
    unread: false,
  },
];

// Sample messages for a conversation
const sampleMessages = [
  {
    id: 1,
    sender: "attorney",
    content: "Hello Mr. Smith, I've reviewed the settlement offer from the other party.",
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
  {
    id: 6,
    sender: "client",
    content: "I've reviewed the settlement offer and I agree with your approach. Please go ahead with the counter-offer as you suggested.",
    timestamp: "10:30 AM",
    read: false,
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchConversation, setSearchConversation] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.client.toLowerCase().includes(searchConversation.toLowerCase())
  );

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here we would send the message to the backend
      // For now, we'll just clear the input
      setNewMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16)-theme(spacing.12))]">
      <div className="grid grid-cols-12 h-full gap-0 border rounded-lg overflow-hidden bg-white">
        {/* Sidebar - Conversations List */}
        <div className="col-span-3 border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchConversation}
                onChange={(e) => setSearchConversation(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100%-theme(spacing.16))]">
            <div className="space-y-1 p-2">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    selectedConversation.id === conversation.id
                      ? "bg-legal-navy text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback className={`${
                      selectedConversation.id === conversation.id
                        ? "bg-white text-legal-navy"
                        : "bg-legal-gold/20 text-legal-navy"
                    }`}>
                      {conversation.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${
                        conversation.unread && selectedConversation.id !== conversation.id
                          ? "font-semibold"
                          : ""
                      }`}>
                        {conversation.client}
                      </span>
                      <span className={`text-xs ${
                        selectedConversation.id === conversation.id
                          ? "text-white/70"
                          : "text-muted-foreground"
                      }`}>
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${
                      selectedConversation.id === conversation.id
                        ? "text-white/70"
                        : "text-muted-foreground"
                    } ${
                      conversation.unread && selectedConversation.id !== conversation.id
                        ? "font-medium"
                        : ""
                    }`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && selectedConversation.id !== conversation.id && (
                    <div className="w-2 h-2 rounded-full bg-legal-gold"></div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content - Conversation */}
        <div className="col-span-9 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-legal-gold/20 text-legal-navy">
                      {selectedConversation.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedConversation.client}</h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Last active {selectedConversation.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" title="Voice Call">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Video Call">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="More Options">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {sampleMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "attorney" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "attorney"
                            ? "bg-legal-navy text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <p>{message.content}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === "attorney"
                              ? "text-white/70 text-right"
                              : "text-muted-foreground"
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
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="font-medium text-lg">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a client from the list to start messaging.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
