import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { X, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const { content } = useAdmin();
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = content.images;

  return (
    <div className="pt-24 pb-32 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl sm:text-7xl text-cartoon-blue mb-4 hero-text"
          >
            {content.galleryTitle}
          </motion.h1>
          <p className="text-xl font-body">{content.gallerySubtitle}</p>
        </header>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative cursor-zoom-in"
              onClick={() => setSelectedImage(image)}
            >
              <div className="card-cartoon p-2">
                <motion.img
                  src={image.url}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <ZoomIn className="text-white w-12 h-12" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-cartoon-red transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={48} />
            </button>
            <motion.img
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5 }}
              src={selectedImage.url}
              className="max-w-full max-h-[90vh] rounded-3xl border-[8px] border-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
