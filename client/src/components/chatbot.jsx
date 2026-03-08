import { useState } from "react";

export default function Chatbot() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I am your shopping assistant. How can I help you today?"
    }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userText = input;

    // clear input immediately
    setInput("");

    const userMessage = {
      sender: "user",
      text: userText
    };

    setMessages(prev => [...prev, userMessage]);

    try {

      const res = await fetch("http://localhost:5001/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text: data.reply
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Server error. Please try again." }
      ]);

    }

  };

  return (
    <>
      {/* Floating chatbot button */}

      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          background: "#4f46e5",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "26px",
          cursor: "pointer",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        🤖
      </div>

      {open && (

        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "330px",
            height: "420px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0px 6px 25px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column"
          }}
        >

          {/* Header */}

          <div
            style={{
              background: "#4f46e5",
              color: "white",
              padding: "12px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              fontWeight: "bold"
            }}
          >
            🤖 Store Assistant
          </div>

          {/* Messages */}

          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              background: "#f3f4f6"
            }}
          >

            {messages.map((msg, i) => (

              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "8px"
                }}
              >

                {msg.sender === "bot" && (
                  <span style={{ marginRight: "6px" }}>🤖</span>
                )}

                <div
                  style={{
                    background:
                      msg.sender === "user" ? "#4f46e5" : "#e5e7eb",
                    color: msg.sender === "user" ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    maxWidth: "70%"
                  }}
                >
                  {msg.text}
                </div>

              </div>

            ))}

          </div>

          {/* Input area */}

          <div
            style={{
              display: "flex",
              borderTop: "1px solid #ddd"
            }}
          >

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask something..."
              style={{
                flex: 1,
                border: "none",
                padding: "10px",
                outline: "none"
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                background: "#4f46e5",
                color: "white",
                border: "none",
                padding: "0 16px",
                cursor: "pointer"
              }}
            >
              Send
            </button>

          </div>

        </div>

      )}
    </>
  );
}