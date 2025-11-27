import Link from "next/link"
import { Store } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-l from-primary/20 via-primary/10 to-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Supplement Store</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted store for high-quality sports supplements. Premium products for your fitness journey.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors inline-block">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors inline-block">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Support</h4>
            <ul className="space-y-3 text-sm">
            <li>
                <Link href="/#shipping" className="text-muted-foreground hover:text-primary transition-colors inline-block">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors inline-block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors inline-block">
                  Contact Us
                </Link>
              </li>              
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors inline-block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors inline-block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 Supplement Store. All rights reserved.</p>
            <Link 
              href="/provider/orders" 
              className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              Provider Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

