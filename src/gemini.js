//  Import & API Key
let apiKey = "AIzaSyBmR8G-ICU6oe6RZ7JA9olhrkBBy2FpAtg";
import {
    GoogleGenerativeAI,
    // HarmCategory,
    // HarmBlockThreshold,
  }  from "@google/generative-ai";
  
  //  Initializing Google Generative AI
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Selecting the AI Model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  // Configuring AI Generation Settings
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 20,
    responseMimeType: "text/plain",
  };
  
  //  Function to Send a Message to AI
  export async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
}
  
