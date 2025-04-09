"use client"

import { useState } from "react"
import Link from "next/link"
import { Leaf, Menu, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold">GoCleeny</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
            About Us
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-green-600 transition-colors">
            Services
          </Link>
          <Link href="/booking" className="text-sm font-medium hover:text-green-600 transition-colors">
            Booking
          </Link>
          <Link href="/my-bookings" className="text-sm font-medium hover:text-green-600 transition-colors">
            My Bookings
          </Link>
          <Link href="/careers" className="text-sm font-medium hover:text-green-600 transition-colors">
            Careers
          </Link>
          <Link href="/franchising" className="text-sm font-medium hover:text-green-600 transition-colors">
            Franchising
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex gap-4">
          <Link href="/my-bookings">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              My Bookings
            </Button>
          </Link>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/booking">Book a Cleaning</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">GoCleeny</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container px-4 py-6 flex flex-col gap-4">
            <Link href="/" className="text-lg font-medium p-2 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/about" className="text-lg font-medium p-2 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
              About Us
            </Link>
            <Link
              href="/services"
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link href="/booking" className="text-lg font-medium p-2 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
              Booking
            </Link>
            <Link
              href="/my-bookings"
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              My Bookings
            </Link>
            <Link href="/careers" className="text-lg font-medium p-2 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
              Careers
            </Link>
            <Link
              href="/franchising"
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded-md"
              onClick={toggleMenu}
            >
              Franchising
            </Link>
            <Link href="/contact" className="text-lg font-medium p-2 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
              Contact
            </Link>
            <Button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white">
              <Link href="/booking" onClick={toggleMenu}>
                Book a Cleaning
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

