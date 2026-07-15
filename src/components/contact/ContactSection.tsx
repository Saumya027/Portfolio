"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/BrandIcons";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(4, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please email me directly at saumyap0107@gmail.com");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-pink-400">Get In Touch</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight mb-8">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Amazing</span>{" "}
              Together
            </h2>
            <p className="mt-8 text-muted-foreground max-w-xl mx-auto text-center">
              Whether you have an opportunity, a project idea, or just want to say hello — my inbox is always open.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-lg mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <a href="mailto:saumyap0107@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/20 transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">saumyap0107@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">Ahmedabad, Gujarat, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="glass-card rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-lg mb-4">Find Me Online</h3>
                <div className="space-y-3">
                  {[
                    { icon: <GithubIcon size={18} />, label: "GitHub", handle: "@Saumya027", url: "https://github.com/Saumya027", color: "hover:border-gray-500/50 hover:bg-gray-500/5" },
                    { icon: <LinkedinIcon size={18} />, label: "LinkedIn", handle: "saumya-pandey-747421348", url: "https://linkedin.com/in/saumya-pandey-747421348", color: "hover:border-blue-500/50 hover:bg-blue-500/5" },
                    { icon: <LeetcodeIcon size={18} />, label: "LeetCode", handle: "SaumyaP0107", url: "https://leetcode.com/SaumyaP0107", color: "hover:border-orange-500/50 hover:bg-orange-500/5" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl border border-white/10 text-muted-foreground hover:text-foreground transition-all ${social.color}`}
                    >
                      {social.icon}
                      <div>
                        <p className="text-xs text-muted-foreground">{social.label}</p>
                        <p className="text-sm font-medium">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {submitted ? (
                <div className="glass-card rounded-2xl border border-green-500/20 p-10 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full text-sm font-medium glass border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-2xl border border-white/10 p-6 space-y-5">
                  <h3 className="font-bold text-lg">Send a Message</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">Name</label>
                      <input
                        {...register("name")}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">Email</label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Subject</label>
                    <input
                      {...register("subject")}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                    />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Message</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all resize-none"
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-orange-500/25"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
