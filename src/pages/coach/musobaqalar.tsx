import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const CoachMusobaqalar = dynamic(() => import("@/components/coach/CoachMusobaqalar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function CoachMusobaqalarPage() {
  return <CoachMusobaqalar />;
}
