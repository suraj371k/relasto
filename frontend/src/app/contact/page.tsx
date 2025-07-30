"use client"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { toast } from "react-hot-toast"
import axios from "axios"

interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>()

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await axios.post("/api/contact", {
        name: data.name,
        email: data.email,
        phoneNumber: data.subject, // subject maps to phoneNumber in backend
        message: data.message,
      })

      if (response.data.success) {
        toast.success("Message sent successfully!")
        reset()
      } else {
        toast.error("Something went wrong.")
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Server error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              Contact Us
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us. We'd love to hear from you and will respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ContactDetail icon={<Mail className="h-5 w-5 text-primary" />} title="Email" lines={["contact@company.com", "support@company.com"]} />
                <ContactDetail icon={<Phone className="h-5 w-5 text-primary" />} title="Phone" lines={["+1 (555) 123-4567", "+1 (555) 987-6543"]} />
                <ContactDetail
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  title="Address"
                  lines={["123 Business Street", "Suite 100", "City, State 12345"]}
                />
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <BusinessHour day="Monday - Friday" hours="9:00 AM - 6:00 PM" />
                <BusinessHour day="Saturday" hours="10:00 AM - 4:00 PM" />
                <BusinessHour day="Sunday" hours="Closed" />
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        {...register("name", { required: "Name is required" })}
                        className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                          },
                        })}
                        className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      {...register("subject", { required: "Subject is required" })}
                      className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    />
                    {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      {...register("message", { required: "Message is required" })}
                      className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable Components
const ContactDetail = ({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">{icon}</div>
    <div>
      <h3 className="font-medium text-slate-900 dark:text-slate-100">{title}</h3>
      {lines.map((line, idx) => (
        <p key={idx} className="text-sm text-slate-600 dark:text-slate-400">
          {line}
        </p>
      ))}
    </div>
  </div>
)

const BusinessHour = ({ day, hours }: { day: string; hours: string }) => (
  <div className="flex justify-between">
    <span>{day}</span>
    <span className="font-medium">{hours}</span>
  </div>
)

export default Contact
