import { Inter } from 'next/font/google'
import './styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Mo's  Express GP Services",
  description: 'Your trusted shipping partner',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add Font Awesome for social media icons */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}