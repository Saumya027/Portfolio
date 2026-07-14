export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  stack: string[];
  image: string;
  github: string;
  live?: string;
  status: "completed" | "ongoing";
  color: string;
}

export const projects: Project[] = [
  {
    id: "deepguard",
    title: "DeepGuard Platform",
    description: "Multimodal Deepfake Detection & Forensic Analysis Platform",
    longDescription:
      "An advanced AI platform for detecting deepfakes across audio, image, and video modalities using transformer-based models. Integrates explainable AI techniques including Grad-CAM, SHAP, and LIME for forensic analysis.",
    features: [
      "Audio Deepfake Detection",
      "Image Forensics",
      "Video Deepfake Detection",
      "Explainable AI (Grad-CAM, SHAP, LIME)",
      "Transformer-Based Models",
      "Multimodal Analysis",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Hugging Face", "OpenCV"],
    image: "/images/deepguard.png",
    github: "https://github.com/Saumya027",
    status: "ongoing",
    color: "from-blue-500/20 to-violet-500/20",
  },
  {
    id: "serviceconnect",
    title: "ServiceConnect",
    description: "Location-Aware Service Marketplace Platform",
    longDescription:
      "A full-stack platform connecting customers with verified service providers via location-aware discovery, booking workflows, and real-time map integration.",
    features: [
      "JWT Authentication",
      "OTP Verification",
      "Role-Based Dashboards",
      "Booking Workflows",
      "Interactive Maps (Leaflet + OSM)",
      "Real-Time Notifications",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "Leaflet", "Nodemailer"],
    image: "/images/serviceconnect.png",
    github: "https://github.com/Saumya027",
    status: "completed",
    color: "from-teal-500/20 to-emerald-500/20",
  },
  {
    id: "pharmasense",
    title: "PharmaSense",
    description: "AI-Powered Pharmacy Management System",
    longDescription:
      "A role-based pharmacy management platform with AI-driven demand forecasting, FEFO-based stock management, automated expiry monitoring, and low-stock alerts.",
    features: [
      "Inventory Management",
      "Demand Forecasting (ML)",
      "FEFO Stock Management",
      "Expiry Monitoring",
      "Automated Alerts",
      "Role-Based Access",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Firebase", "Python", "Flask"],
    image: "/images/pharmasense.png",
    github: "https://github.com/Saumya027",
    status: "completed",
    color: "from-violet-500/20 to-pink-500/20",
  },
];
