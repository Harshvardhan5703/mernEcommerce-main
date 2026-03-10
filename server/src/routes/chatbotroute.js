import express from "express";

const router = express.Router();

router.post("/", (req, res) => {

  const { message } = req.body;

  if (!message) {
    return res.json({ reply: "Please ask something." });
  }

  const msg = message.toLowerCase();

  let reply = "Sorry, I didn't understand that. You can ask about delivery, payment, returns, orders, or products.";

  // greetings
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {

    const greetings = [
      "Hello! 👋 Welcome to our store.",
      "Hi there! How can I assist you today?",
      "Hey! Need help finding something?"
    ];

    reply = greetings[Math.floor(Math.random() * greetings.length)];
  }

  // product browsing
  else if (
    msg.includes("product") ||
    msg.includes("buy") ||
    msg.includes("shop") ||
    msg.includes("items")
  ) {
    reply = "You can explore products on the Shop page. If you need help choosing, just ask!";
  }

  // payment
  else if (msg.includes("payment") || msg.includes("pay")) {
    reply = "We support UPI, credit cards, debit cards and net banking.";
  }

  // delivery
  else if (
    msg.includes("delivery") ||
    msg.includes("shipping") ||
    msg.includes("ship")
  ) {
    reply = "Delivery usually takes 3-5 business days depending on your location.";
  }

  // returns
  else if (
    msg.includes("return") ||
    msg.includes("refund") ||
    msg.includes("exchange")
  ) {
    reply = "Products can be returned or exchanged within 7 days if unused.";
  }

  // order tracking
  else if (
    msg.includes("order") ||
    msg.includes("track") ||
    msg.includes("tracking")
  ) {
    reply = "You can track your order from your profile under the 'My Orders' section.";
  }

  // discounts
  else if (
    msg.includes("discount") ||
    msg.includes("offer") ||
    msg.includes("sale") ||
    msg.includes("coupon")
  ) {
    reply = "We frequently run discounts during sales. Check the homepage for current offers!";
  }

  // account help
  else if (
    msg.includes("account") ||
    msg.includes("login") ||
    msg.includes("signup")
  ) {
    reply = "You can create an account or login from the top right corner of the website.";
  }

  // support
  else if (
    msg.includes("support") ||
    msg.includes("help") ||
    msg.includes("assist")
  ) {
    reply = "I'm here to help! You can ask about orders, delivery, payments, returns, or products.";
  }

  // recommendations
  else if (
    msg.includes("recommend") ||
    msg.includes("suggest") ||
    msg.includes("best")
  ) {
    reply = "You can check our trending products section for popular items.";
  }

  // fallback suggestions
  else if (
    msg.includes("what") ||
    msg.includes("how") ||
    msg.includes("can you")
  ) {
    reply =
      "You can ask me about:\n• delivery time\n• payment methods\n• returns\n• order tracking\n• discounts";
  }

  res.json({ reply });

});

export default router;