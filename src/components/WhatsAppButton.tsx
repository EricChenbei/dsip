"use client";

import content from "@/data/content.json";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${content.global.whatsappNumber}?text=${encodeURIComponent(content.global.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open WhatsApp chat with research support team"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
    >
      <MessageCircle size={28} />
    </a>
  );
}
