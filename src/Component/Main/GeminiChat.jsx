import React, { useState } from "react";
import "./GeminiChat.css";
import { assets } from "../../assets/assets";

const GeminiChat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(""); // clear previous response

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        const text = await res.text(); // fallback if backend error
        throw new Error(text || "Network response was not ok");
      }

      const data = await res.json(); // ✅ correct JSON parsing
      console.log("✅ Gemini API response:", data);
      setResponse(data.output || "⚠️ No output returned from AI.");
    } catch (err) {
      console.error("❌ Error:", err);
      setResponse("⚠️ Something went wrong! Check backend or network.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="Main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="main-container">
        <div className="greet">
          <p><span>Hello, Dev</span></p>
          <p>How can I help you today?</p>
        </div>

        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <div><img src={assets.compass_icon} alt="" /></div>
          </div>
          <div className="card">
            <p>Briefly summarize this concept: urban planning</p>
            <div><img src={assets.bulb_icon} alt="" /></div>
          </div>
          <div className="card">
            <p>Brainstorm team bonding activities for our work retreat</p>
            <div><img src={assets.message_icon} alt="" /></div>
          </div>
          <div className="card">
            <p>Improve the readability of the following code</p>
            <div><img src={assets.code_icon} alt="" /></div>
          </div>
        </div>

        <div className="chat-container">
          <div className="chat-box">
            {loading ? <p>⏳ Loading...</p> : <p>{response}</p>}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Ask Gemini..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              <img
                src={assets.send_icon}
                alt="send"
                className="send"
                onClick={handleSend}
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
