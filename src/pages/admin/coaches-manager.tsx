import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const CoachesManager = dynamic(() => import("@/components/admin/CoachesManager"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function CoachesManagerPage() {
  return <CoachesManager />;
}
