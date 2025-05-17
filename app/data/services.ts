import type { Service } from "@/app/types/services";

export const MASTER_SERVICES: Service[] = [
  {
    id: "digital-marketing",
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
    caseStudyLink: "/portfolio/conversion-campaigns",
    color: "pink",
    icon: "📱",
  },
  {
    id: "brand-storytelling",
    title: "Brand Storytelling",
    // shortTitle can be omitted if title is suitable
    description:
      "We craft authentic narratives that communicate your brand's values, mission, and unique selling proposition in a way that resonates with your target audience.",
    shortDescription: "Authentic narratives that connect with your audience on a deeper level.",
    features: [
      "Brand Narrative Development",
      "Visual Identity Enhancement",
      "Messaging Strategy",
      "Audience Connection Mapping",
      "Emotional Engagement Tactics",
    ],
    image: "/images/storytelling.gif",
    caseStudyLink: "/portfolio/documentary-storytelling",
    color: "purple",
    icon: "📖",
  },
  {
    id: "web-application-development",
    title: "Web Application Development",
    // shortTitle can be omitted
    description:
      "We build scalable, secure web applications with Next.js, React & Node.js—designed for performance, reliability and ease-of-use.",
    shortDescription: "End-to-end web apps built on Next.js, React & Node—designed for scale, security and speed.",
    features: [
      "Responsive UI/UX design",
      "API & microservices architecture",
      "Performance optimization & caching",
      "Security best practices & compliance",
    ],
    image: "/images/web-app-development.gif",
    caseStudyLink: "/portfolio/custom-web-applications",
    color: "teal",
    icon: "💻",
  },
  {
    id: "ai-automation-engineering",
    title: "AI & Automation Engineering",
    // shortTitle can be omitted
    description:
      "Tailored AI/ML pipelines, chatbots and workflow automations (n8n, Langflow, etc.) that streamline operations and unlock data-driven insights.",
    shortDescription: "Tailored AI/ML pipelines, chatbots and workflow automations (n8n, Langflow, etc.).",
    features: [
      "Custom ML model development",
      "Conversational chatbot integration",
      "End-to-end workflow orchestration",
      "Data preprocessing & ETL pipelines",
    ],
    image: "/images/ai-automation.jpeg",
    caseStudyLink: "/portfolio/ai-driven-automation",
    color: "yellow",
    icon: "🤖",
  },
  {
    id: "cloud-devops-solutions",
    title: "Cloud & DevOps Solutions",
    // shortTitle can be omitted
    description:
      "End-to-end containerized infrastructure, CI/CD pipelines and hybrid-cloud hosting to keep your apps up, fast and secure at any scale.",
    shortDescription: "Containerized infrastructure, CI/CD pipelines, Kubernetes, Docker & hybrid-cloud hosting.",
    features: [
      "Kubernetes & Docker orchestration",
      "Automated CI/CD pipelines",
      "Monitoring, alerting & auto-scaling",
      "Infrastructure as Code (Terraform/Ansible)",
    ],
    image: "/images/cloud-devops.webp",
    caseStudyLink: "/portfolio/enterprise-cloud-devops",
    color: "cyan",
    icon: "☁️",
  },
  {
    id: "social-media-content",
    title: "Social Media Content",
    // No corresponding entry in app/page.tsx, so no icon or shortDescription unless we create them.
    // shortTitle: "Social Content" // Example if needed
    description:
      "We create engaging, platform-optimized content that builds community, drives engagement, and establishes your brand as a thought leader in your industry.",
    // shortDescription: "Engaging content for social platforms." // Example if needed
    features: [
      "Platform-Specific Content",
      "Community Building",
      "Engagement Strategies",
      "Content Development",
    ],
    image: "/images/Whiteboard Colab Scene.webp",
    caseStudyLink: "/portfolio/social-media-strategy",
    color: "green",
    // icon: "👍" // Example icon if desired
  },
]; 