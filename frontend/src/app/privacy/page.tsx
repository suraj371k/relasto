import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We collect information you provide when creating an account, listing properties, or contacting agents.
              This includes your name, email, phone number, and property preferences.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Connect you with real estate agents and property listings</li>
              <li>Send you relevant property recommendations and market updates</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We may share your information with licensed real estate agents, mortgage lenders, and service providers
              who help facilitate your property transactions. We never sell your personal information to third parties.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">Cookies & Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic.
              You can control cookie settings through your browser preferences.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your personal information. However, no method
              of transmission over the internet is 100% secure.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You have the right to access, update, or delete your personal information. You may also opt out of
              marketing communications at any time by contacting us or using the unsubscribe link in our emails.
            </p>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Last Updated:</strong> January 1, 2025
          </p>
          <p className="text-sm text-muted-foreground">
            Questions about this privacy policy? Contact us at{" "}
            <a href="mailto:privacy@yourrealestate.com" className="text-primary hover:underline">
              privacy@yourrealestate.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
