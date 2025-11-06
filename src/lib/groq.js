import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

export async function summarizeText(userText) {
  console.log("in summary")
  try {
    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { 
          role: "user", 
          content: `Summarize this text in one short sentence (max 100 characters): ${userText}` 
        }
      ],
      temperature: 0.5,
      max_tokens: 100,
    });
    
    const shortText = response.choices[0]?.message?.content || "Summary unavailable";
    return shortText;
  } catch (error) {
    console.error("Error calling Groq API:", error);
    throw new Error("Failed to generate summary");
  }
}
