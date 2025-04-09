"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
    resume: null as File | null,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }))
      // Clear error when user uploads file
      if (errors.resume) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.resume
          return newErrors
        })
      }
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

    if (!formData.position) {
      newErrors.position = "Please select a position"
    }

    if (!formData.experience) {
      newErrors.experience = "Please select your experience level"
    }

    if (!formData.resume) {
      newErrors.resume = "Please upload your resume"
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

      // In production, you would use a server action or API route to send an email with the resume attached
      console.log("Form submitted:", formData)

      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        message: "",
        resume: null,
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ form: "There was an error submitting your application. Please try again." })
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
            src="careers.jpg"
            alt="Careers at GoCleeny"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Join Our Team</h1>
          <p className="text-xl text-white/90 max-w-[800px] mt-4">
            Build a rewarding career with GoCleeny's eco-friendly cleaning service
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      {/*
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Why Join GoCleeny?</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">
              We offer competitive pay, flexible hours, and a supportive work environment
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Competitive Pay</h3>
              <p className="text-gray-600">
                We value our team members and offer above-market rates for all positions, with opportunities for bonuses
                and raises.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Flexible Hours</h3>
              <p className="text-gray-600">
                We understand the importance of work-life balance and offer flexible scheduling options to fit your
                lifestyle.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
              <p className="text-gray-600">
                Join a growing company with opportunities for advancement, training, and career development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Current Openings</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">
              We're looking for passionate individuals to join our team
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Cleaning Specialist</h3>
              <p className="text-gray-500 mb-4">Full-time / Part-time</p>
              <p className="text-gray-600 mb-4">
                Join our team of cleaning professionals to provide exceptional eco-friendly cleaning services to our
                clients.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Experience in cleaning services preferred</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Attention to detail and commitment to quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Reliable transportation required</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Team Lead</h3>
              <p className="text-gray-500 mb-4">Full-time</p>
              <p className="text-gray-600 mb-4">
                Lead a team of cleaning specialists and ensure the highest quality of service for our clients.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>2+ years of experience in cleaning services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Leadership skills and ability to train team members</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Excellent communication and problem-solving skills</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Customer Service Representative</h3>
              <p className="text-gray-500 mb-4">Full-time / Remote</p>
              <p className="text-gray-600 mb-4">
                Handle customer inquiries, schedule appointments, and ensure client satisfaction.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Previous customer service experience preferred</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Excellent communication and organizational skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Proficiency with scheduling software and CRM systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        {/*
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Apply Now</h2>
              <p className="text-gray-600">Fill out the form below to apply for a position at GoCleeny</p>
            </div>

            {isSuccess ? (
              <Card>
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-2xl">Application Submitted!</CardTitle>
                  <CardDescription className="text-center">
                    Thank you for your interest in joining the GoCleeny team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4">
                    We've received your application and will review it shortly. If your qualifications match our needs,
                    we'll contact you at {formData.email} to schedule an interview.
                  </p>
                  <p>We appreciate your interest in GoCleeny and wish you the best in your job search.</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => setIsSuccess(false)}>Submit Another Application</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Job Application</CardTitle>
                  <CardDescription>Please provide your information to apply for a position</CardDescription>
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
                        <Label htmlFor="position">Position</Label>
                        <Select
                          value={formData.position}
                          onValueChange={(value) => handleSelectChange(value, "position")}
                        >
                          <SelectTrigger id="position" className={errors.position ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select a position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cleaning-specialist">Cleaning Specialist</SelectItem>
                            <SelectItem value="team-lead">Team Lead</SelectItem>
                            <SelectItem value="customer-service">Customer Service Representative</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => handleSelectChange(value, "experience")}
                        >
                          <SelectTrigger id="experience" className={errors.experience ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level (0-1 years)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                            <SelectItem value="experienced">Experienced (3-5 years)</SelectItem>
                            <SelectItem value="senior">Senior (5+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="message">Why do you want to join GoCleeny?</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about yourself and why you're interested in this position"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="resume">Resume/CV</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="resume"
                            name="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className={`hidden ${errors.resume ? "border-red-500" : ""}`}
                          />
                          <div
                            className={`border rounded-md p-4 w-full flex items-center justify-center gap-2 cursor-pointer ${errors.resume ? "border-red-500" : ""}`}
                            onClick={() => document.getElementById("resume")?.click()}
                          >
                            <Upload className="h-5 w-5 text-gray-500" />
                            <span className="text-gray-500">
                              {formData.resume ? formData.resume.name : "Upload your resume (PDF, DOC, DOCX)"}
                            </span>
                          </div>
                        </div>
                        {errors.resume && <p className="text-sm text-red-500">{errors.resume}</p>}
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
                      {isSubmitting ? "Submitting..." : "Submit Application"}
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

