import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Mail, AlertCircle } from 'lucide-react';
import { contactInfo } from '@/data/portfolio';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isOpeningMail, setIsOpeningMail] = useState(false);
  const [mailOpened, setMailOpened] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsOpeningMail(true);

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Hi Chaitanya,\n\n${message}\n\n—\n${name}\n${email}`
    );
    const mailtoUrl = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setMailOpened(true);
    setIsOpeningMail(false);
  };

  const handleClose = () => {
    if (!isOpeningMail) {
      setFormData({ name: '', email: '', message: '' });
      setMailOpened(false);
      setError('');
      onClose();
    }
  };

  const handleDone = () => {
    setFormData({ name: '', email: '', message: '' });
    setMailOpened(false);
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent hideClose className="max-w-2xl gap-0 overflow-hidden border-border p-0 mac-window">
        <div className="mac-titlebar">
          <span className="mac-traffic-lights" aria-hidden>
            <DialogClose asChild>
              <button type="button" className="close cursor-pointer" aria-label="Close" />
            </DialogClose>
            <span className="minimize" />
            <span className="maximize" />
          </span>
          <DialogHeader className="min-w-0 flex-1 space-y-0 p-0">
            <DialogTitle className="flex items-center gap-2 truncate text-sm font-medium text-foreground">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              Messages — New Message
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="space-y-6 p-6">
          <AnimatePresence mode="wait">
            {!mailOpened ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                    disabled={isOpeningMail}
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Your email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@domain.com"
                    className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                    disabled={isOpeningMail}
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="What would you like to discuss?"
                    rows={6}
                    className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground resize-none"
                    disabled={isOpeningMail}
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-red-400 font-mono text-sm">{error}</span>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isOpeningMail}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isOpeningMail}
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isOpeningMail ? 'Opening mail app…' : 'Open in email app'}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Your default mail app will open with this message addressed to{' '}
                  <span className="text-accent">{contactInfo.email}</span>
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="opened"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Opening your mail app
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    If nothing opened, email me directly at{' '}
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-accent hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
                <Button onClick={handleDone} className="bg-accent text-accent-foreground">
                  Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
