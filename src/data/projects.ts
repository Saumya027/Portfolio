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
    github: "https://github.com/Saumya027/Deepguard_Platform",
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
    image: "/images/serviceconnect2.png",
    github: "https://github.com/Saumya027/ServiceConnect",
    live: "https://serviceconnect-three.vercel.app/",
    status: "completed",
    color: "from-orange-500/20 to-rose-500/20",
  },
  {
    id: "pharmasense",
    title: "PharmaSense",
    description: "AI-Powered Pharmacy Management System",
    longDescription:
      "A comprehensive role-based pharmacy management platform supporting real-time inventory tracking, FEFO-based stock management, and demand forecasting.",
    features: [
      "Role-Based Access Control",
      "FEFO Stock Management",
      "Expiry & Low-Stock Alerts",
      "ML Demand Forecasting",
      "Real-Time Dashboard",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Firebase", "Python", "Flask"],
    image: "/images/pharmasense2.png",
    github: "https://github.com/Saumya027/PharmaSense",
    live: "https://pharmasense-818d4.web.app/",
    status: "completed",
    color: "from-teal-500/20 to-emerald-500/20",
  },
];
