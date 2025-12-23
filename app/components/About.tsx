'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { kriyonConfig } from '../config'

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 py-8"
    >
      <div 
        className="backdrop-blur-md rounded-3xl p-7 shadow-lg border overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.95) 0%, rgba(169, 169, 169, 0.9) 50%, rgba(128, 128, 128, 0.95) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
        }}
      >
        {/* Metallic shine effect */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(255, 255, 255, 0.2) 100%)'
          }}
        />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
            {kriyonConfig.about.title}
          </h2>
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-white/90 leading-[1.7] text-[15px] mb-4">
                  {kriyonConfig.about.shortDescription}
                </p>
                <motion.button
                  onClick={() => setIsExpanded(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-white/90 hover:text-white font-semibold text-sm transition-colors"
                >
                  Read Full Story
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="text-white/90 leading-[1.7] text-[15px] mb-4 whitespace-pre-line">
                  {kriyonConfig.about.fullDescription}
                </p>
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-white/90 hover:text-white font-semibold text-sm transition-colors"
                >
                  Show Less
                  <ChevronUp className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}

