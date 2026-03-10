import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const AdminYutuqlar = dynamic(() => import("@/components/admin/AdminYutuqlar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function AdminYutuqlarPage() {
  return <AdminYutuqlar />;
}
