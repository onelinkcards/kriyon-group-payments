# Kriyon Group Payment Card

Premium payment card interface for Kriyon Group Pvt. Ltd. Built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## Features

- **Secure Payment Gateway**: Multiple payment options (UPI, Bank Transfer, QR Code)
- **Premium UI**: Modern, trustworthy fintech design
- **Responsive**: Works seamlessly on all devices
- **Fast**: Optimized for performance

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3001`

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## Deployment

This project is configured for Vercel deployment. Simply connect your GitHub repository to Vercel and deploy.

### Vercel Configuration

- **Framework**: Next.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

## Project Structure

```
├── app/
│   ├── components/
│   │   └── PaymentCard.tsx    # Main payment card component
│   ├── config.ts              # Payment configuration
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── public/
│   ├── logos/                 # Logo assets
│   ├── gallery/               # Gallery images
│   └── kriyon-qr.png          # QR code image
└── package.json

```

## License

Private - Kriyon Group Pvt. Ltd.
