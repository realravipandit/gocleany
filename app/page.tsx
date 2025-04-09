import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Leaf, Sparkles, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="home2.jpg"
            alt="Clean home environment"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Eco-Friendly Cleaning for a Spotless Home
          </h1>
          <p className="text-xl text-white/90 max-w-[800px]">
            Professional, sustainable cleaning services that care for your home and the planet.
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/booking" className="flex items-center gap-2">
              Book a Cleaning <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Welcome to GoCleeny</h2>
              <p className="text-gray-600 text-lg">
                At GoCleeny, we believe in providing exceptional cleaning services while protecting our environment. Our
                eco-friendly approach ensures your home is spotless without harmful chemicals.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>100% eco-friendly cleaning products</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Professional, vetted cleaning specialists</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Flexible scheduling to fit your lifestyle</p>
                </div>
              </div>
              <Button variant="outline" className="mt-4">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="home.png"
                alt="Eco-friendly cleaning"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">
              We offer a range of cleaning services tailored to your specific needs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Home Cleaning</h3>
              <p className="text-gray-600 mb-4">Regular cleaning services for a consistently clean home.</p>
              <p className="text-green-600 font-semibold">£15/hr</p>
              <p className="text-sm text-green-700 mt-1">20% off for first-time customers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Office Cleaning</h3>
              <p className="text-gray-600 mb-4">Professional cleaning for workspaces of all sizes.</p>
              <p className="text-blue-600 font-semibold">Custom Quote</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">End of Tenancy</h3>
              <p className="text-gray-600 mb-4">Deep cleaning when moving in or out of a property.</p>
              <p className="text-green-600 font-semibold">Custom Quote</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Airbnb & Holiday Let</h3>
              <p className="text-gray-600 mb-4">Specialized cleaning for rental properties.</p>
              <p className="text-blue-600 font-semibold">Custom Quote</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/services" className="flex items-center gap-2">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Cleaner, Greener Home?</h2>
          <p className="text-xl mb-8 max-w-[800px] mx-auto">
            Book your eco-friendly cleaning service today and enjoy a spotless home without harming the environment.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-green-600 hover:bg-gray-100">
            <Link href="/booking" className="flex items-center gap-2">
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

