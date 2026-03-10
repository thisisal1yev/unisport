import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const KlublarManager = dynamic(() => import("@/components/admin/KlublarManager"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function KlublarManagerPage() {
  return <KlublarManager />;
}
