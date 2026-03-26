import Link from "next/link";

const footerDescription = [
  "<strong>Connect, Grow, Convert:</strong>",
  "Authentic Storytelling, Targeted Digital Campaigns, and Custom Web, AI & DevOps Solutions – Driving Measurable Growth for Your Brand."
];

export default function Footer() {
  return (
    <footer className="bg-background/80 border-t border-primary/30 pt-16 pb-8 w-full max-w-[100vw]">
      <div className="container mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-heading mb-4 text-primary">
              MOONS<span className="text-accent">OUT</span>
            </h3>
            <div className="text-muted-foreground mb-4 space-y-1">
              {footerDescription.map((line, index) => (
                <p 
                  key={index}
                  className="max-w-sm"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-body-lg font-subheading mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Creative Services", href: "/services/creative" },
                { name: "Labs & Tech", href: "/services/labs" },
                { name: "Projects", href: "/projects" },
                { name: "Our Team", href: "/our-team" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body-lg font-subheading mb-4 text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                Dayton, Ohio, USA
              </li>
              <li className="text-muted-foreground">team@moonsoutmedia.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/60 text-center">
          <p className="text-muted-foreground text-body-sm mb-2">
            © {new Date().getFullYear()} Moons Out Media. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 text-body-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
