import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const CoachDashboard = dynamic(() => import("@/components/coach/CoachDashboard"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function CoachDashboardPage() {
  return <CoachDashboard />;
}
