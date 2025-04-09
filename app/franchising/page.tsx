"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle, TrendingUp, Users, DollarSign, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FranchisingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    investment: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.investment) {
      newErrors.investment = "Investment range is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, you would send this data to your server
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In production, you would use a server action or API route to send an email
      console.log("Form submitted:", formData)

      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        investment: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ form: "There was an error submitting your inquiry. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="fran.jpeg"
            alt="GoCleeny Franchising"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Own a GoCleeny Franchise</h1>
          <p className="text-xl text-white/90 max-w-[800px] mt-4">
            Join the eco-friendly cleaning revolution and build a successful business
          </p>
        </div>
      </section>

      {/* Why Franchise With Us */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Why Franchise With GoCleeny?</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">
              Join a growing brand with a proven business model and comprehensive support
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growing Industry</h3>
              <p className="text-gray-600">
                The eco-friendly cleaning industry is experiencing rapid growth as more consumers prioritize
                sustainability.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Training</h3>
              <p className="text-gray-600">
                Receive thorough training on our eco-friendly cleaning methods, business operations, and marketing
                strategies.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Business Model</h3>
              <p className="text-gray-600">
                Benefit from our established business model with recurring revenue streams and high customer retention.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Brand Recognition</h3>
              <p className="text-gray-600">
                Leverage the GoCleeny brand and reputation for eco-friendly, high-quality cleaning services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Process */}
      <section className="py-16 bg-gray-50">
        
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">The Franchise Process</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">Your journey to owning a GoCleeny franchise</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-green-600 font-semibold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Initial Inquiry</h3>
                  <p className="text-gray-600">
                    Fill out our franchise inquiry form to express your interest. Our franchise development team will
                    contact you to discuss the opportunity in more detail.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Discovery Day</h3>
                  <p className="text-gray-600">
                    Attend a Discovery Day at our headquarters to meet the team, learn more about our business model,
                    and get a firsthand look at our operations.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-green-600 font-semibold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Application & Approval</h3>
                  <p className="text-gray-600">
                    Complete the franchise application and undergo our approval process. We'll evaluate your
                    qualifications, business experience, and financial capability.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-green-600 font-semibold">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Training & Setup</h3>
                  <p className="text-gray-600">
                    Once approved, you'll receive comprehensive training on our cleaning methods, business operations,
                    and marketing strategies. We'll also assist with location selection and setup.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-green-600 font-semibold">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Grand Opening</h3>
                  <p className="text-gray-600">
                    Launch your GoCleeny franchise with our marketing support and ongoing assistance to ensure a
                    successful start to your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Information */}
      <section className="py-16 bg-white">
        
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Investment Information</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">
              What you can expect to invest in a GoCleeny franchise
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Initial Investment</h3>
                  <p className="text-gray-600 mb-4">
                    The total initial investment for a GoCleeny franchise typically ranges from £25,000 to £50,000,
                    depending on your location and market size.
                  </p>
                  <p className="text-gray-600">
                    This includes the franchise fee, equipment, initial inventory, marketing, and working capital.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ongoing Fees</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Royalty Fee:</span>
                        <p className="text-gray-600">6% of gross monthly revenue</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Marketing Fee:</span>
                        <p className="text-gray-600">2% of gross monthly revenue</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Technology Fee:</span>
                        <p className="text-gray-600">£150 per month</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Inquiry Form */}
      <section className="py-16 bg-gray-50">
        {/*
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Interested in Owning a Franchise?</h2>
              <p className="text-gray-600">
                Fill out the form below to learn more about GoCleeny franchise opportunities
              </p>
            </div>

            {isSuccess ? (
              <Card>
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-2xl">Inquiry Submitted!</CardTitle>
                  <CardDescription className="text-center">
                    Thank you for your interest in GoCleeny franchising.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4">
                    We've received your inquiry and a member of our franchise development team will contact you at{" "}
                    {formData.email} within 2 business days.
                  </p>
                  <p>We look forward to discussing this exciting opportunity with you!</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => setIsSuccess(false)}>Submit Another Inquiry</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Franchise Inquiry</CardTitle>
                  <CardDescription>
                    Please provide your information to learn more about our franchise opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="location">Preferred Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="Enter your preferred franchise location"
                          value={formData.location}
                          onChange={handleChange}
                          className={errors.location ? "border-red-500" : ""}
                        />
                        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="investment">Available Investment</Label>
                        <select
                          id="investment"
                          name="investment"
                          value={formData.investment}
                          onChange={handleChange}
                          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.investment ? "border-red-500" : ""}`}
                        >
                          <option value="">Select investment range</option>
                          <option value="25k-50k">£25,000 - £50,000</option>
                          <option value="50k-75k">£50,000 - £75,000</option>
                          <option value="75k-100k">£75,000 - £100,000</option>
                          <option value="100k+">£100,000+</option>
                        </select>
                        {errors.investment && <p className="text-sm text-red-500">{errors.investment}</p>}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your business experience and why you're interested in a GoCleeny franchise"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>
                    </div>

                    {errors.form && (
                      <div className="bg-red-50 p-4 rounded-md">
                        <p className="text-sm text-red-500">{errors.form}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        */}
      </section>
    </main>
  )
}

