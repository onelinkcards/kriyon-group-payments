'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { kriyonConfig } from '../config'

export default function Ventures() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-5 px-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          Our Ventures
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-medium">
          Explore our ecosystem
        </p>
      </motion.div>
      <div className="space-y-3">
        {kriyonConfig.ventures.map((venture, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
                <Image
                  src={venture.logo}
                  alt={venture.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1.5)' }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{venture.name}</h3>
                <p className="text-xs text-white/60 mb-1">Founded {venture.founded}</p>
                <p className="text-xs text-white/80 font-medium italic mb-2">"{venture.tagline}"</p>
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed mb-3">{venture.description}</p>
            <div className="mb-3 p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs font-semibold text-white/90 mb-1">Vision</p>
              <p className="text-xs text-white/70 italic">{venture.vision}</p>
            </div>
            <motion.a
              href={`https://${venture.website}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1.5 text-xs"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

