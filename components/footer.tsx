import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-cyberpunk-blue/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-cyberpunk-blue">
              MOONS<span className="text-cyberpunk-pink">OUT</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Cutting-edge creative agency specializing in documentary-style content creation, authentic storytelling,
              targeted digital ad campaigns, and social media marketing.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "Portfolio", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link === "Home" ? "" : link.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-300 hover:text-cyberpunk-blue transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-gray-300">123 Creative Ave, Digital City, DC 10101</li>
              <li className="text-gray-300">(555) 123-4567</li>
              <li className="text-gray-300">hello@moonsoutmedia.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Moons Out Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

