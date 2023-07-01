const CryptoJS = require("crypto-js");

// Encryption function
const encryptData = (data, secretKey) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  return encryptedData;
};

// Decryption function
const decryptData = (encryptedData, secretKey) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

module.exports = {
  encryptData,
  decryptData,
};
