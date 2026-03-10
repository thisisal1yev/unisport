import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const CoachSportchilar = dynamic(() => import("@/components/coach/CoachSportchilar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function CoachSportchilarPage() {
  return <CoachSportchilar />;
}
