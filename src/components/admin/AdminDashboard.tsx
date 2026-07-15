"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { LogOut, Save, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const [generalInfo, setGeneralInfo] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch General
        const genSnap = await getDocs(collection(db, "general"));
        genSnap.forEach((d) => { if (d.id === "info") setGeneralInfo(d.data()); });

        // Fetch Projects
        const projSnap = await getDocs(collection(db, "projects"));
        const projData: any[] = [];
        projSnap.forEach((d) => projData.push({ id: d.id, ...d.data() }));
        setProjects(projData.sort((a, b) => a.order - b.order));

        // Fetch Achievements
        const achSnap = await getDocs(collection(db, "achievements"));
        const achData: any[] = [];
        achSnap.forEach((d) => achData.push({ id: d.id, ...d.data() }));
        setAchievements(achData.sort((a, b) => a.order - b.order));

        // Fetch Profiles
        const profSnap = await getDocs(collection(db, "profiles"));
        const profData: any[] = [];
        profSnap.forEach((d) => profData.push({ id: d.id, ...d.data() }));
        setProfiles(profData.sort((a, b) => a.order - b.order));

        // Fetch Timeline
        const timeSnap = await getDocs(collection(db, "timeline"));
        const timeData: any[] = [];
        timeSnap.forEach((d) => timeData.push({ id: d.id, ...d.data() }));
        setTimeline(timeData.sort((a, b) => a.order - b.order));

      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  // Auto-convert Google Drive share links to direct download links
  const convertDriveLink = (url: string): string => {
    // Match both /file/d/ID/view and open?id=ID formats
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
                        url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
    }
    return url; // not a Drive link, return as-is
  };

  const handleResumeUrlChange = (value: string) => {
    const converted = convertDriveLink(value);
    setGeneralInfo({ ...generalInfo, resumeUrl: converted });
  };

  const saveGeneralInfo = async () => {
    setSaving(true);
    await setDoc(doc(db, "general", "info"), generalInfo);
    setSaving(false);
    alert("Saved!");
  };

  const saveCollectionItem = async (collectionName: string, item: any) => {
    setSaving(true);
    await setDoc(doc(db, collectionName, item.id), item);
    setSaving(false);
    alert("Saved!");
  };

  const addNewItem = (collectionName: string, stateArr: any[], setStateFn: any, defaultItem: any) => {
    const newItem = { ...defaultItem, id: Date.now().toString(), order: stateArr.length };
    setStateFn([...stateArr, newItem]);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Admin Data...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-foreground/10">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["general", "projects", "timeline", "achievements", "profiles"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize whitespace-nowrap ${activeTab === tab ? "bg-primary text-primary-foreground" : "bg-foreground/5 hover:bg-foreground/10"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-foreground/10">
              <h3 className="font-bold mb-2">Resume URL</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Paste any Google Drive share link and it will be <span className="text-green-400 font-medium">auto-converted</span> to a direct download link. Or place your PDF in the <code className="bg-foreground/10 px-1 rounded">public/</code> folder and type <code className="bg-foreground/10 px-1 rounded">/resume.pdf</code>.
              </p>
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Paste Google Drive link or /resume.pdf"
                  value={generalInfo.resumeUrl || ""} 
                  onChange={e => handleResumeUrlChange(e.target.value)} 
                  className="w-full px-4 py-2 rounded-lg bg-background border border-foreground/10 font-mono text-sm" 
                />
                {generalInfo.resumeUrl && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-green-400 font-medium">✓ Link auto-converted</span>
                    <a href={generalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">Test Link ↗</a>
                  </div>
                )}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-foreground/10 space-y-4">
              <h3 className="font-bold">Basic Info</h3>
              <div>
                <label className="block text-sm font-medium mb-2">CGPA</label>
                <input value={generalInfo.cgpa || ""} onChange={e => setGeneralInfo({...generalInfo, cgpa: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-background border border-foreground/10" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">About Section - Paragraph 1</label>
                <textarea value={generalInfo.aboutText1 || ""} onChange={e => setGeneralInfo({...generalInfo, aboutText1: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-background border border-foreground/10 h-24" />
              </div>
              <button onClick={saveGeneralInfo} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 mt-4">
                <Save size={16} /> Save General Info
              </button>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <button onClick={() => addNewItem("projects", projects, setProjects, { title: "New Project", description: "", image: "" })} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
              <Plus size={16} /> Add Project
            </button>
            {projects.map((p, i) => (
              <div key={p.id} className="glass-card p-6 rounded-2xl border border-foreground/10 space-y-4">
                <div className="flex justify-between items-center">
                  <input value={p.title || ""} onChange={e => { const newArr = [...projects]; newArr[i].title = e.target.value; setProjects(newArr); }} className="px-3 py-1.5 rounded-lg bg-background border border-foreground/10 font-bold" />
                  <button onClick={() => saveCollectionItem("projects", p)} disabled={saving} className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Save size={14} /> Save
                  </button>
                </div>
                <input placeholder="Image URL" value={p.image || ""} onChange={e => { const newArr = [...projects]; newArr[i].image = e.target.value; setProjects(newArr); }} className="w-full px-3 py-1.5 rounded-lg bg-background border border-foreground/10 text-sm" />
                <textarea placeholder="Description" value={p.description || ""} onChange={e => { const newArr = [...projects]; newArr[i].description = e.target.value; setProjects(newArr); }} className="w-full px-3 py-1.5 rounded-lg bg-background border border-foreground/10 text-sm h-20" />
              </div>
            ))}
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className="space-y-6">
            <button onClick={() => addNewItem("timeline", timeline, setTimeline, { title: "New Milestone", description: "", date: "2024" })} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
              <Plus size={16} /> Add Milestone
            </button>
            {timeline.map((t, i) => (
              <div key={t.id} className="glass-card p-6 rounded-2xl border border-foreground/10 space-y-4">
                <div className="flex gap-4">
                  <input value={t.date || ""} onChange={e => { const newArr = [...timeline]; newArr[i].date = e.target.value; setTimeline(newArr); }} className="w-32 px-3 py-1.5 rounded-lg bg-background border border-foreground/10" placeholder="Date" />
                  <input value={t.title || ""} onChange={e => { const newArr = [...timeline]; newArr[i].title = e.target.value; setTimeline(newArr); }} className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-foreground/10 font-bold" placeholder="Title" />
                  <button onClick={() => saveCollectionItem("timeline", t)} disabled={saving} className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Save size={14} /> Save
                  </button>
                </div>
                <textarea placeholder="Description" value={t.description || ""} onChange={e => { const newArr = [...timeline]; newArr[i].description = e.target.value; setTimeline(newArr); }} className="w-full px-3 py-1.5 rounded-lg bg-background border border-foreground/10 text-sm h-20" />
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <button onClick={() => addNewItem("achievements", achievements, setAchievements, { title: "New Achievement", value: "0", description: "" })} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
              <Plus size={16} /> Add Achievement
            </button>
            {achievements.map((a, i) => (
              <div key={a.id} className="glass-card p-6 rounded-2xl border border-foreground/10 space-y-4">
                <div className="flex gap-4">
                  <input value={a.title || ""} onChange={e => { const newArr = [...achievements]; newArr[i].title = e.target.value; setAchievements(newArr); }} className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-foreground/10 font-bold" placeholder="Title" />
                  <input value={a.value || ""} onChange={e => { const newArr = [...achievements]; newArr[i].value = e.target.value; setAchievements(newArr); }} className="w-32 px-3 py-1.5 rounded-lg bg-background border border-foreground/10" placeholder="Value (e.g. 300+)" />
                  <button onClick={() => saveCollectionItem("achievements", a)} disabled={saving} className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Save size={14} /> Save
                  </button>
                </div>
                <textarea placeholder="Description" value={a.description || ""} onChange={e => { const newArr = [...achievements]; newArr[i].description = e.target.value; setAchievements(newArr); }} className="w-full px-3 py-1.5 rounded-lg bg-background border border-foreground/10 text-sm h-16" />
              </div>
            ))}
          </div>
        )}

        {/* Profiles Tab */}
        {activeTab === "profiles" && (
          <div className="space-y-6">
            <button onClick={() => addNewItem("profiles", profiles, setProfiles, { name: "New Profile", handle: "", url: "" })} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
              <Plus size={16} /> Add Profile
            </button>
            {profiles.map((p, i) => (
              <div key={p.id} className="glass-card p-6 rounded-2xl border border-foreground/10 space-y-4">
                <div className="flex gap-4">
                  <input value={p.name || ""} onChange={e => { const newArr = [...profiles]; newArr[i].name = e.target.value; setProfiles(newArr); }} className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-foreground/10 font-bold" placeholder="Platform Name" />
                  <input value={p.handle || ""} onChange={e => { const newArr = [...profiles]; newArr[i].handle = e.target.value; setProfiles(newArr); }} className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-foreground/10" placeholder="Username Handle" />
                  <button onClick={() => saveCollectionItem("profiles", p)} disabled={saving} className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Save size={14} /> Save
                  </button>
                </div>
                <input value={p.url || ""} onChange={e => { const newArr = [...profiles]; newArr[i].url = e.target.value; setProfiles(newArr); }} className="w-full px-3 py-1.5 rounded-lg bg-background border border-foreground/10" placeholder="Profile URL" />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
