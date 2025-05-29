
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Driving Schoool',
  description: 'Created by Dev team',
  generator: 'dev work',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// import { AuthProvider } from "@/context/AuthContext"
// import "./globals.css"

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>{children}</AuthProvider>
//       </body>
//     </html>
//   )
// }
