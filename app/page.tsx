"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/data"
import { ProductImage } from "@/components/ProductImage"
import { ChevronLeft, ChevronRight, Mail, Phone, MapPin, Clock, Send, Truck, Package, Globe, Shield } from "lucide-react"
import { useState } from "react"

const bestSellers = products.filter((p) => p.isBestSeller)

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bestSellers.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bestSellers.length) % bestSellers.length)
  }

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactFormData({ ...contactFormData, [e.target.name]: e.target.value })
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setContactFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  const faqs = [
    {
      question: "How should I take supplements?",
      answer: "Most of our supplements should be taken with water or your preferred beverage. For proteins, we recommend taking them after workouts. Check the specific instructions on each product.",
    },
    {
      question: "Are the products safe?",
      answer: "Yes, all our products are manufactured following strict quality standards and are certified. We only work with trusted suppliers and conduct regular quality tests.",
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping time depends on your location. Generally, orders are processed within 1-2 business days and shipping takes 3-7 business days. We offer express shipping for urgent orders.",
    },
    {
      question: "Can I return a product?",
      answer: "Yes, we accept returns within 30 days of purchase, as long as the product is unopened and in its original packaging. Check our return policy for more details.",
    },
    {
      question: "Do you offer discounts for bulk purchases?",
      answer: "Yes, we offer special discounts for bulk purchases. Contact our sales team for more information about pricing and special conditions.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16">
          <div className="text-center mb-12">
            <h1 className="mb-4 text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Best Selling Products
            </h1>
            <p className="text-muted-foreground text-lg">Discover our most popular supplements</p>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {bestSellers.map((product) => (
                  <div key={product.id} className="min-w-full">
                    <Card className="border-0 shadow-none rounded-none">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
                          <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                            <ProductImage
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-background to-muted/30">
                            <h2 className="mb-4 text-4xl font-bold">
                              {product.name}
                            </h2>
                            <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
                              {product.description}
                            </p>
                            <p className="mb-8 text-4xl font-bold text-primary">
                              ${product.price.toFixed(2)}
                            </p>
                            <Link href={`/products/${product.id}`}>
                              <Button size="lg" className="w-full md:w-auto">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="mt-6 flex justify-center space-x-2">
              {bestSellers.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    index === currentSlide 
                      ? "bg-primary w-8 shadow-lg" 
                      : "bg-muted hover:bg-primary/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="shipping" className="container py-16 bg-muted/30 rounded-3xl my-12 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-4xl font-bold">
                Shipping Information
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to know about our shipping policies and delivery options
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Standard Shipping</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Free shipping on orders over $50. Delivery within 5-7 business days.
                  </p>
                  <p className="text-sm font-semibold text-primary">$5.99 for orders under $50</p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Express Shipping</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Fast delivery within 2-3 business days. Perfect for urgent orders.
                  </p>
                  <p className="text-sm font-semibold text-primary">$14.99</p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">International Shipping</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Worldwide delivery available. Shipping times vary by location.
                  </p>
                  <p className="text-sm font-semibold text-primary">Starting at $24.99</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Truck className="h-6 w-6 text-primary" />
                    Shipping Times
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Processing Time</h4>
                    <p className="text-sm text-muted-foreground">
                      Orders are typically processed within 1-2 business days. Orders placed after 2 PM EST will be processed the next business day.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Time</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Standard: 5-7 business days</li>
                      <li>• Express: 2-3 business days</li>
                      <li>• International: 7-21 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Holiday Delays</h4>
                    <p className="text-sm text-muted-foreground">
                      During peak seasons and holidays, delivery times may be extended. We'll notify you if there are any delays.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    Shipping Policies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Order Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Once your order ships, you'll receive a tracking number via email. You can track your package in real-time through our tracking system.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p className="text-sm text-muted-foreground">
                      Please ensure your shipping address is correct. We're not responsible for packages delivered to incorrect addresses provided by customers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Undeliverable Packages</h4>
                    <p className="text-sm text-muted-foreground">
                      If a package is returned to us due to an incorrect address or failure to claim, additional shipping fees may apply for reshipment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Free Shipping on Orders Over $50</h3>
                  <p className="text-muted-foreground mb-6">
                    Add more items to your cart to qualify for free standard shipping!
                  </p>
                  <Link href="/products">
                    <Button size="lg">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="faq" className="container py-16 bg-muted/30 rounded-3xl my-12 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-4xl font-bold">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg">Everything you need to know</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 hover:bg-background/50 transition-colors">
                  <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="contact" className="container py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-4xl font-bold">
              Contact Us
            </h2>
            <p className="text-muted-foreground text-lg">
              We'd love to hear from you. Get in touch with us!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-sm text-muted-foreground">
                        123 Fitness Street<br />
                        Suite 456<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                          +1 (234) 567-8900
                        </a>
                        <br />
                        <a href="tel:+1234567891" className="hover:text-primary transition-colors">
                          +1 (234) 567-8901
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        <a href="mailto:info@supplementstore.com" className="hover:text-primary transition-colors">
                          info@supplementstore.com
                        </a>
                        <br />
                        <a href="mailto:support@supplementstore.com" className="hover:text-primary transition-colors">
                          support@supplementstore.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <Send className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                          <Label htmlFor="contact-name">Full Name *</Label>
                          <Input
                            id="contact-name"
                            name="name"
                            value={contactFormData.name}
                            onChange={handleContactChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact-email">Email Address *</Label>
                          <Input
                            id="contact-email"
                            name="email"
                            type="email"
                            value={contactFormData.email}
                            onChange={handleContactChange}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                          <Label htmlFor="contact-phone">Phone Number</Label>
                          <Input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            value={contactFormData.phone}
                            onChange={handleContactChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact-subject">Subject *</Label>
                          <Input
                            id="contact-subject"
                            name="subject"
                            value={contactFormData.subject}
                            onChange={handleContactChange}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="contact-message">Message *</Label>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={contactFormData.message}
                          onChange={handleContactChange}
                          required
                          rows={6}
                          className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

