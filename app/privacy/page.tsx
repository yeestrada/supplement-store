import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 1, 2025
            </p>
          </div>

          <Card className="shadow-md">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Supplement Store ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect information about you in a variety of ways. The information we may collect on the site includes:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Data</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the site or when you choose to participate in various activities related to the site, such as online chat and message boards.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Payment Data</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the site.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Derivative Data</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the site.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mobile Device Data</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the site from a mobile device.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Use of Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Create and manage your account</li>
                  <li>Process your transactions and send you related information</li>
                  <li>Email you regarding your account or order</li>
                  <li>Fulfill and manage purchases, orders, payments, and other transactions</li>
                  <li>Generate a personal profile about you to make future visits more personalized</li>
                  <li>Increase the efficiency and operation of the site</li>
                  <li>Monitor and analyze usage and trends to improve your experience</li>
                  <li>Notify you of updates to the site</li>
                  <li>Perform other business activities as needed</li>
                  <li>Request feedback and contact you about your use of the site</li>
                  <li>Resolve disputes and troubleshoot problems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Disclosure of Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">By Law or to Protect Rights</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Third-Party Service Providers</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Business Transfers</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Affiliates</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Security of Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Policy for Children</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not knowingly solicit information from or market to children under the age of 18. If we learn that we have collected personal information from a child under age 18 without verification of parental consent, we will delete that information as quickly as possible. If you become aware of any data we have collected from children under age 18, please contact us using the contact information provided below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>The right to access – You have the right to request copies of your personal data</li>
                  <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate</li>
                  <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions</li>
                  <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data</li>
                  <li>The right to object to processing – You have the right to object to our processing of your personal data</li>
                  <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may use cookies, web beacons, tracking pixels, and other tracking technologies on the site to help customize the site and improve your experience. When you access the site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the site.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We may use cookies for various purposes, including to remember your preferences, understand how you use our site, and improve your experience. You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Third-Party Websites</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices of the third party responsible for that website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> privacy@supplementstore.com<br />
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

