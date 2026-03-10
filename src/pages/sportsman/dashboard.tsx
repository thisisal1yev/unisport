import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportsmanDashboard = dynamic(() => import("@/components/sportsman/SportsmanDashboard"), {
  loading: () => <PageLoading />,
  ssr: true,
});

export default function SportsmanDashboardPage() {
  return <SportsmanDashboard />;
}
