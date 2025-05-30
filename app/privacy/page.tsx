import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Moons Out Media",
  description: "Privacy Policy for Moons Out Media - Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-heading my-8 text-cyberpunk-blue">
            Privacy Policy
          </h1>
          
          <p className="text-body-lg mb-8 text-gray-300">
            <strong>Last Updated: May 24, 2025</strong>
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <p>
              Moons Out Media (&quot;<strong>Moons Out</strong>,&quot; &quot;<strong>we</strong>,&quot; &quot;<strong>us</strong>,&quot; or &quot;<strong>our</strong>&quot;) respects your privacy. This Policy explains how we collect, use, share, and safeguard personal information when you visit <strong>moonsoutmedia.com</strong> (the &quot;<strong>Site</strong>&quot;) or engage our services. It also describes the choices you have about your information.
            </p>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">1. Scope</h2>
              <p>This Policy applies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Site and any pages that link to it.</li>
                <li>Emails and other communications we send in direct response to your requests or in the course of providing services.</li>
                <li>Client invoicing, asset‑upload, and project‑management portals that link back to this Policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">2. Information We Collect</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-600 mb-4">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-600 p-3 text-left text-cyberpunk-blue">Category</th>
                      <th className="border border-gray-600 p-3 text-left text-cyberpunk-blue">What It Includes</th>
                      <th className="border border-gray-600 p-3 text-left text-cyberpunk-blue">How We Collect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-3 font-subheading">Contact details</td>
                      <td className="border border-gray-600 p-3">Name, email, phone, company, message content</td>
                      <td className="border border-gray-600 p-3">When you submit a contact form or email us</td>
                    </tr>
                    <tr className="bg-gray-800/50">
                      <td className="border border-gray-600 p-3 font-subheading">Billing & project data</td>
                      <td className="border border-gray-600 p-3">Billing address, invoice IDs, payment status, project specifications, <em>client‑supplied media assets (e.g., video clips, images)</em></td>
                      <td className="border border-gray-600 p-3">When you become a client or request a quote</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-subheading">Technical/usage data</td>
                      <td className="border border-gray-600 p-3">IP address (anonymized in GA4), browser type, device ID, pages visited, timestamps</td>
                      <td className="border border-gray-600 p-3">Automatically via first‑party cookies, server logs, Google Analytics 4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-cyberpunk-blue/30">
                <p><strong>We do not</strong> collect sensitive data (SSN, health, precise geolocation); knowingly collect data from children under 13; or run cross‑site behavioral advertising cookies.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">3. How We Use Information</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Respond to inquiries</strong> and provide quotes.</li>
                <li><strong>Deliver and manage projects,</strong> including storing project assets and sending invoices/status updates (contract performance).</li>
                <li><strong>Operate and secure</strong> the Site, troubleshoot, and analyze aggregated traffic (our legitimate interest to improve).</li>
                <li><strong>Track basic engagement metrics</strong> (e.g., email open rates) in Apollo or similar tools to evaluate outreach effectiveness (legitimate interest).</li>
                <li><strong>One‑to‑one business outreach</strong> relevant to your role; every message contains an opt‑out (legitimate interest).</li>
                <li><strong>Comply with law</strong> and enforce our agreements.</li>
              </ol>
              <p className="mt-4">We do <strong>not</strong> use automated decision‑making that produces legal or similarly significant effects.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">4. Legal Bases for Future International Compliance</h2>
              <p>If we process data of individuals in the European Economic Area, our lawful bases will be <strong>Contract</strong>, <strong>Legitimate Interests</strong> (balanced with your rights), or <strong>Consent</strong> (for marketing).</p>
              <p>For Canadian recipients we will obtain <strong>express consent</strong> before sending commercial electronic messages per CASL.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">5. Sharing & Disclosure</h2>
              <p>We do <strong>not</strong> sell or share personal information for monetary value or for cross‑context behavioral advertising and <strong>have not done so in the past 12 months</strong>.</p>
              
              <p className="mt-4">We share information only with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Affiliates</strong> – <em>Moons Out Labs, LLC operates under this same Privacy Policy and accesses data solely for internal administration.</em></li>
                <li><strong>Service providers</strong> contractually bound to use data only on our behalf:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Amazon Web Services (SES) – email delivery</li>
                    <li>Google Workspace / Gmail – day‑to‑day email</li>
                    <li>Apollo – lead sourcing / email‑template management</li>
                    <li>Stripe / QuickBooks – invoicing & payment processing</li>
                  </ul>
                </li>
                <li><strong>Professional advisers</strong> (lawyers, accountants) under confidentiality.</li>
                <li><strong>Authorities</strong> when required by law or to protect rights and safety.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">6. Cookies & Tracking</h2>
              <p>We use first‑party cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Keep the Site secure and remember preferences.</li>
                <li>Compile anonymized analytics about pages visited. Google Analytics 4 is configured to anonymize IP addresses where feasible.</li>
              </ul>
              
              <p className="mt-4">Aside from our analytics provider, <strong>we do not authorize third parties to collect personally identifiable information about your online activities over time and across other websites</strong> when you use our Site.</p>
              
              <p className="mt-4"><strong>Do Not Track (DNT):</strong> Because no common industry standard exists, the Site currently does not respond to DNT signals. You can control cookies via your browser settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">7. Your Choices & Rights</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Email opt‑out:</strong> Every outreach email contains a clear unsubscribe option. You may also email <a href="mailto:privacy@moonsoutmedia.com" className="text-cyberpunk-blue hover:text-cyberpunk-pink transition-colors">privacy@moonsoutmedia.com</a> with &quot;unsubscribe.&quot; Requests are honored within 10 business days and the address is placed on our suppression list.</li>
                <li><strong>Access, correct, or delete:</strong> Contact us (email or <a href="/contact" className="text-cyberpunk-blue hover:text-cyberpunk-pink transition-colors">request form</a>) and we will respond to verifiable requests as required by applicable U.S. law.</li>
                <li><strong>Cookies:</strong> Use your browser controls to block or delete cookies at any time.</li>
              </ul>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-cyberpunk-blue/30 mt-4">
                <p>Exercising any of these rights will <strong>not</strong> result in discriminatory treatment.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">8. Data Security</h2>
              <p>We implement reasonable administrative, technical, and physical safeguards, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>HTTPS encryption across the Site</li>
                <li>Multi‑factor authentication and least‑privilege access for internal systems</li>
                <li>Annual security and permission reviews</li>
                <li>Trusted cloud providers (AWS, Google) that meet industry standards</li>
              </ul>
              <p className="mt-4">No system is 100% secure, but we routinely review and improve our safeguards.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">9. Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact inquiries:</strong> retained up to 2 years after last interaction.</li>
                <li><strong>Client records & invoices:</strong> retained at least 7 years <em>(IRS record‑keeping requirement).</em></li>
                <li><strong>Analytics logs:</strong> anonymized or deleted within 24 months.</li>
              </ul>
              <p className="mt-4">We dispose of data securely when no longer needed or upon valid deletion request, subject to legal holds.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">10. Children&apos;s Privacy</h2>
              <p>Our services are <strong>not directed to children under 13</strong>, and we do not knowingly collect their personal information. If you believe a child has provided us data, please contact us; we will delete it promptly.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">11. Changes to This Policy</h2>
              <p>We may update this Policy periodically. The &quot;Last Updated&quot; date reflects the latest revision. Material changes will be announced on the Site or, if appropriate, by email.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-cyberpunk-pink">12. Contact Us</h2>
              <div className="bg-gray-800 p-4 rounded-lg border border-cyberpunk-blue/30">
                <p><strong>Moons Out Media</strong><br />
                United States Corporation Agents, Inc.<br />
                1991 Crocker Road #600‑755<br />
                Westlake, OH 44145<br />
                Email: <a href="mailto:team@moonsoutmedia.com" className="text-cyberpunk-blue hover:text-cyberpunk-pink transition-colors">team@moonsoutmedia.com</a><br />
                Phone: <strong>(937) 451‑0042</strong></p>
              </div>
            </section>

            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600 mt-8 text-body-sm italic">
              <p><em>(Internal note: International expansion steps—GDPR rights, SCCs, CASL opt‑ins, DPO designation—are tracked in our compliance roadmap and will be added directly to this public Policy when applicable.)</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
