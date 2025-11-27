import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 1, 2025
            </p>
          </div>

          <Card className="shadow-md">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the Supplement Store website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials on Supplement Store's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Product Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to provide accurate product descriptions, images, and pricing information. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Pricing and Payment</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All prices are displayed in US Dollars (USD) unless otherwise indicated. We reserve the right to change prices at any time without prior notice. Payment must be made at the time of purchase using one of our accepted payment methods.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By placing an order, you agree to pay the price applicable for the product as of the time of your order. We reserve the right to cancel any order if we determine that the price was incorrectly displayed on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Shipping and Delivery</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We will make every effort to deliver products within the estimated delivery times. However, delivery times are estimates only and cannot be guaranteed. We are not liable for any delays in delivery caused by:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Force majeure events</li>
                  <li>Incorrect delivery address provided by the customer</li>
                  <li>Unforeseen circumstances beyond our control</li>
                  <li>Customs delays for international orders</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Returns and Refunds</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We accept returns within 30 days of purchase, provided that:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>The product is unopened and in its original packaging</li>
                  <li>The product is in the same condition as when received</li>
                  <li>You have a valid proof of purchase</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Refunds will be processed to the original payment method within 5-10 business days after we receive and inspect the returned product. Shipping costs are non-refundable unless the product is defective or we made an error.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Health and Safety</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our supplements are intended for healthy adults. Before using any supplement, you should:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Consult with a healthcare professional</li>
                  <li>Read all product labels and warnings</li>
                  <li>Follow recommended dosages</li>
                  <li>Discontinue use if you experience any adverse reactions</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We are not responsible for any health issues that may arise from the use of our products. These statements have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, logos, images, and software, is the property of Supplement Store or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, Supplement Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our website or products.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of New York.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms & Conditions, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> legal@supplementstore.com<br />
                    <strong>Phone:</strong> +1 (234) 567-8900<br />
                    <strong>Address:</strong> 123 Fitness Street, Suite 456, New York, NY 10001
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

