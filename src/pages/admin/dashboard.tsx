import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const AdminDashboard = dynamic(() => import("@/components/admin/AdminDashboard"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
