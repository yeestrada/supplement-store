import { ProviderHeader } from "@/components/ProviderHeader"
import { Footer } from "@/components/Footer"

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ProviderHeader />
      {children}
      <Footer />
    </div>
  )
}

