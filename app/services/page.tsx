import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Sparkles, Clock, Building, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="servicewe.jpeg"
            alt="Our Services"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Our Services</h1>
          <p className="text-xl text-white/90 max-w-[800px] mt-4">
            Professional eco-friendly cleaning services tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Introduction */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Eco-Friendly Cleaning Solutions</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">
              At GoCleeny, we offer a comprehensive range of cleaning services using only eco-friendly products and
              sustainable practices.
            </p>
          </div>
        </div>
      </section>

      {/* Home Cleaning */}
      <section id="home" className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Home Cleaning</h2>
              <p className="text-gray-600">
                Our regular home cleaning service ensures your living space remains spotless, healthy, and eco-friendly.
                Our trained professionals use non-toxic products that are safe for your family, pets, and the
                environment.
              </p>
              <div className="space-y-2 mt-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Thorough cleaning of all rooms and living spaces</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Dusting, vacuuming, and mopping of all surfaces</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Kitchen and bathroom deep cleaning</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Eco-friendly products that are safe for children and pets</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xl font-semibold text-green-600">£15/hr</p>
                <p className="text-green-700 font-medium">20% off for first-time customers</p>
              </div>
              <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                <Link href="/booking" className="flex items-center gap-2">
                  Book Home Cleaning <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="home3.jpeg"
                alt="Home cleaning service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Office Cleaning */}
      <section id="office" className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden md:order-first lg:order-last">
              <Image
                src="office.jpeg"
                alt="Office cleaning service"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Office Cleaning</h2>
              <p className="text-gray-600">
                Create a clean, healthy workspace for your team with our professional office cleaning services. We
                understand that a clean office environment boosts productivity and makes a positive impression on
                clients.
              </p>
              <div className="space-y-2 mt-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p>Cleaning of workstations, meeting rooms, and common areas</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p>Sanitization of high-touch surfaces</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p>Kitchen and bathroom cleaning</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p>Flexible scheduling to minimize disruption</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xl font-semibold text-blue-600">Custom Quote</p>
                <p className="text-blue-700">Based on office size and cleaning frequency</p>
              </div>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/contact" className="flex items-center gap-2">
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* End of Tenancy Cleaning */}
      <section id="tenancy" className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">End of Tenancy Cleaning</h2>
              <p className="text-gray-600">
                Moving in or out of a property? Our thorough end of tenancy cleaning service helps ensure you get your
                deposit back or start your tenancy in a pristine environment.
              </p>
              <div className="space-y-2 mt-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Deep cleaning of all rooms and spaces</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Oven and appliance cleaning</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Carpet and upholstery cleaning</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Window and blind cleaning</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xl font-semibold text-green-600">Custom Quote</p>
                <p className="text-green-700">Based on property size and condition</p>
              </div>
              <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                <Link href="/booking" className="flex items-center gap-2">
                  Book End of Tenancy Cleaning <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="endof.jpeg"
                alt="End of tenancy cleaning"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Airbnb & Holiday Let Cleaning */}
      <section id="airbnb" className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden md:order-first lg:order-last">
              <Image
                src="holeday.jpeg"
                alt="Airbnb cleaning service"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Airbnb & Holiday Let Cleaning</h2>
              <p className="text-gray-600">
                Maintain excellent reviews and happy guests with our specialized cleaning service for Airbnb and holiday
                rentals. We ensure your property is spotless and welcoming for every new guest.
              </p>
              <div className="space-y-2 mt-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p>Thorough cleaning between guest stays</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p>Fresh linens and towels service available</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p>Restocking of essentials</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p>Flexible scheduling to fit between bookings</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xl font-semibold text-blue-600">Custom Quote</p>
                <p className="text-blue-700">Based on property size and services required</p>
              </div>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/contact" className="flex items-center gap-2">
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Eco-Friendly Cleaning?</h2>
          <p className="text-xl mb-8 max-w-[800px] mx-auto">
            Book your service today and enjoy a cleaner, greener space with GoCleeny.
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

