"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/data"
import { ProductImage } from "@/components/ProductImage"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const bestSellers = products.filter((p) => p.isBestSeller)

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bestSellers.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bestSellers.length) % bestSellers.length)
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
        <section className="container py-12">
          <h1 className="mb-8 text-center text-4xl font-bold">
            Best Selling Products
          </h1>
          <div className="relative mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {bestSellers.map((product) => (
                  <div key={product.id} className="min-w-full">
                    <Card>
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                            <ProductImage
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h2 className="mb-4 text-3xl font-bold">
                              {product.name}
                            </h2>
                            <p className="mb-4 text-muted-foreground">
                              {product.description}
                            </p>
                            <p className="mb-6 text-2xl font-bold text-primary">
                              ${product.price.toFixed(2)}
                            </p>
                            <Link href={`/products/${product.id}`}>
                              <Button>View Details</Button>
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
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="mt-4 flex justify-center space-x-2">
              {bestSellers.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentSlide ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="container py-12">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

