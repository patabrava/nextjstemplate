import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  console.log("🚀 Chat API endpoint hit");
  
  try {
    const { messages } = await req.json();
    console.log("📨 Received messages:", JSON.stringify(messages, null, 2));

    // Clean message format - remove parts property and ensure proper structure
    const cleanMessages = messages.map((message: any) => ({
      role: message.role,
      content: message.content
    }));
    
    console.log("🔧 Cleaned messages for AI SDK:", JSON.stringify(cleanMessages, null, 2));

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY not found in environment variables");
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    console.log("✅ API key found, making request to Gemini...");

    // Use AI SDK's streamText with cleaned messages
    const result = await streamText({
      model: google('gemini-2.5-flash'),
      messages: cleanMessages,
      onChunk: ({ chunk }) => {
        console.log("📦 Streaming chunk:", chunk);
      },
      onFinish: ({ text }) => {
        console.log("✅ Stream complete, final text:", text);
      },
      onError: (error) => {
        console.error("❌ StreamText error:", error);
      }
    });

    console.log("✅ StreamText result created, returning response");
    
    // Return the AI SDK compatible stream
    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error("❌ Chat API error:", error);
    console.error("❌ Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return Response.json(
      { 
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
