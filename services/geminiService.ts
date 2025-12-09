import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateViralScript = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, viral 15-second video script for a social media app like TikTok/Reels about "${topic}". 
      Format it with:
      - [Scene Visual]: Description
      - [Audio/Dialogue]: Spoken text
      - [Text Overlay]: Text on screen
      Keep it punchy, engaging, and suitable for an Indian audience.`,
    });
    
    return response.text || "Could not generate script. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please check your connection.";
  }
};

export const generateVideoIdeas = async (): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "List 5 viral short video trends suitable for content creators in India right now. Return only the list items.",
        });
        const text = response.text || "";
        return text.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
    } catch (error) {
        return ["Dance challenge", "Tech tips", "Street food review", "Comedy skit", "Motivational quote"];
    }
}
