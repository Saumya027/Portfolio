import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { projects } from "@/data/projects";
import { timelineEntries } from "@/data/timeline";
import { achievements } from "@/data/achievements";

export async function GET() {
  try {
    // 1. General Info
    await setDoc(doc(db, "general", "info"), {
      cgpa: "9.64/10",
      aboutText1: "I'm a Computer Engineering undergraduate at Pandit Deendayal Energy University, Gandhinagar. My journey started with a deep fascination for how software can solve real-world problems at scale.",
      aboutText2: "I specialize in building full-stack web applications and AI-powered systems — from deepfake detection platforms to intelligent pharmacy management tools. I believe great software is both technically excellent and beautifully crafted.",
      aboutText3: "Beyond code, I actively contribute to open source as a GSSoC 2026 contributor and have solved 300+ LeetCode problems — constantly pushing myself to learn and grow.",
      heroStats: [
        { label: "CGPA", value: "9.64/10" },
        { label: "LeetCode", value: "300+" },
        { label: "GSSoC", value: "2026" },
        { label: "Stack", value: "AI + Full Stack" }
      ],
      resumeUrl: ""
    });

    // 2. Projects
    const projectsRef = collection(db, "projects");
    for (const [index, project] of projects.entries()) {
      await setDoc(doc(projectsRef, `project_${index}`), { ...project, order: index });
    }

    // 3. Timeline
    const timelineRef = collection(db, "timeline");
    for (const [index, entry] of timelineEntries.entries()) {
      await setDoc(doc(timelineRef, `timeline_${index}`), { ...entry, order: index });
    }

    // 4. Achievements
    const achievementsRef = collection(db, "achievements");
    for (const [index, achievement] of achievements.entries()) {
      await setDoc(doc(achievementsRef, `achievement_${index}`), { ...achievement, order: index });
    }

    // 5. Profiles
    const profilesList = [
      {
        id: "github",
        name: "GitHub",
        handle: "@Saumya027",
        url: "https://github.com/Saumya027",
        iconName: "github",
        color: "from-gray-600 to-gray-800",
        borderColor: "hover:border-gray-500/50",
        stats: [{ label: "Status", value: "Active Contributor" }, { label: "Focus", value: "Full-Stack & AI" }],
        description: "Full-stack projects, AI systems, and open source contributions.",
        badge: "Open Source",
        badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
        order: 0
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        handle: "saumya-pandey-747421348",
        url: "https://linkedin.com/in/saumya-pandey-747421348",
        iconName: "linkedin",
        color: "from-blue-600 to-blue-800",
        borderColor: "hover:border-blue-500/50",
        stats: [{ label: "Network", value: "Active" }, { label: "Status", value: "Open to Work" }],
        description: "Professional network, experience highlights, and career milestones.",
        badge: "Professional",
        badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        order: 1
      },
      {
        id: "leetcode",
        name: "LeetCode",
        handle: "SaumyaP0107",
        url: "https://leetcode.com/SaumyaP0107",
        iconName: "leetcode",
        color: "from-orange-500 to-yellow-600",
        borderColor: "hover:border-orange-500/50",
        stats: [{ label: "Problems Solved", value: "300+" }, { label: "Contest Rating", value: "1520+" }],
        description: "300+ problems solved across Easy, Medium, and Hard.",
        badge: "Competitive",
        badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        order: 2
      }
    ];
    
    const profilesRef = collection(db, "profiles");
    for (const profile of profilesList) {
      await setDoc(doc(profilesRef, profile.id), profile);
    }

    return NextResponse.json({ success: true, message: "Database initialized with ALL data!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
