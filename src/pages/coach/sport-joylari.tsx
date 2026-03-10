import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const CoachSportJoylari = dynamic(() => import("@/components/coach/CoachSportJoylari"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function CoachSportJoylariPage() {
  return <CoachSportJoylari />;
}
