import './globals.css'

export const metadata = {
  title: 'Photonic — Google Photos Desktop Client',
  description: 'Ultra-fast, privacy-conscious desktop client for Google Photos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden', backgroundColor: '#090A0F' }}>
        {children}
      </body>
    </html>
  )
}
