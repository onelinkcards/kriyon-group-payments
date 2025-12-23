'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react'

// Placeholder gallery images - replace with actual images
const galleryImages = [
  '/logos/logo 3d render.png',
  '/logos/Asset 16@4x.png',
  '/logos/dc.png',
  '/logos/edova logo.png',
]

export default function Gallery() {
  const [visibleImages] = useState(galleryImages.slice(0, 4))
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    const actualIndex = galleryImages.indexOf(visibleImages[index])
    setLightboxIndex(actualIndex)
    setLightboxOpen(true)
  }

  const handlePrevious = () => {
    setLightboxIndex((prev) => {
      if (prev === 0) {
        return galleryImages.length - 1
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setLightboxIndex((prev) => {
      if (prev === galleryImages.length - 1) {
        return 0
      }
      return prev + 1
    })
  }

  return (
    <section id="gallery" className="w-full max-w-md mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-5 px-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          Gallery
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-medium">
          Explore Our Work
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {visibleImages.map((imageSrc, index) => (
          <motion.div
            key={`gallery-${index}-${imageSrc}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
            className="rounded-2xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl hover:-translate-y-1 transition-all relative aspect-square bg-gray-800"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={imageSrc}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <p className="text-slate-800 font-semibold text-sm">View Image</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md border border-white/20"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex]}
                alt={`Gallery image ${lightboxIndex + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                style={{ maxHeight: '90vh', objectFit: 'contain' }}
              />
            </motion.div>

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevious()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md border border-white/20"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

