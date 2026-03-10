import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const AdminProfil = dynamic(() => import("@/components/admin/AdminProfil"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function AdminProfilPage() {
  return <AdminProfil />;
}
