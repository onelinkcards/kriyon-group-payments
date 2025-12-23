'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Hand, Linkedin, Instagram, MessageCircle, Building2, Phone, Mail, Share2, Zap, Layers, Sparkles, Shield, Star } from 'lucide-react'
import { kriyonConfig } from '../config'
import Card3D, { Face } from './Card3D'
import InfoFace from './InfoFace'

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

export default function Hero() {
  const [currentFace, setCurrentFace] = useState<Face>('front')
  const [isFlipping, setIsFlipping] = useState(false)

  const handleFlip = (e?: React.MouseEvent, forceFlip = false) => {
    if (isFlipping) return
    if (!forceFlip && e && (e.target as HTMLElement).closest('button, a, [role="button"]')) {
      return
    }
    
    setIsFlipping(true)
    if (currentFace === 'front') {
      setCurrentFace('info')
    } else if (currentFace === 'info') {
      setCurrentFace('front')
    } else {
      setCurrentFace('info')
    }
    
    setTimeout(() => {
      setIsFlipping(false)
    }, 850)
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${kriyonConfig.whatsapp}?text=Hi%20Kriyon%20Group%2C%20I%20need%20support.`, '_blank')
  }


  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto px-2 pt-4 pb-6"
    >
      <Card3D
        currentFace={currentFace}
        isFlipping={isFlipping}
        faceFront={
          <div 
            className="rounded-[24px] shadow-2xl border-2 border-slate-200/50 relative cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.95) 0%, rgba(169, 169, 169, 0.9) 50%, rgba(128, 128, 128, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              overflow: 'hidden',
              minHeight: '580px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
            }}
            onClick={(e) => {
              const target = e.target as HTMLElement
              const isButton = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')
              const isInActions = target.closest('[data-actions-row]')
              const isInSocial = target.closest('[data-social-icons]')
              
              if (!isButton && !isInActions && !isInSocial) {
                handleFlip(e)
              }
            }}
          >
            {/* Flip Button */}
            {currentFace === 'front' && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  handleFlip(e, true)
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 z-10 text-xs text-slate-900 font-semibold bg-white/95 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg cursor-pointer hover:shadow-xl transition-all flex items-center gap-1.5 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Hand className="w-3.5 h-3.5 text-slate-900" />
                Tap to Flip
              </motion.button>
            )}

            {/* Header Image */}
            <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
              <Image
                src="/logos/logo 3d render.png"
                alt="Kriyon Group"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            {/* Social Icons */}
            <motion.div 
              data-social-icons
              className="absolute right-2 z-20 flex items-center gap-3"
              style={{ top: '8.5rem' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              {kriyonConfig.social.linkedin && (
                <motion.a
                  href={kriyonConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-11 w-11 p-0 rounded-full shadow-2xl border-2 border-[#0077B5] flex items-center justify-center bg-white/95 backdrop-blur-sm touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Linkedin className="w-6 h-6 text-[#0077B5]" />
                </motion.a>
              )}
              {kriyonConfig.social.instagram && (
                <motion.a
                  href={kriyonConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-11 w-11 p-0.5 rounded-full shadow-2xl flex items-center justify-center overflow-hidden touch-manipulation"
                  style={{
                    background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-pink-600" />
                  </div>
                </motion.a>
              )}
            </motion.div>

            {/* Content */}
            <div className="relative px-5 pb-6 pt-3" style={{ backgroundColor: 'rgba(253, 255, 255, 0.98)' }}>
              {/* Logo Circle */}
              <motion.div 
                className="absolute -top-14 left-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl overflow-hidden"
                  style={{ 
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <Image
                    src="/logos/Asset 16@4x.png"
                    alt="Kriyon Group Logo"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    style={{ transform: 'scale(1.3)' }}
                  />
                </div>
              </motion.div>

              {/* Brand Info */}
              <motion.div 
                className="pt-20 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <h1 className="text-2xl font-black text-slate-900 mb-1 leading-tight tracking-tight">
                  {kriyonConfig.companyName}
                </h1>
                <p className="text-blue-600 font-semibold text-[15px]">
                  {kriyonConfig.tagline}
                </p>
              </motion.div>

              {/* Highlight Chips */}
              <motion.div 
                className="mb-6 flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {kriyonConfig.highlights.map((highlight, idx) => {
                  // Map highlights to icons
                  const iconMap: Record<string, React.ComponentType<any>> = {
                    'AI-First': Zap,
                    'Scalable Systems': Layers,
                    'Modern UI': Sparkles,
                    'Trusted Ventures': Shield,
                  }
                  const IconComponent = iconMap[highlight] || Star
                  
                  return (
                    <div 
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-sm"
                      style={{ 
                        background: 'rgba(133, 203, 52, 0.25)',
                        backdropFilter: 'blur(8px)',
                        borderColor: 'rgba(133, 203, 52, 0.3)'
                      }}
                    >
                      <IconComponent className="w-3 h-3 text-white" />
                      <span className="text-xs font-semibold text-white">{highlight}</span>
                    </div>
                  )
                })}
              </motion.div>

              {/* Action Buttons - B2C Style Layout */}
              <motion.div
                data-actions-row
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="space-y-3 mb-4"
              >
                {/* First Row: WhatsApp */}
                <div className="flex gap-2 items-stretch">
                  {/* WhatsApp Button - B2C White Style */}
                  <motion.button
                    onClick={handleWhatsApp}
                    className="w-full h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
                    style={{ 
                      color: '#0F172A',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                      borderRadius: '16px',
                      fontSize: '14px',
                      WebkitTapHighlightColor: 'transparent',
                      transform: 'translateY(-1px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                  >
                    <MessageCircle className="w-4 h-4" style={{ color: '#25D366', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
                    <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>WhatsApp</span>
                  </motion.button>
                </div>

                {/* Second Row: Our Ventures, Call, Email */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Our Ventures */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFlip(e, true)
                    }}
                    className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] touch-manipulation"
                    style={{ 
                      color: '#0F172A',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                      borderRadius: '16px',
                      fontSize: '14px',
                      WebkitTapHighlightColor: 'transparent',
                      transform: 'translateY(-1px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                  >
                    <Building2 className="w-4 h-4" style={{ color: '#475569', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
                    <span className="text-xs font-bold" style={{ color: '#0F172A' }}>Ventures</span>
                  </motion.button>

                  {/* Call */}
                  <motion.button
                    onClick={() => window.location.href = `tel:${kriyonConfig.phone.replace(/\s/g, '')}`}
                    className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] touch-manipulation"
                    style={{ 
                      color: '#0F172A',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                      borderRadius: '16px',
                      fontSize: '14px',
                      WebkitTapHighlightColor: 'transparent',
                      transform: 'translateY(-1px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                  >
                    <Phone className="w-4 h-4" style={{ color: '#475569', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
                  </motion.button>

                  {/* Email */}
                  <motion.button
                    onClick={() => window.location.href = `mailto:${kriyonConfig.email}`}
                    className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] touch-manipulation"
                    style={{ 
                      color: '#0F172A',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                      borderRadius: '16px',
                      fontSize: '14px',
                      WebkitTapHighlightColor: 'transparent',
                      transform: 'translateY(-1px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                  >
                    <Mail className="w-4 h-4" style={{ color: '#475569', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
                  </motion.button>
                </div>
              </motion.div>


            </div>
          </div>
        }
        faceInfo={<InfoFace onBack={() => handleFlip(undefined, true)} />}
      />
    </motion.section>
  )
}

