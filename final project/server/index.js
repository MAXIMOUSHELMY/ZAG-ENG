import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());
// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
// Store chat histories per session (in-memory)
const chatSessions = new Map();
// POST /api/chat
app.post("/api/chat", async (req, res) => {
  const { message, weatherData, sessionId } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  try {
    // Build weather context
    let weatherContext = "";
    if (weatherData) {
      weatherContext = `
Current Weather Data:
- City: ${weatherData.name}, ${weatherData.sys?.country}
- Temperature: ${Math.round(weatherData.main?.temp)}°C
- Feels Like: ${Math.round(weatherData.main?.feels_like)}°C
- Min/Max: ${Math.round(weatherData.main?.temp_min)}°C / ${Math.round(weatherData.main?.temp_max)}°C
- Condition: ${weatherData.weather?.[0]?.description}
- Humidity: ${weatherData.main?.humidity}%
- Wind Speed: ${(weatherData.wind?.speed * 3.6).toFixed(1)} km/h
- Pressure: ${weatherData.main?.pressure} hPa
- Visibility: ${(weatherData.visibility / 1000).toFixed(1)} km
- Clouds: ${weatherData.clouds?.all}%
- Sunrise: ${new Date(weatherData.sys?.sunrise * 1000).toLocaleTimeString()}
- Sunset: ${new Date(weatherData.sys?.sunset * 1000).toLocaleTimeString()}
`;
    }
    const systemInstruction = `You are a friendly and knowledgeable weather assistant chatbot. Your name is "WeatherBot". 
Your responsibilities:
1. Answer questions about the current weather using the real-time data provided below.
2. Give weather-related advice (what to wear, whether to carry an umbrella, outdoor activity suggestions, etc.)
3. Explain weather phenomena in simple terms.
4. Be conversational, friendly, and use weather-related emojis occasionally.
${weatherContext}
Rules:
- Keep responses concise (2-4 sentences max).
- Use the actual weather data provided above when answering.
- If asked about weather in a different city that you don't have data for, let the user know you only have data for the current city and suggest they search for it using the search bar.
- Respond in the same language the user writes in (Arabic or English).
- Be cheerful and helpful!`;
    // Get or create chat session
    let chatHistory = chatSessions.get(sessionId) || [];
    const chat = model.startChat({
      history: chatHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      systemInstruction,
    });
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    // Update history
    chatHistory.push({ role: "user", text: message });
    chatHistory.push({ role: "model", text: response });
    // Keep only last 20 messages to save memory
    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(-20);
    }
    chatSessions.set(sessionId || "default", chatHistory);
    res.json({ reply: response });
  } catch (error) {
    console.error("Chat API Error:", error.message);
    res.status(500).json({
      error: "Failed to get AI response",
      details: error.message,
    });
  }
});
// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.listen(PORT, () => {
  console.log(`🚀 Weather Chat Backend running on http://localhost:${PORT}`);
});