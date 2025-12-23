'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, Building2, Zap, Globe, Target } from 'lucide-react'
import { kriyonConfig } from '../config'

interface InfoFaceProps {
  onBack: () => void
}

export default function InfoFace({ onBack }: InfoFaceProps) {
  return (
    <div 
      className="rounded-[24px] shadow-2xl border-2 border-slate-200/50 relative cursor-pointer"
      style={{
        backgroundColor: '#FDFFFF',
        overflow: 'hidden',
        minHeight: '580px',
      }}
      onClick={onBack}
    >
      {/* Tap to Return Button - Top Right */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onBack()
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 right-4 z-10 text-xs text-white font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <span>Tap to Return</span>
      </motion.button>

      {/* Content - Metallic and green blend */}
      <div 
        className="relative flex flex-col items-center justify-center h-full px-6 py-8 text-center text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.7) 0%, rgba(133, 203, 52, 0.4) 30%, rgba(169, 169, 169, 0.7) 50%, rgba(133, 203, 52, 0.4) 70%, rgba(128, 128, 128, 0.7) 100%)',
          backdropFilter: 'blur(8px)',
          minHeight: '580px',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex flex-col items-center"
        >
          {/* Title */}
          <h2 className="text-2xl font-black mb-6 tracking-tight drop-shadow-lg text-white">
            Business Snapshot
          </h2>

          {/* Company Card */}
          <div className="flex items-start gap-3 mb-3 w-full max-w-sm bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30">
            <Building2 className="w-5 h-5 flex-shrink-0 mt-0.5 drop-shadow-md text-white" />
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold leading-relaxed drop-shadow-md text-white">
                {kriyonConfig.companyName}
              </p>
              <p className="text-xs text-white/90 mt-1">Technology & AI Solutions Company</p>
            </div>
          </div>

          {/* Core Focus Card */}
          <div className="flex items-start gap-3 mb-3 w-full max-w-sm bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30">
            <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 drop-shadow-md text-white" />
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold drop-shadow-md mb-1 text-white">Core Focus</p>
              <p className="text-sm leading-relaxed drop-shadow-md text-white/90">
                {kriyonConfig.coreFocus.join(' • ')}
              </p>
            </div>
          </div>

          {/* Operating Model Card */}
          <div className="flex items-start gap-3 mb-3 w-full max-w-sm bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30">
            <Globe className="w-5 h-5 flex-shrink-0 mt-0.5 drop-shadow-md text-white" />
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold drop-shadow-md mb-1 text-white">Operating Model</p>
              <p className="text-sm leading-relaxed drop-shadow-md text-white/90">
                {kriyonConfig.operatingModel}
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="flex items-start gap-3 mb-6 w-full max-w-sm bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30">
            <Target className="w-5 h-5 flex-shrink-0 mt-0.5 drop-shadow-md text-white" />
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold drop-shadow-md mb-1 text-white">Vision</p>
              <p className="text-sm leading-relaxed drop-shadow-md italic text-white/90">
                {kriyonConfig.vision}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
