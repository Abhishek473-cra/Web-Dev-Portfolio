import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import twilio from "twilio";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const ORDERS_FILE = path.join(__dirname, "orders.json");

async function saveOrder(order: any) {
  try {
    let orders = [];
    try {
      const data = await fs.readFile(ORDERS_FILE, "utf-8");
      orders = JSON.parse(data);
    } catch (e) {
      // फाइल मौजूद नहीं है
    }
    orders.push(order);
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error("Error saving order:", err);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      const messageBody = `
*New Project Inquiry!*
*Name:* ${input.name}
*Email:* ${input.email}
*6-Digit Code:* ${code}
*Plan:* ${input.selectedPlan}
*Details:* ${input.projectDescription}
      `.trim();

      // Secrets से डेटा उठाना (SID/Token Replit Secrets में होने चाहिए)
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioWhatsappNumber = process.env.TWILIO_PHONE_NUMBER; // From Replit Secrets
      const myWhatsappNumber = process.env.MY_WHATSAPP_NUMBER; // From Replit Secrets

      // 1. डेटाबेस में सेव करें
      await saveOrder({
        ...input,
        code,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString()
      });

      // 2. चेक करें कि SID, Token, और Numbers मौजूद हैं या नहीं
      if (!accountSid || !authToken || !twilioWhatsappNumber || !myWhatsappNumber) {
         console.error("ERROR: Twilio Secrets (SID, Token, Phone Number, or My Number) are missing in Replit Tools!");
         return res.status(200).json({ success: true, message: "Code generated, but WhatsApp failed (Secrets missing).", code });
      }

      const client = twilio(accountSid, authToken);

      // 3. व्हाट्सएप मैसेज भेजें
      await client.messages.create({
        body: messageBody,
        from: twilioWhatsappNumber, 
        to: myWhatsappNumber
      });

      res.status(200).json({ success: true, message: "Message sent successfully!", code });
    } catch (err: any) {
      console.error("Detailed Twilio Error:", err.message);
      res.status(500).json({ message: "Failed to process request.", error: err.message });
    }
  });

  return httpServer;
}
