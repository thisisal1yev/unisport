import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportchilarManager = dynamic(() => import("@/components/admin/SportchilarManager"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportchilarManagerPage() {
  return <SportchilarManager />;
}
