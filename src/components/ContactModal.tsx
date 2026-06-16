import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Mail, AlertCircle, Check } from "lucide-react";
import { contactInfo } from "@/data/portfolio";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "sending" | "sent" | "mailto";

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState("");

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "", website: "" });
    setStep("form");
    setError("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const openMailto = (name: string, email: string, message: string) => {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Hi Chaitanya,\n\n${message}\n\n—\n${name}\n${email}`,
    );
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setStep("mailto");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setError("please fill in all fields.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError("please enter a valid email address.");
      return;
    }

    setStep("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          website: formData.website,
        }),
      });

      if (res.ok) {
        setStep("sent");
        toast.success("message sent — I'll get back to you soon");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        fallback?: string;
      };

      if (res.status === 503 && data.fallback === "mailto") {
        openMailto(name, email, message);
        return;
      }

      setError(data.error ?? "could not send — try again or email directly");
      setStep("form");
    } catch {
      setError("network error — try again or email directly");
      setStep("form");
      toast.error("could not reach the server");
    }
  };

  const handleClose = () => {
    if (step !== "sending") {
      resetForm();
      onClose();
    }
  };

  const handleDone = () => {
    resetForm();
    onClose();
  };

  const inputClass =
    "log-focus w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        hideClose
        className="max-w-lg gap-0 overflow-hidden border-zinc-800 bg-[#0a0a0a] p-0 font-mono text-zinc-100"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-4 py-2">
          <DialogHeader className="space-y-0 p-0">
            <DialogTitle className="flex items-center gap-2 text-xs text-zinc-300">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </span>
              <span className="ml-2 text-zinc-500">~/mail/connect.sh · compose</span>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Send a message to Chaitanya Dhamdhere
            </DialogDescription>
          </DialogHeader>
          <button
            type="button"
            onClick={handleClose}
            disabled={step === "sending"}
            className="log-focus rounded text-zinc-500 hover:text-zinc-200 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === "form" || step === "sending" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                />

                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-wider text-zinc-500"
                  >
                    --name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="enter your name"
                    className={inputClass}
                    disabled={step === "sending"}
                    autoComplete="name"
                    maxLength={120}
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-wider text-zinc-500"
                  >
                    --email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@domain.com"
                    className={inputClass}
                    disabled={step === "sending"}
                    autoComplete="email"
                    maxLength={254}
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs uppercase tracking-wider text-zinc-500"
                  >
                    --message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="what would you like to discuss?"
                    rows={6}
                    className={`${inputClass} resize-none`}
                    disabled={step === "sending"}
                    maxLength={5000}
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 rounded border border-red-500/30 bg-red-500/10 p-3"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                    <span className="text-sm text-red-400">{error}</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={step === "sending"}
                    className="log-focus flex-1 rounded border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100 disabled:opacity-50"
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    disabled={step === "sending"}
                    className="log-focus flex flex-1 items-center justify-center gap-2 rounded border border-emerald-500/40 bg-emerald-500/5 px-4 py-2 text-sm text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300 disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {step === "sending" ? "sending…" : "[ send message ]"}
                  </button>
                </div>

                <p className="text-center text-[10px] text-zinc-500">
                  delivers to{" "}
                  <span className="text-emerald-400">{contactInfo.email}</span>
                  {" · "}falls back to mail.app if offline
                </p>
              </motion.form>
            ) : step === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5 py-4 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/5">
                  <Check className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base text-zinc-100">message sent</h3>
                  <p className="mx-auto max-w-md text-xs text-zinc-500">
                    thanks — I&apos;ll reply to your email soon.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDone}
                  className="log-focus rounded border border-emerald-500/40 bg-emerald-500/5 px-5 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10"
                >
                  [ done ]
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="mailto"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5 py-4 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/5">
                  <Mail className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base text-zinc-100">opening your mail app</h3>
                  <p className="mx-auto max-w-md text-xs text-zinc-500">
                    server mail isn&apos;t configured yet — finish sending from
                    your mail app, or email{" "}
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-emerald-400 hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDone}
                  className="log-focus rounded border border-emerald-500/40 bg-emerald-500/5 px-5 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10"
                >
                  [ done ]
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
