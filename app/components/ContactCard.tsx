'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { kriyonConfig } from '../config'

export default function ContactCard() {
  const openMap = () => {
    window.open(`https://www.google.com/maps?q=${encodeURIComponent('Kriyon Group')}`, '_blank')
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 py-8"
    >
      <div 
        className="backdrop-blur-md rounded-3xl p-6 shadow-lg border relative"
        style={{
          background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.85) 0%, rgba(133, 203, 52, 0.15) 30%, rgba(169, 169, 169, 0.85) 50%, rgba(133, 203, 52, 0.15) 70%, rgba(128, 128, 128, 0.85) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
        }}
      >
        {/* Metallic shine effect */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(255, 255, 255, 0.2) 100%)'
          }}
        />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 text-center relative z-10">
          Get in Touch
        </h2>

        <div className="space-y-3 relative z-10">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.05, duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl shadow-md p-4 hover:shadow-lg transition-all border border-white/20 bg-white/10 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1.5 text-base">Phone</h3>
                <p className="text-sm text-white/90">{kriyonConfig.phone}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = `tel:${kriyonConfig.phone.replace(/\s/g, '')}`}
              className="w-full h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 transition-all"
            >
              Call Now
            </button>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl shadow-md p-4 hover:shadow-lg transition-all border border-white/20 bg-white/10 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1.5 text-base">Email</h3>
                <p className="text-sm text-white/90 break-all">{kriyonConfig.email}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = `mailto:${kriyonConfig.email}`}
              className="w-full h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-white" />
              Send Email
            </button>
          </motion.div>

          {/* Website */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl shadow-md p-4 hover:shadow-lg transition-all border border-white/20 bg-white/10 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1.5 text-base">Website</h3>
                <p className="text-sm text-white/90">{kriyonConfig.website}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

