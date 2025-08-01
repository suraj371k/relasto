import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Scale, Shield, Users, FileText, AlertTriangle, Mail } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Terms of Service</h1>
              <p className="text-muted-foreground mt-1">Last updated: January 1, 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Welcome to Our Real Estate Platform
              </CardTitle>
              <CardDescription>
                Please read these Terms of Service carefully before using our real estate listing platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                By accessing or using our website and services, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                using or accessing this site.
              </p>
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="#acceptance"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Scale className="h-4 w-4" />
                  Acceptance of Terms
                </Link>
                <Link href="#services" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Shield className="h-4 w-4" />
                  Description of Services
                </Link>
                <Link
                  href="#user-accounts"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Users className="h-4 w-4" />
                  User Accounts
                </Link>
                <Link
                  href="#prohibited"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Prohibited Uses
                </Link>
                <Link href="#privacy" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </Link>
                <Link href="#contact" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <section id="acceptance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    1. Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    By accessing and using this real estate listing website, you accept and agree to be bound by the
                    terms and provision of this agreement.
                  </p>
                  <p className="text-sm">
                    These Terms of Service apply to all users of the site, including without limitation users who are
                    browsers, vendors, customers, merchants, and/or contributors of content.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Description of Services */}
            <section id="services">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    2. Description of Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">Our platform provides real estate listing services including:</p>
                  <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                    <li>Property search and browsing capabilities</li>
                    <li>Property listing creation and management for authorized agents</li>
                    <li>Contact facilitation between buyers and sellers/agents</li>
                    <li>Market information and property details</li>
                    <li>User account management and saved searches</li>
                  </ul>
                  <p className="text-sm">
                    We reserve the right to modify, suspend, or discontinue any aspect of our services at any time
                    without notice.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* User Accounts */}
            <section id="user-accounts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    3. User Accounts and Registration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Account Creation</h4>
                    <p className="text-sm">
                      To access certain features, you may be required to create an account. You must provide accurate,
                      current, and complete information during registration.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Account Security</h4>
                    <p className="text-sm">
                      You are responsible for maintaining the confidentiality of your account credentials and for all
                      activities that occur under your account.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Agent Verification</h4>
                    <p className="text-sm">
                      Real estate agents must provide valid licensing information and may be subject to verification
                      processes before listing properties.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Property Listings */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>4. Property Listings and Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Listing Accuracy</h4>
                    <p className="text-sm">
                      All property information must be accurate, current, and complete. Misleading or false information
                      is strictly prohibited.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Content Ownership</h4>
                    <p className="text-sm">
                      Users retain ownership of content they submit but grant us a license to use, display, and
                      distribute such content on our platform.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Content Standards</h4>
                    <p className="text-sm">
                      All content must comply with applicable laws and our community standards. We reserve the right to
                      remove any content that violates these terms.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Prohibited Uses */}
            <section id="prohibited">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    5. Prohibited Uses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">You may not use our platform for:</p>
                  <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                    <li>Any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>
                      Violating any international, federal, provincial, or state regulations, rules, laws, or local
                      ordinances
                    </li>
                    <li>
                      Infringing upon or violating our intellectual property rights or the intellectual property rights
                      of others
                    </li>
                    <li>
                      Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or
                      discriminating
                    </li>
                    <li>Submitting false or misleading information</li>
                    <li>Uploading or transmitting viruses or any other type of malicious code</li>
                    <li>Collecting or tracking the personal information of others</li>
                    <li>Spamming, phishing, pharming, pretexting, spidering, crawling, or scraping</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Disclaimers */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>6. Disclaimers and Limitations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Information Accuracy</h4>
                    <p className="text-sm">
                      While we strive to provide accurate information, we do not warrant the completeness, reliability,
                      or accuracy of property listings or market information.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Third-Party Content</h4>
                    <p className="text-sm">
                      We are not responsible for the content, accuracy, or opinions expressed in third-party listings or
                      communications facilitated through our platform.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Service Availability</h4>
                    <p className="text-sm">
                      We do not guarantee that our service will be uninterrupted, timely, secure, or error-free.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Privacy Policy */}
            <section id="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    7. Privacy Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
                    information when you use our services.
                  </p>
                  <p className="text-sm">
                    By using our service, you agree to the collection and use of information in accordance with our
                    Privacy Policy.
                  </p>
                  <Link href="/privacy" className="inline-flex items-center text-sm text-primary hover:underline">
                    Read our full Privacy Policy →
                  </Link>
                </CardContent>
              </Card>
            </section>

            {/* Modifications */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>8. Modifications to Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    We reserve the right to modify these Terms of Service at any time. Changes will be effective
                    immediately upon posting on this page.
                  </p>
                  <p className="text-sm">
                    Your continued use of the service after any changes constitutes acceptance of the new Terms of
                    Service.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Governing Law */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>9. Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    These Terms of Service and any separate agreements whereby we provide you services shall be governed
                    by and construed in accordance with the laws of [Your State/Country].
                  </p>
                  <p className="text-sm">
                    Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in
                    [Your Jurisdiction].
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Contact Information */}
            <section id="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    10. Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong> legal@yourrealestate.com
                    </p>
                    <p>
                      <strong>Phone:</strong> (555) 123-4567
                    </p>
                    <p>
                      <strong>Address:</strong> 123 Real Estate Ave, Suite 100, Your City, State 12345
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link href="/contact">
                      <Button variant="outline" size="sm">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <Separator className="my-8" />

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-4">These terms are effective as of January 1, 2025</p>
            <div className="flex justify-center gap-4">
              <Link href="/privacy" className="text-sm text-primary hover:underline">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-sm text-primary hover:underline">
                Contact Us
              </Link>
              <Link href="/" className="text-sm text-primary hover:underline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
