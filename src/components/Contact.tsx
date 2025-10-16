import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import LampContainer from '@/components/ui/lamp';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Mail, Phone, Github, Linkedin, Send } from 'lucide-react';
import { contactInfo } from '@/data/portfolio';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2600);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden continuous-bg section-transition">
      {/* Background */}
      <motion.div className="absolute inset-0 bokeh-bg" style={{ opacity: 0.2 }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Lamp */}
        <LampContainer>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-slate-200 to-slate-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Let’s Connect
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Have an opportunity, idea, or question? I’d love to hear from you.
            </motion.p>
          </div>
        </LampContainer>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick contact cards */}
          <div className="space-y-6">
            <CardSpotlight className="p-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-1" />
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a href={`mailto:${contactInfo.email}`} className="text-foreground hover:text-accent smooth-transition">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </CardSpotlight>

            <CardSpotlight className="p-5">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-1" />
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <a href={`tel:${contactInfo.phone}`} className="text-foreground hover:text-accent smooth-transition">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </CardSpotlight>

            <div className="grid grid-cols-2 gap-6">
              <CardSpotlight className="p-4 cursor-pointer" >
                <a href={contactInfo.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-accent" />
                  <span>GitHub</span>
                </a>
              </CardSpotlight>
              <CardSpotlight className="p-4 cursor-pointer" >
                <a href={contactInfo.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-accent" />
                  <span>LinkedIn</span>
                </a>
              </CardSpotlight>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <CardSpotlight className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." />
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit" disabled={submitting} className="btn-primary">
                    <Send className="w-4 h-4 mr-2" />
                    {submitting ? 'Sending...' : 'Send message'}
                  </Button>
                  {submitted && (
                    <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-accent">
                      Message sent! I’ll reply soon.
                    </motion.span>
                  )}
                </div>
              </form>
            </CardSpotlight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


