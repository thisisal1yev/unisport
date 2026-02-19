import { useMemo, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

type Role = "user" | "bot";

type Message = {
  role: Role;
  content: string;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Salom! Men Unisport yordamchisiman. Savollardan birini tanlang.",
    },
  ]);

  const [showEmailForm, setShowEmailForm] = useState(false);

  // ✅ NEW: user name
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showEmailForm, isOpen]);

  const pushBot = (text: string) => {
    setMessages((prev) => [...prev, { role: "bot", content: text }]);
  };

  const pushUser = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
  };

  const FAQ_ITEMS: FaqItem[] = useMemo(
    () => [
      {
        id: "schedule",
        question: "📅 Musobaqalar qachon bo‘ladi?",
        answer:
          "Barcha yaqin musobaqalar 'Musobaqalar' bo‘limida ko‘rsatiladi. Sport turini tanlab, sana va joyni ko‘rishingiz mumkin.",
      },
      {
        id: "register",
        question: "📝 Musobaqaga qanday ro‘yxatdan o‘taman?",
        answer:
          "Musobaqa sahifasiga kiring → 'Ro‘yxatdan o‘tish' tugmasini bosing",
      },
      {
        id: "price",
        question: "💳 Ishtirok bepulmi?",
        answer:
          "Ba'zi musobaqalar bepul, ba'zilarida ishtirok badali mavjud. Aniq ma’lumot musobaqa sahifasida ko‘rsatiladi.",
      },
      {
        id: "location",
        question: "📍 Musobaqa qayerda o‘tkaziladi?",
        answer:
          "Har bir musobaqa sahifasida manzil va xarita mavjud. Siz tanlagan musobaqa joylashuvini ko‘rishingiz mumkin.",
      },
      {
        id: "results",
        question: "🏆 Natijalarni qayerdan ko‘raman?",
        answer: "Natijalar 'Yangiliklar' bo‘limida va 'Musobaqa natijalari' bo'limida real vaqtga yaqin yangilanadi.",
      },
      {
        id: "support",
        question: "🛠 Support",
        answer: "Iltimos ismingiz, emailingiz va savolingizni qoldiring 👇",
      },
    ],
    []
  );

  const askFaq = (item: FaqItem) => {
    pushUser(item.question);

    const isSupport = item.id === "support";
    setShowEmailForm(isSupport);

    setTimeout(() => {
      pushBot(item.answer);
    }, 300);
  };

  const sendEmail = async () => {
    const name = userName.trim();
    const email = userEmail.trim();
    const msg = userMessage.trim();

    if (!name || !email || !msg) {
      pushBot("❗ Iltimos, ism, email va savolni to‘ldiring.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      pushBot("❗ Email noto‘g‘ri ko‘rinadi. Masalan: name@gmail.com");
      return;
    }

    setIsSending(true);

    try {

      const SERVICE_ID = "service_6cd9e4n";
      const PUBLIC_KEY = "xLmVWCs4Xm8JMvjtj";

      const ADMIN_EMAIL = "seitalimuratov@gmail.com";

    
      await emailjs.send(
        SERVICE_ID,
        "template_035etj2", 
        {
          to_email: ADMIN_EMAIL,
          name,                
          from_email: email,     
          message: msg,          
        },
        PUBLIC_KEY
      );

  
      await emailjs.send(
        SERVICE_ID,
        "template_ncvsofd", 
        {
          to_email: email, 
          name,            
          message: msg,
        },
        PUBLIC_KEY
      );

      pushBot("✅ Xabaringiz yuborildi! ");
      setShowEmailForm(false);
      setUserName("");
      setUserEmail("");
      setUserMessage("");
    } catch (e) {
      pushBot("❌ Xatolik yuz berdi.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="mb-4"
          >
            <Card className="w-[95vw] max-w-[640px] h-[82vh] max-h-[800px] flex flex-col rounded-2xl border border-border bg-background shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <CardHeader className="relative bg-primary text-white py-4 rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircle className="w-5 h-5" />
                  Unisport Support
                </CardTitle>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-3 top-3 text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>

              <div className="p-3 border-b flex flex-wrap gap-2">
                {FAQ_ITEMS.map((item) => (
                  <Button
                    key={item.id}
                    variant="secondary"
                    size="sm"
                    className="rounded-full text-[11px] px-3 py-1 h-7"
                    onClick={() => askFaq(item)}
                  >
                    {item.question}
                  </Button>
                ))}
              </div>

              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4">
                  <div className="flex flex-col gap-4">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                            msg.role === "user" ? "bg-primary text-white" : "bg-muted"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {showEmailForm && (
                      <div className="border p-3 rounded-xl bg-muted space-y-2">
           
                        <Input
                          placeholder="Ismingiz"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        <Input
                          placeholder="Emailingiz"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                        <Input
                          placeholder="Savolingiz"
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                        />
                        <Button onClick={sendEmail} className="w-full" disabled={isSending}>
                          {isSending ? "Yuborilmoqda..." : "Yuborish"}
                        </Button>

                        <p className="text-[11px] text-muted-foreground">
                          “Yuborish” bosilganda xabar admin emailiga ketadi va sizga auto-javob yuboriladi.
                        </p>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t text-xs text-muted-foreground">
                Unisport © 2026
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-primary hover:bg-primary/90 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}
