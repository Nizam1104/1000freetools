import WhatsAppScreenshotMaker from "@/components/fun-tools/whatsapp-screen-shot-maker";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp Screenshot Maker - Create Fake Chat Memes",
  description: "Create realistic WhatsApp chat screenshots for memes and fun. Customize contact names, messages, and theme colors. Free online tool.",
  keywords: ["whatsapp screenshot", "fake chat maker", "whatsapp meme generator", "chat screenshot creator"],
};

export default function WhatsAppScreenshotMakerPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-2">
          WhatsApp Screenshot Maker
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Create realistic WhatsApp chat screenshots for memes and fun. Add custom messages, 
          choose theme colors, and download your creation instantly.
        </p>
      </header>

      <WhatsAppScreenshotMaker />
    </div>
  );
}
