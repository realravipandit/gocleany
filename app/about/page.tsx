import Image from "next/image"
import { Leaf, Recycle, Heart, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="about.jpeg"
            alt="About GoCleeny"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">About GoCleeny</h1>
          <p className="text-xl text-white/90 max-w-[800px] mt-4">
            Our mission, values, and commitment to eco-friendly cleaning
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="our story.jpeg" alt="Our story" fill className="object-cover" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <p className="text-gray-600">
                GoCleeny was founded with a simple yet powerful vision: to provide exceptional cleaning services while
                protecting our environment. We recognized the harmful effects of traditional cleaning products and
                decided to create a service that prioritizes both cleanliness and sustainability.
              </p>
              <p className="text-gray-600">
                Since our inception, we've been committed to using only eco-friendly, non-toxic cleaning products that
                are safe for your family, pets, and the planet. Our team of dedicated professionals shares our passion
                for environmental responsibility and delivering outstanding service.
              </p>
              <p className="text-gray-600">
                As a proud member of the SAMBIC Group, we leverage industry expertise and resources to continuously
                improve our services and expand our reach, bringing eco-friendly cleaning to more homes and businesses
                across the UK.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">
              The principles that guide everything we do at GoCleeny
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to using eco-friendly products and practices that minimize our environmental footprint.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on the quality of our service, ensuring every space we clean meets our high
                standards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty and transparency in all our interactions with clients and team members.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Recycle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek better, more sustainable ways to deliver exceptional cleaning services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        {/*
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Our Team</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">
              Meet the dedicated professionals behind GoCleeny's exceptional service
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-[300px]">
                  <Image
                    src={`/placeholder.svg?height=600&width=400&text=Team Member ${i}`}
                    alt={`Team member ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Team Member {i}</h3>
                  <p className="text-gray-500">Position</p>
                  <p className="text-gray-600 mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        */}
      </section>

      {/* SAMBIC Group Affiliation */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Our Affiliation</h2>
            <p className="text-gray-600 mt-4 max-w-[800px] mx-auto">Proud to be a part of the SAMBIC Group</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative h-[100px] w-[200px]">
                <Image
                  src="gologochruday.jpeg"
                  alt="SAMBIC Group logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-gray-600">
                  As a member of the SAMBIC Group, GoCleeny benefits from shared expertise, resources, and a commitment
                  to excellence. This affiliation allows us to continuously improve our services and expand our reach,
                  bringing eco-friendly cleaning to more homes and businesses across the UK.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

