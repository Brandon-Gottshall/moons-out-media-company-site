"use client";

import TeamSection from "@/components/about/team-section";

import CallToAction from "@/components/call-to-action";
export default function OurTeamPage() {
  return (
    <div className="relative overflow-x-hidden bg-black">
      {/* Radial gradient effect at top center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(0,204,255,0.15)_0%,transparent_50%)] pointer-events-none" />

      {/* Content positioned above the background effect */}
      <div className="relative z-10 pt-16">
        <TeamSection />
        <CallToAction heightPercentage={50} />
      </div>
    </div>
  );
}
