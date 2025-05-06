import ServiceHero from "@/components/services/service-hero"
import ServiceShowcase from "@/components/services/service-showcase"
import PainToGain from "@/components/pain-to-gain"
import ServiceProcess from "@/components/services/service-process"
import ServiceTestimonials from "@/components/services/service-testimonials"
import StoryMatchmaker from "@/components/story-matchmaker"
import CallToAction from "@/components/call-to-action"

export default function ServicesPage() {
  return (
    <div className="min-h-screen relative">
      {/* Global page styling elements */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 z-50 pointer-events-none"></div>

      {/* Cyberpunk grid overlay - very subtle */}
      <div
        className="fixed inset-0 z-40 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 204, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 204, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <ServiceHero />

      {/* Main Services Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,204,255,0.15)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">Our Services</h2>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg max-w-2xl mx-auto border border-gray-800/50">
              <p className="text-white text-lg leading-relaxed">
                We offer a comprehensive suite of creative services designed to tell your brand's story in the most
                authentic and impactful way.
              </p>
            </div>
          </div>

          <ServiceShowcase />
        </div>
      </section>

      {/* Transform Your Brand Section */}
      <section className="py-20 bg-gradient-to-b from-black/50 to-cyberpunk-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,105,180,0.15)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-pink-text">Transform Your Brand Story</h2>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg max-w-2xl mx-auto border border-gray-800/50">
              <p className="text-white text-lg leading-relaxed">
                See how we turn common marketing challenges into powerful brand narratives that connect with your
                audience.
              </p>
            </div>
          </div>

          <PainToGain />
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(106,90,205,0.15)_0%,transparent_70%)]"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-green-text">Our Process</h2>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg max-w-2xl mx-auto border border-gray-800/50">
              <p className="text-white text-lg leading-relaxed">
                We follow a proven methodology to ensure your project delivers exceptional results.
              </p>
            </div>
          </div>

          <ServiceProcess />
        </div>
      </section>

      {/* Client Success Stories Section */}
      <section className="py-20 bg-gradient-to-b from-black/50 to-cyberpunk-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,127,0.1)_0%,transparent_70%)]"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">Client Success Stories</h2>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg max-w-2xl mx-auto border border-gray-800/50">
              <p className="text-white text-lg leading-relaxed">
                Don't just take our word for it. See what our clients have to say about working with Moons Out Media.
              </p>
            </div>
          </div>

          <ServiceTestimonials />
        </div>
      </section>

      {/* Find Your Perfect Story Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,105,180,0.1)_0%,transparent_70%)]"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-pink-text">Find Your Perfect Story</h2>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg max-w-2xl mx-auto border border-gray-800/50">
              <p className="text-white text-lg leading-relaxed">
                Take our quick quiz to discover which storytelling approach will best elevate your brand.
              </p>
            </div>
          </div>

          <StoryMatchmaker />
        </div>
      </section>

      <CallToAction />
    </div>
  )
}

