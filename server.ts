import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is not defined. AI Assistant fallback mode active.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API: AI Chatbot for Aquaflotte Customer Support
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message string is required." });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Intelligent mock fallback response if key is missing in dev mode
      const lower = message.toLowerCase();
      let reply = "Hello! Welcome to Aquaflotte Fleet Washing in Montreal. How can I assist you with your commercial fleet, heavy equipment, or truck washing needs today?";
      if (lower.includes("quote") || lower.includes("price") || lower.includes("cost")) {
        reply = "We offer custom volume pricing based on your fleet size and vehicle types (Semi-trucks, Box trucks, Vans, Heavy Machinery). You can use our Instant Fleet Quote Calculator above or call us directly at +1 (514) 212-0256 for a custom proposal!";
      } else if (lower.includes("area") || lower.includes("montreal") || lower.includes("location")) {
        reply = "Aquaflotte is 100% mobile! We come directly to your yard, terminal, or site across Greater Montreal, Laval, Longueuil, Brossard, Saint-Laurent, Anjou, Dorval, South Shore, and North Shore.";
      } else if (lower.includes("eco") || lower.includes("water") || lower.includes("environment")) {
        reply = "Yes! We use 100% eco-friendly, 100% biodegradable cleaning products that strictly comply with Quebec municipal wastewater regulations.";
      } else if (lower.includes("phone") || lower.includes("contact") || lower.includes("call")) {
        reply = "You can call or text our team anytime at +1 (514) 212-0256 or email abdourahmanezit1@gmail.com.";
      }
      return res.json({ reply });
    }

    const systemInstruction = `You are Aquaflotte AI - the virtual customer support assistant for Aquaflotte, Montreal's premier mobile fleet washing and industrial pressure cleaning specialist.

Company Identity:
- Company Name: Aquaflotte
- Phone: +1 (514) 212-0256
- Email: abdourahmanezit1@gmail.com
- Main Service Area: Montreal, Quebec, Canada (including Laval, Longueuil, Brossard, Saint-Laurent, Anjou, Dorval, West Island, South Shore, North Shore).
- Services Offered: Mobile Fleet Washing (Semi-trucks, Trailers, Box trucks, Vans, SUVs, Cars, Buses), Heavy Equipment & Construction Machinery Pressure Washing (Excavators, Loaders, Cranes, Bulldozers), Commercial Pressure Washing, Off-Peak & Night Fleet Maintenance Contracts.
- Value Proposition: Fully mobile equipped with hot-water power rigs, 100% eco-friendly biodegradable soap, $5M full commercial liability insurance, flexible night & weekend scheduling to minimize fleet downtime.

Tone & Behavior:
- Professional, friendly, helpful, concise, and trustworthy.
- Answer questions accurately regarding fleet washing, scheduling, quote requests, eco-friendly practices, and Montreal coverage.
- If the user asks in French, reply in warm natural French. If in English, reply in English.
- Always encourage the user to use the "Get a Free Quote" estimator on the page or call +1 (514) 212-0256 directly for immediate dispatch.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        { role: "user", parts: [{ text: `System context: ${systemInstruction}` }] },
        ...(history || []).map((h: { role: string; content: string }) => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }],
        })),
        { role: "user", parts: [{ text: message }] },
      ],
    });

    const reply = response.text || "Thank you for reaching out to Aquaflotte. How else can we assist your fleet today?";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    return res.status(500).json({
      error: "Unable to process chat at the moment.",
      details: error.message,
    });
  }
});

// API: Quote Request Handler
app.post("/api/quote", (req, res) => {
  const { name, company, email, phone, fleetTypes, quantity, location, frequency, notes } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone number are required." });
  }

  // Calculate estimated price quote
  const qty = parseInt(quantity, 10) || 5;
  let baseRate = 35; // Default per vehicle
  if (fleetTypes?.includes("Semi-trucks") || fleetTypes?.includes("Heavy Equipment")) {
    baseRate = 85;
  } else if (fleetTypes?.includes("Box trucks") || fleetTypes?.includes("Buses")) {
    baseRate = 55;
  } else if (fleetTypes?.includes("Vans") || fleetTypes?.includes("Pickup trucks")) {
    baseRate = 35;
  }

  let discount = 1.0;
  if (frequency === "weekly") discount = 0.80; // 20% discount
  else if (frequency === "biweekly") discount = 0.88; // 12% discount
  else if (frequency === "monthly") discount = 0.92; // 8% discount

  const totalEstimate = Math.round(qty * baseRate * discount);
  const confirmationId = "AQ-" + Math.floor(100000 + Math.random() * 900000);

  return res.json({
    success: true,
    confirmationId,
    estimatedTotal: totalEstimate,
    perVehicleEstimate: Math.round(baseRate * discount),
    message: `Thank you ${name}! Your quote request (${confirmationId}) has been received. Our Aquaflotte fleet specialist will call you at ${phone} within 1 business hour to confirm schedule details.`,
    details: {
      name,
      company: company || "N/A",
      phone,
      email,
      quantity: qty,
      location: location || "Greater Montreal",
      frequency: frequency || "One-time",
    },
  });
});

// API: General Contact Form Handler
app.post("/api/contact", (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || (!email && !phone)) {
    return res.status(400).json({ error: "Name and at least one contact method (email or phone) are required." });
  }

  const ticketId = "TKT-" + Math.floor(10000 + Math.random() * 90000);
  return res.json({
    success: true,
    ticketId,
    message: `Thank you, ${name}! Your message has been routed to Aquaflotte management. We will contact you shortly.`,
  });
});

// Vite Middleware & Production Static Serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aquaflotte Fleet Washing Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
