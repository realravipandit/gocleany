import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold text-white">GoCleeny</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Eco-friendly cleaning services for homes and businesses. We care for your space and the planet.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/share/12Gnkf7nxxi/?mibextid=wwXIfr" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-white transition-colors">
                  Book a Cleaning
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#home" className="text-gray-400 hover:text-white transition-colors">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services#office" className="text-gray-400 hover:text-white transition-colors">
                  Office Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services#tenancy" className="text-gray-400 hover:text-white transition-colors">
                  End of Tenancy Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services#airbnb" className="text-gray-400 hover:text-white transition-colors">
                  Airbnb & Holiday Let Cleaning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-green-400 mt-0.5" />
                <span className="text-gray-400">info@gocleeny.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-400 mt-0.5" />
                <span className="text-gray-400">+44 123 456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5" />
                <span className="text-gray-400">
                Darwin Street, Bolton, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} GoCleeny. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

