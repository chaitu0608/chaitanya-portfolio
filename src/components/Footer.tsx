import { Github, Linkedin, Mail, Phone, Zap, Terminal, Wifi, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contactInfo, personalInfo } from "@/data/portfolio";

interface FooterProps {
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  const handlePhone = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  return (
    <footer className="py-16 px-4 relative continuous-bg section-transition">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <Card className="glass-enhanced border border-accent/20 p-8 mb-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 font-mono text-sm">COMMUNICATION_CHANNELS_OPEN</span>
            </div>
            
            <h3 className="text-3xl font-bold">
              Let's <span className="text-gradient">Connect</span>
            </h3>
            
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology and innovation. Ready to collaborate 
              and build something amazing together.
            </p>
            
            {/* Contact Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              <Button 
                variant="outline" 
                size="lg"
                className="btn-secondary"
                onClick={() => handleOpenLink(contactInfo.githubUrl)}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-secondary"
                onClick={() => handleOpenLink(contactInfo.linkedinUrl)}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-secondary"
                onClick={handleEmail}
              >
                <Mail className="w-5 h-5 mr-2" />
                Email
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-secondary"
                onClick={handlePhone}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call
              </Button>
              <Button 
                variant="default" 
                size="lg"
                className="btn-primary hover:scale-105"
                onClick={onContactClick}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </Card>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-enhanced border border-accent/20 p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-cyan-400 font-mono text-sm">NETWORK_STATUS</span>
            </div>
            <div className="text-green-400 font-mono">ONLINE</div>
          </Card>
          
          <Card className="glass-enhanced border border-accent/20 p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-yellow-400" />
              <span className="text-cyan-400 font-mono text-sm">SYSTEM_STATUS</span>
            </div>
            <div className="text-yellow-400 font-mono">ACTIVE</div>
          </Card>
          
          <Card className="glass-enhanced border border-accent/20 p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-cyan-400 font-mono text-sm">POWER_LEVEL</span>
            </div>
            <div className="text-blue-400 font-mono">100%</div>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>&copy; 2024 {personalInfo.name}</span>
            <span>•</span>
            <span>Built with React & TypeScript</span>
            <span>•</span>
            <span>Futuristic Control Room v2.0</span>
          </div>
          
          <div className="text-cyan-400 font-mono text-xs">
            SYSTEM_UPTIME: {new Date().toLocaleDateString()} | 
            LAST_UPDATE: {new Date().toLocaleTimeString()} | 
            STATUS: OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;