import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaTimes, FaRobot } from "react-icons/fa";
import axios from "axios";
import "../styles/chatbot.css";
const BACKEND_URL = "http://localhost:3001";
function ChatBot({ weather }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "مرحباً! 👋 أنا WeatherBot، مساعدك للطقس. اسألني أي سؤال عن الطقس! ☀️🌧️",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const sessionId = useRef(`session_${Date.now()}`);
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    // Add user message
    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/chat`, {
        message: trimmed,
        weatherData: weather,
        sessionId: sessionId.current,
      });
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "عذراً، حصل خطأ. تأكد إن الـ backend شغال وجرب تاني! 🔄",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`chat-fab ${isOpen ? "chat-fab--hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
        id="chat-open-btn"
      >
        <FaRobot className="chat-fab-icon" />
        <span className="chat-fab-pulse" />
      </button>
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? "chat-window--open" : ""}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <FaRobot />
            </div>
            <div>
              <h4 className="chat-title">WeatherBot</h4>
              <span className="chat-status">
                <span className="chat-status-dot" />
                Online
              </span>
            </div>
          </div>
          <button
            className="chat-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            id="chat-close-btn"
          >
            <FaTimes />
          </button>
        </div>
        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${
                msg.role === "user" ? "chat-bubble--user" : "chat-bubble--bot"
              }`}
            >
              {msg.role === "bot" && (
                <div className="chat-bubble-avatar">
                  <FaRobot />
                </div>
              )}
              <div className="chat-bubble-content">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          {isTyping && (
            <div className="chat-bubble chat-bubble--bot">
              <div className="chat-bubble-avatar">
                <FaRobot />
              </div>
              <div className="chat-typing">
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="اكتب سؤالك عن الطقس..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            id="chat-message-input"
          />
          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            id="chat-send-btn"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
}
export default ChatBot;