const axios = require("axios");

const sendInvoiceOnMessage = (bill, phone) => {
  const template = `
    প্রিয় গ্রাহক,
    আপনার বাড়ি ভাড়া সফলভাবে 
    প্রদান করা হয়েছে।
    বিলের বিবরণ-
    বাসা ভাড়া: ${convertToBanglaDigit(bill.rent)}টাকা
    বিদ্যুত বিল: ${convertToBanglaDigit(bill.electricity_bill)}টাকা
    প্রদানযোগ্য পরিমাণ: ${convertToBanglaDigit(bill.payableAmount)}টাকা
    প্রদান করা হয়েছে: ${convertToBanglaDigit(bill.paidAmount)}টাকা
    বাকী: ${convertToBanglaDigit(bill.due)}টাকা
    পেমেন্টের তারিখ: ${convertToBanglaDigit(
      new Date(bill.createdAt).toLocaleDateString()
    )}
    বিস্তারিত জানতে h0mify.com 
    সাইটে লগইন করুন।
    ধন্যবাদ!

    -Powered by h0mify
    `;

  const greenwebsms = new URLSearchParams();
  greenwebsms.append("token", process.env.SMSTOKEN);
  greenwebsms.append("to", phone);
  greenwebsms.append("message", template);
  axios
    .post("http://api.greenweb.com.bd/api.php", greenwebsms)
    .then((response) => {
      // response.status(200).json("Successfully Send SMS");
      console.log(response.data);
    });
};

function convertToBanglaDigit(number) {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const englishDigits = /[\u0030-\u0039]/g;
  return number
    .toString()
    .replace(englishDigits, (digit) => banglaDigits[digit]);
}

module.exports = {
  sendInvoiceOnMessage,
};
