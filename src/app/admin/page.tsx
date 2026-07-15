import { cookies } from "next/headers";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (token?.value === "authenticated") {
    return <AdminDashboard />;
  }

  return <AdminLogin />;
}
