import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const AdminYangiliklar = dynamic(() => import("@/components/admin/AdminYangiliklar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function AdminYangiliklarPage() {
  return <AdminYangiliklar />;
}
