"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingService } from "@/services/booking-service"
import type { BookingFormData } from "@/types/booking"

export default function BookingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    date: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user selects
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

    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.date = "Please select a future date"
      }
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
      const bookingService = new BookingService()
      await bookingService.createBooking(formData)

      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        date: "",
        notes: "",
      })

      // Redirect after a delay
      setTimeout(() => {
        router.push("/my-bookings")
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ form: "There was an error submitting your booking. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="container px-4 md:px-6 py-16 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mx-auto mb-4 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl">Booking Successful!</CardTitle>
            <CardDescription className="text-center">
              Thank you for choosing GoCleeny. We've received your booking request.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">We'll send a confirmation email to {formData.email} shortly with all the details.</p>
            <p>If you have any questions, please contact us at gocleeny@gmail.com.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/my-bookings")}>View My Bookings</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="booking.jpg"
            alt="Book a Cleaning"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Book a Cleaning Service</h1>
          <p className="text-xl text-white/90 max-w-[800px] mt-4">
            Fill out the form below to schedule your eco-friendly cleaning service
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Please provide your information to book a cleaning service</CardDescription>
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
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) => handleSelectChange(value, "serviceType")}
                      >
                        <SelectTrigger id="serviceType" className={errors.serviceType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home Cleaning</SelectItem>
                          <SelectItem value="office">Office Cleaning</SelectItem>
                          <SelectItem value="tenancy">End of Tenancy Cleaning</SelectItem>
                          <SelectItem value="airbnb">Airbnb & Holiday Let Cleaning</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.serviceType && <p className="text-sm text-red-500">{errors.serviceType}</p>}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <div className="relative">
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          className={errors.date ? "border-red-500" : ""}
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      </div>
                      {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Any special requirements or information we should know"
                        value={formData.notes}
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
                    {isSubmitting ? "Submitting..." : "Book Cleaning Service"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-medium">1</span>
                  </div>
                  <p>We'll review your booking request and check availability</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-medium">2</span>
                  </div>
                  <p>You'll receive a confirmation email with all the details</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-medium">3</span>
                  </div>
                  <p>Our cleaning team will arrive at the scheduled time</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-medium">4</span>
                  </div>
                  <p>Enjoy your clean, eco-friendly space!</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

