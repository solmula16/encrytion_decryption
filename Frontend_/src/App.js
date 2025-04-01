import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("AES");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const handleEncrypt = async () => {
    const res = await axios.post("http://127.0.0.1:5000/encrypt", {
      message,
      key,
      algorithm,
    });
    setEncryptedText(res.data.encrypted);
  };

  const handleDecrypt = async () => {
    const res = await axios.post("http://127.0.0.1:5000/decrypt", {
      message: encryptedText,
      key,
      algorithm,
    });
    setDecryptedText(res.data.decrypted);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f4",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "850px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            color: "#333",
          }}
        >
          🔒 Encryption & Decryption
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {/* Encryption Section */}
          <div
            style={{
              width: "48%",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#fafafa",
            }}
          >
            <h3 style={{ color: "#555" }}>Message to Encrypt</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "100%",
                height: "60px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <h4 style={{ marginTop: "10px", color: "#888" }}>Encryption Key</h4>
            <input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <button
              onClick={handleEncrypt}
              style={{
                width: "100%",
                marginTop: "15px",
                background: "#28a745",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              🔐 Encrypt
            </button>

            <h4 style={{ marginTop: "15px", color: "#888" }}>Encrypted Text</h4>
            <textarea
              value={encryptedText}
              readOnly
              style={{
                width: "100%",
                height: "60px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                background: "#f5f5f5",
              }}
            />
          </div>

          {/* Decryption Section */}
          <div
            style={{
              width: "48%",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#fafafa",
            }}
          >
            <h3 style={{ color: "#555" }}>Message to Decrypt</h3>
            <textarea
              value={encryptedText}
              onChange={(e) => setEncryptedText(e.target.value)}
              style={{
                width: "100%",
                height: "60px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <h4 style={{ marginTop: "10px", color: "#888" }}>Decryption Key</h4>
            <input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <button
              onClick={handleDecrypt}
              style={{
                width: "100%",
                marginTop: "15px",
                background: "#007bff",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              🔓 Decrypt
            </button>

            <h4 style={{ marginTop: "15px", color: "#888" }}>Decrypted Text</h4>
            <textarea
              value={decryptedText}
              readOnly
              style={{
                width: "100%",
                height: "60px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                background: "#f5f5f5",
              }}
            />
          </div>
        </div>

        {/* Algorithm Selection */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <h3
            style={{ color: "#444", marginRight: "10px", whiteSpace: "nowrap" }}
          >
            Choose Algorithm:
          </h3>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              fontSize: "16px",
              border: "1px solid #ccc",
              background: "white",
            }}
          >
            <option value="AES">AES</option>
            <option value="3DES">3DES</option>
            <option value="OTP">OTP</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
