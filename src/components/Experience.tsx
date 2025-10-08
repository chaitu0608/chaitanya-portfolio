import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader, Container } from "@/components/ui/section";
import { experiences } from "@/data/portfolio";

const Experience = () => {
  return (
    <Section id="experience" className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bokeh-bg opacity-20" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-gold opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3.5s' }} />
        </div>
      </div>
      
      <Container className="relative z-10">
        <SectionHeader 
          title={<>Experience & <span className="text-gradient">Leadership</span></>}
        />
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="card-shadow bg-card p-6 hover:scale-[1.02] transition-transform">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="text-4xl">{exp.logo}</div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <Badge variant="secondary" className="w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                  
                  <div className="text-primary font-medium mb-1">{exp.company}</div>
                  <div className="text-muted-foreground text-sm mb-4">{exp.location}</div>
                  
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Experience;