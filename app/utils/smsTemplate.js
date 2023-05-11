const axios = require("axios");

const sendInvoiceOnMessage = (bill, phone) => {
  const templateBnLong = `
    প্রিয় গ্রাহক,
    আপনার বাড়ি ভাড়া সফলভাবে 
    গ্রহণ করা হয়েছে।
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

  const templateBnShort = `
    প্রিয় গ্রাহক,
    আপনার বাড়ি ভাড়া সফলভাবে 
    গ্রহণ করা হয়েছে।
    প্রদানযোগ্য: ${convertToBanglaDigit(bill.payableAmount)}/-
    প্রদান: ${convertToBanglaDigit(bill.paidAmount)}/-
    বাকী: ${convertToBanglaDigit(bill.due)}/-
    তারিখ: ${convertToBanglaDigit(
      new Date(bill.createdAt).toLocaleDateString()
    )}
    বিস্তারিত জানতে h0mify.com 
    সাইটে লগইন করুন।
    ধন্যবাদ!
    `;

  const templateEngLong = `
    Dear Customer,
    Your payment has been 
    successfully received.
    Bill details:
    Rent: ${bill.rent} Taka
    Electricity Bill: ${bill.electricity_bill} Taka
    Others Bill: ${bill.others} Taka
    Payable Amount: ${bill.payableAmount} Taka
    Paid: ${bill.paidAmount} Taka
    Due: ${bill.due} Taka
    Payment Date: ${new Date(bill.createdAt).toLocaleDateString()}
    To get more details, 
    please login to h0mify.com
    Thank you!
    -Powered by h0mify
    `;

  const templateEngShort = `
    Dear Customer,
    Your payment has been 
    successfully received.
    Bill details:
    Payable Amount: ${bill.payableAmount} Taka
    Paid: ${bill.paidAmount} Taka
    Due: ${bill.due} Taka
    Payment Date: ${new Date(bill.createdAt).toLocaleDateString()}
    For more details, 
    login to h0mify.com
    `;

  const greenwebsms = new URLSearchParams();
  greenwebsms.append("token", process.env.SMSTOKEN);
  greenwebsms.append("to", phone);
  greenwebsms.append("message", templateEngShort);
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
