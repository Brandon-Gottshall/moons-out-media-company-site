import type { Service } from "@/app/types/services";

export const MASTER_SERVICES: Service[] = [
  {
    id: "digital-marketing",
    branch: "media",
    title: "Digital Marketing Campaigns",
    shortTitle: "Digital Marketing",
    description:
      "We develop targeted digital campaigns that combine compelling storytelling with data-driven strategies to drive measurable results for your business.",
    shortDescription: "Targeted digital ad campaigns that drive measurable results.",
    features: [
      "Social Media Campaigns",
      "Video Ad Series",
      "Conversion-Focused Content",
      "Performance Analytics",
      "A/B Testing & Optimization",
      "Google and Meta Ad Campaigns",
    ],
    image: "/images/digital-marketing.webp",
    caseStudyLink: "/projects/conversion-campaigns",
    color: "pink",
    icon: "📱",
  },
  {
    id: "brand-storytelling",
    branch: "media",
    title: "Brand Storytelling",
    // shortTitle can be omitted if title is suitable
    description:
      "We craft compelling narratives that connect with your audience on an emotional level. Our team of experienced storytellers will help you develop a brand voice that resonates with your target market and drives engagement.",
    shortDescription: "Authentic narratives that connect with your audience on a deeper level.",
    features: [
      "Brand Narrative Development",
      "Visual Identity Enhancement",
      "Messaging Strategy",
      "Audience Connection Mapping",
      "Emotional Engagement Tactics",
    ],
    image: "/images/storytelling.webp",
    caseStudyLink: "/projects/documentary-storytelling",
    color: "purple",
    icon: "📖",
  },
  {
    id: "web-application-development",
    branch: "labs",
    title: "Web Application Development",
    // shortTitle can be omitted
    description:
      "We build custom web applications that are tailored to your specific business needs. Our team of expert developers will work with you to create a solution that is scalable, secure, and user-friendly.",
    shortDescription: "End-to-end web apps built on Next.js, React & Node—designed for scale, security and speed.",
    features: [
      "Responsive UI/UX design",
      "API & microservices architecture",
      "Performance optimization & caching",
      "Security best practices & compliance",
    ],
    image: "/images/web-app-development.webp",
    caseStudyLink: "/projects/custom-web-applications",
    color: "teal",
    icon: "💻",
  },
  {
    id: "ai-automation-engineering",
    branch: "labs",
    title: "AI & Automation Engineering",
    // shortTitle can be omitted
    description:
      "We leverage the power of artificial intelligence to automate repetitive tasks and streamline your business processes. Our team of AI experts will help you identify opportunities for automation and implement solutions that drive efficiency and reduce costs.",
    shortDescription: "Tailored AI/ML pipelines, chatbots and workflow automations (n8n, Langflow, etc.).",
    features: [
      "Custom ML model fine-tuning and deployment",
      "Conversational chatbot integration",
      "End-to-end workflow orchestration",
      "Data preprocessing & ETL pipelines",
    ],
    image: "/images/ai-automation.webp",
    caseStudyLink: "/projects/ai-driven-automation",
    color: "yellow",
    icon: "🤖",
  },
  {
    id: "cloud-devops-solutions",
    branch: "labs",
    title: "Cloud & DevOps Solutions",
    // shortTitle can be omitted
    description:
      "We provide end-to-end cloud and devops solutions to keep your apps up, fast and secure at any scale.",
    shortDescription: "Containerized infrastructure, CI/CD pipelines, Kubernetes, Docker & hybrid-cloud hosting.",
    features: [
      "Cloud-native Architecture, Hybrid-Cloud Hosting, and On-Premise Hosting Development, Management, and Maintenance.",
      "Kubernetes & Docker Orchestration",
      "Automated CI/CD Pipelines",
      "Monitoring, Alerting & Auto-Scaling"
    ],
    image: "/images/cloud-devops.webp",
    caseStudyLink: "/projects/enterprise-cloud-devops",
    color: "cyan",
    icon: "☁️",
  },
  {
    id: "social-media-content",
    branch: "media",
    title: "Social Media Content",
    // No corresponding entry in app/page.tsx, so no icon or shortDescription unless we create them.
    // shortTitle: "Social Content" // Example if needed
    description:
      "We create engaging, platform-optimized content that builds community, drives engagement, and establishes your brand as a thought leader in your industry.",
    shortDescription: "Platform-optimized content that builds community and drives engagement.",
    icon: "📣",
    features: [
      "Platform-Specific Content",
      "Community Building",
      "Engagement Strategies",
      "Content Development",
    ],
    image: "/images/Whiteboard Colab Scene.webp",
    caseStudyLink: "/projects/social-media-strategy",
    color: "green",
    // icon: "👍" // Example icon if desired
  },
].sort((a, b) => (a.branch === b.branch ? 0 : a.branch === "media" ? -1 : 1)); 