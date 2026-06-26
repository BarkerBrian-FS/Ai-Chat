import { conversationRepository } from "../repositories/conversations.repository";
import OpenAI from "openai";

//Implementation Details
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
  id: string;
  message: string;
};

//Public Interface
//Leaky abstraction

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string,
  ): Promise<ChatResponse> {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      max_output_tokens: 100,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    return {
      id: response.id,
      message: response.output_text,
    };
  },
};
