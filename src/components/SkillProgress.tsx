import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface SkillProgressProps {
  skill: string;
  level: number;
  color?: string;
  delay?: number;
}

const SkillProgress: React.FC<SkillProgressProps> = ({ 
  skill, 
  level, 
  color = "bg-accent",
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="relative">
        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`h-full rounded-full ${color} relative overflow-hidden`}
          >
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 1.5, delay: delay + 0.2 }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillProgress;
