import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowLeft, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Saumya Pandey`,
    description: project.longDescription,
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen pt-20 section-padding">
      <div className="container-max max-w-4xl">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Hero image */}
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-white/10 mb-10">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              project.status === "ongoing"
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                : "bg-green-500/20 text-green-300 border border-green-500/30"
            }`}>
              {project.status === "ongoing" ? "Ongoing" : "Completed"}
            </span>
          </div>
        </div>

        {/* Title + actions */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black">{project.title}</h1>
            <p className="mt-2 text-muted-foreground text-lg">{project.description}</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-white/25 text-sm font-medium transition-all">
              <GithubIcon size={16} />
              GitHub
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h2 className="text-lg font-bold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Features */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h2 className="text-lg font-bold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-muted-foreground">
                    <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Tech stack */}
            <div className="glass-card rounded-2xl p-5 border border-white/10">
              <h3 className="text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="glass-card rounded-2xl p-5 border border-white/10">
              <h3 className="text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">Status</h3>
              <span className={`text-sm font-semibold ${project.status === "ongoing" ? "text-blue-400" : "text-green-400"}`}>
                {project.status === "ongoing" ? "🚧 In Development" : "✅ Completed"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
