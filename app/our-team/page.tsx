"use client";

import TeamSection from "@/components/about/team-section";

import CallToAction from "@/components/call-to-action";
export default function OurTeamPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <div className="relative z-10 pt-16">
        <TeamSection />
        <CallToAction heightPercentage={50} />
      </div>
    </div>
  );
}
