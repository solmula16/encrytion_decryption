require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");
const fs = require("fs");
const path = require("path");
const NodeRSA = require("node-rsa");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load RSA keys with error handling
const publicKeyPath = path.join(__dirname, "keys/public_key.pem");
const privateKeyPath = path.join(__dirname, "keys/private_key.pem");

if (!fs.existsSync(publicKeyPath) || !fs.existsSync(privateKeyPath)) {
  console.error("❌ RSA key files are missing. Generate them in backend/keys/");
  process.exit(1); // Stop the server
}

const publicKey = new NodeRSA(fs.readFileSync(publicKeyPath, "utf8"));
const privateKey = new NodeRSA(fs.readFileSync(privateKeyPath, "utf8"));

// AES Encryption & Decryption
const encryptAES = (text, key) => CryptoJS.AES.encrypt(text, key).toString();
const decryptAES = (ciphertext, key) => CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);

// 3DES Encryption & Decryption
const encrypt3DES = (text, key) => CryptoJS.TripleDES.encrypt(text, key).toString();
const decrypt3DES = (ciphertext, key) => CryptoJS.TripleDES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);

// OTP (One-Time Pad) - Simple Base64 Encoding/Decoding
const encryptOTP = (text) => Buffer.from(text).toString("base64");
const decryptOTP = (ciphertext) => Buffer.from(ciphertext, "base64").toString("utf8");

// RSA Encryption & Decryption
const encryptRSA = (text) => publicKey.encrypt(text, "base64");
const decryptRSA = (ciphertext) => privateKey.decrypt(ciphertext, "utf8");

// API Endpoints with Error Handling
app.post("/encrypt", (req, res) => {
  try {
    const { message, key, algorithm } = req.body;
    let encryptedText = "";

    if (!message || !algorithm) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (algorithm === "AES") encryptedText = encryptAES(message, key);
    else if (algorithm === "3DES") encryptedText = encrypt3DES(message, key);
    else if (algorithm === "OTP") encryptedText = encryptOTP(message);
    else if (algorithm === "RSA") encryptedText = encryptRSA(message);
    else return res.status(400).json({ error: "Invalid encryption algorithm." });

    res.json({ encrypted: encryptedText });
  } catch (error) {
    console.error("Encryption error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/decrypt", (req, res) => {
  try {
    const { message, key, algorithm } = req.body;
    let decryptedText = "";

    if (!message || !algorithm) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (algorithm === "AES") decryptedText = decryptAES(message, key);
    else if (algorithm === "3DES") decryptedText = decrypt3DES(message, key);
    else if (algorithm === "OTP") decryptedText = decryptOTP(message);
    else if (algorithm === "RSA") decryptedText = decryptRSA(message);
    else return res.status(400).json({ error: "Invalid decryption algorithm." });

    res.json({ decrypted: decryptedText });
  } catch (error) {
    console.error("Decryption error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
