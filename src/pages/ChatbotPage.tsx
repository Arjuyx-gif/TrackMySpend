import { ChatInterface } from "@/components/chatbot/ChatInterface";

export function ChatbotPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Coming Soon</h1>
        <p className="text-muted-foreground">
          Get insights and answers about your finances
        </p>
      </div>
      
      <ChatInterface />
    </div>
  );
}