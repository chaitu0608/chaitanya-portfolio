import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/glass-card';

interface ProfessionalImageUploadProps {
  onImageChange?: (file: File | null) => void;
  currentImage?: string;
}

const ProfessionalImageUpload: React.FC<ProfessionalImageUploadProps> = ({ 
  onImageChange, 
  currentImage 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
        onImageChange?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const removeImage = () => {
    setPreview(null);
    onImageChange?.(null);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        {/* Main Image Container */}
        <div
          className={`relative w-80 h-80 rounded-2xl border-2 border-dashed transition-all duration-300 ${
            isDragOver 
              ? 'border-accent bg-accent/10' 
              : 'border-accent/30 hover:border-accent/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          {preview ? (
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Button
                onClick={removeImage}
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="mb-4">
                <ImageIcon className="w-16 h-16 text-accent/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drop your photo here or click to upload
                </p>
                <p className="text-xs text-muted-foreground/70">
                  PNG, JPG up to 10MB
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => document.getElementById('file-input')?.click()}
                  className="btn-secondary"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="btn-secondary"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Camera
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {/* Upload Overlay */}
        {isDragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-accent/20 rounded-2xl flex items-center justify-center"
          >
            <div className="text-center">
              <Upload className="w-12 h-12 text-accent mx-auto mb-2" />
              <p className="text-accent font-medium">Drop your image here</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Image Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-center"
      >
        <p className="text-xs text-muted-foreground">
          💡 Tip: Use a professional headshot with good lighting
        </p>
      </motion.div>
    </div>
  );
};

export default ProfessionalImageUpload;
