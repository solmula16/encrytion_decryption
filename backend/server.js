require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// AES Encryption & Decryption
const encryptAES = (text, key) => CryptoJS.AES.encrypt(text, key).toString();
const decryptAES = (ciphertext, key) =>
  CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);

// 3DES Encryption & Decryption
const encrypt3DES = (text, key) =>
  CryptoJS.TripleDES.encrypt(text, key).toString();
const decrypt3DES = (ciphertext, key) =>
  CryptoJS.TripleDES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);

// OTP (One-Time Pad) - Simple Base64 Encoding/Decoding
const encryptOTP = (text) => Buffer.from(text).toString("base64");
const decryptOTP = (ciphertext) =>
  Buffer.from(ciphertext, "base64").toString("utf8");

// API Endpoints
app.post("/encrypt", (req, res) => {
  const { message, key, algorithm } = req.body;
  let encryptedText = "";

  if (algorithm === "AES") encryptedText = encryptAES(message, key);
  else if (algorithm === "3DES") encryptedText = encrypt3DES(message, key);
  else if (algorithm === "OTP") encryptedText = encryptOTP(message);

  res.json({ encrypted: encryptedText });
});

app.post("/decrypt", (req, res) => {
  const { message, key, algorithm } = req.body;
  let decryptedText = "";

  if (algorithm === "AES") decryptedText = decryptAES(message, key);
  else if (algorithm === "3DES") decryptedText = decrypt3DES(message, key);
  else if (algorithm === "OTP") decryptedText = decryptOTP(message);

  res.json({ decrypted: decryptedText });
});

app.listen(5000, () => console.log("Server running on port 5000"));
