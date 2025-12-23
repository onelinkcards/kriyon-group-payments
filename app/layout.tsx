import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kriyon Group Payment – Official Link',
  description: 'Pay Kriyon Group Pvt. Ltd. via Bank Transfer, QR Scanner, or UPI. Powered by OneLink.',
  openGraph: {
    title: 'Kriyon Group Payment – Official Link',
    description: 'Pay Kriyon Group Pvt. Ltd. via Bank Transfer, QR Scanner, or UPI. Powered by OneLink.',
    url: 'https://repixelx.com/onelink',
  },
  twitter: {
    title: 'Kriyon Group Payment – Official Link',
    description: 'Pay Kriyon Group Pvt. Ltd. via Bank Transfer, QR Scanner, or UPI. Powered by OneLink.',
    card: 'summary',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}

