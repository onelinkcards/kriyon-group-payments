'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, CreditCard, Shield, Lock, Download, Share2, QrCode, Mail, Banknote } from 'lucide-react'
import Image from 'next/image'
import { paymentConfig } from '../config'


// Build UPI deep link
function buildUpiLink(upiId: string, upiName: string, amount?: number): string {
  const params = new URLSearchParams({
    pa: upiId,
    pn: upiName,
    cu: 'INR',
  })
  if (amount && amount > 0) {
    params.set('am', amount.toString())
  }
  return `upi://pay?${params.toString()}`
}

// Copy to clipboard hook
function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return { copy, copied }
}

interface PaymentCardProps {
  onBack?: () => void
}

export default function PaymentCard({ onBack }: PaymentCardProps = {}) {
  const { copy: copyAccountHolder, copied: accountHolderCopied } = useCopyToClipboard()
  const { copy: copyBankName, copied: bankNameCopied } = useCopyToClipboard()
  const { copy: copyAccountNumber, copied: accountNumberCopied } = useCopyToClipboard()
  const { copy: copyIFSC, copied: ifscCopied } = useCopyToClipboard()
  const { copy: copyUpiId, copied: upiIdCopied } = useCopyToClipboard()

  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [bankTransferModalOpen, setBankTransferModalOpen] = useState(false)
  const [scannerModalOpen, setScannerModalOpen] = useState(false)
  const [canShare, setCanShare] = useState(false)

  const upiLink = buildUpiLink(paymentConfig.upi.id, paymentConfig.upi.name)

  // Check if Web Share API is available
  useEffect(() => {
    setCanShare(!!navigator.share && !!navigator.canShare)
  }, [])

  // Download QR Code
  const handleDownloadQR = async () => {
    try {
      const response = await fetch(paymentConfig.qrCode)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `kriyon-payment-qr.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to download QR:', error)
    }
  }

  // Share QR Code
  const handleShareQR = async () => {
    if (!canShare) return
    try {
      const response = await fetch(paymentConfig.qrCode)
      const blob = await response.blob()
      const file = new File([blob], 'kriyon-payment-qr.png', { type: 'image/png' })
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Kriyon Group Pvt. Ltd. - Payment QR Code',
          text: `Scan to pay ${paymentConfig.companyName}`,
          files: [file],
        })
      }
    } catch (error) {
      console.error('Failed to share:', error)
    }
  }

  // Build payment app links
  const buildPaytmLink = () => {
    const params = new URLSearchParams({
      pa: paymentConfig.upi.id,
      pn: paymentConfig.upi.name,
      cu: 'INR',
    })
    return `paytmmp://pay?${params.toString()}`
  }

  const buildGooglePayLink = () => {
    const params = new URLSearchParams({
      pa: paymentConfig.upi.id,
      pn: paymentConfig.upi.name,
      cu: 'INR',
    })
    return `tez://upi/pay?${params.toString()}`
  }

  const buildPhonePeLink = () => {
    const params = new URLSearchParams({
      pa: paymentConfig.upi.id,
      pn: paymentConfig.upi.name,
      cu: 'INR',
    })
    return `phonepe://pay?${params.toString()}`
  }

  const handlePayWithPaytm = () => {
    try {
      window.location.href = buildPaytmLink()
      setTimeout(() => {
        if (document.hasFocus()) {
          window.open(upiLink, '_blank')
        }
      }, 1500)
    } catch (error) {
      window.open(upiLink, '_blank')
    }
    setPaymentModalOpen(false)
  }

  const handlePayWithGooglePay = () => {
    try {
      window.location.href = buildGooglePayLink()
      setTimeout(() => {
        if (document.hasFocus()) {
          window.open(upiLink, '_blank')
        }
      }, 1500)
    } catch (error) {
      window.open(upiLink, '_blank')
    }
    setPaymentModalOpen(false)
  }

  const handlePayWithPhonePe = () => {
    try {
      window.location.href = buildPhonePeLink()
      setTimeout(() => {
        if (document.hasFocus()) {
          window.open(upiLink, '_blank')
        }
      }, 1500)
    } catch (error) {
      window.open(upiLink, '_blank')
    }
    setPaymentModalOpen(false)
  }

  const handleCopyAccountHolder = () => {
    copyAccountHolder(paymentConfig.bank.accountHolder)
  }

  const handleCopyBankName = () => {
    copyBankName(paymentConfig.bank.bankName)
  }

  const handleCopyAccountNumber = () => {
    copyAccountNumber(paymentConfig.bank.accountNumberMasked)
  }

  const handleCopyIFSC = () => {
    copyIFSC(paymentConfig.bank.ifsc)
  }

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPaymentModalOpen(false)
        setBankTransferModalOpen(false)
        setScannerModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])


  return (
    <div
      className="rounded-[28px] shadow-2xl overflow-y-auto border border-slate-800 relative w-full max-w-md mx-auto"
      style={{
        background: 'radial-gradient(120% 120% at 20% 15%, rgba(59,130,246,0.22) 0%, rgba(14,116,144,0.28) 35%, rgba(10,20,35,0.9) 75%, #060910 100%)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
        minHeight: '580px'
      }}
    >
          {/* Grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 py-6 text-center" style={{ minHeight: '620px', paddingBottom: '2.5rem', pointerEvents: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="w-full max-w-sm"
            >
              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mb-6"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-lg border border-white/30 flex-shrink-0">
                    <Image
                      src="/logos/Asset 16@4x.png"
                      alt="Kriyon Group Logo"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold text-white leading-tight tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700 }}>Kriyon Group Pvt. Ltd.</p>
                    <p className="text-[12px] text-white/75 leading-tight">Official company payments</p>
                  </div>
                </div>

                <div className="flex items-center justify-center text-white/90 text-xs font-medium mb-1">
                  <span>100% secure and verified business payment</span>
                </div>
              </motion.div>

              {/* Transfer via Bank Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mb-3"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setBankTransferModalOpen(true)
                  }}
                  className="w-full h-12 bg-gradient-to-r from-[#f3f0ff] via-white to-[#ede9fe] backdrop-blur-md hover:from-white hover:to-[#f5f3ff] text-[#0F172A] font-bold px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer relative z-20 touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow: '0 16px 32px rgba(124, 58, 237, 0.28), 0 8px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255,255,255,0.95)',
                    border: '1.5px solid rgba(124, 58, 237, 0.35)',
                    transform: 'translateY(-1px)'
                  }}
                  aria-label="Transfer via Bank"
                >
                  <Banknote className="w-5 h-5 pointer-events-none" style={{ color: '#6b21a8' }} />
                  <span className="text-sm font-semibold pointer-events-none" style={{ color: '#0F172A' }}>Transfer via Bank</span>
                </motion.button>
              </motion.div>

              {/* Pay via Scanner Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="mb-3"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setScannerModalOpen(true)
                  }}
                  className="w-full h-12 bg-gradient-to-r from-[#e0f7ff] via-white to-[#d1f0ff] backdrop-blur-md hover:from-white hover:to-[#e6f7ff] font-bold px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer relative z-20 touch-manipulation border"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    borderColor: 'rgba(31,182,217,0.42)',
                    color: '#0E7490',
                    boxShadow: '0 16px 32px rgba(14, 116, 144, 0.22), 0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.98)',
                    transform: 'translateY(-1px)'
                  }}
                  aria-label="Pay via Scanner"
                >
                  <QrCode className="w-5 h-5" style={{ color: '#1FB6D9' }} />
                  <span className="text-sm font-semibold pointer-events-none" style={{ color: '#0F172A' }}>Pay via Scanner</span>
                </motion.button>
              </motion.div>

              {/* Payment Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mb-3 relative z-20"
              >
                {/* Pay via UPI Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setPaymentModalOpen(true)
                  }}
                  className="w-full h-12 bg-gradient-to-r from-[#dff3ff] via-white to-[#d1f0ff] backdrop-blur-md hover:from-white hover:to-[#e6f7ff] text-[#0F172A] font-bold px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer relative z-30 touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow: '0 16px 32px rgba(14, 116, 144, 0.24), 0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.98)',
                    border: '1.5px solid rgba(14,116,144,0.38)',
                    transform: 'translateY(-1px)'
                  }}
                  aria-label="Pay via UPI"
                >
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/logos/icons8-paytm-48.png"
                      alt="Paytm"
                      width={22}
                      height={22}
                      className="w-5.5 h-5.5 object-contain"
                      style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                    />
                    <Image
                      src="/logos/icons8-google-pay-48.png"
                      alt="Google Pay"
                      width={22}
                      height={22}
                      className="w-5.5 h-5.5 object-contain"
                      style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                    />
                    <Image
                      src="/logos/icons8-phone-pe-48.png"
                      alt="PhonePe"
                      width={22}
                      height={22}
                      className="w-5.5 h-5.5 object-contain"
                      style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                    />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>Pay via UPI</span>
                </motion.button>
              </motion.div>

              {/* Helper Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="mt-4"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <p className="text-white/80 text-xs font-medium">
                    Secure payment gateway
                  </p>
                </div>
                <p className="text-white/60 text-xs">
                  Works with GPay, PhonePe, Paytm & more
                </p>
              </motion.div>


            </motion.div>
          </div>

          {/* Footer Branding - Premium Dark */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 pb-3 pt-2 px-4"
          >
            <div className="flex items-center justify-center">
              <motion.a
                href="https://repixelx.com/onelink"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border"
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  background: '#030712',
                  borderColor: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(10px)'
                }}
                >
                  <Image
                    src="/gallery/onelink.png"
                    alt="OneLink Logo"
                    width={28}
                    height={9}
                    className="opacity-100"
                    priority
                  />
                  <div className="flex flex-col leading-tight text-left">
                    <span className="text-[11px] font-semibold text-white">Secure payment gateway • OneLink</span>
                    <span className="text-[11px] text-white/70">Kriyon Group Pvt. Ltd.</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>

          {/* Payment Options Modal */}
          <AnimatePresence>
            {paymentModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 rounded-[28px] flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(31, 182, 217, 0.95) 0%, rgba(14, 116, 144, 0.95) 50%, rgba(17, 19, 21, 0.98) 100%)',
                  backdropFilter: 'blur(10px)',
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setPaymentModalOpen(false)
                  }
                }}
              >
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-[28px]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-50 w-full max-w-sm px-6"
                  onClick={(e) => e.stopPropagation()}
                  style={{ pointerEvents: 'auto' }}
                >
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight drop-shadow-lg text-center">
                    Pay via UPI ID
                  </h3>
                  
                  <div className="mb-6 relative z-30 space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/18 shadow-xl">
                      <p className="text-white/70 text-[11px] mb-2 text-center tracking-wide uppercase">UPI ID</p>
                      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                        <p className="text-white font-bold text-lg flex-1 text-center break-all px-2">
                          {paymentConfig.upi.id}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            copyUpiId(paymentConfig.upi.id)
                          }}
                          className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2.5 px-5 rounded-xl border border-white/30 transition-all cursor-pointer flex items-center gap-2"
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                          aria-label="Copy UPI ID"
                        >
                          {upiIdCopied ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span className="text-sm">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="text-sm">Copy</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-white/75 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Open any UPI app (GPay, PhonePe, Paytm, BHIM).</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Choose “Pay to UPI ID” and paste the ID.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Enter amount and complete the payment.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setPaymentModalOpen(false)
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all cursor-pointer"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bank Transfer Modal */}
          <AnimatePresence>
            {bankTransferModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 rounded-[28px] flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(31, 182, 217, 0.95) 0%, rgba(14, 116, 144, 0.95) 50%, rgba(17, 19, 21, 0.98) 100%)',
                  backdropFilter: 'blur(10px)',
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setBankTransferModalOpen(false)
                  }
                }}
              >
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-[28px]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-full max-w-sm px-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-2xl font-black text-white mb-6 tracking-tight drop-shadow-lg text-center">
                    Bank Details
                  </h3>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4 space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-white/60 text-[10px] mb-0.5">Account Holder</p>
                          <p className="text-white font-semibold text-sm">{paymentConfig.bank.accountHolder}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleCopyAccountHolder}
                          className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                          aria-label="Copy Account Holder Name"
                        >
                          {accountHolderCopied ? (
                            <Check className="w-4 h-4 text-blue-300" />
                          ) : (
                            <Copy className="w-4 h-4 text-white" />
                          )}
                        </motion.button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-white/60 text-[10px] mb-0.5">Bank Name</p>
                          <p className="text-white font-semibold text-sm">{paymentConfig.bank.bankName}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleCopyBankName}
                          className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                          aria-label="Copy Bank Name"
                        >
                          {bankNameCopied ? (
                            <Check className="w-4 h-4 text-blue-300" />
                          ) : (
                            <Copy className="w-4 h-4 text-white" />
                          )}
                        </motion.button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-white/60 text-[10px] mb-0.5">Account Number</p>
                          <p className="text-white font-bold text-base tracking-wide">{paymentConfig.bank.accountNumberMasked}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleCopyAccountNumber}
                          className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                          aria-label="Copy Account Number"
                        >
                          {accountNumberCopied ? (
                            <Check className="w-4 h-4 text-blue-300" />
                          ) : (
                            <Copy className="w-4 h-4 text-white" />
                          )}
                        </motion.button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-white/60 text-[10px] mb-0.5">IFSC Code</p>
                          <p className="text-white font-bold text-base tracking-wide">{paymentConfig.bank.ifsc}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleCopyIFSC}
                          className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                          aria-label="Copy IFSC Code"
                        >
                          {ifscCopied ? (
                            <Check className="w-4 h-4 text-blue-300" />
                          ) : (
                            <Copy className="w-4 h-4 text-white" />
                          )}
                        </motion.button>
                      </div>

                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBankTransferModalOpen(false)}
                    className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span className="pointer-events-none">Close</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanner Modal */}
          <AnimatePresence>
            {scannerModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 rounded-[28px] flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(31, 182, 217, 0.95) 0%, rgba(14, 116, 144, 0.95) 50%, rgba(17, 19, 21, 0.98) 100%)',
                  backdropFilter: 'blur(10px)',
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setScannerModalOpen(false)
                  }
                }}
              >
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-[28px]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-50 w-full max-w-sm px-4 py-3 flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                  style={{ pointerEvents: 'auto', maxHeight: '90vh', overflowY: 'auto' }}
                >
                  <h3 className="text-xl font-black text-white mb-3 tracking-tight drop-shadow-lg text-center">
                    Scan to Pay
                  </h3>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-3">
                    <div className="flex justify-center mb-2">
                      <Image
                        src={paymentConfig.qrCode}
                        alt="Payment QR Code"
                        width={280}
                        height={280}
                        className="w-full max-w-[280px] h-auto object-contain rounded-lg"
                        priority
                        quality={100}
                        unoptimized
                      />
                    </div>
                    <p className="text-white/80 text-xs text-center">
                      Open your payment app and scan this code to make a payment
                    </p>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDownloadQR()
                    }}
                    className="w-full bg-white hover:bg-gray-50 font-bold py-2.5 px-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer relative z-30 touch-manipulation border-[1.5px] mb-2"
                    style={{ 
                      WebkitTapHighlightColor: 'transparent',
                      borderColor: 'rgba(31, 182, 217, 0.35)',
                      color: '#0E7490',
                      boxShadow: '0 2px 8px rgba(14, 116, 144, 0.08)'
                    }}
                    aria-label="Download QR Code"
                  >
                    <Download className="w-4 h-4" style={{ color: '#1FB6D9' }} />
                    <span className="text-sm">Download QR Code</span>
                  </motion.button>

                  {canShare && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleShareQR()
                      }}
                      className="w-full bg-white hover:bg-gray-50 font-bold py-2.5 px-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer relative z-30 touch-manipulation border-[1.5px] mb-2"
                      style={{ 
                        WebkitTapHighlightColor: 'transparent',
                        borderColor: 'rgba(31, 182, 217, 0.35)',
                        color: '#0E7490',
                        boxShadow: '0 2px 8px rgba(14, 116, 144, 0.08)'
                      }}
                      aria-label="Share QR Code"
                    >
                      <Share2 className="w-4 h-4" style={{ color: '#1FB6D9' }} />
                      <span className="text-sm">Share QR Code</span>
                    </motion.button>
                  )}

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setScannerModalOpen(false)
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer relative z-30 touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    aria-label="Close Scanner"
                  >
                    <span className="text-sm">Close</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
    </div>
  )
}
